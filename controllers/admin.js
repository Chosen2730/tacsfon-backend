const Event = require("../models/eventSchema");
const Exco = require("../models/executiveSchema");
const Gallery = require("../models/gallerySchema");
const Testimony = require("../models/testimonySchema");
const Blog = require("../models/blogPost");
const ExcoProfile = require("../models/excoProfileSchema");
const { StatusCodes } = require("http-status-codes");
const Contact = require("../models/contactSchema");
const { BadRequestError } = require("../errors");
const uploadImage = require("../middlewares/imageUploader");
const deleteImage = require("../middlewares/deleteImage");

const getDashboardDetails = async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 }).limit(6);
  const exco = await Exco.find().sort({ createdAt: -1 }).lean().limit(6);
  const gallery = await Gallery.find().sort({ createdAt: -1 }).limit(6);
  const testimony = await Testimony.find().sort({ createdAt: -1 }).limit(2);
  const blog = await Blog.find().sort({ createdAt: -1 }).limit(2);
  const profile = await ExcoProfile.find();
  const enquiries = await Contact.find()
    .sort({
      createdAt: -1,
    })
    .limit(5);
  const details = {
    exco,
    gallery,
    testimony,
    events,
    blog,
    profile: profile[0],
    enquiries,
  };
  if (details === null) {
    res.status(StatusCodes.OK).json({ msg: "No details at the moment" });
    return;
  }
  res.status(StatusCodes.OK).json({ details, total: details.length });
};

const getEnquiries = async (req, res) => {
  const enquiries = await Contact.find().sort({
    createdAt: -1,
  });
  if (!enquiries || enquiries.length < 1) {
    throw new BadRequestError("No enquiries at the moment");
  }
  res.status(StatusCodes.OK).json({ enquiries });
};

const deleteEnquiry = async (req, res) => {
  const { id } = req.params;
  const enquiry = await Contact.findOneAndDelete({ _id: id });
  if (!enquiry) {
    throw new BadRequestError("No enquiry found");
  }
  res.status(StatusCodes.OK).json({ msg: "Enquiry deleted successfully" });
};
const updateEnquiry = async (req, res) => {
  const { id } = req.params;
  const enquiry = await Contact.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!enquiry) {
    throw new BadRequestError("No enquiry found");
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "Enquiry updated successfully", enquiry });
};

const getExcoProfile = async (req, res) => {
  const exco = await ExcoProfile.find();
  if (!exco) {
    res.status(StatusCodes.OK).json({ msg: "No Exco found" });
    return;
  }
  res.status(StatusCodes.OK).json({ details: exco[0] });
};

// CREATE NEW EXECTIVE PROFILE
const createExcoProfile = async (req, res) => {
  const oldExcoProfile = await ExcoProfile.findOne();
  if (oldExcoProfile) {
    throw new BadRequestError(
      "Exco profile already exists, you cannot create another one"
    );
  }
  const { public_id, secure_url } = await uploadImage(req, "exco");
  const excoProfile = await ExcoProfile.create({
    ...req.body,
    image: { url: secure_url, imageId: public_id },
  });
  res.status(StatusCodes.CREATED).json({ excoProfile });
};

// UPDATE AN EXISTING EXCO PROFILE
const updateExcoProfile = async (req, res) => {
  const { id } = req.params;
  let update = req.body;

  const exco = await ExcoProfile.findOne({ _id: id });

  if (!exco) {
    throw new BadRequestError(`Profile not found`);
  }
  const {
    image: { imageId },
  } = exco;

  const newImg = req.files?.image;
  if (newImg) {
    if (imageId) {
      await deleteImage(imageId);
    }
    const { public_id, secure_url } = await uploadImage(req, "exco");
    update = { ...req.body, image: { url: secure_url, imageId: public_id } };
  }

  const newExco = await ExcoProfile.findOneAndUpdate({ _id: id }, update, {
    new: true,
  });

  res
    .status(200)
    .json({ newExco, msg: "Profile details successfully updated" });
};

module.exports = {
  getDashboardDetails,
  getEnquiries,
  deleteEnquiry,
  getExcoProfile,
  updateExcoProfile,
  createExcoProfile,
  updateEnquiry,
};
