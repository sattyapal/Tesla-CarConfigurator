import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ModelsService } from './models/models.service';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(),provideRouter(routes),[ModelsService]]
};
