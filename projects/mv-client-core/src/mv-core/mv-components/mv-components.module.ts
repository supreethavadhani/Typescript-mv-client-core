import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { MvTextboxComponent } from './mv-textbox/component';
import { MvFieldGeneratorComponent } from './mv-field-generator/component';

@NgModule({
  declarations: [
    MvTextboxComponent,
    MvFieldGeneratorComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports:[
        MvTextboxComponent,
        MvFieldGeneratorComponent
    ]
})
export class MVComponentsModule { }
