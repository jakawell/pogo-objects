import { PokemonSpecies } from './pokemonSpecies';
import { Move } from './move';

export { PokemonSpecies } from './pokemonSpecies';
export { Move } from './move';
export { Pokemon } from './pokemon';

export class GameMasterImportResult {
  constructor(
    public speciesList: Map<string, PokemonSpecies>,
    public movesList: Map<string, Move>,
  ) {}
}

/**
 * Imports the data from a previously imported game master that was saved as JSON.
 * @param jsonObject The JSON object to import.
 */
export const ImportFromSaved = (jsonObject: any): GameMasterImportResult => new GameMasterImportResult(
  new Map(Object.entries(jsonObject.species)
    .map(([key, value]) => [key, PokemonSpecies.fromParsed(value as PokemonSpecies)])),
  new Map(Object.entries(jsonObject.moves)),
);
