import {
	Component,
	Input,
	ViewEncapsulation,
	Injectable,
	OnInit
} from '@angular/core';
import {
	FormControl
} from '@angular/forms';
import {
	NativeDateAdapter,
	DateAdapter
} from '@angular/material/core';
import { Field } from '../../mv-form-core/form';
import { FormData } from '../../mv-form-core/formData';

@Injectable()

@Component({
	selector: 'app-mv-date',
	templateUrl: './component.html',
	styleUrls: [],
	providers: [],
	encapsulation: ViewEncapsulation.Emulated,
})
export class MvDatePickerComponent implements OnInit {
	@Input() public field: Field  | undefined = {
		label:"",
		name:"",
		valueType:0,
		errorId:"",
		hint:"",
		isRequired:true,
	};
	@Input() public formData: FormData | undefined;

	public formControl: FormControl | undefined;
	public today = new Date();
	constructor(private dateAdapter: DateAdapter < Date > ) {
		dateAdapter.setLocale('en-in');
	}
	ngOnInit() {
		if(this.formData && this.field) {
			this.formControl = this.formData?.formGroup.get(this.field.name) as FormControl;
			this.formControl.setValue(this.today);
		}
	}
	
	dateChange(_$event: any) {
		this.formControl?.setValue((this.formControl?.value).format("YYYY-MM-DD"))
	}
}