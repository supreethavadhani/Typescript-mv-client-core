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

@NgModule({
  declarations: [
    MvTextboxComponent,
    MvDropDownComponent,
    MvTextareaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MvTextboxComponent,
    MvDropDownComponent,
    MvTextareaComponent
  ]
})
export class MVComponentsModule {}
