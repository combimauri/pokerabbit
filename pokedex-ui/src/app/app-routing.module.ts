import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PokemonComponent } from './home/pokedex/pokemon/pokemon.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'pokemon/:pokenumber',
    component: PokemonComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
