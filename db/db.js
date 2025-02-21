const mongoose = require("mongoose");

const mongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("DB Connected");
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
};

// Export correctly
module.exports = mongo;
