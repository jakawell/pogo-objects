import { IPokemonTemplate } from '../src/interfaces';
import { PokemonSpecies } from '../src/models';
import fakeGameMaster from './mockData/mockGameMaster.json';

test('should import all fields properly from raw game master', () => {
  const species = PokemonSpecies.fromRawMaster((fakeGameMaster.itemTemplates[0] as unknown as IPokemonTemplate), 3, 'Venusaur');
  expect(species.pokedexNumber).toBe(3);
  expect(species.speciesId).toBe('VENUSAUR');
  expect(species.form).toBe('NORMAL');
  expect(species.id).toBe('VENUSAUR_NORMAL');
  expect(species.speciesName).toBe('Venusaur');
  expect(species.types).toEqual(['GRASS', 'POISON']);
  expect(species.fastMoves).toEqual(['RAZOR_LEAF_FAST', 'VINE_WHIP_FAST']);
  expect(species.chargeMoves).toEqual(['SLUDGE_BOMB', 'PETAL_BLIZZARD', 'SOLAR_BEAM', 'RETURN', 'FRUSTRATION']);
  expect(species.baseAttack).toBe(198);
  expect(species.baseDefense).toBe(189);
  expect(species.baseStamina).toBe(190);
});

test('should import all fields properly from parsed', () => {
  const species = PokemonSpecies.fromParsed({
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
  } as PokemonSpecies);
  expect(species.pokedexNumber).toBe(3);
  expect(species.speciesId).toBe('VENUSAUR');
  expect(species.form).toBe('NORMAL');
  expect(species.id).toBe('VENUSAUR_NORMAL');
  expect(species.speciesName).toBe('Venusaur');
  expect(species.types).toEqual(['GRASS', 'POISON']);
  expect(species.fastMoves).toEqual(['RAZOR_LEAF_FAST', 'VINE_WHIP_FAST']);
  expect(species.chargeMoves).toEqual(['SLUDGE_BOMB', 'PETAL_BLIZZARD', 'SOLAR_BEAM', 'RETURN', 'FRUSTRATION']);
  expect(species.baseAttack).toBe(198);
  expect(species.baseDefense).toBe(189);
  expect(species.baseStamina).toBe(190);
});

test('should import default form for formless species', () => {
  const species = PokemonSpecies.fromRawMaster((fakeGameMaster.itemTemplates[9] as unknown as IPokemonTemplate), 3, 'Venusaur');
  expect(species.speciesId).toBe('GIRATINA');
  expect(species.form).toBe('NORMAL');
  expect(species.isFormless).toBe(true);
});

test('should import shadow/purified species', () => {
  const shadowSpec = PokemonSpecies.fromRawMaster((fakeGameMaster.itemTemplates[8] as unknown as IPokemonTemplate), 3, 'Venusaur');
  expect(shadowSpec.speciesId).toBe('BLASTOISE');
  expect(shadowSpec.form).toBe('NORMAL');

  const purifiedSpec = PokemonSpecies.fromRawMaster((fakeGameMaster.itemTemplates[2] as unknown as IPokemonTemplate), 3, 'Venusaur');
  expect(purifiedSpec.speciesId).toBe('VENUSAUR');
  expect(purifiedSpec.form).toBe('NORMAL');
});
