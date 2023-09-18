exports.up = (knex) =>
  knex.schema.createTable("dishes", (table) => {
    table.increments("id");
    table.text("name").notNullable();
    table.text("description").notNullable();
    table.text("image").nullable();
    table.text("category").notNullable();
    table.decimal("price").notNullable();
    table.integer("created_at").default(knex.fn.now());
    table.integer("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("dishes");
