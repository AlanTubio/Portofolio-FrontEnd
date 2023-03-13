import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';

const routes: Routes = [
  {path:'acerca', component: AcercaDeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
