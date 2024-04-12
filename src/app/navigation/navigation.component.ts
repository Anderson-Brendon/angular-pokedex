import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokeApiService} from '../poke-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  constructor(public pokeApi: PokeApiService){
    this.pokemonQuery = this.pokeApi.pokemonGeneration;
  }

  pokemonQuery : typeof this.pokeApi.pokemonGeneration;

  pokemonName: string = '';

}
