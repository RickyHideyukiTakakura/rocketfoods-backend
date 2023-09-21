const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");

class UsersController {
  async create(request, response) {
    const { name, role = "customer", email, password } = request.body;

    const checkUserExists = await knex("users").where({ email }).first();

    if (checkUserExists) {
      throw new AppError("User already exists!");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      role,
      password: hashedPassword,
    });

    return response.json();
  }

  async update(request, response) {
    const { name, email, role, password, old_password } = request.body;
    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("User not found!");
    }

    if (email) {
      const userWithUpdatedEmail = await knex("users").where({ email }).first();

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
        throw new AppError("Email already used!");
      }
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.role = role ?? user.role;

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

    await knex("users").where({ id: user_id }).update({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      updated_at: knex.fn.now(),
    });

    return response.json();
  }
}

module.exports = UsersController;
