import {
  IGameMaster,
  IItemTemplate,
  IPokemonTemplate,
  IPveMoveTemplate,
  IPvpMoveTemplate,
  Move,
  Pokemon,
  PokemonSpecies,
  GameMasterImportResult,
  ImportFromSaved,
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
  expect(new GameMasterImportResult(new Map(), new Map())).toBeDefined();
});

test('should import data from parsed game master', () => {
  const imported = ImportFromSaved({
    species: {
      VENUSAUR_NORMAL: {
        pokedexNumber: 3,
        speciesId: 'VENUSAUR',
        form: 'NORMAL',
        speciesName: 'Venusaur',
        types: ['GRASS', 'POISON'],
        fastMoves: ['RAZOR_LEAF_FAST', 'VINE_WHIP_FAST'],
        chargeMoves: ['SLUDGE_BOMB', 'PETAL_BLIZZARD', 'SOLAR_BEAM', 'RETURN', 'FRUSTRATION'],
        baseAttack: 198,
        baseDefense: 189,
        baseStamina: 190,
        isFormless: false,
      },
    },
    moves: {
      WRAP: {
        id: 'WRAP',
        type: 'NORMAL',
        pveStats: {
          power: 60,
          energyDelta: -33,
          castTime: 2900,
        },
        pvpStats: {
          power: 60,
          energyDelta: -45,
          turns: 1,
        },
      },
    },
  });
  expect(imported.speciesList.size).toBe(1);
  expect((imported.speciesList.get('VENUSAUR_NORMAL') as PokemonSpecies).speciesId).toBe('VENUSAUR');
  expect(imported.movesList.size).toBe(1);
  expect((imported.movesList.get('WRAP') as Move).pvpStats.energyDelta).toBe(-45);
});
