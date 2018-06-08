import { AppModule } from '../app.module';
import { Injectable, Injector } from '@angular/core';



/**
 Utility class that allows to get an instance of any OcInfra service from anywhere the OcInfraModule is available
 @class
 */

@Injectable()
export class AppInjector {

  /**
   Contructor of AppInjector
   @class AppInjector
   @classdesc Represents a AppInjector
   @param {Injector} injector for injecting services or components of FWK
   */
  constructor(private injector: Injector) {
    if (!AppModule.AppInjector) {
        AppModule.AppInjector = injector;
    }
  }

}
