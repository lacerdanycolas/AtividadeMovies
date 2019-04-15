import { EditComponent } from './../../edit/edit.component';
import { MovieService } from '../movie.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  
  constructor(private _activatedRoute: ActivatedRoute,
    private _movieService: MovieService, private _router: Router ) { }
    
  movie = {}

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      let id = params['id'];

      this._movieService.getById(id)
        .subscribe(response => {
          this.movie = response;
          
          
        })

       
    });

    
  }

  

  openEditar(movie){
    this._router.navigate(['detalhes/:id/editar', movie.id])
  }

}
