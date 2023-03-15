import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/material/icon";
import * as i3 from "@angular/material/form-field";
import * as i4 from "@angular/material/input";
import * as i5 from "@angular/forms";
/**
 * app-mv -> metadev component prefix
 */
/**
 * Wrapper class for angular material.
 * Unpacks values from the model to render a textarea
 * @ouput - valueChange - value change emitter.
 */
export class MvTextareaComponent {
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
    ngOnInit() {
        if (this.formData && this.field) {
            this.control = this.formData.formGroup.get(this.field.name);
        }
    }
    valueChangeDetector(_$event) {
        if (this.formData && this.field) {
            this.valueChange.next(this.formData?.getFieldValue(this.field.name));
        }
    }
}
MvTextareaComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvTextareaComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MvTextareaComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: MvTextareaComponent, selector: "app-mv-textarea", inputs: { field: "field", formData: "formData", type: "type" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<mat-form-field class=\"col-md-12\" appearance=\"fill\">\r\n\t<mat-label>{{field?.label}} <span *ngIf=\"!field?.isRequired\" class=\"optional\">(optional)</span></mat-label>\r\n\t<span matPrefix>{{field?.prefix}}</span>\r\n\t<textarea [formControl]=\"control\" matInput (input)=\"valueChangeDetector($event)\"\r\n\t\t[required]=\"field?.isRequired\" [readonly]=\"field?.isEditable\" placeholder=\"{{field?.placeHolder}}\"> </textarea>\r\n\t<mat-hint>{{field?.hint}}</mat-hint>\r\n\t<mat-icon matSuffix>{{field?.icon}}</mat-icon>\r\n\t<mat-error>\r\n\t\t<div *ngIf=\"this.control?.errors\">\r\n\t\t\t{{this.field.errorId}}\r\n\t\t</div>\r\n\t</mat-error>\r\n</mat-form-field>", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i3.MatError, selector: "mat-error", inputs: ["id"] }, { kind: "component", type: i3.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i3.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { kind: "directive", type: i3.MatLabel, selector: "mat-label" }, { kind: "directive", type: i3.MatPrefix, selector: "[matPrefix]" }, { kind: "directive", type: i3.MatSuffix, selector: "[matSuffix]" }, { kind: "directive", type: i4.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i5.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvTextareaComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-mv-textarea', template: "<mat-form-field class=\"col-md-12\" appearance=\"fill\">\r\n\t<mat-label>{{field?.label}} <span *ngIf=\"!field?.isRequired\" class=\"optional\">(optional)</span></mat-label>\r\n\t<span matPrefix>{{field?.prefix}}</span>\r\n\t<textarea [formControl]=\"control\" matInput (input)=\"valueChangeDetector($event)\"\r\n\t\t[required]=\"field?.isRequired\" [readonly]=\"field?.isEditable\" placeholder=\"{{field?.placeHolder}}\"> </textarea>\r\n\t<mat-hint>{{field?.hint}}</mat-hint>\r\n\t<mat-icon matSuffix>{{field?.icon}}</mat-icon>\r\n\t<mat-error>\r\n\t\t<div *ngIf=\"this.control?.errors\">\r\n\t\t\t{{this.field.errorId}}\r\n\t\t</div>\r\n\t</mat-error>\r\n</mat-form-field>" }]
        }], propDecorators: { field: [{
                type: Input
            }], formData: [{
                type: Input
            }], type: [{
                type: Input
            }], valueChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbXYtY2xpZW50LWNvcmUvc3JjL212LWNvcmUvbXYtY29tcG9uZW50cy9tdi10ZXh0YXJlYS9jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tdi1jbGllbnQtY29yZS9zcmMvbXYtY29yZS9tdi1jb21wb25lbnRzL212LXRleHRhcmVhL2NvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTixTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRVosTUFBTSxlQUFlLENBQUM7Ozs7Ozs7QUFPdkI7O0dBRUc7QUFPSDs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLG1CQUFtQjtJQVhoQztRQVlpQixVQUFLLEdBQXVCO1lBQzNDLEtBQUssRUFBQyxFQUFFO1lBQ1IsSUFBSSxFQUFDLEVBQUU7WUFDUCxTQUFTLEVBQUMsQ0FBQztZQUNYLE9BQU8sRUFBQyxFQUFFO1lBQ1YsSUFBSSxFQUFDLEVBQUU7WUFDUCxVQUFVLEVBQUMsSUFBSTtTQUNmLENBQUM7UUFHZSxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7S0FnQjNEO0lBWEEsUUFBUTtRQUNQLElBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFnQixDQUFDO1NBQzNFO0lBQ0YsQ0FBQztJQUVELG1CQUFtQixDQUFDLE9BQVc7UUFDOUIsSUFBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3JFO0lBQ0YsQ0FBQzs7Z0hBMUJXLG1CQUFtQjtvR0FBbkIsbUJBQW1CLGdLQzNCaEMsb3FCQVlpQjsyRkRlSixtQkFBbUI7a0JBWC9CLFNBQVM7K0JBQ0MsaUJBQWlCOzhCQVdYLEtBQUs7c0JBQXBCLEtBQUs7Z0JBUVUsUUFBUTtzQkFBdkIsS0FBSztnQkFDVSxJQUFJO3NCQUFuQixLQUFLO2dCQUNXLFdBQVc7c0JBQTNCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG5cdENvbXBvbmVudCxcclxuXHRJbnB1dCxcclxuXHRPdXRwdXQsXHJcblx0RXZlbnRFbWl0dGVyLFxyXG5cdE9uSW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG5cdEZvcm1Db250cm9sXHJcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uLy4uL212LWZvcm0tY29yZS9mb3JtJztcclxuaW1wb3J0IHsgRm9ybURhdGEgfSBmcm9tICcuLi8uLi9tdi1mb3JtLWNvcmUvZm9ybURhdGEnO1xyXG5cclxuLyoqXHJcbiAqIGFwcC1tdiAtPiBtZXRhZGV2IGNvbXBvbmVudCBwcmVmaXhcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnYXBwLW12LXRleHRhcmVhJyxcclxuXHR0ZW1wbGF0ZVVybDogJy4vY29tcG9uZW50Lmh0bWwnLFxyXG5cdHN0eWxlVXJsczogW11cclxufSlcclxuXHJcbi8qKiBcclxuICogV3JhcHBlciBjbGFzcyBmb3IgYW5ndWxhciBtYXRlcmlhbC5cclxuICogVW5wYWNrcyB2YWx1ZXMgZnJvbSB0aGUgbW9kZWwgdG8gcmVuZGVyIGEgdGV4dGFyZWFcclxuICogQG91cHV0IC0gdmFsdWVDaGFuZ2UgLSB2YWx1ZSBjaGFuZ2UgZW1pdHRlci5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBNdlRleHRhcmVhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRASW5wdXQoKSBwdWJsaWMgZmllbGQ6IEZpZWxkICB8IHVuZGVmaW5lZCA9IHtcclxuXHRcdGxhYmVsOlwiXCIsXHJcblx0XHRuYW1lOlwiXCIsXHJcblx0XHR2YWx1ZVR5cGU6MCxcclxuXHRcdGVycm9ySWQ6XCJcIixcclxuXHRcdGhpbnQ6XCJcIixcclxuXHRcdGlzUmVxdWlyZWQ6dHJ1ZSxcclxuXHR9O1xyXG5cdEBJbnB1dCgpIHB1YmxpYyBmb3JtRGF0YTogRm9ybURhdGEgfCB1bmRlZmluZWQ7XHJcblx0QElucHV0KCkgcHVibGljIHR5cGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuXHRAT3V0cHV0KCkgcHVibGljIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlciA8IGFueSA+ICgpO1xyXG5cclxuXHJcblx0Y29udHJvbDogRm9ybUNvbnRyb2wgfCB1bmRlZmluZWQ7XHJcblxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0aWYodGhpcy5mb3JtRGF0YSAmJiB0aGlzLmZpZWxkKSB7XHJcblx0XHRcdHRoaXMuY29udHJvbCA9IHRoaXMuZm9ybURhdGEuZm9ybUdyb3VwLmdldCh0aGlzLmZpZWxkLm5hbWUpIGFzIEZvcm1Db250cm9sO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHR2YWx1ZUNoYW5nZURldGVjdG9yKF8kZXZlbnQ6YW55KSB7XHJcblx0XHRpZih0aGlzLmZvcm1EYXRhICYmIHRoaXMuZmllbGQpIHtcclxuXHRcdFx0dGhpcy52YWx1ZUNoYW5nZS5uZXh0KHRoaXMuZm9ybURhdGE/LmdldEZpZWxkVmFsdWUodGhpcy5maWVsZC5uYW1lKSk7XHJcblx0XHR9XHJcblx0fVxyXG59IiwiPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiY29sLW1kLTEyXCIgYXBwZWFyYW5jZT1cImZpbGxcIj5cclxuXHQ8bWF0LWxhYmVsPnt7ZmllbGQ/LmxhYmVsfX0gPHNwYW4gKm5nSWY9XCIhZmllbGQ/LmlzUmVxdWlyZWRcIiBjbGFzcz1cIm9wdGlvbmFsXCI+KG9wdGlvbmFsKTwvc3Bhbj48L21hdC1sYWJlbD5cclxuXHQ8c3BhbiBtYXRQcmVmaXg+e3tmaWVsZD8ucHJlZml4fX08L3NwYW4+XHJcblx0PHRleHRhcmVhIFtmb3JtQ29udHJvbF09XCJjb250cm9sXCIgbWF0SW5wdXQgKGlucHV0KT1cInZhbHVlQ2hhbmdlRGV0ZWN0b3IoJGV2ZW50KVwiXHJcblx0XHRbcmVxdWlyZWRdPVwiZmllbGQ/LmlzUmVxdWlyZWRcIiBbcmVhZG9ubHldPVwiZmllbGQ/LmlzRWRpdGFibGVcIiBwbGFjZWhvbGRlcj1cInt7ZmllbGQ/LnBsYWNlSG9sZGVyfX1cIj4gPC90ZXh0YXJlYT5cclxuXHQ8bWF0LWhpbnQ+e3tmaWVsZD8uaGludH19PC9tYXQtaGludD5cclxuXHQ8bWF0LWljb24gbWF0U3VmZml4Pnt7ZmllbGQ/Lmljb259fTwvbWF0LWljb24+XHJcblx0PG1hdC1lcnJvcj5cclxuXHRcdDxkaXYgKm5nSWY9XCJ0aGlzLmNvbnRyb2w/LmVycm9yc1wiPlxyXG5cdFx0XHR7e3RoaXMuZmllbGQuZXJyb3JJZH19XHJcblx0XHQ8L2Rpdj5cclxuXHQ8L21hdC1lcnJvcj5cclxuPC9tYXQtZm9ybS1maWVsZD4iXX0=