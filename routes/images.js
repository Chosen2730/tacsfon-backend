const router = require("express").Router();

const {
  getAllImages,
  createImage,
  deleteImage,
} = require("../controllers/gallery");

router.route("/gallery").get(getAllImages).post(createImage);
router.route("/gallery/:id").delete(deleteImage);

module.exports = router;
