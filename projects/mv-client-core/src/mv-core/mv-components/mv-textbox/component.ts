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
	selector: 'app-mv-textbox',
	templateUrl: './component.html',
	styleUrls: []
})

/** 
 * Wrapper class for angular material.
 * Unpacks values from the model to render a textbox
 * @ouput - valueChange - value change emitter.
 */
export class MvTextboxComponent implements OnInit {
	@Input() public field: Field  | undefined = {
		label:"",
		name:"",
		valueType:0,
		errorId:"",
		hint:"",
		isRequired:true,
	};
	@Input() public formData: FormData | undefined;;
	@Input() public type: string | undefined;;
	@Output() public valueChange = new EventEmitter < any > ();


	control: FormControl | undefined;

	/**
	 * On component initalization get
	 * form contorl from the formData
	 */
	ngOnInit() {
		if(this.formData && this.field) {
			this.control = this.formData.formGroup.get(this.field.name) as FormControl;
	
		}
	}

	valueChangeDetector(_$event:any) {
		if(this.formData && this.field) {
		this.valueChange.next(this.formData.getFieldValue(this.field.name));
		}
	}
}