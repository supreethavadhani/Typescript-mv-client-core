import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { MaterialModule } from "./material.module";
import { FormModule } from "./mv-form-core/form.module";
import { MVComponentsModule } from "../mv-core/mv-components/mv-components.module";

@NgModule({
    declarations:[],
    imports: [MaterialModule, MVComponentsModule],
    providers:[ReactiveFormsModule,FormsModule,CommonModule],
    exports: [MaterialModule, MVComponentsModule]
})

export class MVClientCoreAppModule {}