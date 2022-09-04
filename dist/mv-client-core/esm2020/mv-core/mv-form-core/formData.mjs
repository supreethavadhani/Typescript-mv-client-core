import { FormControl, FormGroup } from '@angular/forms';
import { Conventions } from './conventions';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
export class PanelData {
    constructor(form, serverAgent) {
        this.form = form;
        this.serverAgent = serverAgent;
        /**
        * data as received from the server
        */
        this.data = {};
        /**
         * data for child forms that ane non-tabular
         */
        this.childData = new Map();
        /**
        * data for child forms that are tabukar
        */
        this.childTabularData = new Map();
        /**
         * set to true when a service is requested from the server.
         * this can be used by the view-component to indicate aciton
         */
        this.waitingForServerResponse = false;
        /**
           * errors returned by the server
           */
        this.errors = [];
        /**
         * warnings returned by the server
         */
        this.warnings = [];
        /**
         * informations messages received by the server
         */
        this.info = [];
        this.hasFg = false;
        this.formGroup = new FormGroup({});
        if (!form.childForms) {
            return;
        }
        form.childForms.forEach((child, key) => {
            if (child.isTabular && child.isEditable) {
                this.childTabularData.set(key, new TabularData(child.form, serverAgent, child.isEditable));
            }
            else {
                if (child.isEditable) {
                    this.childData.set(key, new FormData(child.form, serverAgent));
                }
                else {
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
    getRawData() {
        return this.data;
    }
    /**
    * @override data is to be set to form group
    * @param data as received from a service request
    */
    setAll(data) {
        if (!data) {
            data = {};
        }
        this.data = data;
        if (this.hasFg) {
            this.formGroup.patchValue(data);
        }
        this.childData.forEach((fd, key) => {
            fd.setAll(data[key] || {});
        });
        this.childTabularData.forEach((table, key) => {
            table.setAll(data[key] || []);
        });
    }
    /**
     * @returns object contianing all data from form controls. as well as all child forms.
     * Note that this data will not contain fields from non-form panel
     */
    extractAll() {
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
    extractAllFields() {
        return this.hasFg ? this.formGroup.value : this.data;
    }
    /**
     *
     * @param name name of the field. Valid field names can be picked up from
     * static definitions in the form
     * @param value
     */
    setFieldValue(name, value) {
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
    setFieldValues(values) {
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
    getFieldValue(name) {
        const fc = this.formGroup.controls[name];
        if (fc) {
            return fc.value;
        }
        return this.data[name];
    }
    /**
     * @param names to be extracted
     * @returns data-object with name-values. null if no value is found for a field
     */
    getFieldValues(names) {
        let values = {};
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
    getChildData(name) {
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
    getChildTable(name) {
        if (this.childTabularData) {
            return this.childTabularData.get(name);
        }
        return undefined;
    }
    /**
     * extarct key fields only
     */
    extractKeyFields() {
        if (this.form.keyFields && this.form.keyFields.length) {
            return this.extractFields(this.form.keyFields);
        }
        console.info('Form has no keys. Doing a get operation with all fields');
        return this.extractAllFields();
    }
    extractFields(fields) {
        if (!fields || !fields.length) {
            return null;
        }
        const data = {};
        fields.forEach(f => {
            data[f] = this.getFieldValue(f);
        });
        return data;
    }
    /**
     * reset the messages. typically called when user dismisses them, or before a server-request is made
     */
    resetMessages() {
        this.errors = [];
        this.warnings = [];
        this.info = [];
    }
    /**
     * messages are set to this model, from where the
     * html component can pick it up for rendering
     * @param messages
     */
    setMessages(messages) {
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
        }
        else {
            console.error('Error messages received from server', messages);
        }
    }
    /**
     * invoke a specific service with your own pay load, and receive data into this form data
     * @param serviceName service name.
     * @param data input expected by the service
     */
    callService(serviceName, data) {
        this.waitingForServerResponse = true;
        this.resetMessages();
        return this.serverAgent.serve(serviceName, { data: data, asQueryParams: true }, !this.form.serveGuests).pipe(map((vo) => {
            this.waitingForServerResponse = false;
            this.setAll(vo);
            return vo;
        }), catchError(msgs => {
            this.waitingForServerResponse = false;
            this.setMessages(msgs);
            throw msgs;
        }));
    }
    /**
    * get data for this entity based on primary or unique key
    * caller has to enaure that either key fields, or unique fields have valid values in the model before making this call
    */
    fetchData() {
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
    fetchFor(data) {
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
    fetchChildren(child, filters) {
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
        return this.serverAgent.serve(serviceName, { data: filters }).pipe(map((vo) => {
            const data = vo['list'];
            td.setAll(data);
            this.waitingForServerResponse = false;
            return data;
        }), catchError(msgs => {
            this.waitingForServerResponse = false;
            this.setMessages(msgs);
            throw msgs;
        }));
    }
    /**
     * filter rows for this form and return raw-rows.
     * Note that the returned data is NOT set to any model before returning it the caller
     */
    filter(filters) {
        const serviceName = this.form.getServiceName(Conventions.OP_FILTER);
        if (!serviceName) {
            return throwError(Conventions.OP_FILTER + ' operation is not allowed.');
        }
        const payload = filters ? { data: filters } : {};
        this.resetMessages();
        this.waitingForServerResponse = false;
        return this.serverAgent.serve(serviceName, payload).pipe(map((vo) => {
            this.waitingForServerResponse = false;
            return vo['list'];
        }), catchError(msgs => {
            console.error('catching error in filters fd', msgs);
            this.waitingForServerResponse = false;
            this.setMessages(msgs);
            throw msgs;
        }));
    }
    /**
     * filter rows for this form and return raw-rows.
     * Note that the returned data is NOT set to any model before returning it the caller
     */
    bulkUpdate(data) {
        const serviceName = this.form.getServiceName(Conventions.OP_BULK);
        if (!serviceName) {
            return throwError(Conventions.OP_BULK + ' operation is not allowed.');
        }
        this.resetMessages();
        this.waitingForServerResponse = true;
        return this.serverAgent.serve(serviceName, { data: { list: data } }).pipe(map(_vo => {
            this.waitingForServerResponse = false;
            return true;
        }), catchError(msgs => {
            this.waitingForServerResponse = false;
            this.setMessages(msgs);
            throw msgs;
        }));
    }
    /**
     * validate all editable fields in this form
     */
    validateForm() {
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
    getFieldsInError() {
        const result = [];
        if (this.formGroup.valid) {
            return result;
        }
        Object.keys(this.formGroup.controls).forEach((key) => {
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
    saveAsNew() {
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
        return this.serverAgent.serve(serviceName, { data: data }, !this.form.serveGuests).pipe(map(vo => {
            this.waitingForServerResponse = false;
            return vo;
        }), catchError(msgs => {
            this.setErrorFields(msgs);
            this.waitingForServerResponse = false;
            this.setMessages(msgs);
            console.error(msgs);
            throw new Error("Server returned with errors ");
        }));
    }
    /**
     * @param msgs fields in error sent by the server
     * Manually setting error state to the fields sent by the server
     */
    setErrorFields(msgs) {
        msgs.forEach(element => {
            this.formGroup.get(element.fieldName)?.setErrors({ 'Invalid': true });
            this.formGroup.markAllAsTouched();
        });
    }
    /**
     * update operation. WHat do we do after successful operation?
     */
    save() {
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
        return this.serverAgent.serve(serviceName, { data: data }, !this.form.serveGuests).pipe(map(vo => {
            this.waitingForServerResponse = false;
            //we do not set back values in updaetmode
            return vo;
        }), catchError(msgs => {
            this.waitingForServerResponse = false;
            this.setMessages(msgs);
            throw msgs;
        }));
    }
    /**
     * delete this entity
     */
    delete() {
        const serviceName = this.form.getServiceName(Conventions.OP_DELETE);
        if (!serviceName) {
            return throwError(Conventions.OP_DELETE + ' operation is not allowed.');
        }
        const data = this.extractKeyFields();
        this.waitingForServerResponse = true;
        this.resetMessages();
        return this.serverAgent.serve(serviceName, { data: data, asQueryParams: false }).pipe(map(vo => {
            this.waitingForServerResponse = false;
            //we do not set back values into fd
            return vo;
        }), catchError(msgs => {
            this.waitingForServerResponse = false;
            this.setMessages(msgs);
            throw msgs;
        }));
    }
    /**
     *
     * @param voArray ~ array of Vo
     * @param form ~ form of the fd
     * @param sa ~ ServerAgent
     * @returns vo as an array of FD
     * Generally used in bulk update operations
     */
    toFdArray(voArray, form, sa) {
        let fdArray = [];
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
    toVoArray(fdArray) {
        let voArray = [];
        fdArray.forEach(fd => {
            voArray.push(fd.extractAll());
        });
        return voArray;
    }
}
/**
 * represents the data contained in a form. Manages two-way binding with input fields in the form
 */
export class FormData extends PanelData {
    constructor(f, sa) {
        super(f, sa);
        /**
         * list of options/values for all drop-downs in this form.
         * html components should bind the drop-downs to a member in this
         */
        this.lists = {};
        this.hasFg = true;
        const ctrls = this.form.controls;
        if (this.form.fields) {
            this.form.fields.forEach((field, key) => {
                const ctrl = ctrls?.get(key) || [];
                const fc = new FormControl(field.defaultValue, ctrl);
                this.formGroup.addControl(key, fc);
            });
        }
        this.handleDropDowns(f);
    }
    setAList(name, list) {
        const field = this.formGroup.get(name);
        if (!field) {
            console.error(name + ' is not a field but a drop-down is being set to it');
            return;
        }
        this.lists[name] = list;
        if (!field.value) {
            let value = '';
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
    setListValues(field, key) {
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
        let data;
        if (field.listKey) {
            data = { list: field.listName, key: key };
        }
        else {
            data = { list: field.listName };
        }
        const obs = this.serverAgent.serve(Conventions.SERVICE_LIST, { data: data });
        obs.subscribe((vo) => {
            const arr = vo['list'];
            if (arr) {
                this.setAList(field.name, arr);
            }
            else {
                console.error('Server returned a respnse with no list in it. Drop downwill not work for field ' + field.name);
            }
        }, (msgs) => {
            console.error('Error while receiving list values for field ' + field.name + JSON.stringify(msgs));
        });
    }
    /**
     *
     * @param f form for which we are handling drop-downs.
     */
    handleDropDowns(f) {
        if (!f.listFields) {
            return null;
        }
        this.lists = {};
        f.listFields.forEach(nam => {
            const field = f.fields?.get(nam);
            if (field?.valueList) {
                this.setAList(nam, field.valueList);
            }
            else {
                this.setAList(nam, []);
                if (field?.listKey) {
                    const fc = this.formGroup.get(field.listKey);
                    if (!fc) {
                        console.error("Unable to find form control named " + field.listKey + " drop down for field " + field.name + " will not work properly");
                    }
                    else {
                        const val = fc.value;
                        if (val) {
                            this.setListValues(field, val);
                        }
                        fc.valueChanges.subscribe((value) => this.setListValues(field, value));
                    }
                }
                else if (field) {
                    //fixed list, but we have to get it from server at run time
                    this.setListValues(field, '');
                }
            }
        });
    }
    /**
     * validate all editable fields in this form
     */
    validateForm() {
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
                let ok;
                if (valType === 'range') {
                    ok = this.validateRange(v1, v2, v['isStrict'], isDateType);
                }
                else if (valType === 'incl') {
                    ok = this.validateInclPair(v1, v2, v['value']);
                }
                else if (valType === 'excl') {
                    ok = this.validateExclPair(v1, v2, v['atLeastOne']);
                }
                else {
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
    validateRange(v1, v2, equalOk, dateType) {
        if (dateType) {
            console.error('Date comparison not yet implementd. returning true');
            return true;
        }
        const n1 = v1;
        const n2 = v2;
        if (isNaN(n1) || isNaN(n2) || n2 > n1) {
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
    validateInclPair(v1, v2, value) {
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
    validateExclPair(v1, v2, noneOk) {
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
    getDisplayedValueOf(fieldName) {
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
    constructor(form, serverAgent, isEditable) {
        this.form = form;
        this.serverAgent = serverAgent;
        this.isEditable = isEditable;
        this.childData = [];
    }
    /**
     * set data to this panel
     * @param data
     */
    setAll(data) {
        this.childData.length = 0;
        data.forEach(vo => {
            let fd;
            if (this.isEditable) {
                fd = new FormData(this.form, this.serverAgent);
            }
            else {
                fd = new PanelData(this.form, this.serverAgent);
            }
            fd.setAll(vo);
            this.childData.push(fd);
        });
    }
    /**
     * extract data from each of the child-panel into an array
     */
    extractAll() {
        const data = [];
        this.childData.forEach(fd => data.push(fd.extractAll()));
        return data;
    }
    /**
     * validate all the forms
     * @returns true if all ok. false if any one form-control is in error, or any custom-validaiton fails
     */
    validateForm() {
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
    appendRow() {
        let fd;
        if (this.isEditable) {
            fd = new FormData(this.form, this.serverAgent);
        }
        else {
            fd = new PanelData(this.form, this.serverAgent);
        }
        this.childData.push(fd);
        return fd;
    }
    /**
      * append a default data model to this array
      */
    removeRow(idx) {
        this.childData.splice(idx);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tdi1jbGllbnQtY29yZS9zcmMvbXYtY29yZS9tdi1mb3JtLWNvcmUvZm9ybURhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQWUsTUFBTSxnQkFBZ0IsQ0FBQztBQUlyRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUtqRCxNQUFNLE9BQU8sU0FBUztJQXNDbEIsWUFBNEIsSUFBVSxFQUFxQixXQUF5QjtRQUF4RCxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQXFCLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1FBckNwRjs7VUFFRTtRQUNGLFNBQUksR0FBTyxFQUFFLENBQUM7UUFDakI7O1dBRUk7UUFDRCxjQUFTLEdBQXNDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDekQ7O1VBRUU7UUFDRixxQkFBZ0IsR0FBNkIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUN2RDs7O1dBR0c7UUFDSCw2QkFBd0IsR0FBWSxLQUFLLENBQUM7UUFDMUM7O2FBRUs7UUFDTCxXQUFNLEdBQWEsRUFBRSxDQUFDO1FBQ3RCOztXQUVHO1FBQ0gsYUFBUSxHQUFhLEVBQUUsQ0FBQztRQUV4Qjs7V0FFRztRQUNILFNBQUksR0FBYSxFQUFFLENBQUM7UUFPVixVQUFLLEdBQUcsS0FBSyxDQUFDO1FBRXBCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbEIsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxP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QUM7UUFDSCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxTQUFTO1FBQ0wsSUFBSSxFQUF3QixDQUFDO1FBQzdCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixFQUFFLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbEQ7YUFBTTtZQUNILEVBQUUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNuRDtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUNEOztRQUVJO0lBQ0osU0FBUyxDQUFDLEdBQVc7UUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztDQUVKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFNlbGVjdE9wdGlvbiwgVm8sIEZpZWxkVmFsdWVzLCBNZXNzYWdlLCBGaWx0ZXJSZXF1ZXN0IH0gZnJvbSAnLi90eXBlcyc7XHJcbmltcG9ydCB7IEZvcm0sIEZpZWxkLCBDaGlsZEZvcm0gfSBmcm9tICcuL2Zvcm0nO1xyXG5pbXBvcnQgeyBTZXJ2aWNlQWdlbnQgfSBmcm9tICcuL3NlcnZpY2VBZ2VudCc7XHJcbmltcG9ydCB7IENvbnZlbnRpb25zIH0gZnJvbSAnLi9jb252ZW50aW9ucyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyB2YWx1ZXNEaWN0aW9uYXJ5IH0gZnJvbSAnLi9kZWZhdWx0LWludGVyZmFjZSc7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBQYW5lbERhdGEge1xyXG4gICAgLyoqXHJcbiAgICAqIGRhdGEgYXMgcmVjZWl2ZWQgZnJvbSB0aGUgc2VydmVyXHJcbiAgICAqL1xyXG4gICAgZGF0YTogVm8gPSB7fTtcclxuXHQvKipcclxuXHQgKiBkYXRhIGZvciBjaGlsZCBmb3JtcyB0aGF0IGFuZSBub24tdGFidWxhclxyXG4gXHQgKi9cclxuICAgIGNoaWxkRGF0YTogTWFwPHN0cmluZywgUGFuZWxEYXRhIHwgRm9ybURhdGE+ID0gbmV3IE1hcCgpO1xyXG4gICAgLyoqIFxyXG4gICAgKiBkYXRhIGZvciBjaGlsZCBmb3JtcyB0aGF0IGFyZSB0YWJ1a2FyXHJcbiAgICAqL1xyXG4gICAgY2hpbGRUYWJ1bGFyRGF0YTogTWFwPHN0cmluZywgVGFidWxhckRhdGE+ID0gbmV3IE1hcCgpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBzZXQgdG8gdHJ1ZSB3aGVuIGEgc2VydmljZSBpcyByZXF1ZXN0ZWQgZnJvbSB0aGUgc2VydmVyLlxyXG4gICAgICogdGhpcyBjYW4gYmUgdXNlZCBieSB0aGUgdmlldy1jb21wb25lbnQgdG8gaW5kaWNhdGUgYWNpdG9uIFxyXG4gICAgICovXHJcbiAgICB3YWl0aW5nRm9yU2VydmVyUmVzcG9uc2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKlxyXG4gICAgICAgKiBlcnJvcnMgcmV0dXJuZWQgYnkgdGhlIHNlcnZlclxyXG4gICAgICAgKi9cclxuICAgIGVycm9yczogc3RyaW5nW10gPSBbXTtcclxuICAgIC8qKlxyXG4gICAgICogd2FybmluZ3MgcmV0dXJuZWQgYnkgdGhlIHNlcnZlclxyXG4gICAgICovXHJcbiAgICB3YXJuaW5nczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGluZm9ybWF0aW9ucyBtZXNzYWdlcyByZWNlaXZlZCBieSB0aGUgc2VydmVyXHJcbiAgICAgKi9cclxuICAgIGluZm86IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBmb3JtIGNvbnRyb2xzIGZvciBmaWVsZHMvY2hpbGRyZW4uIGVtcHR5IGlmIHRoaXMgcGFuZWwgaXMgbm90IGVkaXRhYmxlXHJcbiAgICAgKi9cclxuICAgIGZvcm1Hcm91cDogRm9ybUdyb3VwO1xyXG5cclxuICAgIHByb3RlY3RlZCBoYXNGZyA9IGZhbHNlO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGZvcm06IEZvcm0sIHByb3RlY3RlZCByZWFkb25seSBzZXJ2ZXJBZ2VudDogU2VydmljZUFnZW50KSB7XHJcbiAgICAgICAgdGhpcy5mb3JtR3JvdXAgPSBuZXcgRm9ybUdyb3VwKHt9KTtcclxuICAgICAgICBpZiAoIWZvcm0uY2hpbGRGb3Jtcykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcm0uY2hpbGRGb3Jtcy5mb3JFYWNoKChjaGlsZDogQ2hpbGRGb3JtLCBrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQuaXNUYWJ1bGFyICYmIGNoaWxkLmlzRWRpdGFibGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRUYWJ1bGFyRGF0YS5zZXQoa2V5LCBuZXcgVGFidWxhckRhdGEoY2hpbGQuZm9ybSwgc2VydmVyQWdlbnQsIGNoaWxkLmlzRWRpdGFibGUpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZC5pc0VkaXRhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZERhdGEuc2V0KGtleSwgbmV3IEZvcm1EYXRhKGNoaWxkLmZvcm0sIHNlcnZlckFnZW50KSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGREYXRhLnNldChrZXksIG5ldyBQYW5lbERhdGEoY2hpbGQuZm9ybSwgc2VydmVyQWdlbnQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IGRhdGEgYXMgYSBWYWx1ZSBPYmplY3QuIEhBcyB2YWx1ZXMgYXMgcmVjZWl2ZWQgZnJvbSB0aGUgc2VydmVyLlxyXG4gICAgICogQW55IGlucHV0IGZpZWxkL2NvbnRyb2wgRE9FUyBub3QgaGF2ZSB0aGUgbGF0ZXMgdmFsdWUgZW50ZXJlZCBieSB0aGUgdXNlci5cclxuICAgICAqIGdldEZpZWxkVmFsdWUoKSBtdXN0IGJlIHVzZWQgdG8gZ2V0IHRoZSBjdXJyZW50IHZhbHVlIG9mIGFuIGlucHV0IGZpZWxkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UmF3RGF0YSgpOiBWbyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogQG92ZXJyaWRlIGRhdGEgaXMgdG8gYmUgc2V0IHRvIGZvcm0gZ3JvdXBcclxuICAgICogQHBhcmFtIGRhdGEgYXMgcmVjZWl2ZWQgZnJvbSBhIHNlcnZpY2UgcmVxdWVzdFxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBzZXRBbGwoZGF0YTogVm8pIHtcclxuICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgICAgZGF0YSA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0ZnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUdyb3VwLnBhdGNoVmFsdWUoZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNoaWxkRGF0YS5mb3JFYWNoKChmZCwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGZkLnNldEFsbChkYXRhW2tleV0gYXMgVm8gfHwge30pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNoaWxkVGFidWxhckRhdGEuZm9yRWFjaCgodGFibGUsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICB0YWJsZS5zZXRBbGwoZGF0YVtrZXldIGFzIFZvW10gfHwgW10pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG5cdCAqIEByZXR1cm5zIG9iamVjdCBjb250aWFuaW5nIGFsbCBkYXRhIGZyb20gZm9ybSBjb250cm9scy4gYXMgd2VsbCBhcyBhbGwgY2hpbGQgZm9ybXMuXHJcbiAgICAgKiBOb3RlIHRoYXQgdGhpcyBkYXRhIHdpbGwgbm90IGNvbnRhaW4gZmllbGRzIGZyb20gbm9uLWZvcm0gcGFuZWxcclxuXHQgKi9cclxuICAgIHB1YmxpYyBleHRyYWN0QWxsKCk6IFZvIHtcclxuICAgICAgICBjb25zdCBkID0gdGhpcy5oYXNGZyA/IHRoaXMuZm9ybUdyb3VwLnZhbHVlIDogdGhpcy5kYXRhO1xyXG4gICAgICAgIHRoaXMuY2hpbGREYXRhLmZvckVhY2goKGZkLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgZFtrZXldID0gZmQuZXh0cmFjdEFsbCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNoaWxkVGFidWxhckRhdGEuZm9yRWFjaCgodGFibGUsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBkW2tleV0gPSB0YWJsZS5leHRyYWN0QWxsKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcblx0ICogQHJldHVybnMgb2JqZWN0IGNvbnRpYW5pbmcgYWxsIGRhdGEgZnJvbSBmb3JtIGNvbnRyb2xzLCBvciByYXcgZGF0YSBhcyByZWNpdmVkLCBidXQgbm8gdGFueSBjaGlsZC1kYXRhLlxyXG4gICAgICogVGhhdCBpcyB3aHkgdGhlIHJldHVybmVkIHR5cGUgaWQgRmllbGRWYWx1ZXMgYW5kIG5vdCBWb1xyXG5cdCAqL1xyXG4gICAgcHVibGljIGV4dHJhY3RBbGxGaWVsZHMoKTogRmllbGRWYWx1ZXMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhhc0ZnID8gdGhpcy5mb3JtR3JvdXAudmFsdWUgOiB0aGlzLmRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBuYW1lIG5hbWUgb2YgdGhlIGZpZWxkLiBWYWxpZCBmaWVsZCBuYW1lcyBjYW4gYmUgcGlja2VkIHVwIGZyb20gXHJcbiAgICAgKiBzdGF0aWMgZGVmaW5pdGlvbnMgaW4gdGhlIGZvcm0gXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRGaWVsZFZhbHVlKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBudWxsKSB7XHJcbiAgICAgICAgY29uc3QgZmMgPSB0aGlzLmZvcm1Hcm91cC5jb250cm9sc1tuYW1lXTtcclxuICAgICAgICBpZiAoZmMpIHtcclxuICAgICAgICAgICAgZmMuc2V0VmFsdWUodmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kYXRhW25hbWVdID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB2YWx1ZXMgbmFtZS12YWx1ZSBwYWlycyB0byBiZSBzZSB0byB0aGlzIGRhdGEgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRGaWVsZFZhbHVlcyh2YWx1ZXM6IEZpZWxkVmFsdWVzKTogdm9pZCB7XHJcbiAgICAgICAgT2JqZWN0LmtleXModmFsdWVzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RmllbGRWYWx1ZShrZXksIHZhbHVlc1trZXldKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICAqIFxyXG4gICAgICAqIEBwYXJhbSBuYW1lIG5hbWUgb2YgdGhlIGZpZWxkLiBcclxuICAgICAgKiBjb25jcmV0ZSBjbGFzc2VzIG92ZXItcmlkZSB0aGlzIG1ldGhvZCB0byByZXN0aWN0IG5hbWUgdmFsdWVzIHRvIHRoZWlyIHZhbGlkIGxpc3RcclxuICAgICAgKiBAcmV0dXJucyB2YWx1ZSBvZiB0aGlzIGZpZWxkLCBvciBudWxsL3VuZGVmaW5lZCBpZiB0aGlzIGlzIG5vdCBhIGZpZWxkXHJcbiAgICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RmllbGRWYWx1ZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBmYyA9IHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzW25hbWVdO1xyXG4gICAgICAgIGlmIChmYykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmMudmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhW25hbWVdIGFzIHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gbmFtZXMgdG8gYmUgZXh0cmFjdGVkXHJcbiAgICAgKiBAcmV0dXJucyBkYXRhLW9iamVjdCB3aXRoIG5hbWUtdmFsdWVzLiBudWxsIGlmIG5vIHZhbHVlIGlzIGZvdW5kIGZvciBhIGZpZWxkIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RmllbGRWYWx1ZXMobmFtZXM6IHN0cmluZ1tdKTogRmllbGRWYWx1ZXMge1xyXG4gICAgICAgIGxldCB2YWx1ZXM6dmFsdWVzRGljdGlvbmFyeSA9IHt9O1xyXG4gICAgICAgIG5hbWVzLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgdmFsdWVzW2tleV0gPSB0aGlzLmdldEZpZWxkVmFsdWUoa2V5KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdmFsdWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBuYW1lIG9mIHRoZSBjaGlsZCBmaWVsZC4gXHJcbiAgICAgKiBWYWxpZCBjaGlsZCBuYW1lcyBhcmUgYXZhaWxhYmxlIGFzIHN0YXRpYyBtZW1iZXJzIG9mIHRoZSBmb3JtXHJcbiAgICAgKiBAcmV0dXJucyBhcHByb3ByaWF0ZSBkYXRhIGZvciB0aGUgY2hpbGQgZm9ybS4gbnVsbC91bmRlZmluZWQgaWYgbm8gc3VjaCBjaGlsZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q2hpbGREYXRhKG5hbWU6IHN0cmluZyk6IFBhbmVsRGF0YSB8IEZvcm1EYXRhIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAodGhpcy5jaGlsZERhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGREYXRhLmdldChuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIG5hbWUgbmFtZSBvZiB0aGUgY2hpbGQgZmllbGQuIFxyXG4gICAgICogVmFsaWQgY2hpbGQgbmFtZXMgYXJlIGF2YWlsYWJsZSBhcyBzdGF0aWMgbWVtYmVycyBvZiB0aGUgZm9ybVxyXG4gICAgICogQHJldHVybnMgYXBwcm9wcmlhdGUgZGF0YSBmb3IgdGhlIGNoaWxkIGZvcm0uIG51bGwvdW5kZWZpbmVkIGlmIG5vIHN1Y2ggY2hpbGRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENoaWxkVGFibGUobmFtZTogc3RyaW5nKTogVGFidWxhckRhdGEgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICh0aGlzLmNoaWxkVGFidWxhckRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRUYWJ1bGFyRGF0YS5nZXQobmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBleHRhcmN0IGtleSBmaWVsZHMgb25seVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZXh0cmFjdEtleUZpZWxkcygpOiBGaWVsZFZhbHVlcyB8IG51bGwge1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm0ua2V5RmllbGRzICYmIHRoaXMuZm9ybS5rZXlGaWVsZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4dHJhY3RGaWVsZHModGhpcy5mb3JtLmtleUZpZWxkcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUuaW5mbygnRm9ybSBoYXMgbm8ga2V5cy4gRG9pbmcgYSBnZXQgb3BlcmF0aW9uIHdpdGggYWxsIGZpZWxkcycpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmV4dHJhY3RBbGxGaWVsZHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXh0cmFjdEZpZWxkcyhmaWVsZHM6IHN0cmluZ1tdKTogRmllbGRWYWx1ZXMgfCBudWxse1xyXG4gICAgICAgIGlmICghZmllbGRzIHx8ICFmaWVsZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkYXRhOiBGaWVsZFZhbHVlcyA9IHt9O1xyXG4gICAgICAgIGZpZWxkcy5mb3JFYWNoKGYgPT4ge1xyXG4gICAgICAgICAgICBkYXRhW2ZdID0gdGhpcy5nZXRGaWVsZFZhbHVlKGYpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogcmVzZXQgdGhlIG1lc3NhZ2VzLiB0eXBpY2FsbHkgY2FsbGVkIHdoZW4gdXNlciBkaXNtaXNzZXMgdGhlbSwgb3IgYmVmb3JlIGEgc2VydmVyLXJlcXVlc3QgaXMgbWFkZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzZXRNZXNzYWdlcygpIHtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xyXG4gICAgICAgIHRoaXMud2FybmluZ3MgPSBbXTtcclxuICAgICAgICB0aGlzLmluZm8gPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG1lc3NhZ2VzIGFyZSBzZXQgdG8gdGhpcyBtb2RlbCwgZnJvbSB3aGVyZSB0aGUgXHJcbiAgICAgKiBodG1sIGNvbXBvbmVudCBjYW4gcGljayBpdCB1cCBmb3IgcmVuZGVyaW5nXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZXMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRNZXNzYWdlcyhtZXNzYWdlczogTWVzc2FnZVtdKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldE1lc3NhZ2VzKCk7XHJcbiAgICAgICAgaWYgKG1lc3NhZ2VzICYmIG1lc3NhZ2VzLmZvckVhY2gpIHtcclxuICAgICAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChtc2cgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChtc2cudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlcnJvclwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9ycy5wdXNoKG1zZy50ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIndhcm5pbmdcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YXJuaW5ncy5wdXNoKG1zZy50ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZvLnB1c2gobXNnLnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbWVzc2FnZXMgcmVjZWl2ZWQgZnJvbSBzZXJ2ZXInLCBtZXNzYWdlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaW52b2tlIGEgc3BlY2lmaWMgc2VydmljZSB3aXRoIHlvdXIgb3duIHBheSBsb2FkLCBhbmQgcmVjZWl2ZSBkYXRhIGludG8gdGhpcyBmb3JtIGRhdGFcclxuICAgICAqIEBwYXJhbSBzZXJ2aWNlTmFtZSBzZXJ2aWNlIG5hbWUuIFxyXG4gICAgICogQHBhcmFtIGRhdGEgaW5wdXQgZXhwZWN0ZWQgYnkgdGhlIHNlcnZpY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNhbGxTZXJ2aWNlKHNlcnZpY2VOYW1lOiBzdHJpbmcsIGRhdGE6IEZpZWxkVmFsdWVzKSB7XHJcbiAgICAgICAgdGhpcy53YWl0aW5nRm9yU2VydmVyUmVzcG9uc2UgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVzZXRNZXNzYWdlcygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZlckFnZW50LnNlcnZlKHNlcnZpY2VOYW1lLCB7IGRhdGE6IGRhdGEsIGFzUXVlcnlQYXJhbXM6IHRydWUgfSwgIXRoaXMuZm9ybS5zZXJ2ZUd1ZXN0cykucGlwZShcclxuICAgICAgICAgICAgbWFwKCh2bzphbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZ0ZvclNlcnZlclJlc3BvbnNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFsbCh2byk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdm87XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKG1zZ3MgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YWl0aW5nRm9yU2VydmVyUmVzcG9uc2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TWVzc2FnZXMobXNncyk7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBtc2dzO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogZ2V0IGRhdGEgZm9yIHRoaXMgZW50aXR5IGJhc2VkIG9uIHByaW1hcnkgb3IgdW5pcXVlIGtleVxyXG4gICAgKiBjYWxsZXIgaGFzIHRvIGVuYXVyZSB0aGF0IGVpdGhlciBrZXkgZmllbGRzLCBvciB1bmlxdWUgZmllbGRzIGhhdmUgdmFsaWQgdmFsdWVzIGluIHRoZSBtb2RlbCBiZWZvcmUgbWFraW5nIHRoaXMgY2FsbFxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBmZXRjaERhdGEoKSB7XHJcbiAgICAgICAgY29uc3Qgc2VydmljZU5hbWUgPSB0aGlzLmZvcm0uZ2V0U2VydmljZU5hbWUoQ29udmVudGlvbnMuT1BfRkVUQ0gpO1xyXG4gICAgICAgIGlmICghc2VydmljZU5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoQ29udmVudGlvbnMuT1BfRkVUQ0ggKyAnIG9wZXJhdGlvbiBub3QgYWxsb3dlZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuZXh0cmFjdEtleUZpZWxkcygpO1xyXG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIHtcclxuICAgICAgICAgICAgY29uc3QgbXNnID0gJ0tleSB2YWx1ZXMgbm90IGZvdW5kLiBGZXRjaCByZXF1ZXN0IGFiYW5kb25lZCc7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IobXNnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGxTZXJ2aWNlKHNlcnZpY2VOYW1lLCBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGZldGNoIGRhdGEgYmFzZWQgdGhlIHByb3ZpZGVkIGlucHV0LiBVc2UgdGhpcyBpbnN0ZWQgb2YgZmV0Y2goKSBpZiB0aGUgQVBJIFxyXG4gICAgICogcmVxdWlyZXMgc29tZSBkYXRhIHRoYXQgaXMgbm90IHByaW1hcnkga2V5XHJcbiAgICAgKiBAcGFyYW0gZGF0YSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZldGNoRm9yKGRhdGE6IEZpZWxkVmFsdWVzKSB7XHJcbiAgICAgICAgY29uc3Qgc2VydmljZU5hbWUgPSB0aGlzLmZvcm0uZ2V0U2VydmljZU5hbWUoQ29udmVudGlvbnMuT1BfRkVUQ0gpO1xyXG4gICAgICAgIGlmICghc2VydmljZU5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoQ29udmVudGlvbnMuT1BfRkVUQ0ggKyAnIG9wZXJhdGlvbiBub3QgYWxsb3dlZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbFNlcnZpY2Uoc2VydmljZU5hbWUsIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IGZpbHRlcmVkIHJvd3MgZnJvbSB0aGUgc2VydmVyLiBcclxuICAgICAqIFRoZSBkYXRhIHJlY2VpdmVkIGZyb20gdGhlIHNlcnZlciBpcyBzZXQgdG8gdGhlIGNoaWxkLW1vZGVsIChQYW5lbERhdGEvZm9ybURhdGEpIGJlZm9yZSByZXR1cm5pbmcgaXQgdG8gdGhlIGNhbGxlclxyXG4gICAgICogQHBhcmFtIGNoaWxkIGZvciB3aGljaCBkYXRhIGlzIHRvIGJlIGZlY3RoZWQgZnJvbSB0aGUgc2VyYmVyXHJcbiAgICAgKiBAcGFyYW0gZmlsdGVycyB0byBiZSBhcHBsaWVkIG9uIHRoZSBjaGlsZCB0byBnZXQgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmV0Y2hDaGlsZHJlbihjaGlsZDogc3RyaW5nLCBmaWx0ZXJzOiBGaWx0ZXJSZXF1ZXN0KTogT2JzZXJ2YWJsZTxWb1tdPiB7XHJcbiAgICAgICAgY29uc3QgdGQgPSB0aGlzLmNoaWxkVGFidWxhckRhdGEuZ2V0KGNoaWxkKTtcclxuICAgICAgICBpZiAoIXRkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IGNoaWxkICsgJyBpcyBub3QgYSB0YWJ1bGFyIGNoaWxkIG9mIHRoaXMgcGFuZWwuIG9wZXJhdGlvbiBhYmFuZG9uZWQnO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNoaWxkRm9ybSA9IHRoaXMuZm9ybS5jaGlsZEZvcm1zPy5nZXQoY2hpbGQpPy5mb3JtO1xyXG4gICAgICAgIGNvbnN0IHNlcnZpY2VOYW1lID0gY2hpbGRGb3JtPy5nZXRTZXJ2aWNlTmFtZShDb252ZW50aW9ucy5PUF9GSUxURVIpO1xyXG4gICAgICAgIGlmICghc2VydmljZU5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoQ29udmVudGlvbnMuT1BfRklMVEVSICsgJyBvcGVyYXRpb24gbm90IGFsbG93ZWQuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLndhaXRpbmdGb3JTZXJ2ZXJSZXNwb25zZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZXNldE1lc3NhZ2VzKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVyQWdlbnQuc2VydmUoc2VydmljZU5hbWUsIHsgZGF0YTogZmlsdGVycyB9KS5waXBlKFxyXG4gICAgICAgICAgICBtYXAoKHZvOmFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHZvWydsaXN0J10gYXMgVm9bXTtcclxuICAgICAgICAgICAgICAgIHRkLnNldEFsbChkYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZ0ZvclNlcnZlclJlc3BvbnNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IobXNncyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndhaXRpbmdGb3JTZXJ2ZXJSZXNwb25zZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNZXNzYWdlcyhtc2dzKTtcclxuICAgICAgICAgICAgICAgIHRocm93IG1zZ3M7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGZpbHRlciByb3dzIGZvciB0aGlzIGZvcm0gYW5kIHJldHVybiByYXctcm93cy4gXHJcbiAgICAgKiBOb3RlIHRoYXQgdGhlIHJldHVybmVkIGRhdGEgaXMgTk9UIHNldCB0byBhbnkgbW9kZWwgYmVmb3JlIHJldHVybmluZyBpdCB0aGUgY2FsbGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaWx0ZXIoZmlsdGVycz86IEZpbHRlclJlcXVlc3QpOiBPYnNlcnZhYmxlPFZvW10+IHtcclxuICAgICAgICBjb25zdCBzZXJ2aWNlTmFtZSA9IHRoaXMuZm9ybS5nZXRTZXJ2aWNlTmFtZShDb252ZW50aW9ucy5PUF9GSUxURVIpO1xyXG4gICAgICAgIGlmICghc2VydmljZU5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoQ29udmVudGlvbnMuT1BfRklMVEVSICsgJyBvcGVyYXRpb24gaXMgbm90IGFsbG93ZWQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSBmaWx0ZXJzID8geyBkYXRhOiBmaWx0ZXJzIH0gOiB7fTtcclxuICAgICAgICB0aGlzLnJlc2V0TWVzc2FnZXMoKTtcclxuICAgICAgICB0aGlzLndhaXRpbmdGb3JTZXJ2ZXJSZXNwb25zZSA9IGZhbHNlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZlckFnZW50LnNlcnZlKHNlcnZpY2VOYW1lLCBwYXlsb2FkKS5waXBlKFxyXG4gICAgICAgICAgICBtYXAoKHZvOmFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YWl0aW5nRm9yU2VydmVyUmVzcG9uc2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2b1snbGlzdCddIGFzIFZvW107XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKG1zZ3MgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignY2F0Y2hpbmcgZXJyb3IgaW4gZmlsdGVycyBmZCcsIG1zZ3MpXHJcbiAgICAgICAgICAgICAgICB0aGlzLndhaXRpbmdGb3JTZXJ2ZXJSZXNwb25zZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNZXNzYWdlcyhtc2dzKTtcclxuICAgICAgICAgICAgICAgIHRocm93IG1zZ3M7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGZpbHRlciByb3dzIGZvciB0aGlzIGZvcm0gYW5kIHJldHVybiByYXctcm93cy4gXHJcbiAgICAgKiBOb3RlIHRoYXQgdGhlIHJldHVybmVkIGRhdGEgaXMgTk9UIHNldCB0byBhbnkgbW9kZWwgYmVmb3JlIHJldHVybmluZyBpdCB0aGUgY2FsbGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBidWxrVXBkYXRlKGRhdGE6IFZvW10pOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgICAgICBjb25zdCBzZXJ2aWNlTmFtZSA9IHRoaXMuZm9ybS5nZXRTZXJ2aWNlTmFtZShDb252ZW50aW9ucy5PUF9CVUxLKTtcclxuICAgICAgICBpZiAoIXNlcnZpY2VOYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKENvbnZlbnRpb25zLk9QX0JVTEsgKyAnIG9wZXJhdGlvbiBpcyBub3QgYWxsb3dlZC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXNldE1lc3NhZ2VzKCk7XHJcbiAgICAgICAgdGhpcy53YWl0aW5nRm9yU2VydmVyUmVzcG9uc2UgPSB0cnVlO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXJBZ2VudC5zZXJ2ZShzZXJ2aWNlTmFtZSwgeyBkYXRhOiB7IGxpc3Q6IGRhdGEgfSB9KS5waXBlKFxyXG4gICAgICAgICAgICBtYXAoX3ZvID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZ0ZvclNlcnZlclJlc3BvbnNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IobXNncyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndhaXRpbmdGb3JTZXJ2ZXJSZXNwb25zZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNZXNzYWdlcyhtc2dzKTtcclxuICAgICAgICAgICAgICAgIHRocm93IG1zZ3M7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHZhbGlkYXRlIGFsbCBlZGl0YWJsZSBmaWVsZHMgaW4gdGhpcyBmb3JtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB2YWxpZGF0ZUZvcm0oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdGhpcy5mb3JtR3JvdXAudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xyXG4gICAgICAgIGxldCBvayA9IHRoaXMuZm9ybUdyb3VwLnZhbGlkO1xyXG4gICAgICAgIGlmICghb2spIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRm9ybSAnICsgdGhpcy5mb3JtLmdldE5hbWUoKSArICcgdmFsaWRhdGlvbiBmYWlsZWQuIEZpZWxkcyBpbiBlcnJvcjonLCB0aGlzLmdldEZpZWxkc0luRXJyb3IoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNoaWxkRGF0YS5mb3JFYWNoKChmZCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBiID0gZmQudmFsaWRhdGVGb3JtKCk7XHJcbiAgICAgICAgICAgIG9rID0gb2sgJiYgYjtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNoaWxkVGFidWxhckRhdGEuZm9yRWFjaCgodGFibGUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYiA9IHRhYmxlLnZhbGlkYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICBvayA9IG9rICYmIGI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IGxpc3Qgb2YgaW52YWxpZCBmaWVsZHMgaW4gdGhpcyBmb3JtLlxyXG4gICAgICogaWYgYSBjaGlsZCBpcyBpbiBlcnJvciwgdGhpcyBkb2VzIG5vdCBnZXQgdGhlIGFjdHVhbGZpZWxkIGluIHRoZSBjaGlsZCwgYnV0IHJldHVybiBjaGlsZCBpdHNlbWYgYXMgYSBmaWVsZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RmllbGRzSW5FcnJvcigpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0OiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm1Hcm91cC52YWxpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmZvcm1Hcm91cC5jb250cm9scykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY250ciA9IHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzW2tleV07XHJcbiAgICAgICAgICAgIGlmIChjbnRyLmludmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBzaG91bGQgd2UgY29udmVydCB0aGlzIHRvIGEgcHJvbWlzZT8gT3Igc2hvdWxkIHdlIGhhdmUgc29tZSBzdGFuZGFyZCB3YXkgb2YgaGFuZGxpbmcgZXJyb3IgYW5kIHN1Y2Nlc3M/XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzYXZlQXNOZXcoKTogT2JzZXJ2YWJsZTxWbz4ge1xyXG4gICAgICAgIGNvbnN0IHNlcnZpY2VOYW1lID0gdGhpcy5mb3JtLmdldFNlcnZpY2VOYW1lKENvbnZlbnRpb25zLk9QX05FVyk7XHJcbiAgICAgICAgaWYgKCFzZXJ2aWNlTmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihDb252ZW50aW9ucy5PUF9ORVcgKyAnIG9wZXJhdGlvbiBpcyBub3QgYWxsb3dlZC4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy52YWxpZGF0ZUZvcm0oKSkge1xyXG4gICAgICAgICAgICAvL3dlIGhhdmUgdG8gZW5zdXJlIHRoYXQgdGhlIGZpZWxkIGluIGVycm9yIGlzIGJyb3VnaHQgdG8gZm9jdXMhIVxyXG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcignT25lIG9yIG1vcmUgZmllbGRzIGFyZSBpbiBlcnJvci4gUGxlYXNlIGVkaXQgdGhlbSBhbmQgcmUtc3VibWl0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmV4dHJhY3RBbGwoKTtcclxuICAgICAgICB0aGlzLndhaXRpbmdGb3JTZXJ2ZXJSZXNwb25zZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZXNldE1lc3NhZ2VzKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVyQWdlbnQuc2VydmUoc2VydmljZU5hbWUsIHsgZGF0YTogZGF0YSB9LCAhdGhpcy5mb3JtLnNlcnZlR3Vlc3RzKS5waXBlKFxyXG4gICAgICAgICAgICBtYXAodm8gPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YWl0aW5nRm9yU2VydmVyUmVzcG9uc2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2bztcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IobXNncyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVycm9yRmllbGRzKG1zZ3MpXHJcbiAgICAgICAgICAgICAgICB0aGlzLndhaXRpbmdGb3JTZXJ2ZXJSZXNwb25zZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNZXNzYWdlcyhtc2dzKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobXNncyk7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTZXJ2ZXIgcmV0dXJuZWQgd2l0aCBlcnJvcnMgXCIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gbXNncyBmaWVsZHMgaW4gZXJyb3Igc2VudCBieSB0aGUgc2VydmVyXHJcbiAgICAgKiBNYW51YWxseSBzZXR0aW5nIGVycm9yIHN0YXRlIHRvIHRoZSBmaWVsZHMgc2VudCBieSB0aGUgc2VydmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRFcnJvckZpZWxkcyhtc2dzOiBhbnlbXSkge1xyXG4gICAgICAgIG1zZ3MuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtR3JvdXAuZ2V0KGVsZW1lbnQuZmllbGROYW1lKT8uc2V0RXJyb3JzKHsgJ0ludmFsaWQnOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1Hcm91cC5tYXJrQWxsQXNUb3VjaGVkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGUgb3BlcmF0aW9uLiBXSGF0IGRvIHdlIGRvIGFmdGVyIHN1Y2Nlc3NmdWwgb3BlcmF0aW9uP1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2F2ZSgpIDogT2JzZXJ2YWJsZTxWbz4ge1xyXG4gICAgICAgIGNvbnN0IHNlcnZpY2VOYW1lID0gdGhpcy5mb3JtLmdldFNlcnZpY2VOYW1lKENvbnZlbnRpb25zLk9QX1VQREFURSk7XHJcbiAgICAgICAgaWYgKCFzZXJ2aWNlTmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihDb252ZW50aW9ucy5PUF9VUERBVEUgKyAnIG9wZXJhdGlvbiBpcyBub3QgYWxsb3dlZC4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy52YWxpZGF0ZUZvcm0oKSkge1xyXG4gICAgICAgICAgICAvL3dlIGhhdmUgdG8gZW5zdXJlIHRoYXQgdGhlIGZpZWxkIGluIGVycm9yIGlzIGJyb3VnaHQgdG8gZm9jdXMhIVxyXG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcignRmlsZWRzIHRoYXQgaGF2ZSBlcnJvcnMgOicgKyB0aGlzLmdldEZpZWxkc0luRXJyb3IoKS5qb2luKCcsJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5leHRyYWN0QWxsKCk7XHJcbiAgICAgICAgdGhpcy53YWl0aW5nRm9yU2VydmVyUmVzcG9uc2UgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVzZXRNZXNzYWdlcygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZlckFnZW50LnNlcnZlKHNlcnZpY2VOYW1lLCB7IGRhdGE6IGRhdGEgfSwgIXRoaXMuZm9ybS5zZXJ2ZUd1ZXN0cykucGlwZShcclxuICAgICAgICAgICAgbWFwKHZvID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZ0ZvclNlcnZlclJlc3BvbnNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvL3dlIGRvIG5vdCBzZXQgYmFjayB2YWx1ZXMgaW4gdXBkYWV0bW9kZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcihtc2dzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZ0ZvclNlcnZlclJlc3BvbnNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1lc3NhZ2VzKG1zZ3MpO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbXNncztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGVsZXRlIHRoaXMgZW50aXR5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZWxldGUoKTogT2JzZXJ2YWJsZTxWbz4ge1xyXG4gICAgICAgIGNvbnN0IHNlcnZpY2VOYW1lID0gdGhpcy5mb3JtLmdldFNlcnZpY2VOYW1lKENvbnZlbnRpb25zLk9QX0RFTEVURSk7XHJcbiAgICAgICAgaWYgKCFzZXJ2aWNlTmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihDb252ZW50aW9ucy5PUF9ERUxFVEUgKyAnIG9wZXJhdGlvbiBpcyBub3QgYWxsb3dlZC4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmV4dHJhY3RLZXlGaWVsZHMoKTtcclxuICAgICAgICB0aGlzLndhaXRpbmdGb3JTZXJ2ZXJSZXNwb25zZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZXNldE1lc3NhZ2VzKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVyQWdlbnQuc2VydmUoc2VydmljZU5hbWUsIHsgZGF0YTogZGF0YSwgYXNRdWVyeVBhcmFtczogZmFsc2UgfSkucGlwZShcclxuICAgICAgICAgICAgbWFwKHZvID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZ0ZvclNlcnZlclJlc3BvbnNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvL3dlIGRvIG5vdCBzZXQgYmFjayB2YWx1ZXMgaW50byBmZFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvO1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcihtc2dzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZ0ZvclNlcnZlclJlc3BvbnNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1lc3NhZ2VzKG1zZ3MpO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbXNncztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gdm9BcnJheSB+IGFycmF5IG9mIFZvIFxyXG4gICAgICogQHBhcmFtIGZvcm0gfiBmb3JtIG9mIHRoZSBmZFxyXG4gICAgICogQHBhcmFtIHNhIH4gU2VydmVyQWdlbnRcclxuICAgICAqIEByZXR1cm5zIHZvIGFzIGFuIGFycmF5IG9mIEZEIFxyXG4gICAgICogR2VuZXJhbGx5IHVzZWQgaW4gYnVsayB1cGRhdGUgb3BlcmF0aW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdG9GZEFycmF5KHZvQXJyYXk6IFZvW10sIGZvcm06IGFueSwgc2E6IFNlcnZpY2VBZ2VudCkge1xyXG4gICAgICAgIGxldCBmZEFycmF5OiBGb3JtRGF0YVtdID0gW107XHJcbiAgICAgICAgdm9BcnJheS5mb3JFYWNoKHZvID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmQgPSBmb3JtLm5ld0Zvcm1EYXRhKHNhKTtcclxuICAgICAgICAgICAgZmQuc2V0QWxsKHZvKTtcclxuICAgICAgICAgICAgZmRBcnJheS5wdXNoKGZkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZmRBcnJheTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBmZEFycmF5IH4gQXJyYXkgb2YgRm9ybURhdGEgdG8gYmUgY29udmVydGVkIHRvXHJcbiAgICAgKiBAcmV0dXJucyBhbiBhcnJheSBvZiB2byBcclxuICAgICAqIEdlbmVyYWxseSB1c2VkIGluIGJ1bGsgdXBkYXRlIG9wZXJhdGlvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRvVm9BcnJheShmZEFycmF5OiBGb3JtRGF0YVtdKSB7XHJcbiAgICAgICAgbGV0IHZvQXJyYXk6IFZvW10gPSBbXTtcclxuICAgICAgICBmZEFycmF5LmZvckVhY2goZmQgPT4ge1xyXG4gICAgICAgICAgICB2b0FycmF5LnB1c2goZmQuZXh0cmFjdEFsbCgpKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiB2b0FycmF5O1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiByZXByZXNlbnRzIHRoZSBkYXRhIGNvbnRhaW5lZCBpbiBhIGZvcm0uIE1hbmFnZXMgdHdvLXdheSBiaW5kaW5nIHdpdGggaW5wdXQgZmllbGRzIGluIHRoZSBmb3JtXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRm9ybURhdGEgZXh0ZW5kcyBQYW5lbERhdGEge1xyXG5cdC8qKlxyXG5cdCAqIGxpc3Qgb2Ygb3B0aW9ucy92YWx1ZXMgZm9yIGFsbCBkcm9wLWRvd25zIGluIHRoaXMgZm9ybS4gXHJcbiAgICAgKiBodG1sIGNvbXBvbmVudHMgc2hvdWxkIGJpbmQgdGhlIGRyb3AtZG93bnMgdG8gYSBtZW1iZXIgaW4gdGhpcyBcclxuXHQgKi9cclxuICAgIGxpc3RzOiB7IFtrZXk6IHN0cmluZ106IFNlbGVjdE9wdGlvbltdIH0gPSB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihmOiBGb3JtLCBzYTogU2VydmljZUFnZW50KSB7XHJcbiAgICAgICAgc3VwZXIoZiwgc2EpO1xyXG4gICAgICAgIHRoaXMuaGFzRmcgPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IGN0cmxzID0gdGhpcy5mb3JtLmNvbnRyb2xzO1xyXG4gICAgICAgIGlmKHRoaXMuZm9ybS5maWVsZHMpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtLmZpZWxkcy5mb3JFYWNoKChmaWVsZCwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdHJsID0gY3RybHM/LmdldChrZXkpIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmMgPSBuZXcgRm9ybUNvbnRyb2woZmllbGQuZGVmYXVsdFZhbHVlLCBjdHJsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUdyb3VwLmFkZENvbnRyb2woa2V5LCBmYyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5oYW5kbGVEcm9wRG93bnMoZik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEFMaXN0KG5hbWU6IHN0cmluZywgbGlzdDogU2VsZWN0T3B0aW9uW10pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBmaWVsZCA9IHRoaXMuZm9ybUdyb3VwLmdldChuYW1lKTtcclxuICAgICAgICBpZiAoIWZpZWxkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobmFtZSArICcgaXMgbm90IGEgZmllbGQgYnV0IGEgZHJvcC1kb3duIGlzIGJlaW5nIHNldCB0byBpdCcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGlzdHNbbmFtZV0gPSBsaXN0O1xyXG4gICAgICAgIGlmICghZmllbGQudmFsdWUpIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlOiBhbnkgPSAnJztcclxuICAgICAgICAgICAgaWYgKGxpc3QgJiYgbGlzdFswXSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBsaXN0WzBdLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgZmllbGQuc2V0VmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcblx0ICogc2V0IGRyb3AtZG93biBsaXN0IG9mIHZhbHVlcyBmb3IgYSBmaWVsZC4gXHJcblx0ICogaXQgbWF5IGJlIGF2YWlsYWJsZSBsb2NhbGx5LCBvciB3ZSBteSBoYXZlIHRvIGdldCBpdCBmcm9tIHRoZSBzZXJ2ZXJcclxuXHQgKiBAcGFyYW0gZmllbGQgZm9yIHdoaWNoIGRyb3AtZG93biBsaXN0IGlkIHRvIGJlIGZldGNoZWRcclxuICAgICAqIEBwYXJhbSBrZXkgdmFsdWUgb2YgdGhlIGtleSBmaWVsZCxpZiB0aGlzIGlzIGEga2V5ZWQtbGlzdFxyXG5cdCAqL1xyXG4gICAgcHVibGljIHNldExpc3RWYWx1ZXMoZmllbGQ6IEZpZWxkLCBrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmIChmaWVsZC5saXN0S2V5ICYmICFrZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRBTGlzdChmaWVsZC5uYW1lLCBbXSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGZpZWxkLmtleWVkTGlzdCkge1xyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgKiBkZXNpZ24tdGltZSBsaXN0LiBsb2NhbGx5IGF2YWxpYWJsZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgbGV0IGFyciA9IGZpZWxkLmtleWVkTGlzdFtrZXldO1xyXG4gICAgICAgICAgICBpZiAoIWFycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRGVzaWduIHRpbWUgbGlzdCBvZiB2YWx1ZXMgZm9yIGRyb3AtZG93biBub3QgYXZhaWxhYmxlIGZvciBrZXk9JyArIGtleSk7XHJcbiAgICAgICAgICAgICAgICBhcnIgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldEFMaXN0KGZpZWxkLm5hbWUsIGFycik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHdlIGhhdmUgdG8gYXNrIHRoZSBzZXJ2ZXIgdG8gZ2V0IHRoaXNcclxuICAgICAgICAgKi9cclxuICAgICAgICBsZXQgZGF0YTogYW55O1xyXG4gICAgICAgIGlmIChmaWVsZC5saXN0S2V5KSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB7IGxpc3Q6IGZpZWxkLmxpc3ROYW1lLCBrZXk6IGtleSB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB7IGxpc3Q6IGZpZWxkLmxpc3ROYW1lIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBvYnMgPSB0aGlzLnNlcnZlckFnZW50LnNlcnZlKENvbnZlbnRpb25zLlNFUlZJQ0VfTElTVCwgeyBkYXRhOiBkYXRhIH0pO1xyXG4gICAgICAgIG9icy5zdWJzY3JpYmUoKHZvOmFueSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBhcnIgPSB2b1snbGlzdCddIGFzIFNlbGVjdE9wdGlvbltdO1xyXG4gICAgICAgICAgICBpZiAoYXJyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFMaXN0KGZpZWxkLm5hbWUsIGFycik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdTZXJ2ZXIgcmV0dXJuZWQgYSByZXNwbnNlIHdpdGggbm8gbGlzdCBpbiBpdC4gRHJvcCBkb3dud2lsbCBub3Qgd29yayBmb3IgZmllbGQgJyArIGZpZWxkLm5hbWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAobXNnczphbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igd2hpbGUgcmVjZWl2aW5nIGxpc3QgdmFsdWVzIGZvciBmaWVsZCAnICsgZmllbGQubmFtZSArIEpTT04uc3RyaW5naWZ5KG1zZ3MpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGYgZm9ybSBmb3Igd2hpY2ggd2UgYXJlIGhhbmRsaW5nIGRyb3AtZG93bnMuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaGFuZGxlRHJvcERvd25zKGY6IEZvcm0pOiB2b2lkIHwgbnVsbCB7XHJcbiAgICAgICAgaWYgKCFmLmxpc3RGaWVsZHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGlzdHMgPSB7fTtcclxuICAgICAgICBmLmxpc3RGaWVsZHMuZm9yRWFjaChuYW0gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmaWVsZCA9IGYuZmllbGRzPy5nZXQobmFtKTtcclxuICAgICAgICAgICAgaWYgKGZpZWxkPy52YWx1ZUxpc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QUxpc3QobmFtLCBmaWVsZC52YWx1ZUxpc3QpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBTGlzdChuYW0sIFtdKTtcclxuICAgICAgICAgICAgICAgIGlmIChmaWVsZD8ubGlzdEtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZjID0gdGhpcy5mb3JtR3JvdXAuZ2V0KGZpZWxkLmxpc3RLZXkpIGFzIEZvcm1Db250cm9sO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZmMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBmaW5kIGZvcm0gY29udHJvbCBuYW1lZCBcIiArIGZpZWxkLmxpc3RLZXkgKyBcIiBkcm9wIGRvd24gZm9yIGZpZWxkIFwiICsgZmllbGQubmFtZSArIFwiIHdpbGwgbm90IHdvcmsgcHJvcGVybHlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gZmMudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TGlzdFZhbHVlcyhmaWVsZCwgdmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYy52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWx1ZTogc3RyaW5nKSA9PiB0aGlzLnNldExpc3RWYWx1ZXMoZmllbGQsIHZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGZpZWxkKXtcclxuICAgICAgICAgICAgICAgICAgICAvL2ZpeGVkIGxpc3QsIGJ1dCB3ZSBoYXZlIHRvIGdldCBpdCBmcm9tIHNlcnZlciBhdCBydW4gdGltZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TGlzdFZhbHVlcyhmaWVsZCwgJycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIHZhbGlkYXRlIGFsbCBlZGl0YWJsZSBmaWVsZHMgaW4gdGhpcyBmb3JtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvdmVycmlkZSB2YWxpZGF0ZUZvcm0oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdGhpcy5mb3JtR3JvdXAudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xyXG4gICAgICAgIGlmICghdGhpcy5mb3JtR3JvdXAudmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtR3JvdXAuc2V0RXJyb3JzKHsgJ2Vycic6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCB2YWx1ZScgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUdyb3VwLm1hcmtBbGxBc1RvdWNoZWQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdmFscyA9IHRoaXMuZm9ybS52YWxpZGF0aW9ucztcclxuICAgICAgICBsZXQgYWxsT2sgPSB0cnVlO1xyXG4gICAgICAgIGlmICh2YWxzKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgdiBvZiB2YWxzKSB7XHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIG4gaXMgbmFtZSwgZiBpcyBmaWVsZCwgYyBpcyBjbnRyb2wgYW5kIHYgaXMgdmFsdWVcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbjEgPSB2WydmMSddO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbjIgPSB2WydmMiddO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZjEgPSB0aGlzLmZvcm0uZmllbGRzPy5nZXQobjEpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZjIgPSB0aGlzLmZvcm0uZmllbGRzPy5nZXQobjIpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdjEgPSB0aGlzLmdldEZpZWxkVmFsdWUobjEpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdjIgPSB0aGlzLmdldEZpZWxkVmFsdWUobjIpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYzEgPSB0aGlzLmZvcm1Hcm91cC5nZXQobjEpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYzIgPSB0aGlzLmZvcm1Hcm91cC5nZXQobjIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBpc0RhdGVUeXBlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoZjEgJiYgZjIgJiYgZjEudmFsdWVUeXBlID09IENvbnZlbnRpb25zLlRZUEVfREFURSAmJiBmMi52YWx1ZVR5cGUgPT0gQ29udmVudGlvbnMuVFlQRV9EQVRFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNEYXRlVHlwZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxUeXBlID0gdlsndHlwZSddO1xyXG4gICAgICAgICAgICAgICAgbGV0IG9rOiBib29sZWFuO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbFR5cGUgPT09ICdyYW5nZScpIHtcclxuICAgICAgICAgICAgICAgICAgICBvayA9IHRoaXMudmFsaWRhdGVSYW5nZSh2MSwgdjIsIHZbJ2lzU3RyaWN0J10sIGlzRGF0ZVR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWxUeXBlID09PSAnaW5jbCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBvayA9IHRoaXMudmFsaWRhdGVJbmNsUGFpcih2MSwgdjIsIHZbJ3ZhbHVlJ10pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWxUeXBlID09PSAnZXhjbCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBvayA9IHRoaXMudmFsaWRhdGVFeGNsUGFpcih2MSwgdjIsIHZbJ2F0TGVhc3RPbmUnXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Zvcm0gdmFsaWRhdGlvbiB0eXBlICcgKyB2YWxUeXBlICsgJyBpcyBub3QgdmFsaWQuIHZhbGlkYXRpb24gaWdub3JlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9rID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghb2spIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdJbnRlciBmaWVsZCB2YWxpZGF0aW9uIGZhaWxlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IHsgaW50ZXJmaWVsZDogdmFsVHlwZSwgZXJyb3JJZDogdlsnZXJyb3JJZCddIH07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGMxICYmIGYxPy5jb250cm9sVHlwZSAhPSAnSGlkZGVuJyAmJiBmMT8uY29udHJvbFR5cGUgIT0gJ091dHB1dCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYzEuc2V0RXJyb3JzKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjMiAmJiBmMj8uY29udHJvbFR5cGUgIT0gJ0hpZGRlbicgJiYgZjI/LmNvbnRyb2xUeXBlICE9ICdPdXRwdXQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGMyLnNldEVycm9ycyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBhbGxPayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWFsbE9rKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ludGVyLWZpZWxkIHZhbGlkYWl0b24gZmFpbGVkJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2hpbGREYXRhLmZvckVhY2goKGZkLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYiA9IGZkLnZhbGlkYXRlRm9ybSgpO1xyXG4gICAgICAgICAgICBpZiAoIWIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0NoaWxkIHZhbGlkYXRpb24gZmFpbGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWxsT2sgPSBhbGxPayAmJiBiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2hpbGRUYWJ1bGFyRGF0YS5mb3JFYWNoKCh0YWJsZSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGIgPSB0YWJsZS52YWxpZGF0ZUZvcm0oKTtcclxuICAgICAgICAgICAgaWYgKCFiKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdDaGlsZCBUYWJsZSB2YWxpZGF0aW9uIGZhaWxlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFsbE9rID0gYWxsT2sgJiYgYjtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYWxsT2s7XHJcbiAgICB9XHJcblx0LyoqXHJcblx0ICogY2hlY2sgaWYgdjEgdG8gdjIgdXMgYSByYW5nZVxyXG5cdCAqIEBwYXJhbSB2MSBcclxuXHQgKiBAcGFyYW0gdjIgXHJcblx0ICogQHBhcmFtIHVzZVN0cmljdCBpZiB0cnVlLCB2MiBtdXN0IGJlID4gdjIsIHYxID09IHYyIHdvdWRuJ3QgY3V0XHJcblx0ICovXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlUmFuZ2UodjE6IGFueSwgdjI6IGFueSwgZXF1YWxPazogYm9vbGVhbiwgZGF0ZVR5cGU6IGJvb2xlYW4pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZGF0ZVR5cGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRGF0ZSBjb21wYXJpc29uIG5vdCB5ZXQgaW1wbGVtZW50ZC4gcmV0dXJuaW5nIHRydWUnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG4xID0gdjE7XHJcbiAgICAgICAgY29uc3QgbjIgPSB2MjtcclxuICAgICAgICBpZiAoaXNOYU4objEpIHx8IGlzTmFOKG4yKXx8IG4yID4gbjEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuMSA+IG4yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9lcXVhbC4gaXMgaXQgb2s/XHJcbiAgICAgICAgcmV0dXJuIGVxdWFsT2s7XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHR3byBmaWVsZHMgaGF2ZSB0byBiZSBib3RoIHNwZWNpZmllZCBvciBib3RoIHNraXBwZWQuXHJcblx0ICogaWYgdmFsdWUgaXMgc3BlY2lmaWVkLCBpdCBtZWFucyB0aGF0IHRoZSBydWxlIGlzIGFwcGxpY2FibGUgaWYgdjEgPT0gdmFsdWVcclxuXHQgKiBAcGFyYW0gdjEgXHJcblx0ICogQHBhcmFtIHYyIFxyXG5cdCAqIEBwYXJhbSB2YWx1ZSBcclxuXHQgKi9cclxuICAgIHByaXZhdGUgdmFsaWRhdGVJbmNsUGFpcih2MTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiwgdjI6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4sIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuXHRcdC8qXHJcblx0XHQgKiB3ZSBhc3N1bWUgdjEgaXMgc3BlY2lmaWVkIHdoZW4gYSB2YWx1ZSBpcyBnaXZlbi4gXHJcblx0XHQgKiBIb3dldmVyLCBpZiB2YWx1ZSBpcyBzcGVjaWZpZWQsIHRoZW4gaXQgaGFzIHRvIG1hdGNoIGl0JyBcclxuXHRcdCAqL1xyXG4gICAgICAgIGNvbnN0IHYxU3BlY2lmaWVkID0gdjEgJiYgKCF2YWx1ZSB8fCB2YWx1ZSA9PSB2MSk7XHJcbiAgICAgICAgaWYgKHYxU3BlY2lmaWVkKSB7XHJcbiAgICAgICAgICAgIGlmICh2Mikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB2MSBpcyBub3Qgc3BlY2lmaWVkLCBzbyB2MiBzaG91bGQgbm90IGJlIHNwZWNpZmllZFxyXG4gICAgICAgIGlmICh2Mikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gZXJyb3JJZCB2MSBhbmQgdjIgYXJlIGV4Y2x1c2l2ZVxyXG5cdCAqIEBwYXJhbSBwcmltYXJ5RmllbGQgXHJcblx0ICogQHBhcmFtIG90aGVyRmllbGQgXHJcblx0ICogQHBhcmFtIGF0TGVhc3RPbmUgaWYgdHJ1ZSwgZXhhY3RseSBvbmUgb2YgdGVoIHR3b3RvIGJlIHNwZWNpZmllZFxyXG5cdCAqL1xyXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZUV4Y2xQYWlyKHYxOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuLCB2Mjogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiwgbm9uZU9rOiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHYxKSB7XHJcbiAgICAgICAgICAgIGlmICh2Mikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodjIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vbm9uZSBzcGVjaWZpZWxkLCBpcyBpdCBvaz9cclxuICAgICAgICByZXR1cm4gbm9uZU9rO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gZmllbGROYW1lIG5hbWUgb2YgdGhlIGRyb3AtZG93biBmaWVsZFxyXG4gICAgICogQHJldHVybnMgdGhlIGRpc3BsYXllZCB2YWx1ZSAobm90IHRoZSBpbnRlcm5hbCB2YWx1ZSkgb2YgdGhpcyBmaWVsZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGlzcGxheWVkVmFsdWVPZihmaWVsZE5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMubGlzdHNbZmllbGROYW1lXTtcclxuICAgICAgICBpZiAoIWxpc3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB2YWwgPSB0aGlzLmdldEZpZWxkVmFsdWUoZmllbGROYW1lKTtcclxuICAgICAgICBpZiAoIXZhbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG4gPSBsaXN0Lmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBzZWwgPSBsaXN0W2ldO1xyXG4gICAgICAgICAgICBpZiAoc2VsLnZhbHVlID09IHZhbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbC50ZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxufVxyXG4vKipcclxuICogcmVwcmVzZW50cyBhbiBhcnJheSBvZiBwYW5lbCBkYXRhIG9yIGZvcm0gZGF0YVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRhYnVsYXJEYXRhIHtcclxuICAgIHB1YmxpYyBjaGlsZERhdGE6IEFycmF5PFBhbmVsRGF0YSB8IEZvcm1EYXRhPiA9IFtdO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGZvcm06IEZvcm0sIHByaXZhdGUgc2VydmVyQWdlbnQ6IFNlcnZpY2VBZ2VudCwgcHVibGljIHJlYWRvbmx5IGlzRWRpdGFibGU6IGJvb2xlYW4pIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldCBkYXRhIHRvIHRoaXMgcGFuZWxcclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICovXHJcbiAgICBzZXRBbGwoZGF0YTogVm9bXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2hpbGREYXRhLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKHZvID0+IHtcclxuICAgICAgICAgICAgbGV0IGZkOiBQYW5lbERhdGEgfCBGb3JtRGF0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNFZGl0YWJsZSkge1xyXG4gICAgICAgICAgICAgICAgZmQgPSBuZXcgRm9ybURhdGEodGhpcy5mb3JtLCB0aGlzLnNlcnZlckFnZW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZkID0gbmV3IFBhbmVsRGF0YSh0aGlzLmZvcm0sIHRoaXMuc2VydmVyQWdlbnQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmQuc2V0QWxsKHZvKTtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZERhdGEucHVzaChmZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBleHRyYWN0IGRhdGEgZnJvbSBlYWNoIG9mIHRoZSBjaGlsZC1wYW5lbCBpbnRvIGFuIGFycmF5XHJcbiAgICAgKi9cclxuICAgIGV4dHJhY3RBbGwoKTogVm9bXSB7XHJcbiAgICAgICAgY29uc3QgZGF0YTogVm9bXSA9IFtdO1xyXG4gICAgICAgIHRoaXMuY2hpbGREYXRhLmZvckVhY2goZmQgPT4gZGF0YS5wdXNoKGZkLmV4dHJhY3RBbGwoKSkpO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdmFsaWRhdGUgYWxsIHRoZSBmb3Jtc1xyXG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiBhbGwgb2suIGZhbHNlIGlmIGFueSBvbmUgZm9ybS1jb250cm9sIGlzIGluIGVycm9yLCBvciBhbnkgY3VzdG9tLXZhbGlkYWl0b24gZmFpbHNcclxuICAgICAqL1xyXG4gICAgdmFsaWRhdGVGb3JtKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBhbGxPayA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jaGlsZERhdGEuZm9yRWFjaChmZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9rID0gZmQudmFsaWRhdGVGb3JtKCk7XHJcbiAgICAgICAgICAgIGFsbE9rID0gYWxsT2sgJiYgb2s7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGFsbE9rO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYXBwZW5kIGEgZGVmYXVsdCBkYXRhIG1vZGVsIHRvIHRoaXMgYXJyYXlcclxuICAgICAqL1xyXG4gICAgYXBwZW5kUm93KCk6IFBhbmVsRGF0YSB8IEZvcm1EYXRhIHtcclxuICAgICAgICBsZXQgZmQ6IFBhbmVsRGF0YSB8IEZvcm1EYXRhO1xyXG4gICAgICAgIGlmICh0aGlzLmlzRWRpdGFibGUpIHtcclxuICAgICAgICAgICAgZmQgPSBuZXcgRm9ybURhdGEodGhpcy5mb3JtLCB0aGlzLnNlcnZlckFnZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmZCA9IG5ldyBQYW5lbERhdGEodGhpcy5mb3JtLCB0aGlzLnNlcnZlckFnZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGlsZERhdGEucHVzaChmZCk7XHJcbiAgICAgICAgcmV0dXJuIGZkO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgICogYXBwZW5kIGEgZGVmYXVsdCBkYXRhIG1vZGVsIHRvIHRoaXMgYXJyYXlcclxuICAgICAgKi9cclxuICAgIHJlbW92ZVJvdyhpZHg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuY2hpbGREYXRhLnNwbGljZShpZHgpO1xyXG4gICAgfVxyXG5cclxufSJdfQ==