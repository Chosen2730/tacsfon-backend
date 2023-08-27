const router = require("express").Router();
const { login, register, getAllUsers } = require("../controllers/auth");

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/all_users", getAllUsers);

module.exports = router;
