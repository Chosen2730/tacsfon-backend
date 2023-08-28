const router = require("express").Router();
const {
  getAllExco,
  createExco,
  updateExco,
  deleteExco,
  searchExco,
} = require("../controllers/exco");
const { getDashboardDetails } = require("../controllers/admin");

router.route("/exco").get(getAllExco).post(createExco);
router.route("/exco/search/:search").post(searchExco);
router.route("/exco/:id").patch(updateExco).delete(deleteExco);
router.get("/dashboard", getDashboardDetails);

module.exports = router;
