# ITI Tech Hub - Hostinger Deployment Guide

## Step 1: Database Setup
1. Log in to **Hostinger hPanel**.
2. Go to **Databases > MySQL Databases**.
3. Create a new database and user. Note down the **DB Name, Username, and Password**.
4. Click on **Enter phpMyAdmin**.
5. Select your database, go to the **SQL** tab, paste the contents of `DATABASE_SETUP.sql`, and click **Go**.

## Step 2: Configure API
1. Open `api.php`.
2. Update the database credentials at the top of the file:
   ```php
   $db_name = 'your_hostinger_db_name';
   $username = 'your_hostinger_username';
   $password = 'your_password';
   ```

## Step 3: Build & Upload
1. Run `npm run build` in your local terminal.
2. Open the `dist` folder.
3. Upload all files inside `dist` to Hostinger's `public_html` via File Manager or FTP.
4. Also upload `api.php` and `.htaccess` to the **root** of `public_html`.

## Step 4: AI Key
Ensure your `VITE_API_KEY` is set in your environment or injected during build so AIBuddy continues to work.

Your site is now running on a professional PHP/MySQL backend on Hostinger!