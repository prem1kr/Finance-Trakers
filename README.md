
# Personal Finance Manager 💰

A full-stack personal finance management app built with **React (frontend)** and **Node.js/Express (backend)** with **MongoDB** as the database.  
It allows users to manage income, expenses, and transactions with authentication and file upload support.

---

## 📂 Project Structure

### Frontend (`frontend/`)
- **Framework:** React + Vite
- **Folders:**
  - `components/` → Reusable UI components (auth, dashboard, expenses, income, transactions, etc.)
  - `context/` → Global state management (ThemeContext)
  - `hooks/` → Custom hooks (add income/expenses, fetch transactions, user info, etc.)
  - `pages/` → Page-level components (auth, dashboard, etc.)
  - `utils/` → Helper utilities (icon map, etc.)
  - `assets/` → Static assets (images, icons, etc.)

Entry files:
- `App.jsx` → Main React app
- `index.css` → Global styles

---

### Backend (`backend/`)
- **Framework:** Node.js + Express
- **Database:** MongoDB
- **Folders:**
  - `config/` → Database configuration
  - `controllers/` → Route logic
    - `authController/` → Authentication handling
    - `multer/` → File upload (profile pic)
    - `TransactionController.js` → Transactions CRUD
  - `middleware/` → Middleware functions (auth, validation, etc.)
  - `models/` → Mongoose models (`authdb`, `Transactiondb`)
  - `routes/` → Express routes (`authRoute`, `transaction`)
  - `public/uploads/` → Uploaded files storage

Entry files:
- `server.js` → Express app entry point
- `.env` → Environment variables
- `package.json` → Backend dependencies & scripts

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/prem1kr/Finance-Trakers.git
cd 
````

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create a **`.env`** file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=
CLIENT_SECRET=
```

Run the backend:

```bash
npm start
```

### 3️⃣ Setup Frontend

Frontend .env
```env
VITE_GOOGLE_CLIENT_ID=

```
```bash
cd frontend
npm install
npm run dev
```

---

## 📌 Features

* 🔐 User Authentication (JWT-based login/signup)
* 💸 Add, edit, delete **income & expenses**
* 📊 Track **transactions** with categories
* 📂 File upload support (profile pictures, receipts, etc.)
* 🎨 Dark/Light Theme support (via `ThemeContext`)
* 📱 Responsive UI with React

---

## 🛠️ Tech Stack

**Frontend:**

* React
* Vite
* Tailwind CSS 
* Context API & Custom Hooks

**Backend:**

* Node.js
* Express
* MongoDB + Mongoose
* Multer (file uploads)
* JWT (Authentication)
* Google Authentication
---

## 📡 API Endpoints (Quick Overview)

### Auth

* `POST /api/auth/signup` → Register new user
* `POST /api/auth/login` → Login user
* `GET /api/auth/user` → Get user profile

### Transactions

* `POST /api/Transaction/add` → Add transaction
* `GET /api/Transaction/get` → Get all transactions
* `PUT /api/Transaction/edit/:id` → Update transaction
* `DELETE /api/Transaction/delete/:id` → Delete transaction

---


## 📌 Future Enhancements

* 📈 Analytics & Charts for expenses/income trends
* 📤 Export data (pdf)

---

## 👨‍💻 Author
 
  name = Prem kumar


