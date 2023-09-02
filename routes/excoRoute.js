const router = require("express").Router();
const {
  getAllExco,
  createExco,
  updateExco,
  deleteExco,
  searchExco,
} = require("../controllers/exco");
const {
  getDashboardDetails,
  getEnquiries,
  deleteEnquiry,
  getExcoProfile,
  updateExcoProfile,
  updateEnquiry,
  createExcoProfile,
} = require("../controllers/admin");

router.route("/").get(getAllExco).post(createExco);
router.route("/search/:search").post(searchExco);
router.route("/:id").patch(updateExco).delete(deleteExco);
router.get("/dashboard", getDashboardDetails);
router.get("/enquiries", getEnquiries);
router.route("/enquiries/:id").delete(deleteEnquiry).patch(updateEnquiry);
router.route("/profile").get(getExcoProfile).post(createExcoProfile);
router.patch("/profile/:id", updateExcoProfile);

module.exports = router;
