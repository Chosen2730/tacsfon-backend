const router = require("express").Router();
const {
  getAllExco,
  createExco,
  updateExco,
  deleteExco,
  searchExco,
} = require("../controllers/exco");
const { getDashboardDetails } = require("../controllers/admin");

router.route("/").get(getAllExco).post(createExco);
router.route("/search/:search").post(searchExco);
router.route("/:id").patch(updateExco).delete(deleteExco);
router.get("/dashboard", getDashboardDetails);

module.exports = router;
