const { model, Schema } = require("mongoose");
const EventSchema = new Schema(
  {
    name: {
      type: String,
      equired: true,
    },
    date: { type: Date, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Event", EventSchema);
