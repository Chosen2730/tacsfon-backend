const { model, Schema } = require("mongoose");

const TestimonySchema = new Schema(
  {
    imageUrl: String,
    name: String,
    title: String,
    email: String,
    tel: String,
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
    content: {
      type: String,
      required: [true, "Please give the details of your testimony"],
      minLength: 5,
      maxLength: 60,
    },
  },
  { timestamps: true }
);

module.exports = model("Testimony", TestimonySchema);
