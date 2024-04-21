import { Component, OnDestroy } from '@angular/core';
import { PokeApiService } from '../poke-api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css'
})

export class PokemonDetailsComponent implements OnInit,OnDestroy{

  pokemonDetails: any = null;

  pokemonSpecies: any = null;

  evolutionChain = <any>[];

  pokemonId!: number | string;

  paramObserver!: Subscription;

  isLoading: boolean = true;

  pokemonDescription! : string;

  http404: any;

  constructor(private pokeApi : PokeApiService, private activatedRoute: ActivatedRoute){
  }

  ngOnInit(){
    this.onParamsChange();
  }

  ngOnDestroy(): void {
    this.paramObserver.unsubscribe();
  }

  getPokemonData(){
    this.cleanData();
    this.getPokemonFromParam();
    this.getPokemonDetails();
    this.pokeApi.requestPokemonSpecies(this.pokemonId).subscribe((response) =>{
      this.pokemonSpecies = response;
      this.pokemonDescription = this.pokeApi.findFlavorText(this.pokemonSpecies.flavor_text_entries);
      this.pokeApi.requestEvolutionChain(this.pokemonSpecies.evolution_chain.url).subscribe((async (response) => {
        let evoNames = this.extractEvoChainNames(response);
        for(let i = 0; i < evoNames.length;i++){
          let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoNames[i]}`);
          let pokemon = await data.json();
          this.evolutionChain.push(pokemon);
        }
      }));
    })
  }

  getPokemonFromParam(){
    this.pokemonId = this.activatedRoute.snapshot.params['id'];
  }

  getPokemonDetails(){
    this.pokeApi.requestPokemonDetails(this.pokemonId).subscribe(response => {
      this.pokemonDetails = response;},(error) =>{
        this.http404 = error.status === 404;
      }
    )
   }

   getPokemonSpecies(){
    this.pokeApi.requestPokemonSpecies(this.pokemonId).subscribe(response => {
      this.pokemonSpecies = response;
    })
   }

   onParamsChange(){
    this.paramObserver = this.activatedRoute.params.subscribe(()=>{
      this.getPokemonData();
    })
   }

   extractEvoChainNames(evoChainData: any){
      let i: number = 0;
      let evoNames = <any>[];
      evoNames.push(evoChainData.chain.species.name)
      while (i < evoChainData.chain.evolves_to.length){
        evoNames.push(evoChainData.chain.evolves_to[i].species.name)
        if(evoChainData.chain.evolves_to[i].evolves_to.length > 0){
          evoNames.push(evoChainData.chain.evolves_to[i].evolves_to[0].species.name)
        }
        i++
      };
      console.log('extract',evoNames);
      return evoNames;
   }

   changeLoadStatus(){
    this.isLoading = false
   }

   cleanData(){
    this.pokemonDetails = null;
    this.pokemonSpecies = null;
    this.evolutionChain = [];
   }
}
