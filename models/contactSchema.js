const { model, Schema } = require("mongoose");

const ContactShema = new Schema(
  {
    name: { type: String, required: true },
    subject: { type: String, required: true },
    email: { type: String, required: true },
    tel: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["enquiry", "prayer request", "others"],
    },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Contact", ContactShema);
