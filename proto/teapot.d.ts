import * as $protobuf from "protobufjs";
/** Properties of an Accessor. */
export interface IAccessor {

    /** Accessor type */
    type?: (number|null);

    /** Accessor expression */
    expression?: (IExpression|null);
}

/** Represents an Accessor. */
export class Accessor implements IAccessor {

    /**
     * Constructs a new Accessor.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAccessor);

    /** Accessor type. */
    public type: number;

    /** Accessor expression. */
    public expression?: (IExpression|null);

    /**
     * Creates a new Accessor instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Accessor instance
     */
    public static create(properties?: IAccessor): Accessor;

    /**
     * Encodes the specified Accessor message. Does not implicitly {@link Accessor.verify|verify} messages.
     * @param message Accessor message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAccessor, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Accessor message, length delimited. Does not implicitly {@link Accessor.verify|verify} messages.
     * @param message Accessor message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAccessor, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Accessor message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Accessor
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Accessor;

    /**
     * Decodes an Accessor message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Accessor
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Accessor;

    /**
     * Verifies an Accessor message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an Accessor message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Accessor
     */
    public static fromObject(object: { [k: string]: any }): Accessor;

    /**
     * Creates a plain object from an Accessor message. Also converts values to other types if specified.
     * @param message Accessor
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Accessor, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Accessor to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a TextPartition. */
export interface ITextPartition {

    /** TextPartition type */
    type?: (number|null);

    /** TextPartition valueAccessor */
    valueAccessor?: (IAccessor|null);

    /** TextPartition text */
    text?: (string|null);
}

/** Represents a TextPartition. */
export class TextPartition implements ITextPartition {

    /**
     * Constructs a new TextPartition.
     * @param [properties] Properties to set
     */
    constructor(properties?: ITextPartition);

    /** TextPartition type. */
    public type: number;

    /** TextPartition valueAccessor. */
    public valueAccessor?: (IAccessor|null);

    /** TextPartition text. */
    public text: string;

    /**
     * Creates a new TextPartition instance using the specified properties.
     * @param [properties] Properties to set
     * @returns TextPartition instance
     */
    public static create(properties?: ITextPartition): TextPartition;

    /**
     * Encodes the specified TextPartition message. Does not implicitly {@link TextPartition.verify|verify} messages.
     * @param message TextPartition message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ITextPartition, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified TextPartition message, length delimited. Does not implicitly {@link TextPartition.verify|verify} messages.
     * @param message TextPartition message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ITextPartition, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a TextPartition message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns TextPartition
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TextPartition;

    /**
     * Decodes a TextPartition message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns TextPartition
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TextPartition;

    /**
     * Verifies a TextPartition message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a TextPartition message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns TextPartition
     */
    public static fromObject(object: { [k: string]: any }): TextPartition;

    /**
     * Creates a plain object from a TextPartition message. Also converts values to other types if specified.
     * @param message TextPartition
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: TextPartition, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this TextPartition to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an Attribute. */
export interface IAttribute {

    /** Attribute type */
    type?: (number|null);

    /** Attribute name */
    name?: (string|null);

    /** Attribute value */
    value?: (ITextPartition[]|null);
}

/** Represents an Attribute. */
export class Attribute implements IAttribute {

    /**
     * Constructs a new Attribute.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAttribute);

    /** Attribute type. */
    public type: number;

    /** Attribute name. */
    public name: string;

    /** Attribute value. */
    public value: ITextPartition[];

    /**
     * Creates a new Attribute instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Attribute instance
     */
    public static create(properties?: IAttribute): Attribute;

    /**
     * Encodes the specified Attribute message. Does not implicitly {@link Attribute.verify|verify} messages.
     * @param message Attribute message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAttribute, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Attribute message, length delimited. Does not implicitly {@link Attribute.verify|verify} messages.
     * @param message Attribute message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAttribute, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Attribute message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Attribute
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Attribute;

    /**
     * Decodes an Attribute message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Attribute
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Attribute;

    /**
     * Verifies an Attribute message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an Attribute message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Attribute
     */
    public static fromObject(object: { [k: string]: any }): Attribute;

    /**
     * Creates a plain object from an Attribute message. Also converts values to other types if specified.
     * @param message Attribute
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Attribute, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Attribute to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Renderable. */
export interface IRenderable {

    /** Renderable type */
    type?: (number|null);

    /** Renderable textPartitions */
    textPartitions?: (ITextPartition[]|null);

    /** Renderable name */
    name?: (string|null);

    /** Renderable children */
    children?: (IRenderable[]|null);

    /** Renderable attributes */
    attributes?: (IAttribute[]|null);

    /** Renderable next */
    next?: (IRenderable|null);

    /** Renderable condition */
    condition?: (IAccessor|null);

    /** Renderable definition */
    definition?: (IAccessor|null);

    /** Renderable increment */
    increment?: (IAccessor|null);

    /** Renderable definitionVariable */
    definitionVariable?: (string|null);

    /** Renderable incrementVariable */
    incrementVariable?: (string|null);

    /** Renderable iterator */
    iterator?: (boolean|null);

    /** Renderable iterable */
    iterable?: (IAccessor|null);

    /** Renderable variable */
    variable?: (string|null);

    /** Renderable accessor */
    accessor?: (IAccessor|null);
}

/** Represents a Renderable. */
export class Renderable implements IRenderable {

    /**
     * Constructs a new Renderable.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRenderable);

    /** Renderable type. */
    public type: number;

    /** Renderable textPartitions. */
    public textPartitions: ITextPartition[];

    /** Renderable name. */
    public name: string;

    /** Renderable children. */
    public children: IRenderable[];

    /** Renderable attributes. */
    public attributes: IAttribute[];

    /** Renderable next. */
    public next?: (IRenderable|null);

    /** Renderable condition. */
    public condition?: (IAccessor|null);

    /** Renderable definition. */
    public definition?: (IAccessor|null);

    /** Renderable increment. */
    public increment?: (IAccessor|null);

    /** Renderable definitionVariable. */
    public definitionVariable: string;

    /** Renderable incrementVariable. */
    public incrementVariable: string;

    /** Renderable iterator. */
    public iterator: boolean;

    /** Renderable iterable. */
    public iterable?: (IAccessor|null);

    /** Renderable variable. */
    public variable: string;

    /** Renderable accessor. */
    public accessor?: (IAccessor|null);

    /**
     * Creates a new Renderable instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Renderable instance
     */
    public static create(properties?: IRenderable): Renderable;

    /**
     * Encodes the specified Renderable message. Does not implicitly {@link Renderable.verify|verify} messages.
     * @param message Renderable message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRenderable, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Renderable message, length delimited. Does not implicitly {@link Renderable.verify|verify} messages.
     * @param message Renderable message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRenderable, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Renderable message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Renderable
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Renderable;

    /**
     * Decodes a Renderable message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Renderable
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Renderable;

    /**
     * Verifies a Renderable message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Renderable message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Renderable
     */
    public static fromObject(object: { [k: string]: any }): Renderable;

    /**
     * Creates a plain object from a Renderable message. Also converts values to other types if specified.
     * @param message Renderable
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Renderable, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Renderable to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a FieldAccessor. */
export interface IFieldAccessor {

    /** FieldAccessor type */
    type?: (number|null);

    /** FieldAccessor innerExpression */
    innerExpression?: (IExpression|null);

    /** FieldAccessor parameters */
    parameters?: (IExpression|null);

    /** FieldAccessor accessor */
    accessor?: (string|null);
}

/** Represents a FieldAccessor. */
export class FieldAccessor implements IFieldAccessor {

    /**
     * Constructs a new FieldAccessor.
     * @param [properties] Properties to set
     */
    constructor(properties?: IFieldAccessor);

    /** FieldAccessor type. */
    public type: number;

    /** FieldAccessor innerExpression. */
    public innerExpression?: (IExpression|null);

    /** FieldAccessor parameters. */
    public parameters?: (IExpression|null);

    /** FieldAccessor accessor. */
    public accessor: string;

    /**
     * Creates a new FieldAccessor instance using the specified properties.
     * @param [properties] Properties to set
     * @returns FieldAccessor instance
     */
    public static create(properties?: IFieldAccessor): FieldAccessor;

    /**
     * Encodes the specified FieldAccessor message. Does not implicitly {@link FieldAccessor.verify|verify} messages.
     * @param message FieldAccessor message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IFieldAccessor, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified FieldAccessor message, length delimited. Does not implicitly {@link FieldAccessor.verify|verify} messages.
     * @param message FieldAccessor message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IFieldAccessor, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a FieldAccessor message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns FieldAccessor
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): FieldAccessor;

    /**
     * Decodes a FieldAccessor message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns FieldAccessor
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): FieldAccessor;

    /**
     * Verifies a FieldAccessor message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a FieldAccessor message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns FieldAccessor
     */
    public static fromObject(object: { [k: string]: any }): FieldAccessor;

    /**
     * Creates a plain object from a FieldAccessor message. Also converts values to other types if specified.
     * @param message FieldAccessor
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: FieldAccessor, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this FieldAccessor to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an Expression. */
export interface IExpression {

    /** Expression type */
    type?: (number|null);

    /** Expression innerExpression */
    innerExpression?: (IExpression|null);

    /** Expression operator */
    operator?: (string|null);

    /** Expression left */
    left?: (IExpression|null);

    /** Expression right */
    right?: (IExpression|null);

    /** Expression fields */
    fields?: (IFieldAccessor[]|null);

    /** Expression value0 */
    value0?: (string|null);

    /** Expression value1 */
    value1?: (boolean|null);

    /** Expression value2 */
    value2?: (number|null);

    /** Expression value3 */
    value3?: (number|null);
}

/** Represents an Expression. */
export class Expression implements IExpression {

    /**
     * Constructs a new Expression.
     * @param [properties] Properties to set
     */
    constructor(properties?: IExpression);

    /** Expression type. */
    public type: number;

    /** Expression innerExpression. */
    public innerExpression?: (IExpression|null);

    /** Expression operator. */
    public operator: string;

    /** Expression left. */
    public left?: (IExpression|null);

    /** Expression right. */
    public right?: (IExpression|null);

    /** Expression fields. */
    public fields: IFieldAccessor[];

    /** Expression value0. */
    public value0: string;

    /** Expression value1. */
    public value1: boolean;

    /** Expression value2. */
    public value2: number;

    /** Expression value3. */
    public value3: number;

    /** Expression value. */
    public value?: ("value0"|"value1"|"value2"|"value3");

    /**
     * Creates a new Expression instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Expression instance
     */
    public static create(properties?: IExpression): Expression;

    /**
     * Encodes the specified Expression message. Does not implicitly {@link Expression.verify|verify} messages.
     * @param message Expression message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IExpression, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Expression message, length delimited. Does not implicitly {@link Expression.verify|verify} messages.
     * @param message Expression message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IExpression, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Expression message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Expression
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Expression;

    /**
     * Decodes an Expression message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Expression
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Expression;

    /**
     * Verifies an Expression message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an Expression message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Expression
     */
    public static fromObject(object: { [k: string]: any }): Expression;

    /**
     * Creates a plain object from an Expression message. Also converts values to other types if specified.
     * @param message Expression
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Expression, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Expression to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a TeapotTemplateMessage. */
export interface ITeapotTemplateMessage {

    /** TeapotTemplateMessage type */
    type?: (number|null);

    /** TeapotTemplateMessage root */
    root?: (IRenderable|null);
}

/** Represents a TeapotTemplateMessage. */
export class TeapotTemplateMessage implements ITeapotTemplateMessage {

    /**
     * Constructs a new TeapotTemplateMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: ITeapotTemplateMessage);

    /** TeapotTemplateMessage type. */
    public type: number;

    /** TeapotTemplateMessage root. */
    public root?: (IRenderable|null);

    /**
     * Creates a new TeapotTemplateMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns TeapotTemplateMessage instance
     */
    public static create(properties?: ITeapotTemplateMessage): TeapotTemplateMessage;

    /**
     * Encodes the specified TeapotTemplateMessage message. Does not implicitly {@link TeapotTemplateMessage.verify|verify} messages.
     * @param message TeapotTemplateMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ITeapotTemplateMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified TeapotTemplateMessage message, length delimited. Does not implicitly {@link TeapotTemplateMessage.verify|verify} messages.
     * @param message TeapotTemplateMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ITeapotTemplateMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a TeapotTemplateMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns TeapotTemplateMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TeapotTemplateMessage;

    /**
     * Decodes a TeapotTemplateMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns TeapotTemplateMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TeapotTemplateMessage;

    /**
     * Verifies a TeapotTemplateMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a TeapotTemplateMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns TeapotTemplateMessage
     */
    public static fromObject(object: { [k: string]: any }): TeapotTemplateMessage;

    /**
     * Creates a plain object from a TeapotTemplateMessage message. Also converts values to other types if specified.
     * @param message TeapotTemplateMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: TeapotTemplateMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this TeapotTemplateMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
