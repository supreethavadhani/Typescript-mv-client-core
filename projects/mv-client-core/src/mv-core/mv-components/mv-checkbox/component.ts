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

@Component({
	selector: 'app-mv-checkbox',
	templateUrl: './component.html',
	styleUrls: []
})
export class MvCheckboxComponent implements OnInit {
	@Input() public field: Field  | undefined = {
		label:"",
		name:"",
		valueType:0,
		errorId:"",
		hint:"",
		isRequired:true,
	};
	@Input() public formData: FormData | undefined;
	@Output() public valueChange = new EventEmitter < boolean > ();
	@Output() public changeListener = new EventEmitter < any > ();
	public control: FormControl | undefined;
	public isChecked: boolean = false;

	ngOnInit() {
		if(this.formData && this.field) {
			this.control = this.formData.formGroup.get(this.field.name) as FormControl;
			this.isChecked = this.control.value;
			this.control.valueChanges.subscribe(value => {
				this.changeListener.next(value)
			});
		}
	}

	changed() {
		this.isChecked = this.control?.value;
		this.valueChange.next(this.control?.value);
	}
}