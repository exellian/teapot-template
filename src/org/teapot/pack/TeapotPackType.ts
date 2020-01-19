export default class TeapotPackType {

    public static readonly TEMPLATE = 0;
    public static readonly ACCESSOR = 1;
    public static readonly ATTRIBUTE = 2;
    public static readonly TEXT: number = 3;
    public static readonly TAG: number = 4;
    public static readonly FOR: number = 5;
    public static readonly IF: number = 6;
    public static readonly CLICK: number = 7;
    public static readonly HOVER: number = 8;
    public static readonly INPUT: number = 9;
    public static readonly BRACKETS: number = 10;
    public static readonly OPERATOR: number = 11;
    public static readonly PROPERTY: number = 12;
    public static readonly VALUE: number = 13;
    public static readonly ARRAY_FIELD_ACCESSOR: number = 14;
    public static readonly FUNCTION_FIELD_ACCESSOR: number = 15;
    public static readonly OBJECT_FIELD_ACCESSOR: number = 16;
    public static readonly RAW_TEXT: number = 17;
    public static readonly VALUE_TEXT: number = 18;

    public static isAnnotation(type: number): boolean {
        return type >= 5 && type <= 9;
    }
}
