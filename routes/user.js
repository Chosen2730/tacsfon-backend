const router = require("express").Router();

const {
  getAllEvents,
  getAllExco,
  getAllImages,
  getAllTestimony,
  createTestimony,
  getAllBlogPost,
  getBlogPost,
  createEnquiry,
  getExcoProfile,
} = require("../controllers/user");

router.get("/events", getAllEvents);
router.get("/excos", getAllExco);
router.get("/gallery", getAllImages);
router.get("/testimony", getAllTestimony);
router.post("/testimony", createTestimony);
router.post("/enquiry", createEnquiry);
router.get("/blog", getAllBlogPost);
router.get("/blog/:id", getBlogPost);
router.get("/excoprofile", getExcoProfile);

module.exports = router;
