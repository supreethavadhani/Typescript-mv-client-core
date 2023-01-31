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
import { MvTextareaComponent } from './mv-textarea/component';
import { MvFormGeneratorComponent } from './mv-form-generator/component';
import { MvCheckboxComponent } from './mv-checkbox/component';
import { MvDatePickerComponent } from './mv-datepicker/component';
import { MvPrimaryButtonComponent } from './mv-primary-button/component';
import { MvTableComponent } from './mv-table/component';

@NgModule({
  declarations: [
    MvTextboxComponent,
    MvDropDownComponent,
    MvTextareaComponent,
    MvFormGeneratorComponent,
    MvCheckboxComponent,
    MvDatePickerComponent,
    MvPrimaryButtonComponent,
    MvTableComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MvTextboxComponent,
    MvDropDownComponent,
    MvTextareaComponent,
    MvFormGeneratorComponent,
    MvCheckboxComponent,
    MvDatePickerComponent,
    MvPrimaryButtonComponent,
    MvTableComponent
  ]
})
export class MVComponentsModule {}
