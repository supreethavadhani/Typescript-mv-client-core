import { FormData, PanelData } from './formData';
import { ValidatorFn } from '@angular/forms';
import { SelectOption } from './types';
import { ServiceAgent } from './serviceAgent';
/**
 * represents the data model, both structure and run-time data
 */
export declare class Form {
    /**
     * key-Field pairs. has all the fields of this form
     */
    fields: Map<string, Field> | undefined;
    /**
     * key-Table pairs. has all the tables (sub-forms) in this form
     */
    childForms: Map<string, ChildForm> | undefined;
    /**
     * meta-data for all controls that can be used to create a formGroup using formBuilder.group()
     */
    controls: Map<string, ValidatorFn[]> | undefined;
    /**
     * inter-field validations
     */
    validations: Array<{
        [key: string]: any;
    }> | undefined;
    /**
     * field names that have enumeratedlist of values. That is,fields that are to be rendered as drop-downs
     */
    listFields: string[] | undefined;
    /**
     * fields that make up the primary key. generally onl one, but possible to have more than one
     */
    keyFields: string[] | undefined;
    /**
     * what operations are allowed on this form.
     */
    opsAllowed: {
        [key: string]: boolean;
    };
    /**
     * for operations are offered to guests/unauthenticated/non-logged-in users?
     */
    serveGuests: boolean;
    /**
     * name of this form.
     */
    getName(): any;
    /**
     * create a model (data-holder) for this form
     * @param serverAgent is injectable
     */
    newFormData(serverAgent: ServiceAgent): FormData;
    /**
     * create a model (data-holder) for this form
     * @param serverAgent is injectable
     */
    newPanelData(serverAgent: ServiceAgent): PanelData;
    /**
     *
     * @param operation
     * @returns service name of the form "operation-formName", say filter-costomer
     */
    getServiceName(operation: string): string | null;
    /**
     *
     * @param operation
     * @returns true of this operation is designed for this form
     */
    opAllowed(operation: string): boolean;
}
export interface ChildForm {
    name: string;
    form: Form;
    isTabular: boolean;
    label?: string;
    minRows?: number;
    maxRows?: number;
    errorId?: string;
    isEditable?: boolean;
}
export interface Field {
    /**
     * required attributes
     */
    name: string;
    label: string;
    /**
     * 0-text, 1-integer, 2-decimal, 3-boolean, 4-date, 5-timestamp
     */
    valueType: 0 | 1 | 2 | 3 | 4 | 5;
    /**
     * optional attributes
     */
    defaultValue?: string | number | boolean;
    altLabel?: string;
    placeHolder?: string;
    trueLabel?: string;
    falseLabel?: string;
    isEditable?: boolean;
    errorId?: string;
    isRequired?: boolean;
    minLength?: number;
    maxLength?: number;
    regex?: string;
    minValue?: number;
    maxValue?: number;
    nbrFractions?: number;
    nbrDecimals?: number;
    listName?: string;
    listKey?: string;
    valueList?: SelectOption[];
    keyedList?: {
        [key: string]: SelectOption[];
    };
    controlType?: "Hidden" | "Input" | "Dropdown" | "Output" | "Checkbox" | "Password" | "Textarea" | "Button";
    disabled?: boolean;
    hint?: string;
    multipleSelect?: boolean;
    icon?: string;
    suffix?: string;
    prefix?: string;
    buttonType?: string;
}
//# sourceMappingURL=form.d.ts.map