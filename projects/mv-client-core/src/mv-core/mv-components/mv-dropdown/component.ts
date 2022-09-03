import {
	Component,
	Input,
	Output,
	EventEmitter,
	OnInit
} from '@angular/core';
import {
	FormControl
} from '@angular/forms';
import { Field } from '../../mv-form-core/form';
import { FormData } from '../../mv-form-core/formData';
/**
 * app-mv -> metadev component prefix
 */
@Component({
	selector: 'app-mv-dropdown',
	templateUrl: './component.html',
	styleUrls: []
})

/** 
 * Wrapper class for angular material.
 * Unpacks values from the model to render a dropdown
 */

export class MvDropDownComponent implements OnInit {
	@Input() public field: Field  | undefined = {
		label:"",
		name:"",
		valueType:0,
		errorId:"",
		hint:"",
		isRequired:true,
	};
	@Input() public formData: FormData | undefined;
	@Input() public type: string | undefined;
	@Output() public valueChange = new EventEmitter < string > ();
	@Output() public changeListener = new EventEmitter < any > ();

	public formControl: FormControl | undefined;

	ngOnInit() {
		if(this.formData && this.field) {
			this.formControl = this.formData.formGroup.get(this.field.name) as FormControl;
			this.formControl.valueChanges.subscribe(value => {
				this.changeListener.next(value)
			});
		}
	}
	currentValue(value: any) {
		this.valueChange.next(value);
	}
}