import { ModalComponent } from './shared/components/modal/modal.component';
import { HomeModule } from './pages/home/home.module';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from './shared/components/sidebar/sidebar.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, ModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SidebarModule,
    HomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  entryComponents:[ModalComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
