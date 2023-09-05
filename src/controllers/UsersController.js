const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");

class UsersController {
  async create(request, response) {
    const { name, is_admin = false, email, password } = request.body;

    const checkUserExists = await knex("users").where({ email }).first();

    if (checkUserExists) {
      throw new AppError("User already exists!");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      is_admin,
      password: hashedPassword,
    });

    return response.json();
  }

  async update(request, response) {
    const { name, email, is_admin, password, old_password } = request.body;
    const { id } = request.params;

    const user = await knex("users").where({ id }).first();

    if (!user) {
      throw new AppError("User not found!");
    }

    if (email) {
      const userWithUpdatedEmail = await knex("users").where({ email }).first();

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== parseInt(id)) {
        throw new AppError("Email already used!");
      }
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.is_admin = is_admin ?? user.is_admin;

    if (password && !old_password) {
      throw new AppError("Please fill old password");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Old password does not match");
      }

      user.password = await hash(password, 8);
    }

    await knex("users").where({ id }).update({
      name: user.name,
      email: user.email,
      password: user.password,
      is_admin: user.is_admin,
      updated_at: knex.fn.now(),
    });

    return response.json();
  }
}

module.exports = UsersController;
