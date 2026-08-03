# Zeasy Project Context

## Overview
Zeasy (formerly known as "Madly") is a premium, SaaS-like web application designed to help Sales teams manage product knowledge, quickly answer customer queries using chat snippets, and generate quick quotations. It is built with **Laravel 11, React, Inertia.js, and Tailwind CSS**.

> [!NOTE]  
> **Rebranding History:** On August 3, 2026, the application was officially rebranded from **Madly** to **Zeasy** to better reflect its pivot towards an AI & Strategy Command Center.

## UI/UX Highlights
- **Premium Aesthetics**: Glassmorphism, smooth animations, customized color palettes, and a dedicated Dark Mode toggle with a catchy sliding animation.
- **Navigation (Sidebar)**: Reorganized into a flat, professional structure:
  - **GENERAL**: Dashboard, Quick Quotation, Chat Snippets.
  - **DATABASE**: Products, Pricelists, Brands, Service Types.
  - **SYSTEM**: Settings.
- **Forms**: Slide-over panels used for all create/edit actions instead of traditional pages or basic modals to maintain the premium feel.

## Current State & Completed Features
- Setup authentication (Laravel Breeze).
- Created Models, Migrations, and Controllers for:
  - `Brand`
  - `Product`
  - `ProductPackage`
  - `PackageItem`
  - `ServiceType`
  - `ChatSnippet`
- Created full React UI components for the above entities (Index pages + SlideOver forms).
- The `MainLayout.jsx` and `Welcome.jsx` have been extensively customized.
- Assets compiled via `npm run build`.

## Next Session Focus
When resuming the project, the primary tasks left are to implement the following features:
1. **Pricelists**: System for managing PDF/Image price lists.
2. **Settings**: A global application settings page.
3. **Quick Quotation (Calculator)**: A dynamic tool to help sales generate instant draft invoices/quotes based on products and services in the database.
4. **Backend logic**: Finalizing the save/update endpoints for all the CRUDs (currently they are UI-ready and routes are defined, some might need backend controller adjustments).

*Note: Please read this document before continuing to ensure continuity between sessions.*
