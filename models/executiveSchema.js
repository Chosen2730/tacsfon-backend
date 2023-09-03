const { model, Schema } = require("mongoose");
const ExecoSchema = new Schema(
  {
    name: { type: String, required: [true, "Please enter a name"], trim: true },
    title: {
      type: String,
      required: [true, "Please enter a title"],
      trim: true,
      unique: true,
    },
    tel: {
      type: String,
      required: [true, "Please enter a valid phone number"],
    },
    image: {
      url: {
        type: String,
        required: [true, "Please enter a valid image url"],
      },
      imageId: {
        type: String,
        required: [true, "Please enter a valid image url"],
      },
    },
    category: { type: String, enum: ["general", "central", "secretariat"] },
  },
  { timestamps: true }
);

module.exports = model("Execo", ExecoSchema);
