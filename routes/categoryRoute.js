const { getAll, addCategory, deleteCategory, editCategory, getById, addAllCategories } = require("../controllers/categoryController")
const requireLogin = require("../middlewares/requireLogin")

const router = require("express").Router()

router.get("/add-all", addAllCategories)
router.get("/all", requireLogin, getAll)
router.post("/new", requireLogin, addCategory)
router.delete("/:id", requireLogin, deleteCategory)
router.patch("/:id", requireLogin, editCategory)
router.get("/:id", requireLogin, getById)

module.exports = router