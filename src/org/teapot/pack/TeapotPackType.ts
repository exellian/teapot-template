export default class TeapotPackType {

    public static readonly TEXT: number = 0;
    public static readonly TAG: number = 1;
    public static readonly FOR: number = 2;
    public static readonly IF: number = 3;
    public static readonly BRACKETS: number = 4;
    public static readonly OPERATOR: number = 5;
    public static readonly PROPERTY: number = 6;
    public static readonly VALUE: number = 7;
    public static readonly ARRAY_FIELD_ACCESSOR: number = 8;
    public static readonly FUNCTION_FIELD_ACCESSOR: number = 9;
    public static readonly OBJECT_FIELD_ACCESSOR: number = 10;

    public static isAnnotation(type: number): boolean {
        return type >= 2 && type <= 3;
    }
}
