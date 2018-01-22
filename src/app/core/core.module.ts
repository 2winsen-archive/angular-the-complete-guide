import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from './../app-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule {

}
