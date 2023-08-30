const { model, Schema } = require("mongoose");
const EventSchema = new Schema(
  {
    name: {
      type: String,
      equired: true,
    },
    date: { type: String, required: true },
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
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Event", EventSchema);
