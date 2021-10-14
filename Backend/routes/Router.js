const express = require("express");

const {
  addUser,
  listData,
  editUser,
  getUserById,
  UserDelete,
} = require("../controllers/db.controllers");

const { signup, login, verifyEmail,forgotPassword,verifyOtp } = require("../controllers/Authentication");

const router = express.Router();

router.post("/add", addUser);
router.get("/userData", listData);
router.put("/:id", editUser);
router.get("/:id", getUserById);
router.delete("/:id", UserDelete);
router.post("/signup", signup);
router.post("/login", login);
router.put("/verify/password/:email", verifyEmail);
router.post('/forgot/password',forgotPassword)
router.post('/verifyotp',verifyOtp)

module.exports = router;
