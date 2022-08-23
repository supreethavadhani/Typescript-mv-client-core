import {
	Component,
	Input,
	OnInit
} from '@angular/core';
import {
	FormControl,
} from '@angular/forms';
import { Form } from '../../mv-form-core/form';
import { FormData } from '../../mv-form-core/formData';

@Component({
	selector: 'app-mv-field-generator',
	templateUrl: './component.html',
	styleUrls: []
})

/**
 * The componenet unpacks the formdata (input)
 * and renders the all the fields of the form.
 * The component uses Metadev (Mv) components to
 * render the fields
 * @formData - FormData 
 */

export class MvFieldGeneratorComponent implements OnInit {
	@Input() public formData: FormData | undefined;

	fields: any;
	form: Form | undefined;

	ngOnInit() {
		if(this.formData){
		this.form = this.formData.form;
		this.fields = this.formData.form.fields;
		}
	}
}