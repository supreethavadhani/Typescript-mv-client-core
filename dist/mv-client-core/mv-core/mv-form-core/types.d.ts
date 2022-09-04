export interface Message {
    /**
     * one of the pre-defined type Message.
     */
    type: "error" | "warning" | "info" | "success";
    /**
     * unique name assigned to this message in the app
     */
    id: string;
    /**
     * formatted text in English that is reay to be rendered
     */
    text: string;
    /**
     * name of the field (primary one in case more than one field are involved) that is the
     * cause of this error. null if this is not specific to any field.
     */
    fieldName?: string;
    /**
     * name of the table/object that the field is part of. null if this not relevant
     */
    objectName?: string;
    /**
     * 0-based row number in case the field in error is part of a table.
     */
    idx?: number;
    /**
     * run-time parameters that are used to compose this message. This is useful in i18n
     */
    params?: string[];
}
/**
 * Value object represents a general JSON object that we may
 * use to pass data back-and-forth between the client ans the server
 */
export interface Vo {
    [key: string]: string | number | boolean | null | Vo | Vo[] | SelectOption[];
}
/**
 * server responds with a json with specific structure
 */
export interface ServerResponse {
    allOk?: boolean;
    messages?: Array<Message>;
    data?: Vo;
    token?: string;
}
export interface FieldValues {
    [key: string]: string | number | boolean | null;
}
export interface SelectOption {
    value: string | number;
    text: string;
}
export interface Condition {
    comp: "=" | "!=" | "<" | "<=" | ">" | ">=" | "><" | "^" | "~";
    value: string | number | boolean;
    toValue?: string | number;
}
export interface FilterRequest {
    conditions: {
        [key: string]: Condition;
    };
    sort?: {
        [key: string]: "asc" | "desc" | "";
    };
    maxRows?: number;
}
/**
 * utility to manage ro-to-column and column-to-rows as per our conventintions
 */
export interface RowToColMeta {
    /**
     * columns is an array of objects. each element has meta data for a column.
     * length of this array is teh number of columns to be used.
     * We need to know the keyAttribute that represents th evalue, and the heading to be ised for that column
     * e.g.[{"id":1, "name":"Col1"}, {"id":2, "name":"col2"}]
     */
    columns: object[];
    /**
     * attribute name in the clumn-array that is to be used as key/id for the column
     */
    keyAttribute: string;
    /**
     * attribute name in the clumn-array that is to be used as column heading
     */
    headingAttribute: string;
    /**
     * if the heading  has two fields, the second one can be used as sub-heading
     */
    subHeadingAttribute?: string;
    /**
     * each row in the data has a child-array that has rows to be taransposed.
     * provide the name of the attribute that has this child-array
     */
    datarowsAttribute: string;
    /**
     * each row in the child-array has a member that has the key based on which
     * we decide which column should it be transposed to.
     * provide the name of this attribute.
     */
    rowKeyAttribute: string;
    /**
     * attribute that has the actual value to be set to the column
     */
    rowValueAttribute: string;
}
/**
 * meta data required to push data nack from column to rows.
 * this is meaniingful only of the cols were created from rows earlier.
 */
export interface ColToRowMeta {
    /**
     * each row in the data has a child-array that has rows to be taransposed.
     * provide the name of the attribute that has this child-array
     */
    datarowsAttribute: string;
    /**
     * each row in the child-array has a member that has the key based on which
     * we decide which column should it be transposed to.
     * provide the name of this attribute.
     */
    rowKeyAttribute: string;
    /**
     * attribute that has the actual value to be set to the column
     */
    rowValueAttribute: string;
}
/**
 * utility that handles row-to-column for rendering,
 * and possibly col back to row to send teh data back to the server
 */
export declare class Transposer {
    /**
     * convert child-rows of each row of data inito its aown attributes as columns
     * @param rowToColMeta meta data as to what and how to convert data from row into column
     * @param tableMeta this is for our bt-table to get column headings and names
     * @param data actual data to be transposed.
     * Each row in this array will have additional members that will be used by bt-table.
     * these values can be later pushed back to the child-rows
     */
    static rowToCol(rowToColMeta: RowToColMeta, tableMeta: {
        names: string[];
        headings: any;
    }, data: object[]): ColToRowMeta;
    /**
     * convert column values back to rows in the data rows
     * @param colToRowMeta meta data that was returned from rowToCol() nethod
     * @param data data that was passed to rowToCol() method
     */
    static colToRow(colToRowMeta: ColToRowMeta, data: object[]): void;
}
//# sourceMappingURL=types.d.ts.map