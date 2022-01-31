import { Data1, Data2, Data3 } from './../../shared/models/data.interface';
import { ModalComponent } from './../../shared/components/modal/modal.component';
import {
  ColumnsTable,
  Columns,
  TableResponse,
} from './../../shared/models/table.interface';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { TableService } from '@app/shared/service/table.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, MatSortable } from '@angular/material/sort';

import { Observable, tap } from 'rxjs';
import { DataService } from '@app/shared/service/data.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Data1Service } from '@app/shared/service/data1.service';
import { Data2Service } from '@app/shared/service/data2.service';
import { Data3Service } from '@app/shared/service/data3.service';
import Swal from 'sweetalert2';

export interface dataTC {
  T1C1: number;
  T1C2: string;
  T1C3?: number;
  T1C4?: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  structureTableSelect: any;
  dataTable: any;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [];
  dinamicColumns: ColumnsTable[] = [];
  tableSelected = 1;
  globalFilter = '';
  public filteredBanks$: Observable<any> | undefined;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  public bankFilterCtrl: FormControl = new FormControl();

  constructor(
    private tableService: TableService,
    private data1Service: Data1Service,
    private data2Service: Data2Service,
    private data3Service: Data3Service,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.getTableSelect();
    this.getData(this.tableSelected);
  }
  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Items por pagina';
    this.paginator._intl.getRangeLabel = this.initRagenLabelPaginator();
  }

  ngAfterViewInit(): void {
    this.initDataTable(1000);

    this.changeDetectorRefs.detectChanges();
  }

  initDataTable(time: number) {
    setTimeout(() => {
      this.dinamicColumns = [];
      this.displayedColumns = [];

      const data = this.dataTable;
      for (const j in data) {
        const header = data[j].header;
        const columnAux: ColumnsTable = data[j];
        this.dinamicColumns.push(columnAux);
        this.displayedColumns.push(header);
      }

      this.displayedColumns.push('actions');
      this.dataSource.paginator = this.paginator;
      this.sort.sort({
        id: this.displayedColumns[0],
        start: 'desc',
      } as MatSortable);

      this.dataSource.sort = this.sort;
    }, time);
  }

  getTableSelect() {
    this.tableService.triggerTable.subscribe((data) => {
      this.structureTableSelect = data;
      this.tableSelected = data.data.id;
      this.dataTable = data.data.columns;
      this.getData(this.tableSelected);
      this.initDataTable(0);
    });
  }
  openDialog(row?: Data1 | Data2 | Data3) {
    const config = {
      data: {
        message: row ? 'Editar Registro' : 'Nuevo Registro',
        content: row,
        columns: this.dinamicColumns,
        table: this.tableSelected,
      },
    };

    const dialog = this.dialog.open(ModalComponent, config);
    dialog.afterClosed().subscribe((res) => {
      this.getData(this.tableSelected);
    });
  }
  onNewRegister() {
    this.openDialog();
  }
  onEditRegister(row:any){
    this.openDialog(row);
  }
  onDelete(row: any) {
    switch (this.tableSelected) {
      case 1:
        this.onDelete1(row);
        break;
      case 2:
        this.onDelete2(row);
        break;
      case 3:
        this.onDelete3(row);
        break;

      default:
        break;
    }
  }

  getData1() {
    this.data1Service
      .getAll()
      .pipe(
        tap((res) => {
          this.dataSource.data = res;
        })
      )
      .subscribe();
  }
  getData2() {
    this.data2Service
      .getAll()
      .pipe(
        tap((res) => {
          this.dataSource.data = res;
        })
      )
      .subscribe();
  }
  getData3() {
    this.data3Service
      .getAll()
      .pipe(
        tap((res) => {
          this.dataSource.data = res;
        })
      )
      .subscribe();
  }
  onDelete1(row: any): void {
    const id = row[Object.keys(row)[0]];
    Swal.fire({
      title: 'Esta seguro(a) de eliminar este registro?',
      text: '¡No podra revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1E3C8B',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.data1Service.deleteOne(id).subscribe((res) => {
          if (res) {
            this.getData(this.tableSelected);
            Swal.fire({
              icon: 'success',
              confirmButtonColor: '#1E3C8B',
              confirmButtonText: 'Aceptar',
              title: 'Solicitud Exitosa',
              padding: '2em',
              showConfirmButton: true,
            }).then(() => {});
          }
        });
      }
    });
  }
  onDelete2(row: any): void {
    const id = row[Object.keys(row)[0]];
    Swal.fire({
      title: 'Esta seguro(a) de eliminar este registro?',
      text: '¡No podra revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1E3C8B',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Si, Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.data2Service.deleteOne(id).subscribe((res) => {
          if (res) {
            this.getData(this.tableSelected);
            Swal.fire({
              icon: 'success',
              confirmButtonColor: '#1E3C8B',
              confirmButtonText: 'Aceptar',
              title: 'Solicitud Exitosa',
              padding: '2em',
              showConfirmButton: true,
            }).then(() => {});
          }
        });
      }
    });
  }
  onDelete3(row: any): void {
    const id = row[Object.keys(row)[0]];
    Swal.fire({
      title: 'Esta seguro(a) de eliminar este registro?',
      text: '¡No podra revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1E3C8B',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Si, Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.data3Service.deleteOne(id).subscribe((res) => {
          if (res) {
            this.getData(this.tableSelected);
            Swal.fire({
              icon: 'success',
              confirmButtonColor: '#1E3C8B',
              confirmButtonText: 'Aceptar',
              title: 'Solicitud Exitosa',
              padding: '2em',
              showConfirmButton: true,
            }).then(() => {});
          }
        });
      }
    });
  }

  getData(numberTable: number) {
    switch (numberTable) {
      case 1:
        this.getData1();
        break;
      case 2:
        this.getData2();
        break;
      case 3:
        this.getData3();
        break;

      default:
        break;
    }
  }

  // tslint:disable-next-line: typedef
  initRagenLabelPaginator() {
    return (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;
      return `${startIndex + 1} – ${endIndex} de ${length}`;
    };
  }
  // Get Uniqu values from columns to build filter
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
