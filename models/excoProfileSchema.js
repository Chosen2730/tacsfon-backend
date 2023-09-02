const { model, Schema } = require("mongoose");

const ExcoProfileSchema = new Schema({
  president_name: String,
  theme: String,
  year: String,
  president_speech: String,
  image: {
    imageId: String,
    url: String,
  },
});

module.exports = model("ExcoProfile", ExcoProfileSchema);
