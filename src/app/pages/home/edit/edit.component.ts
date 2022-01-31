import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import {
  Data1,
  Data2,
  Data3,
  DataSend1,
  DataSend2,
  DataSend3,
} from '@app/shared/models/data.interface';
import { ColumnsTable } from '@app/shared/models/table.interface';
import { Data1Service } from '@app/shared/service/data1.service';
import { Data2Service } from '@app/shared/service/data2.service';
import { Data3Service } from '@app/shared/service/data3.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  @Input() rowData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataInputs: any,
    private fb: FormBuilder,
    private dataServ1: Data1Service,
    private dataServ2: Data2Service,
    private dataServ3: Data3Service,
    public dialogRef: MatDialogRef<ModalComponent>
  ) {
    this.setFormGroup();
  }

  editRegisterForm = this.fb.group({
    inputs: this.fb.array([]),
  });

  private isNumber = /^[0-9]+$/;
  private isOnlyLetter = '[a-zA-Z ]{2,254}';

  ngOnInit(): void {
    this.initValuesForm();
  }

  editNew() {
    const data = this.editRegisterForm.value.inputs[0];
    const tableSelected = this.dataInputs.table;
    const id = this.dataInputs.content.id;
    switch (tableSelected) {
      case 1:
        this.editData1(id, data);
        break;
      case 2:
        this.editData2(id,data);
        break;
      case 3:
        this.editData3(id,data);
        break;

      default:
        break;
    }
  }

  editData1(id: number, data: DataSend1) {
    if (data.T1C3) {
      data.T1C3 = Number(data.T1C3);
    }
    this.dataServ1.editOne(id, data).subscribe((res) => {
      if (res) {
        Swal.fire({
          icon: 'success',
          confirmButtonColor: '#1E3C8B',
          confirmButtonText: 'Aceptar',
          title: 'Edición Exitosa',
          padding: '2em',
          showConfirmButton: true,
        });
        this.dialogRef.close();
      }
    });
  }
  editData2(id: number,data: DataSend2) {
    if (data.T2C3) {
      data.T2C3 = Number(data.T2C3);
    }
    if (data.T2C5) {
      data.T2C5 = Number(data.T2C5);
    }

    this.dataServ2.editOne(id, data).subscribe((res) => {
      if (res) {
        Swal.fire({
          icon: 'success',
          confirmButtonColor: '#1E3C8B',
          confirmButtonText: 'Aceptar',
          title: 'Edición Exitosa',
          padding: '2em',
          showConfirmButton: true,
        });
        this.dialogRef.close();
      }
    });
  }
  editData3(id: number,data: DataSend3) {
    if (data.T3C1) {
      data.T3C1 = Number(data.T3C1);
    }

    this.dataServ3.editOne(id, data).subscribe((res) => {
      if (res) {
        Swal.fire({
          icon: 'success',
          confirmButtonColor: '#1E3C8B',
          confirmButtonText: 'Aceptar',
          title: 'Edición Exitosa',
          padding: '2em',
          showConfirmButton: true,
        });
        this.dialogRef.close();
      }
    });
  }

  get inputs() {
    return this.editRegisterForm.get('inputs') as FormArray;
  }

  setValidators(type: string): Validators[] {
    const validators = [Validators.required];
    if (type === 'Int') {
      validators.push(Validators.pattern(this.isNumber));
    } else if (type === 'String') {
      validators.push(Validators.pattern(this.isOnlyLetter));
    }
    return validators;
  }
  setFormGroup() {
    const arrayFormGroup = {};
    const columns: ColumnsTable[] = this.dataInputs.columns;
    columns.forEach((element) => {
      Object.defineProperty(arrayFormGroup, element.header, {
        value: ['', this.setValidators(element.dataType)],
        writable: true,
        enumerable: true,
        configurable: true,
      });
    });
    const newInputs = this.fb.group(arrayFormGroup);
    this.inputs.clear();
    this.inputs.push(newInputs);
  }

  private initValuesForm(): void {
    const ptach: any = {};
    this.dataInputs.columns.forEach((element: any) => {
      Object.defineProperty(ptach, element.header, {
        value: this.dataInputs.content[`${element.header}`],
        writable: true,
        enumerable: true,
        configurable: true,
      });
    });
    this.inputs.setValue([ptach]);
  }
}
