const { Router } = require("express");
const DishesController = require("../controllers/DishesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyAuthorization = require("../middlewares/verifyAuthorization");

const dishesRoutes = Router();
const dishesController = new DishesController();

dishesRoutes.use(ensureAuthenticated);

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

module.exports = dishesRoutes;
