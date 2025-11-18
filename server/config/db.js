const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/stoicmeet"
    );
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB ERROR:", err.message);
  }
};

module.exports = connectDB;
