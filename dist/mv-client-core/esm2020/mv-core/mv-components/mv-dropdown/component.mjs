import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/material/core";
import * as i3 from "@angular/material/form-field";
import * as i4 from "@angular/material/select";
import * as i5 from "@angular/forms";
/**
 * app-mv -> metadev component prefix
 */
/**
 * Wrapper class for angular material.
 * Unpacks values from the model to render a dropdown
 */
export class MvDropDownComponent {
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
        this.changeListener = new EventEmitter();
    }
    ngOnInit() {
        if (this.formData && this.field) {
            this.formControl = this.formData.formGroup.get(this.field.name);
            this.formControl.valueChanges.subscribe(value => {
                this.changeListener.next(value);
            });
        }
    }
    currentValue(value) {
        this.valueChange.next(value);
    }
}
MvDropDownComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvDropDownComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MvDropDownComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: MvDropDownComponent, selector: "app-mv-dropdown", inputs: { field: "field", formData: "formData", type: "type" }, outputs: { valueChange: "valueChange", changeListener: "changeListener" }, ngImport: i0, template: "<mat-form-field class=\"col-md-12\" appearance=\"fill\">\r\n  <mat-label>{{field?.label}}<span *ngIf=\"!field?.isRequired\" class=\"optional\">(optional)</span></mat-label>\r\n  <mat-select disableOptionCentering=\"true\" (selectionChange)=\"currentValue($event.value);\"\r\n    [required]=\"field?.isRequired\" placeholder=\"{{field?.placeHolder}}\" [formControl]=\"formControl\">\r\n    <mat-option *ngIf=\"!field?.isRequired\">None</mat-option>\r\n    <mat-option *ngFor=\"let list of formData?.lists[field?.name]\" [(value)]=\"list.value\">\r\n      {{list.text}}\r\n    </mat-option>\r\n  </mat-select>\r\n  <mat-error>\r\n    <div *ngIf=\"this.formControl?.errors\">\r\n      {{this.field.errorId}}\r\n    </div>\r\n  </mat-error>\r\n</mat-form-field>\r\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { kind: "directive", type: i3.MatError, selector: "mat-error", inputs: ["id"] }, { kind: "component", type: i3.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i3.MatLabel, selector: "mat-label" }, { kind: "component", type: i4.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i5.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvDropDownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-mv-dropdown', template: "<mat-form-field class=\"col-md-12\" appearance=\"fill\">\r\n  <mat-label>{{field?.label}}<span *ngIf=\"!field?.isRequired\" class=\"optional\">(optional)</span></mat-label>\r\n  <mat-select disableOptionCentering=\"true\" (selectionChange)=\"currentValue($event.value);\"\r\n    [required]=\"field?.isRequired\" placeholder=\"{{field?.placeHolder}}\" [formControl]=\"formControl\">\r\n    <mat-option *ngIf=\"!field?.isRequired\">None</mat-option>\r\n    <mat-option *ngFor=\"let list of formData?.lists[field?.name]\" [(value)]=\"list.value\">\r\n      {{list.text}}\r\n    </mat-option>\r\n  </mat-select>\r\n  <mat-error>\r\n    <div *ngIf=\"this.formControl?.errors\">\r\n      {{this.field.errorId}}\r\n    </div>\r\n  </mat-error>\r\n</mat-form-field>\r\n" }]
        }], propDecorators: { field: [{
                type: Input
            }], formData: [{
                type: Input
            }], type: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], changeListener: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbXYtY2xpZW50LWNvcmUvc3JjL212LWNvcmUvbXYtY29tcG9uZW50cy9tdi1kcm9wZG93bi9jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tdi1jbGllbnQtY29yZS9zcmMvbXYtY29yZS9tdi1jb21wb25lbnRzL212LWRyb3Bkb3duL2NvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTixTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRVosTUFBTSxlQUFlLENBQUM7Ozs7Ozs7QUFNdkI7O0dBRUc7QUFPSDs7O0dBR0c7QUFFSCxNQUFNLE9BQU8sbUJBQW1CO0lBWGhDO1FBWWlCLFVBQUssR0FBdUI7WUFDM0MsS0FBSyxFQUFDLEVBQUU7WUFDUixJQUFJLEVBQUMsRUFBRTtZQUNQLFNBQVMsRUFBQyxDQUFDO1lBQ1gsT0FBTyxFQUFDLEVBQUU7WUFDVixJQUFJLEVBQUMsRUFBRTtZQUNQLFVBQVUsRUFBQyxJQUFJO1NBQ2YsQ0FBQztRQUdlLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUM3QyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7S0FlOUQ7SUFYQSxRQUFRO1FBQ1AsSUFBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQWdCLENBQUM7WUFDL0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMvQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNoQyxDQUFDLENBQUMsQ0FBQztTQUNIO0lBQ0YsQ0FBQztJQUNELFlBQVksQ0FBQyxLQUFVO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7O2dIQTFCVyxtQkFBbUI7b0dBQW5CLG1CQUFtQixrTUMxQmhDLDJ2QkFlQTsyRkRXYSxtQkFBbUI7a0JBWC9CLFNBQVM7K0JBQ0MsaUJBQWlCOzhCQVdYLEtBQUs7c0JBQXBCLEtBQUs7Z0JBUVUsUUFBUTtzQkFBdkIsS0FBSztnQkFDVSxJQUFJO3NCQUFuQixLQUFLO2dCQUNXLFdBQVc7c0JBQTNCLE1BQU07Z0JBQ1UsY0FBYztzQkFBOUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcblx0Q29tcG9uZW50LFxyXG5cdElucHV0LFxyXG5cdE91dHB1dCxcclxuXHRFdmVudEVtaXR0ZXIsXHJcblx0T25Jbml0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcblx0Rm9ybUNvbnRyb2xcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vLi4vbXYtZm9ybS1jb3JlL2Zvcm0nO1xyXG5pbXBvcnQgeyBGb3JtRGF0YSB9IGZyb20gJy4uLy4uL212LWZvcm0tY29yZS9mb3JtRGF0YSc7XHJcbi8qKlxyXG4gKiBhcHAtbXYgLT4gbWV0YWRldiBjb21wb25lbnQgcHJlZml4XHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2FwcC1tdi1kcm9wZG93bicsXHJcblx0dGVtcGxhdGVVcmw6ICcuL2NvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFtdXHJcbn0pXHJcblxyXG4vKiogXHJcbiAqIFdyYXBwZXIgY2xhc3MgZm9yIGFuZ3VsYXIgbWF0ZXJpYWwuXHJcbiAqIFVucGFja3MgdmFsdWVzIGZyb20gdGhlIG1vZGVsIHRvIHJlbmRlciBhIGRyb3Bkb3duXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIE12RHJvcERvd25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdEBJbnB1dCgpIHB1YmxpYyBmaWVsZDogRmllbGQgIHwgdW5kZWZpbmVkID0ge1xyXG5cdFx0bGFiZWw6XCJcIixcclxuXHRcdG5hbWU6XCJcIixcclxuXHRcdHZhbHVlVHlwZTowLFxyXG5cdFx0ZXJyb3JJZDpcIlwiLFxyXG5cdFx0aGludDpcIlwiLFxyXG5cdFx0aXNSZXF1aXJlZDp0cnVlLFxyXG5cdH07XHJcblx0QElucHV0KCkgcHVibGljIGZvcm1EYXRhOiBGb3JtRGF0YSB8IHVuZGVmaW5lZDtcclxuXHRASW5wdXQoKSBwdWJsaWMgdHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG5cdEBPdXRwdXQoKSBwdWJsaWMgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyIDwgc3RyaW5nID4gKCk7XHJcblx0QE91dHB1dCgpIHB1YmxpYyBjaGFuZ2VMaXN0ZW5lciA9IG5ldyBFdmVudEVtaXR0ZXIgPCBhbnkgPiAoKTtcclxuXHJcblx0cHVibGljIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbCB8IHVuZGVmaW5lZDtcclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHRpZih0aGlzLmZvcm1EYXRhICYmIHRoaXMuZmllbGQpIHtcclxuXHRcdFx0dGhpcy5mb3JtQ29udHJvbCA9IHRoaXMuZm9ybURhdGEuZm9ybUdyb3VwLmdldCh0aGlzLmZpZWxkLm5hbWUpIGFzIEZvcm1Db250cm9sO1xyXG5cdFx0XHR0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUodmFsdWUgPT4ge1xyXG5cdFx0XHRcdHRoaXMuY2hhbmdlTGlzdGVuZXIubmV4dCh2YWx1ZSlcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGN1cnJlbnRWYWx1ZSh2YWx1ZTogYW55KSB7XHJcblx0XHR0aGlzLnZhbHVlQ2hhbmdlLm5leHQodmFsdWUpO1xyXG5cdH1cclxufSIsIjxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImNvbC1tZC0xMlwiIGFwcGVhcmFuY2U9XCJmaWxsXCI+XHJcbiAgPG1hdC1sYWJlbD57e2ZpZWxkPy5sYWJlbH19PHNwYW4gKm5nSWY9XCIhZmllbGQ/LmlzUmVxdWlyZWRcIiBjbGFzcz1cIm9wdGlvbmFsXCI+KG9wdGlvbmFsKTwvc3Bhbj48L21hdC1sYWJlbD5cclxuICA8bWF0LXNlbGVjdCBkaXNhYmxlT3B0aW9uQ2VudGVyaW5nPVwidHJ1ZVwiIChzZWxlY3Rpb25DaGFuZ2UpPVwiY3VycmVudFZhbHVlKCRldmVudC52YWx1ZSk7XCJcclxuICAgIFtyZXF1aXJlZF09XCJmaWVsZD8uaXNSZXF1aXJlZFwiIHBsYWNlaG9sZGVyPVwie3tmaWVsZD8ucGxhY2VIb2xkZXJ9fVwiIFtmb3JtQ29udHJvbF09XCJmb3JtQ29udHJvbFwiPlxyXG4gICAgPG1hdC1vcHRpb24gKm5nSWY9XCIhZmllbGQ/LmlzUmVxdWlyZWRcIj5Ob25lPC9tYXQtb3B0aW9uPlxyXG4gICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGxpc3Qgb2YgZm9ybURhdGE/Lmxpc3RzW2ZpZWxkPy5uYW1lXVwiIFsodmFsdWUpXT1cImxpc3QudmFsdWVcIj5cclxuICAgICAge3tsaXN0LnRleHR9fVxyXG4gICAgPC9tYXQtb3B0aW9uPlxyXG4gIDwvbWF0LXNlbGVjdD5cclxuICA8bWF0LWVycm9yPlxyXG4gICAgPGRpdiAqbmdJZj1cInRoaXMuZm9ybUNvbnRyb2w/LmVycm9yc1wiPlxyXG4gICAgICB7e3RoaXMuZmllbGQuZXJyb3JJZH19XHJcbiAgICA8L2Rpdj5cclxuICA8L21hdC1lcnJvcj5cclxuPC9tYXQtZm9ybS1maWVsZD5cclxuIl19