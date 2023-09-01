const Event = require("../models/eventSchema");
const Exco = require("../models/executiveSchema");
const Gallery = require("../models/gallerySchema");
const Testimony = require("../models/testimonySchema");
const Blog = require("../models/blogPost");
const { StatusCodes } = require("http-status-codes");

const getDashboardDetails = async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 }).limit(6);
  const exco = await Exco.find().sort({ createdAt: -1 }).lean().limit(6);
  const gallery = await Gallery.find().sort({ createdAt: -1 }).limit(6);
  const testimony = await Testimony.find().sort({ createdAt: -1 }).limit(2);
  const blog = await Blog.find().sort({ createdAt: -1 }).limit(2);
  const details = { exco, gallery, testimony, events, blog };
  if (details === null) {
    res.status(StatusCodes.OK).json({ msg: "No details at the moment" });
    return;
  }
  res.status(StatusCodes.OK).json({ details, total: details.length });
};

module.exports = { getDashboardDetails };
