/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(t) {
        t.increments('id').unsigned().primary();
        t.string('first_name');
        t.string('lastt_name');
        t.string('email');
        t.string('mobile_number');
        t.string('mobile_code');
        t.string('password');
        t.string('user_type');
        t.timestamps(true,true);     
       
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTable('users');
};
