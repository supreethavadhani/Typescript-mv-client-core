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
MvTextboxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: MvTextboxComponent, selector: "app-mv-textbox", inputs: { field: "field", formData: "formData", type: "type" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<mat-form-field class=\"col-md-12\" appearance=\"fill\">\r\n  <mat-label>{{field?.label}} <span *ngIf=\"!field?.isRequired\" class=\"optional\">(optional)</span></mat-label>\r\n  <span matPrefix>{{field?.prefix}}</span>\r\n  <input *ngIf=\"control\" [formControl]=\"control\" matInput (input)=\"valueChangeDetector($event)\"\r\n    [readonly]=\"field?.isEditable\" placeholder=\"{{field?.placeHolder}}\">\r\n  <mat-hint>{{field?.hint}}</mat-hint>\r\n  <mat-icon matSuffix>{{field?.icon}}</mat-icon>\r\n  <mat-error>\r\n    <div *ngIf=\"this.control?.errors\">\r\n      {{this.field?.errorId}}\r\n    </div>\r\n  </mat-error>\r\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i3.MatError, selector: "mat-error", inputs: ["id"] }, { kind: "component", type: i3.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i3.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { kind: "directive", type: i3.MatLabel, selector: "mat-label" }, { kind: "directive", type: i3.MatPrefix, selector: "[matPrefix]" }, { kind: "directive", type: i3.MatSuffix, selector: "[matSuffix]" }, { kind: "directive", type: i4.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbXYtY2xpZW50LWNvcmUvc3JjL212LWNvcmUvbXYtY29tcG9uZW50cy9tdi10ZXh0Ym94L2NvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL212LWNsaWVudC1jb3JlL3NyYy9tdi1jb3JlL212LWNvbXBvbmVudHMvbXYtdGV4dGJveC9jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ04sU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUVaLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0FBTXZCOztHQUVHO0FBT0g7Ozs7R0FJRztBQUNILE1BQU0sT0FBTyxrQkFBa0I7SUFYL0I7UUFZaUIsVUFBSyxHQUF1QjtZQUMzQyxLQUFLLEVBQUMsRUFBRTtZQUNSLElBQUksRUFBQyxFQUFFO1lBQ1AsU0FBUyxFQUFDLENBQUM7WUFDWCxPQUFPLEVBQUMsRUFBRTtZQUNWLElBQUksRUFBQyxFQUFFO1lBQ1AsVUFBVSxFQUFDLElBQUk7U0FDZixDQUFDO1FBR2UsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0tBcUIzRDtJQWhCQTs7O09BR0c7SUFDSCxRQUFRO1FBQ1AsSUFBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQWdCLENBQUM7U0FFM0U7SUFDRixDQUFDO0lBRUQsbUJBQW1CLENBQUMsT0FBVztRQUM5QixJQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDbkU7SUFDRixDQUFDOzsrR0EvQlcsa0JBQWtCO21HQUFsQixrQkFBa0IsK0pDMUIvQixzbkJBWUE7MkZEY2Esa0JBQWtCO2tCQVg5QixTQUFTOytCQUNDLGdCQUFnQjs4QkFXVixLQUFLO3NCQUFwQixLQUFLO2dCQVFVLFFBQVE7c0JBQXZCLEtBQUs7Z0JBQ1UsSUFBSTtzQkFBbkIsS0FBSztnQkFDVyxXQUFXO3NCQUEzQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuXHRDb21wb25lbnQsXHJcblx0SW5wdXQsXHJcblx0T3V0cHV0LFxyXG5cdEV2ZW50RW1pdHRlcixcclxuXHRPbkluaXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuXHRGb3JtQ29udHJvbFxyXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi8uLi9tdi1mb3JtLWNvcmUvZm9ybSc7XHJcbmltcG9ydCB7IEZvcm1EYXRhIH0gZnJvbSAnLi4vLi4vbXYtZm9ybS1jb3JlL2Zvcm1EYXRhJztcclxuLyoqXHJcbiAqIGFwcC1tdiAtPiBtZXRhZGV2IGNvbXBvbmVudCBwcmVmaXhcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnYXBwLW12LXRleHRib3gnLFxyXG5cdHRlbXBsYXRlVXJsOiAnLi9jb21wb25lbnQuaHRtbCcsXHJcblx0c3R5bGVVcmxzOiBbXVxyXG59KVxyXG5cclxuLyoqIFxyXG4gKiBXcmFwcGVyIGNsYXNzIGZvciBhbmd1bGFyIG1hdGVyaWFsLlxyXG4gKiBVbnBhY2tzIHZhbHVlcyBmcm9tIHRoZSBtb2RlbCB0byByZW5kZXIgYSB0ZXh0Ym94XHJcbiAqIEBvdXB1dCAtIHZhbHVlQ2hhbmdlIC0gdmFsdWUgY2hhbmdlIGVtaXR0ZXIuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTXZUZXh0Ym94Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRASW5wdXQoKSBwdWJsaWMgZmllbGQ6IEZpZWxkICB8IHVuZGVmaW5lZCA9IHtcclxuXHRcdGxhYmVsOlwiXCIsXHJcblx0XHRuYW1lOlwiXCIsXHJcblx0XHR2YWx1ZVR5cGU6MCxcclxuXHRcdGVycm9ySWQ6XCJcIixcclxuXHRcdGhpbnQ6XCJcIixcclxuXHRcdGlzUmVxdWlyZWQ6dHJ1ZSxcclxuXHR9O1xyXG5cdEBJbnB1dCgpIHB1YmxpYyBmb3JtRGF0YTogRm9ybURhdGEgfCB1bmRlZmluZWQ7XHJcblx0QElucHV0KCkgcHVibGljIHR5cGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuXHRAT3V0cHV0KCkgcHVibGljIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlciA8IGFueSA+ICgpO1xyXG5cclxuXHJcblx0Y29udHJvbDogRm9ybUNvbnRyb2wgfCB1bmRlZmluZWQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIE9uIGNvbXBvbmVudCBpbml0YWxpemF0aW9uIGdldFxyXG5cdCAqIGZvcm0gY29udG9ybCBmcm9tIHRoZSBmb3JtRGF0YVxyXG5cdCAqL1xyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0aWYodGhpcy5mb3JtRGF0YSAmJiB0aGlzLmZpZWxkKSB7XHJcblx0XHRcdHRoaXMuY29udHJvbCA9IHRoaXMuZm9ybURhdGEuZm9ybUdyb3VwLmdldCh0aGlzLmZpZWxkLm5hbWUpIGFzIEZvcm1Db250cm9sO1xyXG5cdFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dmFsdWVDaGFuZ2VEZXRlY3RvcihfJGV2ZW50OmFueSkge1xyXG5cdFx0aWYodGhpcy5mb3JtRGF0YSAmJiB0aGlzLmZpZWxkKSB7XHJcblx0XHR0aGlzLnZhbHVlQ2hhbmdlLm5leHQodGhpcy5mb3JtRGF0YS5nZXRGaWVsZFZhbHVlKHRoaXMuZmllbGQubmFtZSkpO1xyXG5cdFx0fVxyXG5cdH1cclxufSIsIjxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImNvbC1tZC0xMlwiIGFwcGVhcmFuY2U9XCJmaWxsXCI+XHJcbiAgPG1hdC1sYWJlbD57e2ZpZWxkPy5sYWJlbH19IDxzcGFuICpuZ0lmPVwiIWZpZWxkPy5pc1JlcXVpcmVkXCIgY2xhc3M9XCJvcHRpb25hbFwiPihvcHRpb25hbCk8L3NwYW4+PC9tYXQtbGFiZWw+XHJcbiAgPHNwYW4gbWF0UHJlZml4Pnt7ZmllbGQ/LnByZWZpeH19PC9zcGFuPlxyXG4gIDxpbnB1dCAqbmdJZj1cImNvbnRyb2xcIiBbZm9ybUNvbnRyb2xdPVwiY29udHJvbFwiIG1hdElucHV0IChpbnB1dCk9XCJ2YWx1ZUNoYW5nZURldGVjdG9yKCRldmVudClcIlxyXG4gICAgW3JlYWRvbmx5XT1cImZpZWxkPy5pc0VkaXRhYmxlXCIgcGxhY2Vob2xkZXI9XCJ7e2ZpZWxkPy5wbGFjZUhvbGRlcn19XCI+XHJcbiAgPG1hdC1oaW50Pnt7ZmllbGQ/LmhpbnR9fTwvbWF0LWhpbnQ+XHJcbiAgPG1hdC1pY29uIG1hdFN1ZmZpeD57e2ZpZWxkPy5pY29ufX08L21hdC1pY29uPlxyXG4gIDxtYXQtZXJyb3I+XHJcbiAgICA8ZGl2ICpuZ0lmPVwidGhpcy5jb250cm9sPy5lcnJvcnNcIj5cclxuICAgICAge3t0aGlzLmZpZWxkPy5lcnJvcklkfX1cclxuICAgIDwvZGl2PlxyXG4gIDwvbWF0LWVycm9yPlxyXG4iXX0=