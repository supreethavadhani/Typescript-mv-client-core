import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/checkbox";
import * as i2 from "@angular/forms";
export class MvCheckboxComponent {
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
        this.isChecked = false;
    }
    ngOnInit() {
        if (this.formData && this.field) {
            this.control = this.formData.formGroup.get(this.field.name);
            this.isChecked = this.control.value;
            this.control.valueChanges.subscribe(value => {
                this.changeListener.next(value);
            });
        }
    }
    changed() {
        this.isChecked = this.control?.value;
        this.valueChange.next(this.control?.value);
    }
}
MvCheckboxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvCheckboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MvCheckboxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: MvCheckboxComponent, selector: "app-mv-checkbox", inputs: { field: "field", formData: "formData" }, outputs: { valueChange: "valueChange", changeListener: "changeListener" }, ngImport: i0, template: "<div class=\"col-md-12\">\r\n  <mat-checkbox class=\"align-margin\" (change)=\"changed()\" [formControl]=\"control\">{{field?.label}}</mat-checkbox>\r\n</div>", dependencies: [{ kind: "component", type: i1.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex"], exportAs: ["matCheckbox"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: MvCheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-mv-checkbox', template: "<div class=\"col-md-12\">\r\n  <mat-checkbox class=\"align-margin\" (change)=\"changed()\" [formControl]=\"control\">{{field?.label}}</mat-checkbox>\r\n</div>" }]
        }], propDecorators: { field: [{
                type: Input
            }], formData: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], changeListener: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbXYtY2xpZW50LWNvcmUvc3JjL212LWNvcmUvbXYtY29tcG9uZW50cy9tdi1jaGVja2JveC9jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tdi1jbGllbnQtY29yZS9zcmMvbXYtY29yZS9tdi1jb21wb25lbnRzL212LWNoZWNrYm94L2NvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTixTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRVosTUFBTSxlQUFlLENBQUM7Ozs7QUFZdkIsTUFBTSxPQUFPLG1CQUFtQjtJQUxoQztRQU1pQixVQUFLLEdBQXVCO1lBQzNDLEtBQUssRUFBQyxFQUFFO1lBQ1IsSUFBSSxFQUFDLEVBQUU7WUFDUCxTQUFTLEVBQUMsQ0FBQztZQUNYLE9BQU8sRUFBQyxFQUFFO1lBQ1YsSUFBSSxFQUFDLEVBQUU7WUFDUCxVQUFVLEVBQUMsSUFBSTtTQUNmLENBQUM7UUFFZSxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFlLENBQUM7UUFDOUMsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBRXZELGNBQVMsR0FBWSxLQUFLLENBQUM7S0FnQmxDO0lBZEEsUUFBUTtRQUNQLElBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFnQixDQUFDO1lBQzNFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMzQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNoQyxDQUFDLENBQUMsQ0FBQztTQUNIO0lBQ0YsQ0FBQztJQUVELE9BQU87UUFDTixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7Z0hBNUJXLG1CQUFtQjtvR0FBbkIsbUJBQW1CLG9MQ2xCaEMsZ0tBRU07MkZEZ0JPLG1CQUFtQjtrQkFML0IsU0FBUzsrQkFDQyxpQkFBaUI7OEJBS1gsS0FBSztzQkFBcEIsS0FBSztnQkFRVSxRQUFRO3NCQUF2QixLQUFLO2dCQUNXLFdBQVc7c0JBQTNCLE1BQU07Z0JBQ1UsY0FBYztzQkFBOUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcblx0Q29tcG9uZW50LFxyXG5cdElucHV0LFxyXG5cdE91dHB1dCxcclxuXHRFdmVudEVtaXR0ZXIsXHJcblx0T25Jbml0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcblx0Rm9ybUNvbnRyb2xcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vLi4vbXYtZm9ybS1jb3JlL2Zvcm0nO1xyXG5pbXBvcnQgeyBGb3JtRGF0YSB9IGZyb20gJy4uLy4uL212LWZvcm0tY29yZS9mb3JtRGF0YSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2FwcC1tdi1jaGVja2JveCcsXHJcblx0dGVtcGxhdGVVcmw6ICcuL2NvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFtdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdkNoZWNrYm94Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRASW5wdXQoKSBwdWJsaWMgZmllbGQ6IEZpZWxkICB8IHVuZGVmaW5lZCA9IHtcclxuXHRcdGxhYmVsOlwiXCIsXHJcblx0XHRuYW1lOlwiXCIsXHJcblx0XHR2YWx1ZVR5cGU6MCxcclxuXHRcdGVycm9ySWQ6XCJcIixcclxuXHRcdGhpbnQ6XCJcIixcclxuXHRcdGlzUmVxdWlyZWQ6dHJ1ZSxcclxuXHR9O1xyXG5cdEBJbnB1dCgpIHB1YmxpYyBmb3JtRGF0YTogRm9ybURhdGEgfCB1bmRlZmluZWQ7XHJcblx0QE91dHB1dCgpIHB1YmxpYyB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIgPCBib29sZWFuID4gKCk7XHJcblx0QE91dHB1dCgpIHB1YmxpYyBjaGFuZ2VMaXN0ZW5lciA9IG5ldyBFdmVudEVtaXR0ZXIgPCBhbnkgPiAoKTtcclxuXHRwdWJsaWMgY29udHJvbDogRm9ybUNvbnRyb2wgfCB1bmRlZmluZWQ7XHJcblx0cHVibGljIGlzQ2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRuZ09uSW5pdCgpIHtcclxuXHRcdGlmKHRoaXMuZm9ybURhdGEgJiYgdGhpcy5maWVsZCkge1xyXG5cdFx0XHR0aGlzLmNvbnRyb2wgPSB0aGlzLmZvcm1EYXRhLmZvcm1Hcm91cC5nZXQodGhpcy5maWVsZC5uYW1lKSBhcyBGb3JtQ29udHJvbDtcclxuXHRcdFx0dGhpcy5pc0NoZWNrZWQgPSB0aGlzLmNvbnRyb2wudmFsdWU7XHJcblx0XHRcdHRoaXMuY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKHZhbHVlID0+IHtcclxuXHRcdFx0XHR0aGlzLmNoYW5nZUxpc3RlbmVyLm5leHQodmFsdWUpXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y2hhbmdlZCgpIHtcclxuXHRcdHRoaXMuaXNDaGVja2VkID0gdGhpcy5jb250cm9sPy52YWx1ZTtcclxuXHRcdHRoaXMudmFsdWVDaGFuZ2UubmV4dCh0aGlzLmNvbnRyb2w/LnZhbHVlKTtcclxuXHR9XHJcbn0iLCI8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+XHJcbiAgPG1hdC1jaGVja2JveCBjbGFzcz1cImFsaWduLW1hcmdpblwiIChjaGFuZ2UpPVwiY2hhbmdlZCgpXCIgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIj57e2ZpZWxkPy5sYWJlbH19PC9tYXQtY2hlY2tib3g+XHJcbjwvZGl2PiJdfQ==