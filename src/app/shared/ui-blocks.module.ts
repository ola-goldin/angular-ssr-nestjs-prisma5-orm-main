import { NgModule } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StyleClassModule,
    ButtonModule,
  ], exports: [
    CommonModule,
    StyleClassModule,
    ButtonModule
  ]
})
export class SharedUiBlocksModule { }
