import { Table, TableResponse } from './../../models/table.interface';
import { TableService } from './../../service/table.service';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Output() uploaded = new EventEmitter<any>();
  selectedValue: number = 0;
  tableSelect: string = '';

  tables: Table[] = [];
  constructor(private tableService: TableService) {}

  ngOnInit(): void {
    this.tableService.getTables().subscribe((res)=>{
      this.tables = res
      this.selectedValue = this.tables[0].id;
      this.sendDataTable(this.selectedValue);
    });
   
  }

  selectTable(option: any) {
    this.sendDataTable(option);
  }
  sendDataTable(id: number) {
    this.tableService.triggerTable.emit({
      data: this.tables.find((element) => element.id === this.selectedValue),
    });
  }
}
