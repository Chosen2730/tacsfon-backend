const { model, Schema } = require("mongoose");

const GallerySchema = new Schema(
  {
    imageUrl: {
      type: String,
      required: [true, "Please enter a valid image URL"],
    },
  },
  { timestamps: true }
);

module.exports = model("Gallery", GallerySchema);
