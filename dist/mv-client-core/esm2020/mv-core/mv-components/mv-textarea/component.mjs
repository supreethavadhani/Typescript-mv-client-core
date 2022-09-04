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
MvTextareaComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: MvTextareaComponent, selector: "app-mv-textarea", inputs: { field: "field", formData: "formData", type: "type" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<mat-form-field class=\"col-md-12\" appearance=\"fill\">\r\n\t<mat-label>{{field?.label}} <span *ngIf=\"!field?.isRequired\" class=\"optional\">(optional)</span></mat-label>\r\n\t<span matPrefix>{{field?.prefix}}</span>\r\n\t<textarea [formControl]=\"control\" matInput (input)=\"valueChangeDetector($event)\"\r\n\t\t[required]=\"field?.isRequired\" [readonly]=\"field?.isEditable\" placeholder=\"{{field?.placeHolder}}\"> </textarea>\r\n\t<mat-hint>{{field?.hint}}</mat-hint>\r\n\t<mat-icon matSuffix>{{field?.icon}}</mat-icon>\r\n\t<mat-error>\r\n\t\t<div *ngIf=\"this.control?.errors\">\r\n\t\t\t{{this.field.errorId}}\r\n\t\t</div>\r\n\t</mat-error>\r\n</mat-form-field>", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.MatError, selector: "mat-error", inputs: ["id"] }, { kind: "component", type: i2.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i2.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { kind: "directive", type: i2.MatLabel, selector: "mat-label" }, { kind: "directive", type: i2.MatPrefix, selector: "[matPrefix]" }, { kind: "directive", type: i2.MatSuffix, selector: "[matSuffix]" }, { kind: "directive", type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "directive", type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbXYtY2xpZW50LWNvcmUvc3JjL212LWNvcmUvbXYtY29tcG9uZW50cy9tdi10ZXh0YXJlYS9jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tdi1jbGllbnQtY29yZS9zcmMvbXYtY29yZS9tdi1jb21wb25lbnRzL212LXRleHRhcmVhL2NvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTixTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRVosTUFBTSxlQUFlLENBQUM7Ozs7OztBQU92Qjs7R0FFRztBQU9IOzs7O0dBSUc7QUFDSCxNQUFNLE9BQU8sbUJBQW1CO0lBWGhDO1FBWWlCLFVBQUssR0FBdUI7WUFDM0MsS0FBSyxFQUFDLEVBQUU7WUFDUixJQUFJLEVBQUMsRUFBRTtZQUNQLFNBQVMsRUFBQyxDQUFDO1lBQ1gsT0FBTyxFQUFDLEVBQUU7WUFDVixJQUFJLEVBQUMsRUFBRTtZQUNQLFVBQVUsRUFBQyxJQUFJO1NBQ2YsQ0FBQztRQUdlLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztLQWdCM0Q7SUFYQSxRQUFRO1FBQ1AsSUFBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQWdCLENBQUM7U0FDM0U7SUFDRixDQUFDO0lBRUQsbUJBQW1CLENBQUMsT0FBVztRQUM5QixJQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDckU7SUFDRixDQUFDOztnSEExQlcsbUJBQW1CO29HQUFuQixtQkFBbUIsZ0tDM0JoQyxvcUJBWWlCOzJGRGVKLG1CQUFtQjtrQkFYL0IsU0FBUzsrQkFDQyxpQkFBaUI7OEJBV1gsS0FBSztzQkFBcEIsS0FBSztnQkFRVSxRQUFRO3NCQUF2QixLQUFLO2dCQUNVLElBQUk7c0JBQW5CLEtBQUs7Z0JBQ1csV0FBVztzQkFBM0IsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcblx0Q29tcG9uZW50LFxyXG5cdElucHV0LFxyXG5cdE91dHB1dCxcclxuXHRFdmVudEVtaXR0ZXIsXHJcblx0T25Jbml0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcblx0Rm9ybUNvbnRyb2xcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vLi4vbXYtZm9ybS1jb3JlL2Zvcm0nO1xyXG5pbXBvcnQgeyBGb3JtRGF0YSB9IGZyb20gJy4uLy4uL212LWZvcm0tY29yZS9mb3JtRGF0YSc7XHJcblxyXG4vKipcclxuICogYXBwLW12IC0+IG1ldGFkZXYgY29tcG9uZW50IHByZWZpeFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdhcHAtbXYtdGV4dGFyZWEnLFxyXG5cdHRlbXBsYXRlVXJsOiAnLi9jb21wb25lbnQuaHRtbCcsXHJcblx0c3R5bGVVcmxzOiBbXVxyXG59KVxyXG5cclxuLyoqIFxyXG4gKiBXcmFwcGVyIGNsYXNzIGZvciBhbmd1bGFyIG1hdGVyaWFsLlxyXG4gKiBVbnBhY2tzIHZhbHVlcyBmcm9tIHRoZSBtb2RlbCB0byByZW5kZXIgYSB0ZXh0YXJlYVxyXG4gKiBAb3VwdXQgLSB2YWx1ZUNoYW5nZSAtIHZhbHVlIGNoYW5nZSBlbWl0dGVyLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE12VGV4dGFyZWFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdEBJbnB1dCgpIHB1YmxpYyBmaWVsZDogRmllbGQgIHwgdW5kZWZpbmVkID0ge1xyXG5cdFx0bGFiZWw6XCJcIixcclxuXHRcdG5hbWU6XCJcIixcclxuXHRcdHZhbHVlVHlwZTowLFxyXG5cdFx0ZXJyb3JJZDpcIlwiLFxyXG5cdFx0aGludDpcIlwiLFxyXG5cdFx0aXNSZXF1aXJlZDp0cnVlLFxyXG5cdH07XHJcblx0QElucHV0KCkgcHVibGljIGZvcm1EYXRhOiBGb3JtRGF0YSB8IHVuZGVmaW5lZDtcclxuXHRASW5wdXQoKSBwdWJsaWMgdHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG5cdEBPdXRwdXQoKSBwdWJsaWMgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyIDwgYW55ID4gKCk7XHJcblxyXG5cclxuXHRjb250cm9sOiBGb3JtQ29udHJvbCB8IHVuZGVmaW5lZDtcclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHRpZih0aGlzLmZvcm1EYXRhICYmIHRoaXMuZmllbGQpIHtcclxuXHRcdFx0dGhpcy5jb250cm9sID0gdGhpcy5mb3JtRGF0YS5mb3JtR3JvdXAuZ2V0KHRoaXMuZmllbGQubmFtZSkgYXMgRm9ybUNvbnRyb2w7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHZhbHVlQ2hhbmdlRGV0ZWN0b3IoXyRldmVudDphbnkpIHtcclxuXHRcdGlmKHRoaXMuZm9ybURhdGEgJiYgdGhpcy5maWVsZCkge1xyXG5cdFx0XHR0aGlzLnZhbHVlQ2hhbmdlLm5leHQodGhpcy5mb3JtRGF0YT8uZ2V0RmllbGRWYWx1ZSh0aGlzLmZpZWxkLm5hbWUpKTtcclxuXHRcdH1cclxuXHR9XHJcbn0iLCI8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJjb2wtbWQtMTJcIiBhcHBlYXJhbmNlPVwiZmlsbFwiPlxyXG5cdDxtYXQtbGFiZWw+e3tmaWVsZD8ubGFiZWx9fSA8c3BhbiAqbmdJZj1cIiFmaWVsZD8uaXNSZXF1aXJlZFwiIGNsYXNzPVwib3B0aW9uYWxcIj4ob3B0aW9uYWwpPC9zcGFuPjwvbWF0LWxhYmVsPlxyXG5cdDxzcGFuIG1hdFByZWZpeD57e2ZpZWxkPy5wcmVmaXh9fTwvc3Bhbj5cclxuXHQ8dGV4dGFyZWEgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIiBtYXRJbnB1dCAoaW5wdXQpPVwidmFsdWVDaGFuZ2VEZXRlY3RvcigkZXZlbnQpXCJcclxuXHRcdFtyZXF1aXJlZF09XCJmaWVsZD8uaXNSZXF1aXJlZFwiIFtyZWFkb25seV09XCJmaWVsZD8uaXNFZGl0YWJsZVwiIHBsYWNlaG9sZGVyPVwie3tmaWVsZD8ucGxhY2VIb2xkZXJ9fVwiPiA8L3RleHRhcmVhPlxyXG5cdDxtYXQtaGludD57e2ZpZWxkPy5oaW50fX08L21hdC1oaW50PlxyXG5cdDxtYXQtaWNvbiBtYXRTdWZmaXg+e3tmaWVsZD8uaWNvbn19PC9tYXQtaWNvbj5cclxuXHQ8bWF0LWVycm9yPlxyXG5cdFx0PGRpdiAqbmdJZj1cInRoaXMuY29udHJvbD8uZXJyb3JzXCI+XHJcblx0XHRcdHt7dGhpcy5maWVsZC5lcnJvcklkfX1cclxuXHRcdDwvZGl2PlxyXG5cdDwvbWF0LWVycm9yPlxyXG48L21hdC1mb3JtLWZpZWxkPiJdfQ==