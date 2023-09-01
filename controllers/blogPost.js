const Blog = require("../models/blogPost");
const { BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const uploadImage = require("../middlewares/imageUploader");
const deleteImage = require("../middlewares/deleteImage");

const getAllBlogPost = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const blogs = await Blog.find()
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

const createBlogPost = async (req, res) => {
  const { title, summary, content, status } = req.body;
  if (!title || !summary || !content || !status) {
    throw new BadRequestError(
      "title, summary, content and status are required"
    );
  }
  if (summary.length > 50) {
    throw new BadRequestError("summary should not be more than 50 characters");
  }
  const { public_id, secure_url } = await uploadImage(req, "blogs");
  const blog = await Blog.create({
    ...req.body,
    image: { url: secure_url, imageId: public_id },
  });
  res.status(StatusCodes.CREATED).json({ blog });
};

const updateBlogPost = async (req, res) => {
  const { id } = req.params;
  let update = req.body;
  const blog = await Blog.findOne({ _id: id });

  if (!blog) {
    throw new BadRequestError(`Blog post not found`);
  }

  const {
    image: { imageId },
  } = blog;

  const newImg = req.files?.image;
  if (newImg) {
    if (imageId) {
      await deleteImage(imageId);
    }
    const { public_id, secure_url } = await uploadImage(req, "blogs");
    update = { ...req.body, image: { url: secure_url, imageId: public_id } };
  }

  const newBlog = await Blog.findOneAndUpdate({ _id: id }, update, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ newBlog, msg: "blog update succesful" });
};

const deleteBlogPost = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findOne({ _id: id });

  if (!blog) {
    throw new BadRequestError(`blog not found`);
  }
  const {
    image: { imageId },
  } = blog;
  if (imageId) {
    await deleteImage(imageId);
  }
  await Blog.findOneAndDelete({ _id: id });
  res.status(StatusCodes.OK).json({ msg: `blog post deleted successfully` });
};

module.exports = {
  getAllBlogPost,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
