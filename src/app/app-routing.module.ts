import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';
import { PeoplePageComponent } from './routes/people-page/people-page.component';
import { PlanetPageComponent } from './routes/planet-page/planet-page.component';
import { PersonComponent } from './components/person/person.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'people',
    pathMatch: 'full',
  },
  {
    path: 'people',
    component: PeoplePageComponent,
  },
  {
    path: 'planets/:planetId',
    component: PlanetPageComponent,
  },
];

const extraOptions: ExtraOptions = {
  useHash: false,
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 75],
};

@NgModule({
  imports: [RouterModule.forRoot(routes, extraOptions)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
