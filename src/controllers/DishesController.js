const knex = require("../database/knex");
const AppError = require("../utils/AppError");

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

    return response.json();
  }

  async update(request, response) {
    const { name, description, price, category, ingredients } = request.body;
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("dish not found");
    }

    dish.name = name ?? dish.name;
    dish.description = description ?? dish.description;
    dish.price = price ?? dish.price;
    dish.category = category ?? dish.category;

    await knex("dishes").where({ id }).update({
      name: dish.name,
      description: dish.description,
      price: dish.price,
      category: dish.category,
    });

    if (ingredients) {
      await knex("ingredients").where({ dish_id: id }).del();

      const newIngredients = ingredients.map((ingredientName) => ({
        dish_id: id,
        name: ingredientName,
      }));

      await knex("ingredients").insert(newIngredients);
    }

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();
    const ingredients = await knex("ingredients")
      .where({ dish_id: id })
      .orderBy("name");

    if (!dish) {
      throw new AppError("Dish not found!");
    }

    return response.json({
      ...dish,
      ingredients,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("dishes").where({ id }).delete();

    return response.json();
  }
}

module.exports = DishesController;
