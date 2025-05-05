import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './modules/material/material.module';
import {MapToArrayPipe} from './pipes/map-to-array.pipe';
import {NotFoundPageComponent} from './components/not-found-page/not-found-page.component';


@NgModule({
  declarations: [
    MapToArrayPipe,
    NotFoundPageComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    MapToArrayPipe,
  ]
})
export class SharedModule {
}
