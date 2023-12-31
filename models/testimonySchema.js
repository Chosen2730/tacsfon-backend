const { model, Schema } = require("mongoose");

const TestimonySchema = new Schema(
  {
    name: String,
    unit: String,
    email: String,
    tel: String,
    isRead: { type: Boolean, required: true, default: false },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
    content: {
      type: String,
      required: [true, "Please give the details of your testimony"],
      minLength: 5,
      maxLength: 200,
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      imageId: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = model("Testimony", TestimonySchema);
