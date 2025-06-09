# Text-to-PDF Chrome Extension with Backend

## 🚀 Overview

This project consists of two parts:

1. **Chrome Extension** — Allows users to convert selected text to PDF.
2. **Node.js Backend** — Handles storage and viewing of generated PDF files.

---

## 📁 Project Structure

.
├── chrome-extension/
│ ├── background.js # Handles Chrome extension logic
│ ├── manifest.json # Extension manifest file
│ └── popup.html # UI shown in Chrome popup
│
├── text-to-pdf-backend/
│ ├── node_modules/ # Backend dependencies
│ ├── pdfs/ # Folder storing generated PDF files
│ ├── views/
│ │ └── allpdfs.ejs # View for listing PDFs
│ ├── package.json # Backend project metadata
│ ├── package-lock.json # Dependency lock file
│ └── server.js # Express server handling routes

yaml
Copy
Edit

---

## 🛠 Installation & Setup

### Backend Setup

1. Navigate to the backend directory:

```bash
cd text-to-pdf-backend
```
```bash
Install dependencies:
npm install
```
```bash
Start the server:
node server.js
```
Server will run on http://localhost:3000

Chrome Extension Setup
Open Chrome and go to chrome://extensions/

Enable Developer Mode

Click Load unpacked

Select the chrome-extension folder

🌐 Backend Endpoints
GET / – Home

GET /allpdfs – Displays all generated PDFs

PDFs are statically served from /pdfs directory

✨ Features
Convert selected text to PDF via Chrome extension

Downloadable and viewable PDFs via backend server

Express server using EJS templating for PDF listing

##video ->
https://drive.google.com/file/d/1VHloZ2qW-AoNj3PetPPFoEbisewUZeY_/view?usp=sharing
