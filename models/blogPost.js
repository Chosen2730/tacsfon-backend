const { model, Schema } = require("mongoose");

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true, maxLength: 100 },
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
    content: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["publish", "save"],
    },
  },
  { timestamps: true }
);

module.exports = model("Blog", BlogSchema);
