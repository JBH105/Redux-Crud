const express = require("express");

const {
  addUser,
  listData,
  editUser,
  getUserById,
  UserDelete,
} = require("../controllers/db.controllers");

const router = express.Router();

router.post("/add", addUser);
router.get("/userData", listData);
router.put("/:id", editUser);
router.get("/:id", getUserById);
router.delete("/:id", UserDelete);

module.exports = router;
