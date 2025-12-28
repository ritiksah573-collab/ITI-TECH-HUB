import { GoogleGenAI, Modality } from "@google/genai";

const apiKey = process.env.API_KEY || "";

const SYSTEM_INSTRUCTION = `You are a highly accurate AI Tutor for ITI students.
Rules:
1. Short, direct answers.
2. Use bullet points.
3. If Hindi/Hinglish asked, reply in Hindi.
4. If English asked, reply in English.
5. Be encouraging.`;

// Lazy initialization function to prevent top-level crashes
const getAI = () => {
  if (!apiKey) {
    console.error("API_KEY is missing. Check your environment variables.");
  }
  return new GoogleGenAI({ apiKey });
};

export const getAITutorResponse = async (question: string): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: { systemInstruction: SYSTEM_INSTRUCTION }
    });
    return response.text || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection error. Please try again.";
  }
};

export const getAITutorResponseStream = async function* (question: string) {
  try {
    const ai = getAI();
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: { 
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    for await (const chunk of responseStream) {
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
    let cleanText = text.replace(/[\*#_`>]/g, ' ').replace(/\s+/g, ' ').trim();
    const hasContent = /[a-zA-Z0-9\u0900-\u097F]/.test(cleanText);

    if (!cleanText || !hasContent) {
      return null;
    }
    
    cleanText = cleanText.slice(0, 800);
    
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

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || null;
  } catch (error) {
    console.error("Gemini TTS Error:", error);
    return null;
  }
};