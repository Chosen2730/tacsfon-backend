//
const { StatusCodes } = require("http-status-codes");
const Exco = require("../models/executiveSchema");
const { BadRequestError } = require("../errors");
const { NotFoundError } = require("../errors");
// GET ALL EXCO
const getAllExco = async (req, res) => {
  const excos = await Exco.find().sort({ createdAt: -1 });
  if (excos.length < 1) {
    res.status(StatusCodes.OK).json({ msg: "No Exco found", excos });
    return;
  }
  res.status(StatusCodes.OK).json({ excos, total: excos.length });
};

// CREATE NEW EXCO
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

// UPDATE AN EXISTING EXCO DETAILS
const updateExco = async (req, res) => {
  const { id } = req.params;
  const exco = await Exco.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!exco) {
    throw new BadRequestError("Exco not found");
  }
  res.status(200).json({ exco, msg: "Exco details successfully updated" });
};

// DELETE AN EXCO
const deleteExco = async (req, res) => {
  const { id } = req.params;
  const exco = await Exco.findOneAndRemove({ _id: id });
  if (!exco) {
    throw new BadRequestError(`Exco with id ${id} not found`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: `Exco with id ${id} has been deleted successfully` });
};

// SEARCH AN EXCO WITH NAME OR POSITION
const searchExco = async (req, res) => {
  const exco = await Exco.aggregate([
    {
      $search: {
        index: "tacsfon",
        text: {
          query: req.params.search,
          path: {
            wildcard: "*",
          },
        },
      },
    },
  ]);
  if (!exco) {
    throw new NotFoundError(`Exco not found`);
  }
  res.status(StatusCodes.OK).json({ exco });
};

module.exports = { getAllExco, createExco, updateExco, deleteExco, searchExco };
