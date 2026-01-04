
import { GoogleGenAI, Modality } from "@google/genai";

// Instruction for the model's behavior.
const SYSTEM_INSTRUCTION = `You are a highly accurate AI Tutor for ITI students.
Rules:
1. Short, direct answers.
2. Use bullet points.
3. If Hindi/Hinglish asked, reply in Hindi.
4. If English asked, reply in English.
5. Be encouraging.`;

// Factory function to initialize the GoogleGenAI client.
// This ensures that process.env.API_KEY is accessed at the correct time and used strictly as per guidelines.
const getAI = () => {
  // Always initialize with a named parameter for the API key.
  // The API key must be obtained exclusively from the environment variable process.env.API_KEY.
  return new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
};

export const getAITutorResponse = async (question: string): Promise<string> => {
  try {
    const ai = getAI();
    // Directly call generateContent on the ai.models object with both the model and the prompt.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: { systemInstruction: SYSTEM_INSTRUCTION }
    });
    // Extract text output using the .text property (not a method).
    return response.text || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection error. Please try again.";
  }
};

export const getAITutorResponseStream = async function* (question: string) {
  try {
    const ai = getAI();
    // Use generateContentStream for streaming model responses.
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: { 
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    for await (const chunk of responseStream) {
      // Access the text property on each streamed chunk.
      const text = chunk.text;
      if (text) yield text;
    }
  } catch (error) {
    console.error("Gemini Stream Error:", error);
    yield "Network error. Please check your connection.";
  }
};

export const getGeminiSpeech = async (text: string): Promise<string | null> => {
  try {
    const ai = getAI();
    // Remove formatting characters that might interfere with text-to-speech.
    let cleanText = text.replace(/[\*#_`>]/g, ' ').replace(/\s+/g, ' ').trim();
    const hasContent = /[a-zA-Z0-9\u0900-\u097F]/.test(cleanText);

    if (!cleanText || !hasContent) {
      return null;
    }
    
    cleanText = cleanText.slice(0, 800);
    
    // Generate speech using the designated TTS model 'gemini-2.5-flash-preview-tts'.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: cleanText }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    // Extract the raw PCM audio bytes from the inline data part of the response.
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || null;
  } catch (error) {
    console.error("Gemini TTS Error:", error);
    return null;
  }
};
