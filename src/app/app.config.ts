import { ApplicationConfig } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
//pq nao precisa importar o service aqui nem o activatedroute

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(), RouterModule]
};
