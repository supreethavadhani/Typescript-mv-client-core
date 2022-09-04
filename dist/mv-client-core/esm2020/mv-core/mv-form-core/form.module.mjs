import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientConfig } from './clientConfig';
import { ClientContext } from './clientContext';
import { Conventions } from './conventions';
import { Form } from './form';
import { ServiceAgent } from './serviceAgent';
import { PanelData, TabularData } from './formData';
import { Transposer } from './types';
let FormModule = class FormModule {
};
FormModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ReactiveFormsModule,
            FormsModule
        ],
        declarations: [
            ClientConfig,
            ClientContext,
            Conventions,
            Form,
            FormData,
            PanelData,
            TabularData,
            ServiceAgent,
            Transposer
        ],
        exports: [
            ClientConfig,
            ClientContext,
            Conventions,
            Form,
            FormData,
            PanelData,
            TabularData,
            ServiceAgent,
            Transposer
        ]
    })
], FormModule);
export { FormModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tdi1jbGllbnQtY29yZS9zcmMvbXYtY29yZS9tdi1mb3JtLWNvcmUvZm9ybS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM5QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUE7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQWdDckMsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVTtDQUFHLENBQUE7QUFBYixVQUFVO0lBOUJ0QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUM7WUFDSixZQUFZO1lBQ1osbUJBQW1CO1lBQ25CLFdBQVc7U0FDZDtRQUNELFlBQVksRUFBQztZQUNULFlBQVk7WUFDWixhQUFhO1lBQ2IsV0FBVztZQUNYLElBQUk7WUFDSixRQUFRO1lBQ1IsU0FBUztZQUNULFdBQVc7WUFDWCxZQUFZO1lBQ1osVUFBVTtTQUNiO1FBQ0QsT0FBTyxFQUFDO1lBQ0osWUFBWTtZQUNaLGFBQWE7WUFDYixXQUFXO1lBQ1gsSUFBSTtZQUNKLFFBQVE7WUFDUixTQUFTO1lBQ1QsV0FBVztZQUNYLFlBQVk7WUFDWixVQUFVO1NBQ2I7S0FDSixDQUFDO0dBRVcsVUFBVSxDQUFHO1NBQWIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDbGllbnRDb25maWcgfSBmcm9tICcuL2NsaWVudENvbmZpZyc7XG5pbXBvcnQgeyBDbGllbnRDb250ZXh0IH0gZnJvbSAnLi9jbGllbnRDb250ZXh0JztcbmltcG9ydCB7IENvbnZlbnRpb25zIH0gZnJvbSAnLi9jb252ZW50aW9ucyc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJztcbmltcG9ydCB7IFNlcnZpY2VBZ2VudCB9IGZyb20gJy4vc2VydmljZUFnZW50JztcbmltcG9ydCB7IFBhbmVsRGF0YSwgVGFidWxhckRhdGEgfSBmcm9tICcuL2Zvcm1EYXRhJ1xuaW1wb3J0IHsgVHJhbnNwb3NlciB9IGZyb20gJy4vdHlwZXMnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6W1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6W1xuICAgICAgICBDbGllbnRDb25maWcsXG4gICAgICAgIENsaWVudENvbnRleHQsXG4gICAgICAgIENvbnZlbnRpb25zLFxuICAgICAgICBGb3JtLFxuICAgICAgICBGb3JtRGF0YSxcbiAgICAgICAgUGFuZWxEYXRhLFxuICAgICAgICBUYWJ1bGFyRGF0YSxcbiAgICAgICAgU2VydmljZUFnZW50LFxuICAgICAgICBUcmFuc3Bvc2VyXG4gICAgXSxcbiAgICBleHBvcnRzOltcbiAgICAgICAgQ2xpZW50Q29uZmlnLFxuICAgICAgICBDbGllbnRDb250ZXh0LFxuICAgICAgICBDb252ZW50aW9ucyxcbiAgICAgICAgRm9ybSxcbiAgICAgICAgRm9ybURhdGEsXG4gICAgICAgIFBhbmVsRGF0YSxcbiAgICAgICAgVGFidWxhckRhdGEsXG4gICAgICAgIFNlcnZpY2VBZ2VudCxcbiAgICAgICAgVHJhbnNwb3NlclxuICAgIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBGb3JtTW9kdWxlIHt9XG5cbiJdfQ==