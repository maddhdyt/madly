# Zeasy (Sales Module MVP)

A minimalist, Notion-esque B2B internal SaaS application designed for sales operational assistants. Focused on solving repetitive tasks: finding prices, copying product descriptions, and replying to chats. 

## Features
- **Fast Search:** Find products and prices instantly.
- **One-Click Copy:** Click on any price or snippet to automatically copy it to your clipboard.
- **Split-Screen Optimized:** Designed to run side-by-side with WhatsApp Web.
- **Monochrome Minimalist UI:** Zero distractions. No bright colors, no heavy shadows. Just raw data and pure utility.

## Tech Stack
- **Backend:** Laravel (PHP) + MySQL
- **Frontend:** Blade Templates + Vanilla JS + Tailwind CSS (Vite)

## Local Development Setup

Follow these steps to run the application on your local server.

### Prerequisites
- PHP >= 8.2
- Composer
- Node.js & npm
- MySQL (or Laragon/XAMPP/MAMP)

### Installation Steps

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <your-repo-url>
   cd madly
   ```

2. **Install PHP Dependencies:**
   ```bash
   composer install
   ```

3. **Install Node.js Dependencies:**
   ```bash
   npm install
   ```

4. **Environment Setup:**
   Copy the example `.env` file and generate an application key:
   ```bash
   copy .env.example .env
   php artisan key:generate
   ```

5. **Database Setup:**
   - Create a new MySQL database named `madly` (or whatever you set in your `.env`).
   - Update your `.env` file with the database credentials:
     ```env
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=madly
     DB_USERNAME=root
     DB_PASSWORD=
     ```
   - Run the migrations:
     ```bash
     php artisan migrate
     ```

6. **Compile Frontend Assets:**
   ```bash
   npm run build
   # Or use `npm run dev` to watch for changes during development
   ```

7. **Run the Local Server:**
   ```bash
   php artisan serve
   ```
   The application will be accessible at `http://localhost:8000`.

## Design Philosophy

This project strictly adheres to a brutalist, monochrome aesthetic. 
- No primary brand colors. 
- No gradients.
- Typography relies on size and weight for hierarchy (Inter/System UI).
- Structural design is built on CSS Grid with thin borders (`border-gray-200`) and whitespace.
