import { Component} from '@angular/core';
import { PokeApiService } from '../poke-api.service';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-index',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pokemon-index.component.html',
  styleUrl: './pokemon-index.component.css'
})

export class PokemonIndexComponent implements OnDestroy {

  urlImgPokemon = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png';

  pokemonList : any = [];

  offset!: number;

  limit: number = 10;

  paramsObserver!: Subscription;

  ngOnDestroy(): void {
    this.paramsObserver.unsubscribe();
  }

  constructor(private pokeApi: PokeApiService, private activatedRoute: ActivatedRoute){
    this.captureQueryParams();
    this.getPokemonNameList();
    this.observeOnParamsChange();
  }

  getPokemonNameList(){
    this.pokeApi.requestPokemonList(this.offset, this.limit).subscribe(response => {
      this.pokemonList = response;
      this.pokemonList = this.pokemonList.results;
    })
  }

  captureQueryParams(){
    this.offset = parseInt(this.activatedRoute.snapshot.params['offset']);
    this.limit = parseInt(this.activatedRoute.snapshot.params['limit']);
  }

  observeOnParamsChange(){
    this.paramsObserver = this.activatedRoute.params.subscribe(()=>{
      this.captureQueryParams();
      this.getPokemonNameList();
    })
  }

 }
