const knex = require("../database/knex");

class TagsController {
  async index(request, response) {
    const { dish_id } = request.params;

    const ingredients = await knex("ingredients").where({ dish_id });

    return response.json(ingredients);
  }
}

module.exports = TagsController;
