import {Character} from '../models/character.model';
import {Location} from '../../../core/models/location.model';
import {Episode} from '../../../core/models/episode.model';

export interface CharacterState{
  characters: Character[];
  loading: boolean;
  error: string | null;
  selectedCharacter: Character | null;
  selectedCharacterAsFavorite: Character | null;

  episode: Episode | null;
  episodeError: string | null;

  resident: Character | null;
  residentError: string | null;

  location: Location | null;
  locationUrl: string | null,
  locationError: string | null;

  loadingDetails: boolean;
}
