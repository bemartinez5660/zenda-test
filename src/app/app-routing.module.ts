import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './core/components/home/home.component';
import {NotFoundPageComponent} from './shared/components/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'character-details/:id', loadChildren: () => import('../app/core/core.module').then(m => m.CoreModule),
  },
  {
    path: 'not-found', component: NotFoundPageComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
