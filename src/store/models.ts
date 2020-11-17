/**
 * User: soalin
 * Date: 2020/11/14
 * Time: 14:38
 * Desc:
 */
import { Models } from '@rematch/core';
import { house } from '@/store/house';
import { user } from '@/store/user';

export interface RootModel extends Models<RootModel> {
  house: typeof house;
  user: typeof user;
}

export const models: RootModel = { house, user };
