import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  ReactiveFormsModule
} from '@angular/forms';

import {
  MaterialModule
} from '../material.module';
import {
  MvTextboxComponent
} from './mv-textbox/component';
import {
  MvDropDownComponent
} from './mv-dropdown/component';

@NgModule({
  declarations: [
    MvTextboxComponent,
    MvDropDownComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MvTextboxComponent,
    MvDropDownComponent
  ]
})
export class MVComponentsModule {}
