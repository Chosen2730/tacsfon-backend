const router = require("express").Router();

const {
  getAllTestimony,
  createTestimony,
  updateTestimony,
  deleteTestimony,
} = require("../controllers/testimonies");

router.route("/testimony").get(getAllTestimony).post(createTestimony);
router.route("/testimony/:id").patch(updateTestimony).delete(deleteTestimony);

module.exports = router;
