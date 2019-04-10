import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieComponent } from './movie/movie.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'filmes', component: MovieComponent,
  },
  {
    path: 'filmes/detalhes/:id', component: MovieDetailComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'filmes' },
  { path: '**', redirectTo: 'filmes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
