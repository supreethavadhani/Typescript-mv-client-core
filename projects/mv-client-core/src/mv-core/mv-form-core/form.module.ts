import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientConfig } from './clientConfig';
import { ClientContext } from './clientContext';
import { Conventions } from './conventions';
import { Form } from './form';
import { ServiceAgent } from './serviceAgent';
import { PanelData, TabularData } from './formData'
import { Transposer } from './types';

@NgModule({
    imports:[
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations:[
        ClientConfig,
        ClientContext,
        Conventions,
        // @ts-ignore
        Form,
        FormData,
        PanelData,
        TabularData,
        ServiceAgent,
        Transposer
    ],
    exports:[
        ClientConfig,
        ClientContext,
        Conventions,
        // @ts-ignore
        Form,
        FormData,
        PanelData,
        TabularData,
        ServiceAgent,
        Transposer
    ]
})

export class FormModule {}

