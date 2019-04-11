import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'filmes', loadChildren: './movie/movie.module#MovieModule' },
  { path: 'series', loadChildren: './serie/serie.module#SerieModule' },
  { path: '', pathMatch: 'full', redirectTo: 'filmes' },
  { path: '**', redirectTo: 'filmes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
