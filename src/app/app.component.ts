import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu'
import { SharedUiBlocksModule } from './shared/ui-blocks.module';
import { SharedDataService } from './services/shared.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SharedUiBlocksModule,
    PanelModule,
    MenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private primengConfig: PrimeNGConfig, public sharedDataervice: SharedDataService) { }
  items: { label?: string; icon?: string; separator?: boolean }[] = [];
  toggle: boolean = false;

  ngOnInit() {

    this.primengConfig.ripple = true;
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
      },
    ];
  }
}
