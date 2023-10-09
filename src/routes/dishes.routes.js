const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const DishesController = require("../controllers/DishesController");
const DishImageController = require("../controllers/DishImageController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyAuthorization = require("../middlewares/verifyAuthorization");

const dishesRoutes = Router();
const dishesController = new DishesController();
const dishImageController = new DishImageController();

const upload = multer(uploadConfig.MULTER);

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post(
  "/image",
  verifyAuthorization(["admin"]),
  upload.single("image"),
  dishImageController.create
);
dishesRoutes.post("/", verifyAuthorization(["admin"]), dishesController.create);
dishesRoutes.put(
  "/:id",
  verifyAuthorization(["admin"]),
  dishesController.update
);
dishesRoutes.delete(
  "/:id",
  verifyAuthorization(["admin"]),
  dishesController.delete
);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.patch(
  "/:dish_id/image",
  verifyAuthorization(["admin"]),
  upload.single("image"),
  dishImageController.update
);

module.exports = dishesRoutes;
