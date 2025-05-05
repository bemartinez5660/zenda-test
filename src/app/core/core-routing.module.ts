import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CharacterDetailsPageComponent} from './components/character-details-page/character-details-page.component';

const routes: Routes = [
  {
    path: "", component: CharacterDetailsPageComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
