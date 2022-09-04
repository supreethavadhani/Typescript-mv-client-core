/**
 * constants/conventions that are used across layers.
 * These are fixed at design time. deployment-time parameters can be found in Config
 */
export declare class Conventions {
    /**
     * HTTP headers
     */
    static HEADER_SERVICE: string;
    static HEADER_AUTH: string;
    /**
     * tags or field names in the paylaod back-and-forth
     */
    static TAG_MESSAGES: string;
    static TAG_ALL_OK: string;
    static TAG_DATA: string;
    static TAG_LIST: string;
    static TAG_MAX_ROWS: string;
    static TAG_CONDITIONS: string;
    static TAG_FILTER_COMP: string;
    static TAG_FILTER_VALUE: string;
    static TAG_FILTER_VALUE_TO: string;
    /**
    * special pre-defined service to get drop-down values
    */
    static SERVICE_LIST: string;
    static OP_FETCH: string;
    static OP_NEW: string;
    static OP_UPDATE: string;
    static OP_DELETE: string;
    static OP_FILTER: string;
    static OP_BULK: string;
    static FILTER_EQ: string;
    static FILTER_NE: string;
    static FILTER_LE: string;
    static FILTER_LT: string;
    static FILTER_GE: string;
    static FILTER_GT: string;
    static FILTER_BETWEEN: string;
    static FILTER_STARTS_WITH: string;
    static FILTER_CONTAINS: string;
    static TYPE_TEXT: number;
    static TYPE_INTEGER: number;
    static TYPE_DECIMAL: number;
    static TYPE_BOOLEAN: number;
    static TYPE_DATE: number;
    static TYPE_TIMESTAMP: number;
}
//# sourceMappingURL=conventions.d.ts.map