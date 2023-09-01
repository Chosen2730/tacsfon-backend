const router = require("express").Router();

const {
  getAllEvents,
  getAllExco,
  getAllImages,
  getAllTestimony,
  createTestimony,
  getAllBlogPost,
  getBlogPost,
} = require("../controllers/user");

router.get("/events", getAllEvents);
router.get("/excos", getAllExco);
router.get("/gallery", getAllImages);
router.get("/testimony", getAllTestimony);
router.post("/testimony", createTestimony);
router.get("/blog", getAllBlogPost);
router.get("/blog/:id", getBlogPost);

module.exports = router;
