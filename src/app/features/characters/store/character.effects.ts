import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CharacterService} from '../../../core/services/character.service';
import * as charactersActions from './character.actions';
import {catchError, exhaustMap, map, mergeMap, of} from 'rxjs';
import {Location} from '../../../core/models/location.model';
import {Character} from '../models/character.model';

@Injectable()
export class CharacterEffects {
  private _loadCharacters$?: any;
  private _loadEpisode$?: any;
  private _loadLocation$?: any;
  private _loadResident$?: any;
  private _loadCharacterDetails$?: any;

  constructor(
    private readonly _actions: Actions,
    private readonly _characterService: CharacterService,
  ) {
    this._loadCharacters$ = createEffect(() => {
      return this._actions.pipe(
        ofType(charactersActions.loadCharacters),
        exhaustMap(({payload}) => this._characterService.getAllCharacters(payload)
          .pipe(
            map(characters => charactersActions.loadCharactersSuccess({payload: characters})),
            catchError((error) => {
              return of(charactersActions.loadCharactersFailure({payload: error?.error?.error}))
            })
          )
        ),
      )
    });

    this._loadLocation$ = createEffect(() =>
      this._actions.pipe(
        ofType(charactersActions.loadLocation),
        exhaustMap(({payload}) => {
          return this._characterService.getByUrl(payload)
            .pipe(
              map((location: Location) => {
                return charactersActions.loadLocationSuccess({payload: location})
              }),
              catchError((error) => {
                  return of(charactersActions.loadLocationFailure({error: error?.error?.error}))
                }
              )
            )
        })
      )
    );

    this._loadResident$ = createEffect(() =>
      this._actions.pipe(
        ofType(charactersActions.loadLocationSuccess),
        exhaustMap(({payload}) => {
          if (payload?.residents?.length && payload?.residents?.length > 0) {
            return this._characterService.getByUrl(payload?.residents[0])
              .pipe(
                map((resident: Character) => {
                  return charactersActions.loadResidentSuccess({payload: resident})
                }),
                catchError((error) => {
                  return of(charactersActions.loadResidentFailure({error: error?.error?.error}))
                })
              )
          } else {
            return of(charactersActions.loadResidentFailure({error: 'No residents found'}));
          }
        })
      )
    );

    this._loadEpisode$ = createEffect(() => {
        return this._actions.pipe(
          ofType(charactersActions.loadEpisode),
          exhaustMap(({payload}) => this._characterService.getByUrl(payload)
            .pipe(
              map(episode => charactersActions.loadEpisodeSuccess({payload: episode})),
              catchError((error) => {
                return of(charactersActions.loadEpisodeFailure({error: error?.error?.error}));
              })
            )
          ),
        )
      }
    );

    this._loadCharacterDetails$ = createEffect(() =>
      this._actions.pipe(
        ofType(charactersActions.loadCharacterDetails),
        mergeMap(({payload}) => {
          const actions: any[] = [];
          if (!!payload?.episode?.[0]) {
            actions.push(charactersActions.loadEpisode({payload: payload.episode[0]}));
          }
          if (!!payload?.location?.url) {
            actions.push(charactersActions.loadLocation({payload: payload?.location?.url}));
          } else {
            actions.push(charactersActions.loadLocationFailure({error: 'No location found'}));
          }
          return actions;
        })
      )
    );
  }
}
