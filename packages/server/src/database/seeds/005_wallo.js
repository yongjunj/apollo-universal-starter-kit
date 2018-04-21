// import bcrypt from 'bcryptjs';
import { truncateTables } from '../../sql/helpers';

export async function seed(knex, Promise) {
  // const tables = [
  //   'refresh_token',
  //   'push_token',
  //   'notification',
  //   'device',
  //   'permission',
  //   'community',
  //   'location',
  //   'device_type',
  //   'wallo_user',
  // ];

  // await Promise.mapSeries(tables.map((t) => truncateTables(knex, Promise, [t])));

  ////////

  // await truncateTables(knex, Promise, ['subscription']);

  await truncateTables(knex, Promise, ['refresh_token']);
  await truncateTables(knex, Promise, ['push_token']);
  await truncateTables(knex, Promise, ['notification']);
  await truncateTables(knex, Promise, ['device']);
  await truncateTables(knex, Promise, ['permission']);
  await truncateTables(knex, Promise, ['community']);
  await truncateTables(knex, Promise, ['location']);
  await truncateTables(knex, Promise, ['device_type']);
  await truncateTables(knex, Promise, ['wallo_user']);

  const [userId] = await knex('wallo_user')
    .returning('id')
    .insert({
      name: 'John Doe',
      phone: '123-456-7890',
      locale: 'US',
      timezone: 'PDT',
    });

  const [deviceTypeId] = await knex('device_type')
    .returning('id')
    .insert({
      capabilities: 'some capabilities',
    });

  const [locationId] = await knex('location')
    .returning('id')
    .insert({
      address: 'some capabilities',
      lat: 37.681462,
      lon: -122.49013,
    });

  const [communityId] = await knex('community')
    .returning('id')
    .insert({
      image_url: 'https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      name: 'some community',
      guest_max: 255,
      user_max: 255,
      location_id: locationId,
    });

  const [permissionId] = await knex('permission')
    .returning('id')
    .insert({
      role: 'SADMIN',
      tag: 'some tag',
      user_id: userId,
      parent_id: null,
      community_id: communityId,
    });

  await knex('device')
    .returning('id')
    .insert({
      helium_id: 'some-helium-id',
      name: 'some device',
      state: null,
      device_type_id: deviceTypeId,
      community_id: communityId,
      permission_id: permissionId,
      location_id: locationId,
    });

  await knex('notification')
    .returning('id')
    .insert({
      iot: false,
      action: false,
      manage: true,
      permission_id: permissionId,
    });

  await knex('push_token')
    .returning('id')
    .insert({
      value: 'some-push-token',
      user_id: userId,
    });

  await knex('refresh_token')
    .returning('id')
    .insert({
      last_used: knex.fn.now(),
      meta: 'some meta',
      user_id: userId,
    });
}
