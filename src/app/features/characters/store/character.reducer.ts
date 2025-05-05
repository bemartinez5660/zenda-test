import {CharacterState} from './character.state';
import {createReducer, on} from '@ngrx/store';
import {
  deselectCharacter,
  loadCharacterDetails,
  loadCharacters,
  loadCharactersFailure,
  loadCharactersSuccess,
  loadEpisode,
  loadEpisodeFailure,
  loadEpisodeSuccess,
  loadLocation,
  loadLocationFailure,
  loadLocationSuccess, loadResidentFailure,
  loadResidentSuccess,
  selectCharacter,
  selectCharacterAsFavorite
} from './character.actions';

const initialState: CharacterState = {
  characters: [],
  selectedCharacter: null,
  loading: false,
  error: null,
  selectedCharacterAsFavorite: null,

  location: null,
  locationUrl: null,
  locationError: null,

  resident: null,
  residentError: null,

  episode: null,
  episodeError: null,
  loadingDetails: false,
}

export const characterReducer = createReducer(
  initialState,
  on(loadCharacters, (state: CharacterState) => ({
    ...state,
    loading: true
  })),
  on(loadCharactersSuccess, (state, {payload: characters}) => ({
    ...state,
    characters,
    loading: false,
    error: null,
  })),
  on(loadCharactersFailure, (state, {payload: error}) => (
    {
      ...state,
      loading: false,
      error: error,
    }
  )),
  on(selectCharacterAsFavorite, (state, {payload: favoriteCharacter}) => (
    {
      ...state,
      selectedCharacterAsFavorite: favoriteCharacter
    }
  )),
  on(selectCharacter, (state, {payload: character}) => (
    {
      ...state,
      selectedCharacter: character,
    }
  )),

  on(deselectCharacter, (state) => (
    {
      ...state,
      selectedCharacter: null,
    }
  )),

  // LOAD CHARACTER DETAILS
  on(loadCharacterDetails, (state, {payload: character}) => ({
    ...state,
    selectedCharacter: character,
    loadingDetails: true,
  })),


  // LOAD EPISODE
  on(loadEpisode, (state) => (
    {
      ...state,
      loadingDetails: true,
    }
  )),
  on(loadEpisodeSuccess, (state, {payload: episode}) => (
    {
      ...state,
      episode: episode,
      loadingDetails: false,
    }
  )),
  on(loadEpisodeFailure, (state, {error}) => (
    {
      ...state,
      episodeError: error,
      loadingDetails: false,
    }
  )),

  // LOAD LOCATION
  on(loadLocation, (state, {payload: locationUrl}) => (
    {
      ...state,
      locationUrl: locationUrl,
      loadingDetails: true,
    }
  )),
  on(loadLocationSuccess, (state, {payload: location}) => (
    {
      ...state,
      location: location,
      loadingDetails: false,
    }
  )),
  on(loadLocationFailure, (state, {error}) => ({
    ...state,
    resident: null,
    locationError: error,
    loadingDetails: false,
  })),

  // LOAD RESIDENT
  on(loadResidentSuccess, (state, {payload: resident}) => ({
    ...state,
    resident: resident,
    loadingDetails: false,
  })),
  on(loadResidentFailure, (state, {error}) => ({
    ...state,
    residentError: error,
    loadingDetails: false,
  })),
);
