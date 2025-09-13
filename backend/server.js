import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/authRoute/auth.js";
import googleRouter from "./routes/authRoute/googleAuth.js";
import cors from "cors";
import TransactionRouter from "./routes/transaction/Transaction.js";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(cors({
  origin: "https://personal-finance-traker.onrender.com", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// API routes
app.use("/api", authRouter);
app.use("/api", googleRouter);
app.use("/api", TransactionRouter);

// Serve uploads folder statically
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

// Serve React build files statically
app.use(express.static(path.join(process.cwd(), "frontend", "dist")));

// Catch-all route to serve index.html for SPA client-side routing
app.get("frontend/dist/index.html", (req, res) => {
  res.sendFile(path.join(process.cwd(), "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDb();
});
