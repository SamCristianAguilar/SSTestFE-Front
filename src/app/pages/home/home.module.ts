import { EditComponent } from './edit/edit.component';
import { ModalComponent } from './../../shared/components/modal/modal.component';
import { MaterialModule } from './../../material.module';
import { TableService } from './../../shared/service/table.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NewComponent } from './new/new.component';

@NgModule({
  declarations: [HomeComponent, NewComponent, EditComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [NewComponent, EditComponent],
})
export class HomeModule {
  constructor(private tableService: TableService) {}
}
