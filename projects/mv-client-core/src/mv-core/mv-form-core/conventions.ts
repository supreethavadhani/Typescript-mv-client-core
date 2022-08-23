/**
 * constants/conventions that are used across layers.
 * These are fixed at design time. deployment-time parameters can be found in Config
 */
export class Conventions {
    /**
     * HTTP headers
     */
	static HEADER_SERVICE = '_s';
	static HEADER_AUTH = 'Authorization';
	
    /**
     * tags or field names in the paylaod back-and-forth
     */
    static TAG_MESSAGES = 'messages';
	static TAG_ALL_OK = 'allOk';
	static TAG_DATA = 'data';
	static TAG_LIST = 'list';
	static TAG_MAX_ROWS = 'maxRows';
	static TAG_CONDITIONS = 'conditions';
	static TAG_FILTER_COMP = 'comp';
	static TAG_FILTER_VALUE = 'value';
    static TAG_FILTER_VALUE_TO = 'toValue';
    
     /**
     * special pre-defined service to get drop-down values
     */
    public static SERVICE_LIST = 'list';
    /*
	 * form I/O service prefixes
	 */
    static OP_FETCH = 'get';
    static OP_NEW = 'create';
    static OP_UPDATE = 'update';
    static OP_DELETE = 'delete';
    static OP_FILTER = 'filter';
    static OP_BULK = 'bulk';

	/*
	 * filter operators
	 */
    static FILTER_EQ = '=';
    static FILTER_NE = '!=';
    static FILTER_LE = '<=';
    static FILTER_LT = '<';
    static FILTER_GE = '>=';
    static FILTER_GT = '>';
    static FILTER_BETWEEN = '><';
    static FILTER_STARTS_WITH = '^';
    static FILTER_CONTAINS = '~';
    
    /*
     * value types of fields 
     */
    static TYPE_TEXT = 0;
	static TYPE_INTEGER = 1;
	static TYPE_DECIMAL = 2;
	static TYPE_BOOLEAN = 3;
	static TYPE_DATE = 4;
	static TYPE_TIMESTAMP = 5;
}
