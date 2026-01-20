# Automated-Data-Labeling-Dashboard
An end-to-end Automated Data Labeling Dashboard that enables uploading raw datasets, auto-labeling records using AI, reviewing and overriding labels, and tracking labeling progress through an interactive dashboard.

🚀 Features

📁 Upload CSV or JSON datasets

🧠 AI-powered auto-labeling using OpenAI (pluggable)

👤 Human-in-the-loop review

Accept AI labels

Override labels manually

📊 Real-time statistics

Total records

Pending, labeled, and approved counts

🗂️ Persistent storage using MongoDB

🎨 Clean UI built with Ant Design

🏗️ Tech Stack
Frontend

React.js

Redux

Ant Design

Backend

Node.js

Express.js

Database

MongoDB

Mongoose ODM

AI Integration

OpenAI API (configurable via environment variables)

📁 Project Structure
automated-data-labeling-dashboard/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── uploadController.js
│   │   └── labelController.js
│   ├── models/
│   │   └── DataItem.js
│   ├── routes/
│   │   ├── uploadRoutes.js
│   │   └── labelRoutes.js
│   ├── uploads/
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── store/
│       ├── App.js
│       └── index.js
│
├── demo-data.json
└── README.md

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/your-username/automated-data-labeling-dashboard.git
cd automated-data-labeling-dashboard

2️⃣ Backend Setup
cd backend
npm install


Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_atlas_uri

# Enable OpenAI integration if key is available
USE_OPENAI=false
OPENAI_API_KEY=sk-xxxxxxxx


Start backend:

npm start


Backend runs on:

http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm start


Frontend runs on:

http://localhost:3000

🧠 OpenAI Integration (Important)

This project supports OpenAI-based auto-labeling.

Enable OpenAI:

Add a valid OPENAI_API_KEY in .env

Set:

USE_OPENAI=true


Restart backend

Fallback Mode:

If OpenAI is disabled or unavailable, the system uses a mock labeling engine for development and evaluation purposes.

This ensures:

Stable demos

No runtime failures

Easy AI provider swapping

🔌 API Endpoints
Upload Data
POST /upload

Auto Label Records
POST /label/auto-label

Approve Label
PUT /label/:id/approve

Override Label
PUT /label/:id/override

Get Statistics
GET /label/stats

📊 Dashboard Workflow

Upload CSV/JSON dataset

Records saved with PENDING status

Trigger Auto Label

AI assigns labels (LABELED)

Review and approve or override labels

View real-time statistics

📄 Demo Dataset

A sample dataset is included:

demo-data.json


Use it to quickly test:

Upload

Auto-labeling

Review & approval workflow

📸 Screenshots (Recommended for Submission)

Dataset upload success

Auto-labeled records

Review & override UI

Approved records

Statistics dashboard

🧠 Design Considerations

Clean separation of concerns (Upload → Label → Review)

Environment-based AI integration

Production-style fallback strategy

Extensible architecture for future AI models

✅ Status

✔ All requirements implemented
✔ Fully functional and demo-ready
✔ Clean, maintainable, and extensible codebase

📌 Author

Prem Aman
Automated Data Labeling Dashboard – Company Assignment Submission
