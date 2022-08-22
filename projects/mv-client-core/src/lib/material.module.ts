import {
    NgModule
} from '@angular/core';
import {
    MatFormFieldModule
} from '@angular/material/form-field';
import {
    MatInputModule
} from '@angular/material/input';

const materialModules = [
    MatFormFieldModule,
    MatInputModule,
];

@NgModule({
    imports: [
        ...materialModules
    ],
    exports: [
        ...materialModules
    ]
})

export class MaterialModule {}