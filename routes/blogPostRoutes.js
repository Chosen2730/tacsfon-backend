const {
  getAllBlogPost,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = require("../controllers/blogPost");
const router = require("express").Router();

router.route("/").get(getAllBlogPost).post(createBlogPost);
router
  .route("/:id")
  .get(getBlogPost)
  .patch(updateBlogPost)
  .delete(deleteBlogPost);

module.exports = router;
