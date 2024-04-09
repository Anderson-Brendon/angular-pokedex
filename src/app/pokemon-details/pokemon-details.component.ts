import { Component, OnDestroy } from '@angular/core';
import { PokeApiService } from '../poke-api.service';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css'
})

export class PokemonDetailsComponent implements OnInit,OnDestroy{

  pokemonDetails: any;

  pokemonDescription: any;

  pokemonId!: number | string;

  paramObserver!: Subscription;

  constructor(private pokeApi : PokeApiService, private activatedRoute: ActivatedRoute){
    this.getPokemonName();
    this.onParamsChange();
  }

  ngOnInit(){
    this.getPokemonDetails();

    this.getPokemonDescription();
  }

  ngOnDestroy(): void {
    this.paramObserver.unsubscribe();
  }

  getPokemonName(){
    this.pokemonId = this.activatedRoute.snapshot.params['id'];
  }

  getPokemonDetails(){
    this.pokeApi.requestPokemonDetails(this.pokemonId).subscribe(response => {
      this.pokemonDetails = response;}
    )
   }

   getPokemonDescription(){
    this.pokeApi.requestPokemonDescription(this.pokemonId).subscribe(response => {
      this.pokemonDescription = response;
    })
   }

   onParamsChange(){
    this.paramObserver = this.activatedRoute.params.subscribe(()=>{
      this.getPokemonName();
      this.getPokemonDetails();
      this.getPokemonDescription();
    })
   }

}
