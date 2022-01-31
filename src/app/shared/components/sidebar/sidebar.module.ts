import { UtilService } from './../../service/util.service';
import { MaterialModule } from './../../../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, MaterialModule,FormsModule],
  exports: [SidebarComponent],
  providers:[UtilService]
})
export class SidebarModule {}
