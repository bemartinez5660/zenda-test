import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CharacterState} from './character.state';

export const selectCharacterState = createFeatureSelector<CharacterState>('characters');

export const characterSelected = createSelector(
  selectCharacterState,
  (state: CharacterState) => state?.selectedCharacter,
);

export const selectCharacters = createSelector(
  selectCharacterState,
  (state: CharacterState) => state?.characters,
);

export const selectSelectedCharacter = createSelector(
  selectCharacterState,
  (state: CharacterState) => state?.selectedCharacter,
);

export const selectLoading = createSelector(
  selectCharacterState,
  (state: CharacterState) => state?.loading,
);

export const selectError = createSelector(
  selectCharacterState,
  (state: CharacterState) => state?.error,
);

export const selectedCharacterAsFavorite = createSelector(
  selectCharacterState,
  (state: CharacterState) => state?.selectedCharacterAsFavorite,
)

export const selectResident = createSelector(
  selectCharacterState,
  (state: CharacterState) => state?.resident,
)

export const selectLoadingDetails = createSelector(
  selectCharacterState,
  (state: CharacterState) => state?.loadingDetails,
);

export const selectLocation = createSelector(
  selectCharacterState,
  (state: CharacterState) => state?.location,
);

export const selectEpisode = createSelector(
  selectCharacterState,
  (state: CharacterState) => state?.episode,
);

