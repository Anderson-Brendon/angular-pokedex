import { Routes } from '@angular/router';
import { PokemonIndexComponent } from './pokemon-index/pokemon-index.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

export const routes: Routes = [
  {path:'',
  redirectTo:'pokemon-list/first/0/18',
  pathMatch: 'full'},
  {path: 'pokemon-details/:id',
  component: PokemonDetailsComponent,
  title: 'Pokémon details'},
  {path: 'pokemon-list/:generation/:offset/:limit',
  component: PokemonIndexComponent,
  title: 'Pokémon list'}
];
