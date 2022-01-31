import { UtilService } from './shared/service/util.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SSTestFE';

  opened = false

  constructor(private utilServ: UtilService){}

  ngOnInit(): void {
      this.utilServ.sidebarOpened$.subscribe(res =>{
        this.opened = res
      })
  }
}
