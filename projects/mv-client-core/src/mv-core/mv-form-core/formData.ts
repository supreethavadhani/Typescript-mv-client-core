import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { SelectOption, Vo, FieldValues, Message, FilterRequest } from './types';
import { Form, Field, ChildForm } from './form';
import { ServiceAgent } from './serviceAgent';
import { Conventions } from './conventions';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { valuesDictionary } from './default-interface';



export class PanelData {
    /**
    * data as received from the server
    */
    data: Vo = {};
	/**
	 * data for child forms that ane non-tabular
 	 */
    childData: Map<string, PanelData | FormData> = new Map();
    /** 
    * data for child forms that are tabukar
    */
    childTabularData: Map<string, TabularData> = new Map();
    /**
     * set to true when a service is requested from the server.
     * this can be used by the view-component to indicate aciton 
     */
    waitingForServerResponse: boolean = false;
    /**
       * errors returned by the server
       */
    errors: string[] = [];
    /**
     * warnings returned by the server
     */
    warnings: string[] = [];

    /**
     * informations messages received by the server
     */
    info: string[] = [];

    /**
     * form controls for fields/children. empty if this panel is not editable
     */
    formGroup: FormGroup;

    protected hasFg = false;
    constructor(public readonly form: Form, protected readonly serverAgent: ServiceAgent) {
        this.formGroup = new FormGroup({});
        if (!form.childForms) {
            return;
        }
        
        form.childForms.forEach((child: ChildForm, key: string) => {
            if (child.isTabular && child.isEditable) {
                this.childTabularData.set(key, new TabularData(child.form, serverAgent, child.isEditable));
            } else {
                if (child.isEditable) {
                    this.childData.set(key, new FormData(child.form, serverAgent));
                } else {
                    this.childData.set(key, new PanelData(child.form, serverAgent));
                }
            }
        });
    }

    /**
     * get data as a Value Object. HAs values as received from the server.
     * Any input field/control DOES not have the lates value entered by the user.
     * getFieldValue() must be used to get the current value of an input field.
     */
    public getRawData(): Vo {
        return this.data;
    }

    /**
    * @override data is to be set to form group
    * @param data as received from a service request
    */
    public setAll(data: Vo) {
        if (!data) {
            data = {};
        }
        this.data = data;
        if (this.hasFg) {
            this.formGroup.patchValue(data);
        }

        this.childData.forEach((fd, key) => {
            fd.setAll(data[key] as Vo || {});
        });

        this.childTabularData.forEach((table, key) => {
            table.setAll(data[key] as Vo[] || []);
        });
    }

    /**
	 * @returns object contianing all data from form controls. as well as all child forms.
     * Note that this data will not contain fields from non-form panel
	 */
    public extractAll(): Vo {
        const d = this.hasFg ? this.formGroup.value : this.data;
        this.childData.forEach((fd, key) => {
            d[key] = fd.extractAll();
        });

        this.childTabularData.forEach((table, key) => {
            d[key] = table.extractAll();
        });
        return d;
    }

    /**
	 * @returns object contianing all data from form controls, or raw data as recived, but no tany child-data.
     * That is why the returned type id FieldValues and not Vo
	 */
    public extractAllFields(): FieldValues {
        return this.hasFg ? this.formGroup.value : this.data;
    }

    /**
     * 
     * @param name name of the field. Valid field names can be picked up from 
     * static definitions in the form 
     * @param value 
     */
    public setFieldValue(name: string, value: string | number | boolean | null) {
        const fc = this.formGroup.controls[name];
        if (fc) {
            fc.setValue(value);
        }

        this.data[name] = value;
    }

    /**
     * 
     * @param values name-value pairs to be se to this data 
     */
    public setFieldValues(values: FieldValues): void {
        Object.keys(values).forEach(key => {
            this.setFieldValue(key, values[key]);
        });
    }
    /**
      * 
      * @param name name of the field. 
      * concrete classes over-ride this method to restict name values to their valid list
      * @returns value of this field, or null/undefined if this is not a field
      */
    public getFieldValue(name: string): string | number | boolean {
        const fc = this.formGroup.controls[name];
        if (fc) {
            return fc.value;
        }

        return this.data[name] as string | number | boolean;
    }

    /**
     * @param names to be extracted
     * @returns data-object with name-values. null if no value is found for a field 
     */
    public getFieldValues(names: string[]): FieldValues {
        let values:valuesDictionary = {};
        names.forEach(key => {
            values[key] = this.getFieldValue(key);
        });
        return values;
    }

    /**
     * 
     * @param name name of the child field. 
     * Valid child names are available as static members of the form
     * @returns appropriate data for the child form. null/undefined if no such child
     */
    public getChildData(name: string): PanelData | FormData | undefined {
        if (this.childData) {
            return this.childData.get(name);
        }
        return undefined;
    }

    /**
     * 
     * @param name name of the child field. 
     * Valid child names are available as static members of the form
     * @returns appropriate data for the child form. null/undefined if no such child
     */
    public getChildTable(name: string): TabularData | undefined {
        if (this.childTabularData) {
            return this.childTabularData.get(name);
        }
        return undefined;
    }

    /**
     * extarct key fields only
     */
    public extractKeyFields(): FieldValues | null {
        if (this.form.keyFields && this.form.keyFields.length) {
            return this.extractFields(this.form.keyFields);
        }
        console.info('Form has no keys. Doing a get operation with all fields');
        return this.extractAllFields();
    }

    public extractFields(fields: string[]): FieldValues | null{
        if (!fields || !fields.length) {
            return null;
        }
        const data: FieldValues = {};
        fields.forEach(f => {
            data[f] = this.getFieldValue(f);
        });

        return data;
    }
    /**
     * reset the messages. typically called when user dismisses them, or before a server-request is made
     */
    public resetMessages() {
        this.errors = [];
        this.warnings = [];
        this.info = [];
    }

    /**
     * messages are set to this model, from where the 
     * html component can pick it up for rendering
     * @param messages 
     */
    public setMessages(messages: Message[]) {
        this.resetMessages();
        if (messages && messages.forEach) {
            messages.forEach(msg => {
                switch (msg.type) {
                    case "error":
                        this.errors.push(msg.text);
                        break;
                    case "warning":
                        this.warnings.push(msg.text);
                        break;
                    default:
                        this.info.push(msg.text);
                        break;
                }
            });
        } else {
            console.error('Error messages received from server', messages);
        }
    }

    /**
     * invoke a specific service with your own pay load, and receive data into this form data
     * @param serviceName service name. 
     * @param data input expected by the service
     */
    public callService(serviceName: string, data: FieldValues) {
        this.waitingForServerResponse = true;
        this.resetMessages();
        return this.serverAgent.serve(serviceName, { data: data, asQueryParams: true }, !this.form.serveGuests).pipe(
            map((vo:any) => {
                this.waitingForServerResponse = false;
                this.setAll(vo);
                return vo;
            }),
            catchError(msgs => {
                this.waitingForServerResponse = false;
                this.setMessages(msgs);
                throw msgs;
            })
        );
    }
    /**
    * get data for this entity based on primary or unique key
    * caller has to enaure that either key fields, or unique fields have valid values in the model before making this call
    */
    public fetchData() {
        const serviceName = this.form.getServiceName(Conventions.OP_FETCH);
        if (!serviceName) {
            return throwError(Conventions.OP_FETCH + ' operation not allowed');
        }

        const data = this.extractKeyFields();
        if (data == null) {
            const msg = 'Key values not found. Fetch request abandoned';
            console.error(msg);
            return throwError(msg);
        }

        return this.callService(serviceName, data);
    }

    /**
     * fetch data based the provided input. Use this insted of fetch() if the API 
     * requires some data that is not primary key
     * @param data 
     */
    public fetchFor(data: FieldValues) {
        const serviceName = this.form.getServiceName(Conventions.OP_FETCH);
        if (!serviceName) {
            return throwError(Conventions.OP_FETCH + ' operation not allowed');
        }

        return this.callService(serviceName, data);
    }

    /**
     * get filtered rows from the server. 
     * The data received from the server is set to the child-model (PanelData/formData) before returning it to the caller
     * @param child for which data is to be fecthed from the serber
     * @param filters to be applied on the child to get data
     */
    public fetchChildren(child: string, filters: FilterRequest): Observable<Vo[]> {
        const td = this.childTabularData.get(child);
        if (!td) {
            const msg = child + ' is not a tabular child of this panel. operation abandoned';
            console.error(msg);
            return throwError(msg);
        }
        const childForm = this.form.childForms?.get(child)?.form;
        const serviceName = childForm?.getServiceName(Conventions.OP_FILTER);
        if (!serviceName) {
            return throwError(Conventions.OP_FILTER + ' operation not allowed.');
        }

        this.waitingForServerResponse = true;
        this.resetMessages();
        return this.serverAgent.serve(serviceName, { data: filters }).pipe(
            map((vo:any) => {
                const data = vo['list'] as Vo[];
                td.setAll(data);
                this.waitingForServerResponse = false;
                return data;
            }),
            catchError(msgs => {
                this.waitingForServerResponse = false;
                this.setMessages(msgs);
                throw msgs;
            })
        );
    }

    /**
     * filter rows for this form and return raw-rows. 
     * Note that the returned data is NOT set to any model before returning it the caller
     */
    public filter(filters?: FilterRequest): Observable<Vo[]> {
        const serviceName = this.form.getServiceName(Conventions.OP_FILTER);
        if (!serviceName) {
            return throwError(Conventions.OP_FILTER + ' operation is not allowed.');
        }
        const payload = filters ? { data: filters } : {};
        this.resetMessages();
        this.waitingForServerResponse = false;
        return this.serverAgent.serve(serviceName, payload).pipe(
            map((vo:any) => {
                this.waitingForServerResponse = false;
                return vo['list'] as Vo[];
            }),
            catchError(msgs => {
                console.error('catching error in filters fd', msgs)
                this.waitingForServerResponse = false;
                this.setMessages(msgs);
                throw msgs;
            })
        );
    }

    /**
     * filter rows for this form and return raw-rows. 
     * Note that the returned data is NOT set to any model before returning it the caller
     */
    public bulkUpdate(data: Vo[]): Observable<boolean> {
        const serviceName = this.form.getServiceName(Conventions.OP_BULK);
        if (!serviceName) {
            return throwError(Conventions.OP_BULK + ' operation is not allowed.');
        }
        this.resetMessages();
        this.waitingForServerResponse = true;

        return this.serverAgent.serve(serviceName, { data: { list: data } }).pipe(
            map(_vo => {
                this.waitingForServerResponse = false;
                return true;
            }),
            catchError(msgs => {
                this.waitingForServerResponse = false;
                this.setMessages(msgs);
                throw msgs;
            })
        );
    }

    /**
     * validate all editable fields in this form
     */
    public validateForm(): boolean {
        this.formGroup.updateValueAndValidity();
        let ok = this.formGroup.valid;
        if (!ok) {
            console.error('Form ' + this.form.getName() + ' validation failed. Fields in error:', this.getFieldsInError());
        }

        this.childData.forEach((fd) => {
            const b = fd.validateForm();
            ok = ok && b;
        });
        this.childTabularData.forEach((table) => {
            const b = table.validateForm();
            ok = ok && b;
        });
        return ok;
    }

    /**
     * get list of invalid fields in this form.
     * if a child is in error, this does not get the actualfield in the child, but return child itsemf as a field
     */
    public getFieldsInError(): string[] {
        const result: string[] = [];
        if (this.formGroup.valid) {
            return result;
        }
        Object.keys(this.formGroup.controls).forEach((key: string) => {
            const cntr = this.formGroup.controls[key];
            if (cntr.invalid) {
                result.push(key);
            }
        });
        return result;
    }
    /**
     * should we convert this to a promise? Or should we have some standard way of handling error and success?
     */
    public saveAsNew(): Observable<Vo> {
        const serviceName = this.form.getServiceName(Conventions.OP_NEW);
        if (!serviceName) {
            return throwError(Conventions.OP_NEW + ' operation is not allowed.');
        }

        if (!this.validateForm()) {
            //we have to ensure that the field in error is brought to focus!!
            return throwError('One or more fields are in error. Please edit them and re-submit');
        }
        const data = this.extractAll();
        this.waitingForServerResponse = true;
        this.resetMessages();
        return this.serverAgent.serve(serviceName, { data: data }, !this.form.serveGuests).pipe(
            map(vo => {
                this.waitingForServerResponse = false;
                return vo;
            }),
            catchError(msgs => {
                this.setErrorFields(msgs)
                this.waitingForServerResponse = false;
                this.setMessages(msgs);
                console.error(msgs);
                throw new Error("Server returned with errors ");
            })
        );
    }

    /**
     * @param msgs fields in error sent by the server
     * Manually setting error state to the fields sent by the server
     */
    public setErrorFields(msgs: any[]) {
        msgs.forEach(element => {
            this.formGroup.get(element.fieldName)?.setErrors({ 'Invalid': true });
            this.formGroup.markAllAsTouched();
        });
    }

    /**
     * update operation. WHat do we do after successful operation?
     */
    public save() : Observable<Vo> {
        const serviceName = this.form.getServiceName(Conventions.OP_UPDATE);
        if (!serviceName) {
            return throwError(Conventions.OP_UPDATE + ' operation is not allowed.');
        }

        if (!this.validateForm()) {
            //we have to ensure that the field in error is brought to focus!!
            return throwError('Fileds that have errors :' + this.getFieldsInError().join(','));
        }
        const data = this.extractAll();
        this.waitingForServerResponse = true;
        this.resetMessages();
        return this.serverAgent.serve(serviceName, { data: data }, !this.form.serveGuests).pipe(
            map(vo => {
                this.waitingForServerResponse = false;
                //we do not set back values in updaetmode
                return vo;
            }),
            catchError(msgs => {
                this.waitingForServerResponse = false;
                this.setMessages(msgs);
                throw msgs;
            })
        );
    }

    /**
     * delete this entity
     */
    public delete(): Observable<Vo> {
        const serviceName = this.form.getServiceName(Conventions.OP_DELETE);
        if (!serviceName) {
            return throwError(Conventions.OP_DELETE + ' operation is not allowed.');
        }

        const data = this.extractKeyFields();
        this.waitingForServerResponse = true;
        this.resetMessages();
        return this.serverAgent.serve(serviceName, { data: data, asQueryParams: false }).pipe(
            map(vo => {
                this.waitingForServerResponse = false;
                //we do not set back values into fd
                return vo;
            }),
            catchError(msgs => {
                this.waitingForServerResponse = false;
                this.setMessages(msgs);
                throw msgs;
            })
        );
    }

    /**
     * 
     * @param voArray ~ array of Vo 
     * @param form ~ form of the fd
     * @param sa ~ ServerAgent
     * @returns vo as an array of FD 
     * Generally used in bulk update operations
     */
    public toFdArray(voArray: Vo[], form: any, sa: ServiceAgent) {
        let fdArray: FormData[] = [];
        voArray.forEach(vo => {
            const fd = form.newFormData(sa);
            fd.setAll(vo);
            fdArray.push(fd);
        });
        return fdArray;
    }


    /**
     * 
     * @param fdArray ~ Array of FormData to be converted to
     * @returns an array of vo 
     * Generally used in bulk update operations
     */
    public toVoArray(fdArray: FormData[]) {
        let voArray: Vo[] = [];
        fdArray.forEach(fd => {
            voArray.push(fd.extractAll());
        })
        return voArray;
    }
}
/**
 * represents the data contained in a form. Manages two-way binding with input fields in the form
 */
export class FormData extends PanelData {
	/**
	 * list of options/values for all drop-downs in this form. 
     * html components should bind the drop-downs to a member in this 
	 */
    lists: { [key: string]: SelectOption[] } = {};

    constructor(f: Form, sa: ServiceAgent) {
        super(f, sa);
        this.hasFg = true;
        const ctrls = this.form.controls;
        if(this.form.fields) {
            this.form.fields.forEach((field, key) => {
                const ctrl = ctrls?.get(key) || [];
                const fc = new FormControl(field.defaultValue, ctrl);
                this.formGroup.addControl(key, fc);
            });
        }

        this.handleDropDowns(f);
    }

    public setAList(name: string, list: SelectOption[]): void {
        const field = this.formGroup.get(name);
        if (!field) {
            console.error(name + ' is not a field but a drop-down is being set to it');
            return;
        }
        this.lists[name] = list;
        if (!field.value) {
            let value: any = '';
            if (list && list[0]) {
                value = list[0].value;
            }
            if (value) {
                field.setValue(value);
            }
        }
    }
    /**
	 * set drop-down list of values for a field. 
	 * it may be available locally, or we my have to get it from the server
	 * @param field for which drop-down list id to be fetched
     * @param key value of the key field,if this is a keyed-list
	 */
    public setListValues(field: Field, key: string): void {
        if (field.listKey && !key) {
            this.setAList(field.name, []);
            return;
        }
        if (field.keyedList) {
            /*
             * design-time list. locally avaliable
             */
            let arr = field.keyedList[key];
            if (!arr) {
                console.error('Design time list of values for drop-down not available for key=' + key);
                arr = [];
            }
            this.setAList(field.name, arr);
            return;
        }

        /**
         * we have to ask the server to get this
         */
        let data: any;
        if (field.listKey) {
            data = { list: field.listName, key: key };
        } else {
            data = { list: field.listName };
        }

        const obs = this.serverAgent.serve(Conventions.SERVICE_LIST, { data: data });
        obs.subscribe((vo:any) => {
            const arr = vo['list'] as SelectOption[];
            if (arr) {
                this.setAList(field.name, arr);
            } else {
                console.error('Server returned a respnse with no list in it. Drop downwill not work for field ' + field.name)
            }
        }, (msgs:any) => {
            console.error('Error while receiving list values for field ' + field.name + JSON.stringify(msgs));
        });
    }

    /**
     * 
     * @param f form for which we are handling drop-downs.
     */
    private handleDropDowns(f: Form): void | null {
        if (!f.listFields) {
            return null;
        }
        this.lists = {};
        f.listFields.forEach(nam => {
            const field = f.fields?.get(nam);
            if (field?.valueList) {
                this.setAList(nam, field.valueList);
            } else {
                this.setAList(nam, []);
                if (field?.listKey) {
                    const fc = this.formGroup.get(field.listKey) as FormControl;
                    if (!fc) {
                        console.error("Unable to find form control named " + field.listKey + " drop down for field " + field.name + " will not work properly");
                    } else {
                        const val = fc.value;
                        if (val) {
                            this.setListValues(field, val);
                        }
                        fc.valueChanges.subscribe((value: string) => this.setListValues(field, value));
                    }
                } else if(field){
                    //fixed list, but we have to get it from server at run time
                    this.setListValues(field, '');
                }
            }
        });
    }
    /**
     * validate all editable fields in this form
     */
    public override validateForm(): boolean {
        this.formGroup.updateValueAndValidity();
        if (!this.formGroup.valid) {
            this.formGroup.setErrors({ 'err': 'Please enter a valid value' });
            this.formGroup.markAllAsTouched();
            return false;
        }

        const vals = this.form.validations;
        let allOk = true;
        if (vals) {
            for (const v of vals) {
                /**
                 * n is name, f is field, c is cntrol and v is value
                 */
                const n1 = v['f1'];
                const n2 = v['f2'];
                const f1 = this.form.fields?.get(n1);
                const f2 = this.form.fields?.get(n2);
                const v1 = this.getFieldValue(n1);
                const v2 = this.getFieldValue(n2);
                const c1 = this.formGroup.get(n1);
                const c2 = this.formGroup.get(n2);

                let isDateType = false;
                if (f1 && f2 && f1.valueType == Conventions.TYPE_DATE && f2.valueType == Conventions.TYPE_DATE) {
                    isDateType = true;
                }
                const valType = v['type'];
                let ok: boolean;
                if (valType === 'range') {
                    ok = this.validateRange(v1, v2, v['isStrict'], isDateType);
                } else if (valType === 'incl') {
                    ok = this.validateInclPair(v1, v2, v['value']);
                } else if (valType === 'excl') {
                    ok = this.validateExclPair(v1, v2, v['atLeastOne']);
                } else {
                    console.error('Form validation type ' + valType + ' is not valid. validation ignored');
                    ok = true;
                }
                if (!ok) {
                    console.error('Inter field validation failed');
                    const err = { interfield: valType, errorId: v['errorId'] };
                    if (c1 && f1?.controlType != 'Hidden' && f1?.controlType != 'Output') {
                        c1.setErrors(err);
                    }
                    if (c2 && f2?.controlType != 'Hidden' && f2?.controlType != 'Output') {
                        c2.setErrors(err);
                    }
                    allOk = false;
                }
            }
        }

        if (!allOk) {
            console.error('Inter-field validaiton failed');
            return false;
        }

        this.childData.forEach((fd, key) => {
            const b = fd.validateForm();
            if (!b) {
                console.error('Child validation failed');
            }
            allOk = allOk && b;
        });
        this.childTabularData.forEach((table, key) => {
            const b = table.validateForm();
            if (!b) {
                console.error('Child Table validation failed');
            }
            allOk = allOk && b;
        });
        return allOk;
    }
	/**
	 * check if v1 to v2 us a range
	 * @param v1 
	 * @param v2 
	 * @param useStrict if true, v2 must be > v2, v1 == v2 woudn't cut
	 */
    private validateRange(v1: any, v2: any, equalOk: boolean, dateType: boolean): boolean {
        if (dateType) {
            console.error('Date comparison not yet implementd. returning true');
            return true;
        }
        const n1 = v1;
        const n2 = v2;
        if (isNaN(n1) || isNaN(n2)|| n2 > n1) {
            return true;
        }
        if (n1 > n2) {
            return false;
        }
        //equal. is it ok?
        return equalOk;
    }

	/**
	 * two fields have to be both specified or both skipped.
	 * if value is specified, it means that the rule is applicable if v1 == value
	 * @param v1 
	 * @param v2 
	 * @param value 
	 */
    private validateInclPair(v1: string | number | boolean, v2: string | number | boolean, value: any): boolean {
		/*
		 * we assume v1 is specified when a value is given. 
		 * However, if value is specified, then it has to match it' 
		 */
        const v1Specified = v1 && (!value || value == v1);
        if (v1Specified) {
            if (v2) {
                return true;
            }
            return false;
        }
        // v1 is not specified, so v2 should not be specified
        if (v2) {
            return false;
        }
        return true;
    }

	/**
	 * 
	 * @param errorId v1 and v2 are exclusive
	 * @param primaryField 
	 * @param otherField 
	 * @param atLeastOne if true, exactly one of teh twoto be specified
	 */
    private validateExclPair(v1: string | number | boolean, v2: string | number | boolean, noneOk: boolean): boolean {
        if (v1) {
            if (v2) {
                return false;
            }
            return true;
        }
        if (v2) {
            return true;
        }
        //none specifield, is it ok?
        return noneOk;
    }

    /**
     * 
     * @param fieldName name of the drop-down field
     * @returns the displayed value (not the internal value) of this field
     */
    public getDisplayedValueOf(fieldName: string): string {
        const list = this.lists[fieldName];
        if (!list) {
            return '';
        }
        const val = this.getFieldValue(fieldName);
        if (!val) {
            return '';
        }
        const n = list.length;
        for (let i = 0; i < n; i++) {
            const sel = list[i];
            if (sel.value == val) {
                return sel.text;
            }
        }
        return '';
    }
}
/**
 * represents an array of panel data or form data
 */
export class TabularData {
    public childData: Array<PanelData | FormData> = [];
    constructor(public readonly form: Form, private serverAgent: ServiceAgent, public readonly isEditable: boolean) {
    }

    /**
     * set data to this panel
     * @param data 
     */
    setAll(data: Vo[]): void {
        this.childData.length = 0;
        data.forEach(vo => {
            let fd: PanelData | FormData;
            if (this.isEditable) {
                fd = new FormData(this.form, this.serverAgent);
            } else {
                fd = new PanelData(this.form, this.serverAgent)
            }
            fd.setAll(vo);
            this.childData.push(fd);
        });
    }

    /**
     * extract data from each of the child-panel into an array
     */
    extractAll(): Vo[] {
        const data: Vo[] = [];
        this.childData.forEach(fd => data.push(fd.extractAll()));
        return data;
    }

    /**
     * validate all the forms
     * @returns true if all ok. false if any one form-control is in error, or any custom-validaiton fails
     */
    validateForm(): boolean {
        let allOk = true;
        this.childData.forEach(fd => {
            const ok = fd.validateForm();
            allOk = allOk && ok;
        });
        return allOk;
    }

    /**
     * append a default data model to this array
     */
    appendRow(): PanelData | FormData {
        let fd: PanelData | FormData;
        if (this.isEditable) {
            fd = new FormData(this.form, this.serverAgent);
        } else {
            fd = new PanelData(this.form, this.serverAgent);
        }
        this.childData.push(fd);
        return fd;
    }
    /**
      * append a default data model to this array
      */
    removeRow(idx: number) {
        this.childData.splice(idx);
    }

}