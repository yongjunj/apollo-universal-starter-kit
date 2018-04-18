// knex migration with raw text

// https://github.com/tgriesser/knex/issues/1654
// https://github.com/tgriesser/knex/issues/944

// ---

// bookshelf down't support table autogeneration

// https://github.com/bookshelf/bookshelf/issues/236

// ---

// neither does objection.js

// ---

// sequelize.js does support this, but skeleton project uses knex.js by default

exports.up = function(knex, Promise) {
  const tableCommon = table => {
    table.increments();
    table.timestamps(true, true);
  };

  return Promise.all([
    knex.schema
      // Top level tables
      .createTable('wallo_user', table => {
        tableCommon(table);
        table.text('name').notNullable();
        table.text('phone').notNullable();
        table.text('locale').notNullable();
        table.text('timezone').notNullable();
      })
      .createTable('device_type', table => {
        tableCommon(table);
        table.text('capabilities');
      })
      .createTable('location', table => {
        tableCommon(table);
        table.text('address').notNullable();
        // ref: https://stackoverflow.com/questions/7167604/how-accurately-should-i-store-latitude-and-longitude
        table.float('lat', 9, 6).notNullable();
        table.float('lon', 9, 6).notNullable();
      })
      .createTable('community', table => {
        tableCommon(table);
        table.text('image_url').notNullable();
        table.text('name').notNullable();
        table.integer('guest_max').unsigned();
        table.integer('user_max').unsigned();
        table
          .integer('location_id').unsigned()
          .references('id')
          .inTable('location');
      })
      .createTable('permission', table => {
        tableCommon(table);
        table.text('role').notNullable();
        table.text('tag');
        table.text('guest_token');
        table
          .integer('user_id').unsigned()
          .references('id')
          .inTable('wallo_user')
          .onDelete('CASCADE');
        table
          .integer('parent_id').unsigned()
          .references('id')
          .inTable('permission')
          .onDelete('CASCADE');
        table
          .integer('community_id').unsigned()
          .references('id')
          .inTable('community');
      })
      .createTable('device', table => {
        tableCommon(table);
        table.text('helium_id').notNullable();
        table.text('name').notNullable();
        table.json('state');
        table
          .integer('device_type_id').unsigned()
          .references('id')
          .inTable('device_type');
        table
          .integer('community_id').unsigned()
          .references('id')
          .inTable('community');
        table
          .integer('permission_id').unsigned()
          .references('id')
          .inTable('permission');
        table
          .integer('location_id').unsigned()
          .references('id')
          .inTable('location');
      })
      .createTable('notification', table => {
        tableCommon(table);
        table.boolean('action');
        table.boolean('iot').notNullable();
        table.boolean('manage').notNullable();
        table
          .integer('permission_id').unsigned()
          .references('id')
          .inTable('permission')
          .onDelete('CASCADE');
      })
      .createTable('push_token', table => {
        tableCommon(table);
        table.text('value');
        table
          .integer('user_id').unsigned()
          .references('id')
          .inTable('wallo_user')
          .onDelete('CASCADE');
      })
      .createTable('refresh_token', table => {
        tableCommon(table);
        table.timestamp('last_used');
        table.text('meta');
        table
          .integer('user_id').unsigned()
          .references('id')
          .inTable('wallo_user')
          .onDelete('CASCADE');
      })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('refresh_token'),
    knex.schema.dropTable('push_token'),
    knex.schema.dropTable('notification'),
    knex.schema.dropTable('device'),
    knex.schema.dropTable('permission'),
    knex.schema.dropTable('community'),
    knex.schema.dropTable('location'),
    knex.schema.dropTable('device_type'),
    knex.schema.dropTable('wallo_user'),
  ]);
};
