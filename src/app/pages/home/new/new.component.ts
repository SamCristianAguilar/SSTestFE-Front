import { Data1Service } from '@app/shared/service/data1.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnsTable } from '@app/shared/models/table.interface';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Data1, Data2, Data3 } from '@app/shared/models/data.interface';
import { Data2Service } from '@app/shared/service/data2.service';
import { Data3Service } from '@app/shared/service/data3.service';
import Swal from 'sweetalert2';
import { ModalComponent } from '@app/shared/components/modal/modal.component';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit {
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

  newRegisterForm = this.fb.group({
    inputs: this.fb.array([]),
  });

  private isNumber = /^[0-9]+$/;
  private isOnlyLetter = '[a-zA-Z ]{2,254}';

  ngOnInit(): void {}

  addNew() {
    const data = this.newRegisterForm.value.inputs[0];
    console.log(data);
    const tableSelected = this.dataInputs.table;
    switch (tableSelected) {
      case 1:
        this.addData1(data);
        break;
      case 2:
        this.addData2(data);
        break;
      case 3:
        this.addData3(data);
        break;

      default:
        break;
    }
    // console.log(data);
  }

  addData1(data: Data1) {
    if (data.T1C3) {
      data.T1C3 = Number(data.T1C3);
    }
    this.dataServ1.createOne(data).subscribe((res) => {
      if (res) {
        Swal.fire({
          icon: 'success',
          confirmButtonColor: '#1E3C8B',
          confirmButtonText: 'Aceptar',
          title: 'Registro Exitoso',
          padding: '2em',
          showConfirmButton: true,
        });
        this.dialogRef.close();
      }
    });
  }
  addData2(data: Data2) {
    if (data.T2C3) {
      data.T2C3 = Number(data.T2C3);
    }
    if (data.T2C5) {
      data.T2C5 = Number(data.T2C5);
    }

    this.dataServ2.createOne(data).subscribe((res) => {
      if (res) {
        Swal.fire({
          icon: 'success',
          confirmButtonColor: '#1E3C8B',
          confirmButtonText: 'Aceptar',
          title: 'Registro Exitoso',
          padding: '2em',
          showConfirmButton: true,
        });
        this.dialogRef.close();
      }
    });
  }
  addData3(data: Data3) {
    
    this.dataServ3.createOne(data).subscribe((res) => {
      if (res) {
        Swal.fire({
          icon: 'success',
          confirmButtonColor: '#1E3C8B',
          confirmButtonText: 'Aceptar',
          title: 'Registro Exitoso',
          padding: '2em',
          showConfirmButton: true,
        });
        this.dialogRef.close();
      }
    });
  }

  get inputs() {
    return this.newRegisterForm.get('inputs') as FormArray;
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
    console.log(columns);
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
}
