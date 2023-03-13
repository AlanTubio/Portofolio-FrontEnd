import { getNgModuleById, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { ExperienciasComponent } from './componentes/experiencias/experiencias.component';
import { EstudiosComponent } from './componentes/estudios/estudios.component';
import { HabilidadesComponent } from './componentes/habilidades/habilidades.component';
import { IdiomaComponent } from './componentes/idioma/idioma.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonaService } from './service/persona.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AcercaDeComponent,
    ExperienciasComponent,
    EstudiosComponent,
    HabilidadesComponent,
    IdiomaComponent,
    ProyectosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [PersonaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
