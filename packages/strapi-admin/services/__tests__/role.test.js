'use strict';

const _ = require('lodash');
const roleService = require('../role');

describe('Role', () => {
  describe('create', () => {
    test('Creates a role', async () => {
      const dbCreate = jest.fn(role => Promise.resolve(role));

      global.strapi = {
        query: () => ({ create: dbCreate }),
      };

      const input = { name: 'super_admin', description: "Have all permissions. Can't be delete" };

      const createdRole = await roleService.create(input);

      expect(dbCreate).toHaveBeenCalled();
      expect(createdRole).toStrictEqual(input);
    });
  });
  describe('fetch', () => {
    test('Fetches a role', async () => {
      const role = {
        id: 1,
        name: 'super_admin',
        description: "Have all permissions. Can't be delete",
      };
      const dbFindOne = jest.fn(({ id }) => Promise.resolve(_.find([role], { id })));

      global.strapi = {
        query: () => ({ findOne: dbFindOne }),
      };

      const fetchedRole = await roleService.fetch({ id: role.id });

      expect(dbFindOne).toHaveBeenCalled();
      expect(fetchedRole).toStrictEqual(role);
    });
  });
});