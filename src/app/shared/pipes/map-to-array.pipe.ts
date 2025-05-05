import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: false,
  name: 'mapToArray'
})
export class MapToArrayPipe implements PipeTransform {
  transform(map: Map<string, number>): { key: string, value: number }[] {
    return Array.from(map, ([key, value]) => ({key, value}));
  }
}
