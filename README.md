Personal Finance Tracker (MERN Stack)
A full-stack personal finance tracker application to efficiently manage expenses, income, and financial analytics. Built with MongoDB, Express.js, React.js, and Node.js for scalability, security, and a seamless user experience.

Features
User Authentication and Authorization for secure account access.

CRUD Operations for expenses, income, and categories.

File Uploads for avatars or receipts.

Analytics Dashboard displaying charts and reports.

Responsive and clean UI suitable for desktop and mobile.

Folder Structure Overview
Backend
config/ – Configuration files.

controllers/ – Logic for authentication, transactions, profile pictures.

middleware/ – Custom Express middleware.

models/ – Mongoose schemas for users and transactions.

public/uploads/avatars/ – Uploaded images.

routes/ – Express route definitions.

.env – Environment variables (instructions below).

package.json – Backend dependencies.

server.js – Entry point.

Frontend
dist/ – Production build output.

public/ – Static assets.

src/

assets/ – Images, icons, etc.

components/ – Reusable React components split by feature.

context/ – App-wide context (e.g., theme).

hooks/ – Custom React hooks for logic separation.

pages/ – Route-based UI views.

utils/ – Utility files (e.g., icon mapping).

.env – Environment variables (instructions below).

App.js, index.js, etc. – Root files.

Getting Started
1. Clone the Repository
bash
git clone https://your-repo-url
cd backend
npm install
cd ../frontend
npm install
2. Environment Variables (.env Files)
Backend (backend/.env)
Create a .env file in the backend folder to store sensitive configuration:

text
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
Never commit your real .env to git. Instead, provide a .env.example with placeholders.

The backend loads these with dotenv automatically.

Frontend (frontend/.env)
For React, create a .env in the frontend folder:

text
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOME_PUBLIC_KEY=your_public_key
All variables must be prefixed with REACT_APP_ to be accessible in the app code.

Do not expose secrets in frontend .env – only non-sensitive config.

Usage in code: process.env.REACT_APP_API_URL

Example Files
Include .env.example in both folders for reference:

backend/.env.example

frontend/.env.example

Running the Application
Backend:

text
cd backend
npm start
Frontend:

text
cd frontend
npm start
Access at http://localhost:3000 (frontend) and http://localhost:5000 (backend API).

