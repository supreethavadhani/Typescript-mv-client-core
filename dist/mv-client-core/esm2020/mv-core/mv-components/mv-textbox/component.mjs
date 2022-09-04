import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/material/form-field";
import * as i3 from "@angular/material/input";
import * as i4 from "@angular/forms";
/**
 * app-mv -> metadev component prefix
 */
/**
 * Wrapper class for angular material.
 * Unpacks values from the model to render a textbox
 * @ouput - valueChange - value change emitter.
 */
export class MvTextboxComponent {
    constructor() {
        this.field = {
            label: "",
            name: "",
            valueType: 0,
            errorId: "",
            hint: "",
            isRequired: true,
        };
        this.valueChange = new EventEmitter();
    }
    /**
     * On component initalization get
     * form contorl from the formData
     */
    ngOnInit() {
        if (this.formData && this.field) {
            this.control = this.formData.formGroup.get(this.field.name);
        }
    }
    valueChangeDetector(_$event) {
        if (this.formData && this.field) {
            this.valueChange.next(this.formData.getFieldValue(this.field.name));
        }
    }
}
MvTextboxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvTextboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MvTextboxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: MvTextboxComponent, selector: "app-mv-textbox", inputs: { field: "field", formData: "formData", type: "type" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<mat-form-field class=\"col-md-12\" appearance=\"fill\">\r\n  <mat-label>{{field?.label}} <span *ngIf=\"!field?.isRequired\" class=\"optional\">(optional)</span></mat-label>\r\n  <span matPrefix>{{field?.prefix}}</span>\r\n  <input *ngIf=\"control\" [formControl]=\"control\" matInput (input)=\"valueChangeDetector($event)\"\r\n    [readonly]=\"field?.isEditable\" placeholder=\"{{field?.placeHolder}}\">\r\n  <mat-hint>{{field?.hint}}</mat-hint>\r\n  <mat-icon matSuffix>{{field?.icon}}</mat-icon>\r\n  <mat-error>\r\n    <div *ngIf=\"this.control?.errors\">\r\n      {{this.field?.errorId}}\r\n    </div>\r\n  </mat-error>\r\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.MatError, selector: "mat-error", inputs: ["id"] }, { kind: "component", type: i2.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i2.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { kind: "directive", type: i2.MatLabel, selector: "mat-label" }, { kind: "directive", type: i2.MatPrefix, selector: "[matPrefix]" }, { kind: "directive", type: i2.MatSuffix, selector: "[matSuffix]" }, { kind: "directive", type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "directive", type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvTextboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-mv-textbox', template: "<mat-form-field class=\"col-md-12\" appearance=\"fill\">\r\n  <mat-label>{{field?.label}} <span *ngIf=\"!field?.isRequired\" class=\"optional\">(optional)</span></mat-label>\r\n  <span matPrefix>{{field?.prefix}}</span>\r\n  <input *ngIf=\"control\" [formControl]=\"control\" matInput (input)=\"valueChangeDetector($event)\"\r\n    [readonly]=\"field?.isEditable\" placeholder=\"{{field?.placeHolder}}\">\r\n  <mat-hint>{{field?.hint}}</mat-hint>\r\n  <mat-icon matSuffix>{{field?.icon}}</mat-icon>\r\n  <mat-error>\r\n    <div *ngIf=\"this.control?.errors\">\r\n      {{this.field?.errorId}}\r\n    </div>\r\n  </mat-error>\r\n" }]
        }], propDecorators: { field: [{
                type: Input
            }], formData: [{
                type: Input
            }], type: [{
                type: Input
            }], valueChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbXYtY2xpZW50LWNvcmUvc3JjL212LWNvcmUvbXYtY29tcG9uZW50cy9tdi10ZXh0Ym94L2NvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL212LWNsaWVudC1jb3JlL3NyYy9tdi1jb3JlL212LWNvbXBvbmVudHMvbXYtdGV4dGJveC9jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ04sU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUVaLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFNdkI7O0dBRUc7QUFPSDs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLGtCQUFrQjtJQVgvQjtRQVlpQixVQUFLLEdBQXVCO1lBQzNDLEtBQUssRUFBQyxFQUFFO1lBQ1IsSUFBSSxFQUFDLEVBQUU7WUFDUCxTQUFTLEVBQUMsQ0FBQztZQUNYLE9BQU8sRUFBQyxFQUFFO1lBQ1YsSUFBSSxFQUFDLEVBQUU7WUFDUCxVQUFVLEVBQUMsSUFBSTtTQUNmLENBQUM7UUFHZSxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7S0FxQjNEO0lBaEJBOzs7T0FHRztJQUNILFFBQVE7UUFDUCxJQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBZ0IsQ0FBQztTQUUzRTtJQUNGLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxPQUFXO1FBQzlCLElBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNuRTtJQUNGLENBQUM7OytHQS9CVyxrQkFBa0I7bUdBQWxCLGtCQUFrQiwrSkMxQi9CLHNuQkFZQTsyRkRjYSxrQkFBa0I7a0JBWDlCLFNBQVM7K0JBQ0MsZ0JBQWdCOzhCQVdWLEtBQUs7c0JBQXBCLEtBQUs7Z0JBUVUsUUFBUTtzQkFBdkIsS0FBSztnQkFDVSxJQUFJO3NCQUFuQixLQUFLO2dCQUNXLFdBQVc7c0JBQTNCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG5cdENvbXBvbmVudCxcclxuXHRJbnB1dCxcclxuXHRPdXRwdXQsXHJcblx0RXZlbnRFbWl0dGVyLFxyXG5cdE9uSW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG5cdEZvcm1Db250cm9sXHJcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uLy4uL212LWZvcm0tY29yZS9mb3JtJztcclxuaW1wb3J0IHsgRm9ybURhdGEgfSBmcm9tICcuLi8uLi9tdi1mb3JtLWNvcmUvZm9ybURhdGEnO1xyXG4vKipcclxuICogYXBwLW12IC0+IG1ldGFkZXYgY29tcG9uZW50IHByZWZpeFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdhcHAtbXYtdGV4dGJveCcsXHJcblx0dGVtcGxhdGVVcmw6ICcuL2NvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFtdXHJcbn0pXHJcblxyXG4vKiogXHJcbiAqIFdyYXBwZXIgY2xhc3MgZm9yIGFuZ3VsYXIgbWF0ZXJpYWwuXHJcbiAqIFVucGFja3MgdmFsdWVzIGZyb20gdGhlIG1vZGVsIHRvIHJlbmRlciBhIHRleHRib3hcclxuICogQG91cHV0IC0gdmFsdWVDaGFuZ2UgLSB2YWx1ZSBjaGFuZ2UgZW1pdHRlci5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBNdlRleHRib3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdEBJbnB1dCgpIHB1YmxpYyBmaWVsZDogRmllbGQgIHwgdW5kZWZpbmVkID0ge1xyXG5cdFx0bGFiZWw6XCJcIixcclxuXHRcdG5hbWU6XCJcIixcclxuXHRcdHZhbHVlVHlwZTowLFxyXG5cdFx0ZXJyb3JJZDpcIlwiLFxyXG5cdFx0aGludDpcIlwiLFxyXG5cdFx0aXNSZXF1aXJlZDp0cnVlLFxyXG5cdH07XHJcblx0QElucHV0KCkgcHVibGljIGZvcm1EYXRhOiBGb3JtRGF0YSB8IHVuZGVmaW5lZDtcclxuXHRASW5wdXQoKSBwdWJsaWMgdHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG5cdEBPdXRwdXQoKSBwdWJsaWMgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyIDwgYW55ID4gKCk7XHJcblxyXG5cclxuXHRjb250cm9sOiBGb3JtQ29udHJvbCB8IHVuZGVmaW5lZDtcclxuXHJcblx0LyoqXHJcblx0ICogT24gY29tcG9uZW50IGluaXRhbGl6YXRpb24gZ2V0XHJcblx0ICogZm9ybSBjb250b3JsIGZyb20gdGhlIGZvcm1EYXRhXHJcblx0ICovXHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHRpZih0aGlzLmZvcm1EYXRhICYmIHRoaXMuZmllbGQpIHtcclxuXHRcdFx0dGhpcy5jb250cm9sID0gdGhpcy5mb3JtRGF0YS5mb3JtR3JvdXAuZ2V0KHRoaXMuZmllbGQubmFtZSkgYXMgRm9ybUNvbnRyb2w7XHJcblx0XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR2YWx1ZUNoYW5nZURldGVjdG9yKF8kZXZlbnQ6YW55KSB7XHJcblx0XHRpZih0aGlzLmZvcm1EYXRhICYmIHRoaXMuZmllbGQpIHtcclxuXHRcdHRoaXMudmFsdWVDaGFuZ2UubmV4dCh0aGlzLmZvcm1EYXRhLmdldEZpZWxkVmFsdWUodGhpcy5maWVsZC5uYW1lKSk7XHJcblx0XHR9XHJcblx0fVxyXG59IiwiPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiY29sLW1kLTEyXCIgYXBwZWFyYW5jZT1cImZpbGxcIj5cclxuICA8bWF0LWxhYmVsPnt7ZmllbGQ/LmxhYmVsfX0gPHNwYW4gKm5nSWY9XCIhZmllbGQ/LmlzUmVxdWlyZWRcIiBjbGFzcz1cIm9wdGlvbmFsXCI+KG9wdGlvbmFsKTwvc3Bhbj48L21hdC1sYWJlbD5cclxuICA8c3BhbiBtYXRQcmVmaXg+e3tmaWVsZD8ucHJlZml4fX08L3NwYW4+XHJcbiAgPGlucHV0ICpuZ0lmPVwiY29udHJvbFwiIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCIgbWF0SW5wdXQgKGlucHV0KT1cInZhbHVlQ2hhbmdlRGV0ZWN0b3IoJGV2ZW50KVwiXHJcbiAgICBbcmVhZG9ubHldPVwiZmllbGQ/LmlzRWRpdGFibGVcIiBwbGFjZWhvbGRlcj1cInt7ZmllbGQ/LnBsYWNlSG9sZGVyfX1cIj5cclxuICA8bWF0LWhpbnQ+e3tmaWVsZD8uaGludH19PC9tYXQtaGludD5cclxuICA8bWF0LWljb24gbWF0U3VmZml4Pnt7ZmllbGQ/Lmljb259fTwvbWF0LWljb24+XHJcbiAgPG1hdC1lcnJvcj5cclxuICAgIDxkaXYgKm5nSWY9XCJ0aGlzLmNvbnRyb2w/LmVycm9yc1wiPlxyXG4gICAgICB7e3RoaXMuZmllbGQ/LmVycm9ySWR9fVxyXG4gICAgPC9kaXY+XHJcbiAgPC9tYXQtZXJyb3I+XHJcbiJdfQ==