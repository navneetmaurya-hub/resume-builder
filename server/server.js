// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDB from "./configs/db.js";
// import userRouter from "./routes/userRoutes.js";
// import resumeRouter from "./routes/resumeRoutes.js";
// import aiRouter from "./routes/aiRoutes.js";

// const app = express();

// const PORT = process.env.PORT || 3000;

// // Database connection
// await connectDB();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Sample route
// app.get("/", (req, res) => res.send("Server is live...🚀"));

// // Routes
// app.use("/api/users", userRouter);
// app.use("/api/resumes", resumeRouter);
// app.use("/api/ai", aiRouter);

// // Start the server
// app.listen(PORT, () => {
//   console.log(
//     `Server is running on port ${PORT} => http://localhost:${PORT} 🍽️`
//   );
// });

import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";

import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ DB connection (safe handling)
connectDB()
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => {
    console.error("MongoDB Connection Failed ❌", err);
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// Test route
app.get("/api", (req, res) => {
  res.json({ message: "API is working 🚀" });
});

// ================= FRONTEND SERVE (PRODUCTION) =================
const __dirname = path.resolve();

// only serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/dist/index.html"));
  });
}

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});