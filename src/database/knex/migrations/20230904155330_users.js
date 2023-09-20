exports.up = (knex) =>
  knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.text("name").notNullable();
    table.text("email").notNullable();
    table.text("password").notNullable();
    table
      .enum("role", ["admin", "customer"], {
        useNative: true,
        enumName: "roles",
      })
      .notNullable()
      .defaultTo("customer");
    table.integer("created_at").default(knex.fn.now());
    table.integer("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("users");
