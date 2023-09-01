const uploadImage = require("../middlewares/imageUploader");
const Event = require("../models/eventSchema");
const Exco = require("../models/executiveSchema");
const Gallery = require("../models/gallerySchema");
const Testimony = require("../models/testimonySchema");
const Blog = require("../models/blogPost");
const { StatusCodes } = require("http-status-codes");

const getAllImages = async (req, res) => {
  const images = await Gallery.find().sort({ createdAt: -1 });
  if (images.length < 1) {
    res.status(StatusCodes.OK).json({ msg: "No image found", images });
    return;
  }
  res.status(StatusCodes.OK).json({ images, total: images.length });
};

const getAllEvents = async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });
  if (events.length < 1) {
    res.status(StatusCodes.OK).json({ msg: "No event found", events });
    return;
  }
  res.status(StatusCodes.OK).json({ events, total: events.length });
};

const getAllTestimony = async (req, res) => {
  const testimony = await Testimony.find({ status: "approved" }).sort({
    createdAt: -1,
  });
  if (testimony.length < 1) {
    res.status(StatusCodes.OK).json({ msg: "No testimony found", testimony });
    return;
  }
  res.status(StatusCodes.OK).json({ testimony, total: testimony.length });
};

const getAllExco = async (req, res) => {
  const excos = await Exco.find().sort({ createdAt: -1 });
  if (excos.length < 1) {
    res.status(StatusCodes.OK).json({ msg: "No Exco found", excos });
    return;
  }
  res.status(StatusCodes.OK).json({ excos, total: excos.length });
};

const createTestimony = async (req, res) => {
  const { content } = req.body;
  if (!content) {
    throw new BadRequestError("Please enter your testimony details");
  }
  if (content.length < 5) {
    throw new BadRequestError("Details are too short");
  }
  if (content.length > 200) {
    throw new BadRequestError("Details are too long");
  }
  let data = { ...req.body };
  if (req.files?.image) {
    const { public_id, secure_url } = await uploadImage(req, "testimonies");
    data = { ...req.body, image: { imageId: public_id, url: secure_url } };
  }
  const testimony = await Testimony.create({ ...data });
  res.status(StatusCodes.CREATED).json({ testimony });
};

const getAllBlogPost = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const blogs = await Blog.find({ status: "publish" })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  if (blogs.length < 1) {
    return res
      .status(StatusCodes.OK)
      .json({ msg: "No blog post at the moment", blogs });
  }
  res.status(StatusCodes.OK).json({ blogs });
};

const getBlogPost = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findOne({ _id: id });
  if (!blog) {
    throw new BadRequestError("Blog post does not exist");
  }
  res.status(StatusCodes.OK).json({ blog });
};

module.exports = {
  getAllEvents,
  getAllExco,
  getAllImages,
  getAllTestimony,
  createTestimony,
  getAllBlogPost,
  getBlogPost,
};
