/**
 * User: soalin
 * Date: 2020/11/14
 * Time: 14:38
 * Desc:
 */
import { Models } from '@rematch/core';
import { house } from '@/store/house';

export interface RootModel extends Models<RootModel> {
  house: typeof house;
}

export const models: RootModel = { house };
