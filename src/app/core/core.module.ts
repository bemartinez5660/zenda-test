import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationBarComponent} from './components/navigation-bar/navigation-bar.component';
import {SharedModule} from '../shared/shared.module';
import {CharactersModule} from '../features/characters/characters.module';
import {HomeComponent} from './components/home/home.component';
import {CharacterDetailsPageComponent} from './components/character-details-page/character-details-page.component';
import {CoreRoutingModule} from './core-routing.module';


@NgModule({
  declarations: [
    NavigationBarComponent,
    HomeComponent,
    CharacterDetailsPageComponent,
  ],
  exports: [
    NavigationBarComponent,
    CharacterDetailsPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CharactersModule,
    CoreRoutingModule,
  ]
})
export class CoreModule {
}
