const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const http = require("http");
const { Server } = require("socket.io");
const socketHandler = require("./sockets/socketHandler"); //  socket logic
const searchRoutes = require("./routes/searchRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));

// Static files for uploads
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// chat routes
app.use("/api/search", searchRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

// ===== SOCKET.IO SETUP =====
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

socketHandler(io);

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
