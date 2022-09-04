import { FormGroup } from '@angular/forms';
import { SelectOption, Vo, FieldValues, Message, FilterRequest } from './types';
import { Form, Field } from './form';
import { ServiceAgent } from './serviceAgent';
import { Observable } from 'rxjs';
export declare class PanelData {
    readonly form: Form;
    protected readonly serverAgent: ServiceAgent;
    /**
    * data as received from the server
    */
    data: Vo;
    /**
     * data for child forms that ane non-tabular
     */
    childData: Map<string, PanelData | FormData>;
    /**
    * data for child forms that are tabukar
    */
    childTabularData: Map<string, TabularData>;
    /**
     * set to true when a service is requested from the server.
     * this can be used by the view-component to indicate aciton
     */
    waitingForServerResponse: boolean;
    /**
       * errors returned by the server
       */
    errors: string[];
    /**
     * warnings returned by the server
     */
    warnings: string[];
    /**
     * informations messages received by the server
     */
    info: string[];
    /**
     * form controls for fields/children. empty if this panel is not editable
     */
    formGroup: FormGroup;
    protected hasFg: boolean;
    constructor(form: Form, serverAgent: ServiceAgent);
    /**
     * get data as a Value Object. HAs values as received from the server.
     * Any input field/control DOES not have the lates value entered by the user.
     * getFieldValue() must be used to get the current value of an input field.
     */
    getRawData(): Vo;
    /**
    * @override data is to be set to form group
    * @param data as received from a service request
    */
    setAll(data: Vo): void;
    /**
     * @returns object contianing all data from form controls. as well as all child forms.
     * Note that this data will not contain fields from non-form panel
     */
    extractAll(): Vo;
    /**
     * @returns object contianing all data from form controls, or raw data as recived, but no tany child-data.
     * That is why the returned type id FieldValues and not Vo
     */
    extractAllFields(): FieldValues;
    /**
     *
     * @param name name of the field. Valid field names can be picked up from
     * static definitions in the form
     * @param value
     */
    setFieldValue(name: string, value: string | number | boolean | null): void;
    /**
     *
     * @param values name-value pairs to be se to this data
     */
    setFieldValues(values: FieldValues): void;
    /**
      *
      * @param name name of the field.
      * concrete classes over-ride this method to restict name values to their valid list
      * @returns value of this field, or null/undefined if this is not a field
      */
    getFieldValue(name: string): string | number | boolean;
    /**
     * @param names to be extracted
     * @returns data-object with name-values. null if no value is found for a field
     */
    getFieldValues(names: string[]): FieldValues;
    /**
     *
     * @param name name of the child field.
     * Valid child names are available as static members of the form
     * @returns appropriate data for the child form. null/undefined if no such child
     */
    getChildData(name: string): PanelData | FormData | undefined;
    /**
     *
     * @param name name of the child field.
     * Valid child names are available as static members of the form
     * @returns appropriate data for the child form. null/undefined if no such child
     */
    getChildTable(name: string): TabularData | undefined;
    /**
     * extarct key fields only
     */
    extractKeyFields(): FieldValues | null;
    extractFields(fields: string[]): FieldValues | null;
    /**
     * reset the messages. typically called when user dismisses them, or before a server-request is made
     */
    resetMessages(): void;
    /**
     * messages are set to this model, from where the
     * html component can pick it up for rendering
     * @param messages
     */
    setMessages(messages: Message[]): void;
    /**
     * invoke a specific service with your own pay load, and receive data into this form data
     * @param serviceName service name.
     * @param data input expected by the service
     */
    callService(serviceName: string, data: FieldValues): Observable<any>;
    /**
    * get data for this entity based on primary or unique key
    * caller has to enaure that either key fields, or unique fields have valid values in the model before making this call
    */
    fetchData(): Observable<any>;
    /**
     * fetch data based the provided input. Use this insted of fetch() if the API
     * requires some data that is not primary key
     * @param data
     */
    fetchFor(data: FieldValues): Observable<any>;
    /**
     * get filtered rows from the server.
     * The data received from the server is set to the child-model (PanelData/formData) before returning it to the caller
     * @param child for which data is to be fecthed from the serber
     * @param filters to be applied on the child to get data
     */
    fetchChildren(child: string, filters: FilterRequest): Observable<Vo[]>;
    /**
     * filter rows for this form and return raw-rows.
     * Note that the returned data is NOT set to any model before returning it the caller
     */
    filter(filters?: FilterRequest): Observable<Vo[]>;
    /**
     * filter rows for this form and return raw-rows.
     * Note that the returned data is NOT set to any model before returning it the caller
     */
    bulkUpdate(data: Vo[]): Observable<boolean>;
    /**
     * validate all editable fields in this form
     */
    validateForm(): boolean;
    /**
     * get list of invalid fields in this form.
     * if a child is in error, this does not get the actualfield in the child, but return child itsemf as a field
     */
    getFieldsInError(): string[];
    /**
     * should we convert this to a promise? Or should we have some standard way of handling error and success?
     */
    saveAsNew(): Observable<Vo>;
    /**
     * @param msgs fields in error sent by the server
     * Manually setting error state to the fields sent by the server
     */
    setErrorFields(msgs: any[]): void;
    /**
     * update operation. WHat do we do after successful operation?
     */
    save(): Observable<Vo>;
    /**
     * delete this entity
     */
    delete(): Observable<Vo>;
    /**
     *
     * @param voArray ~ array of Vo
     * @param form ~ form of the fd
     * @param sa ~ ServerAgent
     * @returns vo as an array of FD
     * Generally used in bulk update operations
     */
    toFdArray(voArray: Vo[], form: any, sa: ServiceAgent): FormData[];
    /**
     *
     * @param fdArray ~ Array of FormData to be converted to
     * @returns an array of vo
     * Generally used in bulk update operations
     */
    toVoArray(fdArray: FormData[]): Vo[];
}
/**
 * represents the data contained in a form. Manages two-way binding with input fields in the form
 */
export declare class FormData extends PanelData {
    /**
     * list of options/values for all drop-downs in this form.
     * html components should bind the drop-downs to a member in this
     */
    lists: {
        [key: string]: SelectOption[];
    };
    constructor(f: Form, sa: ServiceAgent);
    setAList(name: string, list: SelectOption[]): void;
    /**
     * set drop-down list of values for a field.
     * it may be available locally, or we my have to get it from the server
     * @param field for which drop-down list id to be fetched
     * @param key value of the key field,if this is a keyed-list
     */
    setListValues(field: Field, key: string): void;
    /**
     *
     * @param f form for which we are handling drop-downs.
     */
    private handleDropDowns;
    /**
     * validate all editable fields in this form
     */
    validateForm(): boolean;
    /**
     * check if v1 to v2 us a range
     * @param v1
     * @param v2
     * @param useStrict if true, v2 must be > v2, v1 == v2 woudn't cut
     */
    private validateRange;
    /**
     * two fields have to be both specified or both skipped.
     * if value is specified, it means that the rule is applicable if v1 == value
     * @param v1
     * @param v2
     * @param value
     */
    private validateInclPair;
    /**
     *
     * @param errorId v1 and v2 are exclusive
     * @param primaryField
     * @param otherField
     * @param atLeastOne if true, exactly one of teh twoto be specified
     */
    private validateExclPair;
    /**
     *
     * @param fieldName name of the drop-down field
     * @returns the displayed value (not the internal value) of this field
     */
    getDisplayedValueOf(fieldName: string): string;
}
/**
 * represents an array of panel data or form data
 */
export declare class TabularData {
    readonly form: Form;
    private serverAgent;
    readonly isEditable: boolean;
    childData: Array<PanelData | FormData>;
    constructor(form: Form, serverAgent: ServiceAgent, isEditable: boolean);
    /**
     * set data to this panel
     * @param data
     */
    setAll(data: Vo[]): void;
    /**
     * extract data from each of the child-panel into an array
     */
    extractAll(): Vo[];
    /**
     * validate all the forms
     * @returns true if all ok. false if any one form-control is in error, or any custom-validaiton fails
     */
    validateForm(): boolean;
    /**
     * append a default data model to this array
     */
    appendRow(): PanelData | FormData;
    /**
      * append a default data model to this array
      */
    removeRow(idx: number): void;
}
//# sourceMappingURL=formData.d.ts.map