import {
	Component,
	Input,
	OnInit
} from '@angular/core';
import {
	FormControl
} from '@angular/forms';
import { Form } from '../../mv-form-core/form';
import { FormData } from '../../mv-form-core/formData';

@Component({
	selector: 'app-mv-form-generator',
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

export class MvFormGeneratorComponent implements OnInit {
	@Input() public formData: FormData | undefined;

	fields: any;
	form: Form | undefined;
	control: FormControl | undefined;

	ngOnInit() {
		this.form = this.formData?.form;
		this.fields = this.formData?.form.fields;
	}
}