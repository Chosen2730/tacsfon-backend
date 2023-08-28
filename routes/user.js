const router = require("express").Router();

const {
  getAllEvents,
  getAllExco,
  getAllImages,
  getAllTestimony,
  createTestimony,
} = require("../controllers/user");

router.get("/events", getAllEvents);
router.get("/excos", getAllExco);
router.get("/gallery", getAllImages);
router.get("/testimony", getAllTestimony);
router.post("/testimony", createTestimony);

module.exports = router;
