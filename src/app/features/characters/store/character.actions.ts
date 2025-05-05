import {createAction, props} from '@ngrx/store';
import {Character} from '../models/character.model';
import {CharacterParams} from '../../../core/models/character-filter';
import {Location} from '../../../core/models/location.model';
import {Episode} from '../../../core/models/episode.model';


export const CHARACTERS_ACTION_TYPES = {
  LOAD_CHARACTERS: '[Characters] Load Characters',
  LOAD_CHARACTERS_SUCCESS: '[Characters] Load Characters Success',
  LOAD_CHARACTERS_FAILURE: '[Characters] Load Characters Failure',

  SELECT_CHARACTER: '[Characters] Select Character',
  DESELECT_CHARACTER: '[Characters] Deselect Character',

  SELECT_CHARACTER_AS_FAVORITE: '[Characters] Select Character as favorite',
  DESELECT_CHARACTER_AS_FAVORITE: '[Characters] Deselect Character as favorite',

  LOAD_CHARACTER_DETAILS: '[Characters] Load Character Details',

  LOAD_RESIDENT: '[Characters] Load Resident',
  LOAD_RESIDENT_SUCCESS: '[Characters] Load Resident Success',
  LOAD_RESIDENT_FAILURE: '[Characters] Load Resident Failure',

  LOAD_EPISODE: '[Characters] Load Episode',
  LOAD_EPISODE_SUCCESS: '[Characters] Load Episode Success',
  LOAD_EPISODE_FAILURE: '[Characters] Load Episode Failure',

  LOAD_LOCATION: '[Characters] Load Location',
  LOAD_LOCATION_SUCCESS: '[Characters] Load Location Success',
  LOAD_LOCATION_FAILURE: '[Characters] Load Location Failure',
}

export const loadCharacters = createAction(CHARACTERS_ACTION_TYPES.LOAD_CHARACTERS,
  props<{ payload?: CharacterParams }>()
);

export const loadCharactersSuccess = createAction(
  CHARACTERS_ACTION_TYPES.LOAD_CHARACTERS_SUCCESS,
  props<{ payload: Character[] }>()
);

export const loadCharactersFailure = createAction(CHARACTERS_ACTION_TYPES.LOAD_CHARACTERS_FAILURE,
  props<{ payload: string }>()
);

export const selectCharacterAsFavorite = createAction(
  CHARACTERS_ACTION_TYPES.SELECT_CHARACTER_AS_FAVORITE,
  props<{ payload: Character }>()
);

export const deselectCharacterAsFavorite = createAction(
  CHARACTERS_ACTION_TYPES.DESELECT_CHARACTER_AS_FAVORITE,
  props<{ payload: Character }>()
);

export const selectCharacter = createAction(
  CHARACTERS_ACTION_TYPES.SELECT_CHARACTER,
  props<{ payload: Character }>(),
)

export const deselectCharacter = createAction(
  CHARACTERS_ACTION_TYPES.DESELECT_CHARACTER
);

export const loadCharacterDetails= createAction(
  CHARACTERS_ACTION_TYPES.LOAD_CHARACTER_DETAILS,
  props<{ payload: Character }>(),
);

// LOAD RESIDENT
export const loadResident = createAction(
  CHARACTERS_ACTION_TYPES.LOAD_RESIDENT,
  props<{ payload: Location }>()
);
export const loadResidentSuccess = createAction(
  CHARACTERS_ACTION_TYPES.LOAD_RESIDENT_SUCCESS,
  props<{ payload: Character }>()
);
export const loadResidentFailure = createAction(
  CHARACTERS_ACTION_TYPES.LOAD_RESIDENT_FAILURE,
  props<{ error: string }>()
);

// LOAD EPISODE
export const loadEpisode = createAction(
  CHARACTERS_ACTION_TYPES.LOAD_EPISODE,
  props<{ payload: string }>()
);

export const loadEpisodeSuccess = createAction(
  CHARACTERS_ACTION_TYPES.LOAD_EPISODE_SUCCESS,
  props<{ payload: Episode }>()
);

export const loadEpisodeFailure = createAction(
  CHARACTERS_ACTION_TYPES.LOAD_EPISODE_FAILURE,
  props<{ error: string }>()
);

// LOAD LOCATION
export const loadLocation = createAction(
  CHARACTERS_ACTION_TYPES.LOAD_LOCATION,
  props<{ payload: string }>()
)

export const loadLocationSuccess = createAction(
  CHARACTERS_ACTION_TYPES.LOAD_LOCATION_SUCCESS,
  props<{ payload: Location }>()
)

export const loadLocationFailure = createAction(
  CHARACTERS_ACTION_TYPES.LOAD_LOCATION_FAILURE,
  props<{ error: string }>()
)
