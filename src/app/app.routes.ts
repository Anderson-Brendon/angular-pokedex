import { Routes } from '@angular/router';
import { PokemonIndexComponent } from './pokemon-index/pokemon-index.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

export const routes: Routes = [
  {path: '',
    component: PokemonIndexComponent,
    title: 'Pokemon list'
  },
  {path: '/pokemon-details/:id',
  component: PokemonDetailsComponent,
  title: 'Pokemon details'},
];
