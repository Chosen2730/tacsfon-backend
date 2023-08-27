const router = require("express").Router();

const {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

router.route("/event").get(getAllEvents).post(createEvent);
router.route("/event/:id").patch(updateEvent).delete(deleteEvent);

module.exports = router;
