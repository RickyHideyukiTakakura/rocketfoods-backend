const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DishesController {
  async create(request, response) {
    const { name, description, price, category, ingredients, image } =
      request.body;

    const [dish_id] = await knex("dishes").insert({
      name,
      description,
      price,
      category,
      image,
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

  async index(request, response) {
    const { search } = request.query;

    let dishesSearch = knex("dishes")
      .select([
        "dishes.id",
        "dishes.name",
        "dishes.description",
        "dishes.image",
        "dishes.category",
        "dishes.price",
      ])
      .leftJoin("ingredients", "dishes.id", "ingredients.dish_id")
      .groupBy("dishes.id");

    if (search) {
      const filterSearch = search.trim();
      dishesSearch.where(function () {
        this.whereLike("dishes.name", `%${filterSearch}%`).orWhereIn(
          "ingredients.name",
          [filterSearch]
        );
      });
    }

    const dishes = await dishesSearch;

    return response.json(dishes);
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("dishes").where({ id }).delete();

    return response.json();
  }
}

module.exports = DishesController;
