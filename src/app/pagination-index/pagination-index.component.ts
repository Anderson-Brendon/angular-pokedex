import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { PokeApiService } from '../poke-api.service';
import { RouterLink } from '@angular/router';
import { OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination-index',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pagination-index.component.html',
  styleUrl: './pagination-index.component.css'
})

export class PaginationIndexComponent implements OnChanges,OnInit {

  @Input() generationToPaginate! : keyof typeof this.pokeApi.pokemonGeneration;

  totalOfPokemons!: number;

  pagesNumber: Array<number> = [];

  offset!: number;

  constructor(public pokeApi : PokeApiService){}

  ngOnInit(): void {
    this.calculatePagination();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes){
      this.calculatePagination();
    }
  }

  calculatePagination(){
    this.pagesNumber = [];
     this.totalOfPokemons = this.pokeApi.pokemonGeneration[this.generationToPaginate].limit ;
     this.offset = this.pokeApi.pokemonGeneration[this.generationToPaginate].offset;
     let numberOfPages : any = Number(this.totalOfPokemons) / this.pokeApi.pokemonsPerPage;
     console.log('totalpoke=>',this.totalOfPokemons,'pokePage=>', this.pokeApi.pokemonsPerPage)
     for(let i: number = 0; i < numberOfPages; i++){
       this.pagesNumber.push(i);
     }
     console.log('numero paginas',this.pagesNumber)
   }
}
