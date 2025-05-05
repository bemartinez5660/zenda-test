import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {map, take} from 'rxjs';

const QUERY = gql`
    {
      characters {
        info {
          count
          pages
          next
          prev
        }
        results {
          id
          name
          status
          species
          type
          gender
          origin {
            id
            name
            type
          }
          location {
            id
            name
            type
            residents {
              id
              name
            }
          }
          image
          episode {
            id
            name
            air_date
          }
          created
        }
      }
    }
`;

@Injectable({
  providedIn: 'root'
})
export class CharacterGraphqlService {

  constructor(
    private readonly _apollo: Apollo
  ) {
  }

  getAllCharacters(){
    return this._apollo.watchQuery<any>({
      query: QUERY,
    }).valueChanges
      .pipe(
        take(1),
        map(({data}) => {
          return data.characters;
        })
      );
  }
}
