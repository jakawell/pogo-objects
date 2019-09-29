import {
  IGameMaster,
  IItemTemplate,
  IPokemonTemplate,
  IPveMoveTemplate,
  IPvpMoveTemplate,
  Move,
  Pokemon,
  PokemonSpecies,
} from '../src';
import fakeGameMaster from './mockData/mockGameMaster.json';

test('should export all interfaces and models', () => {
  expect({} as IGameMaster).toBeDefined();
  expect({} as IItemTemplate).toBeDefined();
  expect({} as IPokemonTemplate).toBeDefined();
  expect({} as IPveMoveTemplate).toBeDefined();
  expect({} as IPvpMoveTemplate).toBeDefined();
  expect(new Move()).toBeDefined();
  expect(new Pokemon(
    PokemonSpecies.fromRawMaster((fakeGameMaster.itemTemplates[0] as unknown as IPokemonTemplate), 3, 'Venusaur'),
    1, 1, 1, 1)).toBeDefined();
});
