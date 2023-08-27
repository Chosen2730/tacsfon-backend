//
const { StatusCodes } = require("http-status-codes");
const Exco = require("../models/executiveSchema");
const { BadRequestError } = require("../errors");
const getAllExco = async (req, res) => {
  const excos = await Exco.find().sort({ createdAt: -1 });
  if (excos.length < 1) {
    res.status(StatusCodes.OK).json({ msg: "No Exco found" });
    return;
  }

  res.status(StatusCodes.OK).json({ excos, total: excos.length });
};

const createExco = async (req, res) => {
  const { name, title, tel, category, imageUrl } = req.body;
  if (!name || !title || !tel || !category || !imageUrl) {
    throw new BadRequestError(
      "Please provide a name, title, phone number, category and valid image url"
    );
  }
  const exco = await Exco.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ exco });
};

const updateExco = async (req, res) => {
  res.send("update an exco");
};
const deleteExco = async (req, res) => {
  res.send("update an exco");
};
const searchExco = async (req, res) => {
  res.send("update an exco");
};

module.exports = { getAllExco, createExco, updateExco, deleteExco, searchExco };
