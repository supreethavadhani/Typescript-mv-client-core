import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Vo } from '../../mv-form-core/types';
import { FormData } from '../../mv-form-core/formData';
import * as i0 from "@angular/core";
export declare class MvTableComponent {
    tableGridData: TableMetaData | undefined;
    table: MatTable<any> | undefined;
    sort: MatSort | undefined;
    tableData: any;
    dataSource: any;
    values: Array<any>;
    tempDatasource: any;
    rowNumber: any;
    colored: any[];
    readonly separatorKeysCodes: number[];
    isView: string;
    dropdownShow: boolean;
    filters: {};
    columns: any;
    update(): void;
    getColumnData(fd: FormData): TableMetaData;
    static ɵfac: i0.ɵɵFactoryDeclaration<MvTableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MvTableComponent, "app-mv-table", never, { "tableGridData": "tableGridData"; }, {}, never, never, false>;
}
export interface TableMetaData {
    data: Vo[];
    metaData: {
        column_names: string[];
        display_names: {
            [key: string]: string;
        };
        editable_columns?: string[];
        badgesColumn?: string;
        disableBadges?: boolean;
        allSelected?: boolean;
        view?: boolean;
        edit?: boolean;
        search?: boolean;
        placeholder?: string;
        selectAttr?: string;
        error?: string;
        buttonName?: string;
        validations?: {
            [key: string]: Validators;
        };
        managerFunction?: string;
        itemName?: string;
        styleAttribute?: {
            [key: string]: Array<StyleComparison>;
        };
    };
}
export interface StyleComparison {
    comp: '=' | '>' | '<' | '>=' | '<=' | '!=';
    value: any;
    dependentCol?: string;
    style: any;
}
export interface Validators {
    minLength?: number;
    maxLength?: number;
    minValue?: number;
    maxValue?: number;
    pattern?: string;
}
//# sourceMappingURL=component.d.ts.map