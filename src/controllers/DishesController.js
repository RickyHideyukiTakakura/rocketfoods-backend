const knex = require("../database/knex");

class DishesController {
  async create(request, response) {
    const { name, description, price, category, ingredients } = request.body;

    const [dish_id] = await knex("dishes").insert({
      name,
      description,
      price,
      category,
    });

    const ingredientInsert = ingredients.map((name) => {
      return {
        dish_id,
        name,
      };
    });

    await knex("ingredients").insert(ingredientInsert);

    response.json();
  }
}

module.exports = DishesController;
