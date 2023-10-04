const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class DishImageController {
  async update(request, response) {
    const { dish_id } = request.params;
    const dishFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const dish = await knex("dishes").where({ id: dish_id }).first();

    if (!dish) {
      throw new AppError("None dish find");
    }

    if (dish.image) {
      await diskStorage.deleteFile(dish.image);
    }

    const filename = await diskStorage.saveFile(dishFilename);

    dish.image = filename;

    await knex("dishes").update(dish).where({ id: dish_id });

    return response.json(dish);
  }
}

module.exports = DishImageController;
