/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Accessor = (function() {

    /**
     * Properties of an Accessor.
     * @exports IAccessor
     * @interface IAccessor
     * @property {number|null} [type] Accessor type
     * @property {IExpression|null} [expression] Accessor expression
     */

    /**
     * Constructs a new Accessor.
     * @exports Accessor
     * @classdesc Represents an Accessor.
     * @implements IAccessor
     * @constructor
     * @param {IAccessor=} [properties] Properties to set
     */
    function Accessor(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Accessor type.
     * @member {number} type
     * @memberof Accessor
     * @instance
     */
    Accessor.prototype.type = 0;

    /**
     * Accessor expression.
     * @member {IExpression|null|undefined} expression
     * @memberof Accessor
     * @instance
     */
    Accessor.prototype.expression = null;

    /**
     * Creates a new Accessor instance using the specified properties.
     * @function create
     * @memberof Accessor
     * @static
     * @param {IAccessor=} [properties] Properties to set
     * @returns {Accessor} Accessor instance
     */
    Accessor.create = function create(properties) {
        return new Accessor(properties);
    };

    /**
     * Encodes the specified Accessor message. Does not implicitly {@link Accessor.verify|verify} messages.
     * @function encode
     * @memberof Accessor
     * @static
     * @param {IAccessor} message Accessor message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Accessor.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && message.hasOwnProperty("type"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.type);
        if (message.expression != null && message.hasOwnProperty("expression"))
            $root.Expression.encode(message.expression, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Accessor message, length delimited. Does not implicitly {@link Accessor.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Accessor
     * @static
     * @param {IAccessor} message Accessor message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Accessor.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Accessor message from the specified reader or buffer.
     * @function decode
     * @memberof Accessor
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Accessor} Accessor
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Accessor.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Accessor();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.type = reader.uint32();
                break;
            case 2:
                message.expression = $root.Expression.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Accessor message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Accessor
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Accessor} Accessor
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Accessor.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Accessor message.
     * @function verify
     * @memberof Accessor
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Accessor.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isInteger(message.type))
                return "type: integer expected";
        if (message.expression != null && message.hasOwnProperty("expression")) {
            var error = $root.Expression.verify(message.expression);
            if (error)
                return "expression." + error;
        }
        return null;
    };

    /**
     * Creates an Accessor message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Accessor
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Accessor} Accessor
     */
    Accessor.fromObject = function fromObject(object) {
        if (object instanceof $root.Accessor)
            return object;
        var message = new $root.Accessor();
        if (object.type != null)
            message.type = object.type >>> 0;
        if (object.expression != null) {
            if (typeof object.expression !== "object")
                throw TypeError(".Accessor.expression: object expected");
            message.expression = $root.Expression.fromObject(object.expression);
        }
        return message;
    };

    /**
     * Creates a plain object from an Accessor message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Accessor
     * @static
     * @param {Accessor} message Accessor
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Accessor.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.type = 0;
            object.expression = null;
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = message.type;
        if (message.expression != null && message.hasOwnProperty("expression"))
            object.expression = $root.Expression.toObject(message.expression, options);
        return object;
    };

    /**
     * Converts this Accessor to JSON.
     * @function toJSON
     * @memberof Accessor
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Accessor.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Accessor;
})();

$root.TextPartition = (function() {

    /**
     * Properties of a TextPartition.
     * @exports ITextPartition
     * @interface ITextPartition
     * @property {number|null} [type] TextPartition type
     * @property {IAccessor|null} [valueAccessor] TextPartition valueAccessor
     * @property {string|null} [text] TextPartition text
     */

    /**
     * Constructs a new TextPartition.
     * @exports TextPartition
     * @classdesc Represents a TextPartition.
     * @implements ITextPartition
     * @constructor
     * @param {ITextPartition=} [properties] Properties to set
     */
    function TextPartition(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * TextPartition type.
     * @member {number} type
     * @memberof TextPartition
     * @instance
     */
    TextPartition.prototype.type = 0;

    /**
     * TextPartition valueAccessor.
     * @member {IAccessor|null|undefined} valueAccessor
     * @memberof TextPartition
     * @instance
     */
    TextPartition.prototype.valueAccessor = null;

    /**
     * TextPartition text.
     * @member {string} text
     * @memberof TextPartition
     * @instance
     */
    TextPartition.prototype.text = "";

    /**
     * Creates a new TextPartition instance using the specified properties.
     * @function create
     * @memberof TextPartition
     * @static
     * @param {ITextPartition=} [properties] Properties to set
     * @returns {TextPartition} TextPartition instance
     */
    TextPartition.create = function create(properties) {
        return new TextPartition(properties);
    };

    /**
     * Encodes the specified TextPartition message. Does not implicitly {@link TextPartition.verify|verify} messages.
     * @function encode
     * @memberof TextPartition
     * @static
     * @param {ITextPartition} message TextPartition message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TextPartition.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && message.hasOwnProperty("type"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.type);
        if (message.valueAccessor != null && message.hasOwnProperty("valueAccessor"))
            $root.Accessor.encode(message.valueAccessor, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.text != null && message.hasOwnProperty("text"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.text);
        return writer;
    };

    /**
     * Encodes the specified TextPartition message, length delimited. Does not implicitly {@link TextPartition.verify|verify} messages.
     * @function encodeDelimited
     * @memberof TextPartition
     * @static
     * @param {ITextPartition} message TextPartition message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TextPartition.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a TextPartition message from the specified reader or buffer.
     * @function decode
     * @memberof TextPartition
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {TextPartition} TextPartition
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TextPartition.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TextPartition();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.type = reader.uint32();
                break;
            case 2:
                message.valueAccessor = $root.Accessor.decode(reader, reader.uint32());
                break;
            case 3:
                message.text = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a TextPartition message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof TextPartition
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {TextPartition} TextPartition
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TextPartition.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a TextPartition message.
     * @function verify
     * @memberof TextPartition
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    TextPartition.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isInteger(message.type))
                return "type: integer expected";
        if (message.valueAccessor != null && message.hasOwnProperty("valueAccessor")) {
            var error = $root.Accessor.verify(message.valueAccessor);
            if (error)
                return "valueAccessor." + error;
        }
        if (message.text != null && message.hasOwnProperty("text"))
            if (!$util.isString(message.text))
                return "text: string expected";
        return null;
    };

    /**
     * Creates a TextPartition message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof TextPartition
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {TextPartition} TextPartition
     */
    TextPartition.fromObject = function fromObject(object) {
        if (object instanceof $root.TextPartition)
            return object;
        var message = new $root.TextPartition();
        if (object.type != null)
            message.type = object.type >>> 0;
        if (object.valueAccessor != null) {
            if (typeof object.valueAccessor !== "object")
                throw TypeError(".TextPartition.valueAccessor: object expected");
            message.valueAccessor = $root.Accessor.fromObject(object.valueAccessor);
        }
        if (object.text != null)
            message.text = String(object.text);
        return message;
    };

    /**
     * Creates a plain object from a TextPartition message. Also converts values to other types if specified.
     * @function toObject
     * @memberof TextPartition
     * @static
     * @param {TextPartition} message TextPartition
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    TextPartition.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.type = 0;
            object.valueAccessor = null;
            object.text = "";
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = message.type;
        if (message.valueAccessor != null && message.hasOwnProperty("valueAccessor"))
            object.valueAccessor = $root.Accessor.toObject(message.valueAccessor, options);
        if (message.text != null && message.hasOwnProperty("text"))
            object.text = message.text;
        return object;
    };

    /**
     * Converts this TextPartition to JSON.
     * @function toJSON
     * @memberof TextPartition
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    TextPartition.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return TextPartition;
})();

$root.Attribute = (function() {

    /**
     * Properties of an Attribute.
     * @exports IAttribute
     * @interface IAttribute
     * @property {number|null} [type] Attribute type
     * @property {string|null} [name] Attribute name
     * @property {ITextPartition|null} [value] Attribute value
     */

    /**
     * Constructs a new Attribute.
     * @exports Attribute
     * @classdesc Represents an Attribute.
     * @implements IAttribute
     * @constructor
     * @param {IAttribute=} [properties] Properties to set
     */
    function Attribute(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Attribute type.
     * @member {number} type
     * @memberof Attribute
     * @instance
     */
    Attribute.prototype.type = 0;

    /**
     * Attribute name.
     * @member {string} name
     * @memberof Attribute
     * @instance
     */
    Attribute.prototype.name = "";

    /**
     * Attribute value.
     * @member {ITextPartition|null|undefined} value
     * @memberof Attribute
     * @instance
     */
    Attribute.prototype.value = null;

    /**
     * Creates a new Attribute instance using the specified properties.
     * @function create
     * @memberof Attribute
     * @static
     * @param {IAttribute=} [properties] Properties to set
     * @returns {Attribute} Attribute instance
     */
    Attribute.create = function create(properties) {
        return new Attribute(properties);
    };

    /**
     * Encodes the specified Attribute message. Does not implicitly {@link Attribute.verify|verify} messages.
     * @function encode
     * @memberof Attribute
     * @static
     * @param {IAttribute} message Attribute message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Attribute.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && message.hasOwnProperty("type"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.type);
        if (message.name != null && message.hasOwnProperty("name"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
        if (message.value != null && message.hasOwnProperty("value"))
            $root.TextPartition.encode(message.value, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Attribute message, length delimited. Does not implicitly {@link Attribute.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Attribute
     * @static
     * @param {IAttribute} message Attribute message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Attribute.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Attribute message from the specified reader or buffer.
     * @function decode
     * @memberof Attribute
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Attribute} Attribute
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Attribute.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Attribute();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.type = reader.uint32();
                break;
            case 2:
                message.name = reader.string();
                break;
            case 3:
                message.value = $root.TextPartition.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Attribute message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Attribute
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Attribute} Attribute
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Attribute.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Attribute message.
     * @function verify
     * @memberof Attribute
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Attribute.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isInteger(message.type))
                return "type: integer expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.value != null && message.hasOwnProperty("value")) {
            var error = $root.TextPartition.verify(message.value);
            if (error)
                return "value." + error;
        }
        return null;
    };

    /**
     * Creates an Attribute message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Attribute
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Attribute} Attribute
     */
    Attribute.fromObject = function fromObject(object) {
        if (object instanceof $root.Attribute)
            return object;
        var message = new $root.Attribute();
        if (object.type != null)
            message.type = object.type >>> 0;
        if (object.name != null)
            message.name = String(object.name);
        if (object.value != null) {
            if (typeof object.value !== "object")
                throw TypeError(".Attribute.value: object expected");
            message.value = $root.TextPartition.fromObject(object.value);
        }
        return message;
    };

    /**
     * Creates a plain object from an Attribute message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Attribute
     * @static
     * @param {Attribute} message Attribute
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Attribute.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.type = 0;
            object.name = "";
            object.value = null;
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = message.type;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.value != null && message.hasOwnProperty("value"))
            object.value = $root.TextPartition.toObject(message.value, options);
        return object;
    };

    /**
     * Converts this Attribute to JSON.
     * @function toJSON
     * @memberof Attribute
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Attribute.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Attribute;
})();

$root.Renderable = (function() {

    /**
     * Properties of a Renderable.
     * @exports IRenderable
     * @interface IRenderable
     * @property {number|null} [type] Renderable type
     * @property {Array.<ITextPartition>|null} [textPartitions] Renderable textPartitions
     * @property {string|null} [name] Renderable name
     * @property {Array.<IRenderable>|null} [children] Renderable children
     * @property {Array.<IAttribute>|null} [attributes] Renderable attributes
     * @property {IRenderable|null} [next] Renderable next
     * @property {IAccessor|null} [condition] Renderable condition
     * @property {IAccessor|null} [definition] Renderable definition
     * @property {IAccessor|null} [increment] Renderable increment
     * @property {string|null} [definitionVariable] Renderable definitionVariable
     * @property {string|null} [incrementVariable] Renderable incrementVariable
     * @property {boolean|null} [iterator] Renderable iterator
     * @property {IAccessor|null} [iterable] Renderable iterable
     * @property {string|null} [variable] Renderable variable
     * @property {IAccessor|null} [accessor] Renderable accessor
     */

    /**
     * Constructs a new Renderable.
     * @exports Renderable
     * @classdesc Represents a Renderable.
     * @implements IRenderable
     * @constructor
     * @param {IRenderable=} [properties] Properties to set
     */
    function Renderable(properties) {
        this.textPartitions = [];
        this.children = [];
        this.attributes = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Renderable type.
     * @member {number} type
     * @memberof Renderable
     * @instance
     */
    Renderable.prototype.type = 0;

    /**
     * Renderable textPartitions.
     * @member {Array.<ITextPartition>} textPartitions
     * @memberof Renderable
     * @instance
     */
    Renderable.prototype.textPartitions = $util.emptyArray;

    /**
     * Renderable name.
     * @member {string} name
     * @memberof Renderable
     * @instance
     */
    Renderable.prototype.name = "";

    /**
     * Renderable children.
     * @member {Array.<IRenderable>} children
     * @memberof Renderable
     * @instance
     */
    Renderable.prototype.children = $util.emptyArray;

    /**
     * Renderable attributes.
     * @member {Array.<IAttribute>} attributes
     * @memberof Renderable
     * @instance
     */
    Renderable.prototype.attributes = $util.emptyArray;

    /**
     * Renderable next.
     * @member {IRenderable|null|undefined} next
     * @memberof Renderable
     * @instance
     */
    Renderable.prototype.next = null;

    /**
     * Renderable condition.
     * @member {IAccessor|null|undefined} condition
     * @memberof Renderable
     * @instance
     */
    Renderable.prototype.condition = null;

    /**
     * Renderable definition.
     * @member {IAccessor|null|undefined} definition
     * @memberof Renderable
     * @instance
     */
    Renderable.prototype.definition = null;

    /**
     * Renderable increment.
     * @member {IAccessor|null|undefined} increment
     * @memberof Renderable
     * @instance
     */
    Renderable.prototype.increment = null;

    /**
     * Renderable definitionVariable.
     * @member {string} definitionVariable
     * @memberof Renderable
     * @instance
     */
    Renderable.prototype.definitionVariable = "";

    /**
     * Renderable incrementVariable.
     * @member {string} incrementVariable
     * @memberof Renderable
     * @instance
     */
    Renderable.prototype.incrementVariable = "";

    /**
     * Renderable iterator.
     * @member {boolean} iterator
     * @memberof Renderable
     * @instance
     */
    Renderable.prototype.iterator = false;

    /**
     * Renderable iterable.
     * @member {IAccessor|null|undefined} iterable
     * @memberof Renderable
     * @instance
     */
    Renderable.prototype.iterable = null;

    /**
     * Renderable variable.
     * @member {string} variable
     * @memberof Renderable
     * @instance
     */
    Renderable.prototype.variable = "";

    /**
     * Renderable accessor.
     * @member {IAccessor|null|undefined} accessor
     * @memberof Renderable
     * @instance
     */
    Renderable.prototype.accessor = null;

    /**
     * Creates a new Renderable instance using the specified properties.
     * @function create
     * @memberof Renderable
     * @static
     * @param {IRenderable=} [properties] Properties to set
     * @returns {Renderable} Renderable instance
     */
    Renderable.create = function create(properties) {
        return new Renderable(properties);
    };

    /**
     * Encodes the specified Renderable message. Does not implicitly {@link Renderable.verify|verify} messages.
     * @function encode
     * @memberof Renderable
     * @static
     * @param {IRenderable} message Renderable message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Renderable.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && message.hasOwnProperty("type"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.type);
        if (message.textPartitions != null && message.textPartitions.length)
            for (var i = 0; i < message.textPartitions.length; ++i)
                $root.TextPartition.encode(message.textPartitions[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.name != null && message.hasOwnProperty("name"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
        if (message.children != null && message.children.length)
            for (var i = 0; i < message.children.length; ++i)
                $root.Renderable.encode(message.children[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.attributes != null && message.attributes.length)
            for (var i = 0; i < message.attributes.length; ++i)
                $root.Attribute.encode(message.attributes[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.next != null && message.hasOwnProperty("next"))
            $root.Renderable.encode(message.next, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.condition != null && message.hasOwnProperty("condition"))
            $root.Accessor.encode(message.condition, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        if (message.definition != null && message.hasOwnProperty("definition"))
            $root.Accessor.encode(message.definition, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
        if (message.increment != null && message.hasOwnProperty("increment"))
            $root.Accessor.encode(message.increment, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
        if (message.definitionVariable != null && message.hasOwnProperty("definitionVariable"))
            writer.uint32(/* id 10, wireType 2 =*/82).string(message.definitionVariable);
        if (message.incrementVariable != null && message.hasOwnProperty("incrementVariable"))
            writer.uint32(/* id 11, wireType 2 =*/90).string(message.incrementVariable);
        if (message.iterator != null && message.hasOwnProperty("iterator"))
            writer.uint32(/* id 12, wireType 0 =*/96).bool(message.iterator);
        if (message.iterable != null && message.hasOwnProperty("iterable"))
            $root.Accessor.encode(message.iterable, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
        if (message.variable != null && message.hasOwnProperty("variable"))
            writer.uint32(/* id 14, wireType 2 =*/114).string(message.variable);
        if (message.accessor != null && message.hasOwnProperty("accessor"))
            $root.Accessor.encode(message.accessor, writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Renderable message, length delimited. Does not implicitly {@link Renderable.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Renderable
     * @static
     * @param {IRenderable} message Renderable message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Renderable.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Renderable message from the specified reader or buffer.
     * @function decode
     * @memberof Renderable
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Renderable} Renderable
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Renderable.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Renderable();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.type = reader.uint32();
                break;
            case 2:
                if (!(message.textPartitions && message.textPartitions.length))
                    message.textPartitions = [];
                message.textPartitions.push($root.TextPartition.decode(reader, reader.uint32()));
                break;
            case 3:
                message.name = reader.string();
                break;
            case 4:
                if (!(message.children && message.children.length))
                    message.children = [];
                message.children.push($root.Renderable.decode(reader, reader.uint32()));
                break;
            case 5:
                if (!(message.attributes && message.attributes.length))
                    message.attributes = [];
                message.attributes.push($root.Attribute.decode(reader, reader.uint32()));
                break;
            case 6:
                message.next = $root.Renderable.decode(reader, reader.uint32());
                break;
            case 7:
                message.condition = $root.Accessor.decode(reader, reader.uint32());
                break;
            case 8:
                message.definition = $root.Accessor.decode(reader, reader.uint32());
                break;
            case 9:
                message.increment = $root.Accessor.decode(reader, reader.uint32());
                break;
            case 10:
                message.definitionVariable = reader.string();
                break;
            case 11:
                message.incrementVariable = reader.string();
                break;
            case 12:
                message.iterator = reader.bool();
                break;
            case 13:
                message.iterable = $root.Accessor.decode(reader, reader.uint32());
                break;
            case 14:
                message.variable = reader.string();
                break;
            case 15:
                message.accessor = $root.Accessor.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Renderable message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Renderable
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Renderable} Renderable
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Renderable.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Renderable message.
     * @function verify
     * @memberof Renderable
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Renderable.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isInteger(message.type))
                return "type: integer expected";
        if (message.textPartitions != null && message.hasOwnProperty("textPartitions")) {
            if (!Array.isArray(message.textPartitions))
                return "textPartitions: array expected";
            for (var i = 0; i < message.textPartitions.length; ++i) {
                var error = $root.TextPartition.verify(message.textPartitions[i]);
                if (error)
                    return "textPartitions." + error;
            }
        }
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.children != null && message.hasOwnProperty("children")) {
            if (!Array.isArray(message.children))
                return "children: array expected";
            for (var i = 0; i < message.children.length; ++i) {
                var error = $root.Renderable.verify(message.children[i]);
                if (error)
                    return "children." + error;
            }
        }
        if (message.attributes != null && message.hasOwnProperty("attributes")) {
            if (!Array.isArray(message.attributes))
                return "attributes: array expected";
            for (var i = 0; i < message.attributes.length; ++i) {
                var error = $root.Attribute.verify(message.attributes[i]);
                if (error)
                    return "attributes." + error;
            }
        }
        if (message.next != null && message.hasOwnProperty("next")) {
            var error = $root.Renderable.verify(message.next);
            if (error)
                return "next." + error;
        }
        if (message.condition != null && message.hasOwnProperty("condition")) {
            var error = $root.Accessor.verify(message.condition);
            if (error)
                return "condition." + error;
        }
        if (message.definition != null && message.hasOwnProperty("definition")) {
            var error = $root.Accessor.verify(message.definition);
            if (error)
                return "definition." + error;
        }
        if (message.increment != null && message.hasOwnProperty("increment")) {
            var error = $root.Accessor.verify(message.increment);
            if (error)
                return "increment." + error;
        }
        if (message.definitionVariable != null && message.hasOwnProperty("definitionVariable"))
            if (!$util.isString(message.definitionVariable))
                return "definitionVariable: string expected";
        if (message.incrementVariable != null && message.hasOwnProperty("incrementVariable"))
            if (!$util.isString(message.incrementVariable))
                return "incrementVariable: string expected";
        if (message.iterator != null && message.hasOwnProperty("iterator"))
            if (typeof message.iterator !== "boolean")
                return "iterator: boolean expected";
        if (message.iterable != null && message.hasOwnProperty("iterable")) {
            var error = $root.Accessor.verify(message.iterable);
            if (error)
                return "iterable." + error;
        }
        if (message.variable != null && message.hasOwnProperty("variable"))
            if (!$util.isString(message.variable))
                return "variable: string expected";
        if (message.accessor != null && message.hasOwnProperty("accessor")) {
            var error = $root.Accessor.verify(message.accessor);
            if (error)
                return "accessor." + error;
        }
        return null;
    };

    /**
     * Creates a Renderable message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Renderable
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Renderable} Renderable
     */
    Renderable.fromObject = function fromObject(object) {
        if (object instanceof $root.Renderable)
            return object;
        var message = new $root.Renderable();
        if (object.type != null)
            message.type = object.type >>> 0;
        if (object.textPartitions) {
            if (!Array.isArray(object.textPartitions))
                throw TypeError(".Renderable.textPartitions: array expected");
            message.textPartitions = [];
            for (var i = 0; i < object.textPartitions.length; ++i) {
                if (typeof object.textPartitions[i] !== "object")
                    throw TypeError(".Renderable.textPartitions: object expected");
                message.textPartitions[i] = $root.TextPartition.fromObject(object.textPartitions[i]);
            }
        }
        if (object.name != null)
            message.name = String(object.name);
        if (object.children) {
            if (!Array.isArray(object.children))
                throw TypeError(".Renderable.children: array expected");
            message.children = [];
            for (var i = 0; i < object.children.length; ++i) {
                if (typeof object.children[i] !== "object")
                    throw TypeError(".Renderable.children: object expected");
                message.children[i] = $root.Renderable.fromObject(object.children[i]);
            }
        }
        if (object.attributes) {
            if (!Array.isArray(object.attributes))
                throw TypeError(".Renderable.attributes: array expected");
            message.attributes = [];
            for (var i = 0; i < object.attributes.length; ++i) {
                if (typeof object.attributes[i] !== "object")
                    throw TypeError(".Renderable.attributes: object expected");
                message.attributes[i] = $root.Attribute.fromObject(object.attributes[i]);
            }
        }
        if (object.next != null) {
            if (typeof object.next !== "object")
                throw TypeError(".Renderable.next: object expected");
            message.next = $root.Renderable.fromObject(object.next);
        }
        if (object.condition != null) {
            if (typeof object.condition !== "object")
                throw TypeError(".Renderable.condition: object expected");
            message.condition = $root.Accessor.fromObject(object.condition);
        }
        if (object.definition != null) {
            if (typeof object.definition !== "object")
                throw TypeError(".Renderable.definition: object expected");
            message.definition = $root.Accessor.fromObject(object.definition);
        }
        if (object.increment != null) {
            if (typeof object.increment !== "object")
                throw TypeError(".Renderable.increment: object expected");
            message.increment = $root.Accessor.fromObject(object.increment);
        }
        if (object.definitionVariable != null)
            message.definitionVariable = String(object.definitionVariable);
        if (object.incrementVariable != null)
            message.incrementVariable = String(object.incrementVariable);
        if (object.iterator != null)
            message.iterator = Boolean(object.iterator);
        if (object.iterable != null) {
            if (typeof object.iterable !== "object")
                throw TypeError(".Renderable.iterable: object expected");
            message.iterable = $root.Accessor.fromObject(object.iterable);
        }
        if (object.variable != null)
            message.variable = String(object.variable);
        if (object.accessor != null) {
            if (typeof object.accessor !== "object")
                throw TypeError(".Renderable.accessor: object expected");
            message.accessor = $root.Accessor.fromObject(object.accessor);
        }
        return message;
    };

    /**
     * Creates a plain object from a Renderable message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Renderable
     * @static
     * @param {Renderable} message Renderable
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Renderable.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.textPartitions = [];
            object.children = [];
            object.attributes = [];
        }
        if (options.defaults) {
            object.type = 0;
            object.name = "";
            object.next = null;
            object.condition = null;
            object.definition = null;
            object.increment = null;
            object.definitionVariable = "";
            object.incrementVariable = "";
            object.iterator = false;
            object.iterable = null;
            object.variable = "";
            object.accessor = null;
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = message.type;
        if (message.textPartitions && message.textPartitions.length) {
            object.textPartitions = [];
            for (var j = 0; j < message.textPartitions.length; ++j)
                object.textPartitions[j] = $root.TextPartition.toObject(message.textPartitions[j], options);
        }
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.children && message.children.length) {
            object.children = [];
            for (var j = 0; j < message.children.length; ++j)
                object.children[j] = $root.Renderable.toObject(message.children[j], options);
        }
        if (message.attributes && message.attributes.length) {
            object.attributes = [];
            for (var j = 0; j < message.attributes.length; ++j)
                object.attributes[j] = $root.Attribute.toObject(message.attributes[j], options);
        }
        if (message.next != null && message.hasOwnProperty("next"))
            object.next = $root.Renderable.toObject(message.next, options);
        if (message.condition != null && message.hasOwnProperty("condition"))
            object.condition = $root.Accessor.toObject(message.condition, options);
        if (message.definition != null && message.hasOwnProperty("definition"))
            object.definition = $root.Accessor.toObject(message.definition, options);
        if (message.increment != null && message.hasOwnProperty("increment"))
            object.increment = $root.Accessor.toObject(message.increment, options);
        if (message.definitionVariable != null && message.hasOwnProperty("definitionVariable"))
            object.definitionVariable = message.definitionVariable;
        if (message.incrementVariable != null && message.hasOwnProperty("incrementVariable"))
            object.incrementVariable = message.incrementVariable;
        if (message.iterator != null && message.hasOwnProperty("iterator"))
            object.iterator = message.iterator;
        if (message.iterable != null && message.hasOwnProperty("iterable"))
            object.iterable = $root.Accessor.toObject(message.iterable, options);
        if (message.variable != null && message.hasOwnProperty("variable"))
            object.variable = message.variable;
        if (message.accessor != null && message.hasOwnProperty("accessor"))
            object.accessor = $root.Accessor.toObject(message.accessor, options);
        return object;
    };

    /**
     * Converts this Renderable to JSON.
     * @function toJSON
     * @memberof Renderable
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Renderable.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Renderable;
})();

$root.FieldAccessor = (function() {

    /**
     * Properties of a FieldAccessor.
     * @exports IFieldAccessor
     * @interface IFieldAccessor
     * @property {number|null} [type] FieldAccessor type
     * @property {IExpression|null} [innerExpression] FieldAccessor innerExpression
     * @property {IExpression|null} [parameters] FieldAccessor parameters
     * @property {string|null} [accessor] FieldAccessor accessor
     */

    /**
     * Constructs a new FieldAccessor.
     * @exports FieldAccessor
     * @classdesc Represents a FieldAccessor.
     * @implements IFieldAccessor
     * @constructor
     * @param {IFieldAccessor=} [properties] Properties to set
     */
    function FieldAccessor(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * FieldAccessor type.
     * @member {number} type
     * @memberof FieldAccessor
     * @instance
     */
    FieldAccessor.prototype.type = 0;

    /**
     * FieldAccessor innerExpression.
     * @member {IExpression|null|undefined} innerExpression
     * @memberof FieldAccessor
     * @instance
     */
    FieldAccessor.prototype.innerExpression = null;

    /**
     * FieldAccessor parameters.
     * @member {IExpression|null|undefined} parameters
     * @memberof FieldAccessor
     * @instance
     */
    FieldAccessor.prototype.parameters = null;

    /**
     * FieldAccessor accessor.
     * @member {string} accessor
     * @memberof FieldAccessor
     * @instance
     */
    FieldAccessor.prototype.accessor = "";

    /**
     * Creates a new FieldAccessor instance using the specified properties.
     * @function create
     * @memberof FieldAccessor
     * @static
     * @param {IFieldAccessor=} [properties] Properties to set
     * @returns {FieldAccessor} FieldAccessor instance
     */
    FieldAccessor.create = function create(properties) {
        return new FieldAccessor(properties);
    };

    /**
     * Encodes the specified FieldAccessor message. Does not implicitly {@link FieldAccessor.verify|verify} messages.
     * @function encode
     * @memberof FieldAccessor
     * @static
     * @param {IFieldAccessor} message FieldAccessor message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    FieldAccessor.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && message.hasOwnProperty("type"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.type);
        if (message.innerExpression != null && message.hasOwnProperty("innerExpression"))
            $root.Expression.encode(message.innerExpression, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.parameters != null && message.hasOwnProperty("parameters"))
            $root.Expression.encode(message.parameters, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.accessor != null && message.hasOwnProperty("accessor"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.accessor);
        return writer;
    };

    /**
     * Encodes the specified FieldAccessor message, length delimited. Does not implicitly {@link FieldAccessor.verify|verify} messages.
     * @function encodeDelimited
     * @memberof FieldAccessor
     * @static
     * @param {IFieldAccessor} message FieldAccessor message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    FieldAccessor.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a FieldAccessor message from the specified reader or buffer.
     * @function decode
     * @memberof FieldAccessor
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {FieldAccessor} FieldAccessor
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    FieldAccessor.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.FieldAccessor();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.type = reader.uint32();
                break;
            case 2:
                message.innerExpression = $root.Expression.decode(reader, reader.uint32());
                break;
            case 3:
                message.parameters = $root.Expression.decode(reader, reader.uint32());
                break;
            case 4:
                message.accessor = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a FieldAccessor message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof FieldAccessor
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {FieldAccessor} FieldAccessor
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    FieldAccessor.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a FieldAccessor message.
     * @function verify
     * @memberof FieldAccessor
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    FieldAccessor.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isInteger(message.type))
                return "type: integer expected";
        if (message.innerExpression != null && message.hasOwnProperty("innerExpression")) {
            var error = $root.Expression.verify(message.innerExpression);
            if (error)
                return "innerExpression." + error;
        }
        if (message.parameters != null && message.hasOwnProperty("parameters")) {
            var error = $root.Expression.verify(message.parameters);
            if (error)
                return "parameters." + error;
        }
        if (message.accessor != null && message.hasOwnProperty("accessor"))
            if (!$util.isString(message.accessor))
                return "accessor: string expected";
        return null;
    };

    /**
     * Creates a FieldAccessor message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof FieldAccessor
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {FieldAccessor} FieldAccessor
     */
    FieldAccessor.fromObject = function fromObject(object) {
        if (object instanceof $root.FieldAccessor)
            return object;
        var message = new $root.FieldAccessor();
        if (object.type != null)
            message.type = object.type >>> 0;
        if (object.innerExpression != null) {
            if (typeof object.innerExpression !== "object")
                throw TypeError(".FieldAccessor.innerExpression: object expected");
            message.innerExpression = $root.Expression.fromObject(object.innerExpression);
        }
        if (object.parameters != null) {
            if (typeof object.parameters !== "object")
                throw TypeError(".FieldAccessor.parameters: object expected");
            message.parameters = $root.Expression.fromObject(object.parameters);
        }
        if (object.accessor != null)
            message.accessor = String(object.accessor);
        return message;
    };

    /**
     * Creates a plain object from a FieldAccessor message. Also converts values to other types if specified.
     * @function toObject
     * @memberof FieldAccessor
     * @static
     * @param {FieldAccessor} message FieldAccessor
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    FieldAccessor.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.type = 0;
            object.innerExpression = null;
            object.parameters = null;
            object.accessor = "";
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = message.type;
        if (message.innerExpression != null && message.hasOwnProperty("innerExpression"))
            object.innerExpression = $root.Expression.toObject(message.innerExpression, options);
        if (message.parameters != null && message.hasOwnProperty("parameters"))
            object.parameters = $root.Expression.toObject(message.parameters, options);
        if (message.accessor != null && message.hasOwnProperty("accessor"))
            object.accessor = message.accessor;
        return object;
    };

    /**
     * Converts this FieldAccessor to JSON.
     * @function toJSON
     * @memberof FieldAccessor
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    FieldAccessor.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return FieldAccessor;
})();

$root.Expression = (function() {

    /**
     * Properties of an Expression.
     * @exports IExpression
     * @interface IExpression
     * @property {number|null} [type] Expression type
     * @property {IExpression|null} [innerExpression] Expression innerExpression
     * @property {string|null} [operator] Expression operator
     * @property {IExpression|null} [left] Expression left
     * @property {IExpression|null} [right] Expression right
     * @property {Array.<IFieldAccessor>|null} [fields] Expression fields
     * @property {string|null} [value0] Expression value0
     * @property {boolean|null} [value1] Expression value1
     * @property {number|null} [value2] Expression value2
     * @property {number|null} [value3] Expression value3
     */

    /**
     * Constructs a new Expression.
     * @exports Expression
     * @classdesc Represents an Expression.
     * @implements IExpression
     * @constructor
     * @param {IExpression=} [properties] Properties to set
     */
    function Expression(properties) {
        this.fields = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Expression type.
     * @member {number} type
     * @memberof Expression
     * @instance
     */
    Expression.prototype.type = 0;

    /**
     * Expression innerExpression.
     * @member {IExpression|null|undefined} innerExpression
     * @memberof Expression
     * @instance
     */
    Expression.prototype.innerExpression = null;

    /**
     * Expression operator.
     * @member {string} operator
     * @memberof Expression
     * @instance
     */
    Expression.prototype.operator = "";

    /**
     * Expression left.
     * @member {IExpression|null|undefined} left
     * @memberof Expression
     * @instance
     */
    Expression.prototype.left = null;

    /**
     * Expression right.
     * @member {IExpression|null|undefined} right
     * @memberof Expression
     * @instance
     */
    Expression.prototype.right = null;

    /**
     * Expression fields.
     * @member {Array.<IFieldAccessor>} fields
     * @memberof Expression
     * @instance
     */
    Expression.prototype.fields = $util.emptyArray;

    /**
     * Expression value0.
     * @member {string} value0
     * @memberof Expression
     * @instance
     */
    Expression.prototype.value0 = "";

    /**
     * Expression value1.
     * @member {boolean} value1
     * @memberof Expression
     * @instance
     */
    Expression.prototype.value1 = false;

    /**
     * Expression value2.
     * @member {number} value2
     * @memberof Expression
     * @instance
     */
    Expression.prototype.value2 = 0;

    /**
     * Expression value3.
     * @member {number} value3
     * @memberof Expression
     * @instance
     */
    Expression.prototype.value3 = 0;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * Expression value.
     * @member {"value0"|"value1"|"value2"|"value3"|undefined} value
     * @memberof Expression
     * @instance
     */
    Object.defineProperty(Expression.prototype, "value", {
        get: $util.oneOfGetter($oneOfFields = ["value0", "value1", "value2", "value3"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Expression instance using the specified properties.
     * @function create
     * @memberof Expression
     * @static
     * @param {IExpression=} [properties] Properties to set
     * @returns {Expression} Expression instance
     */
    Expression.create = function create(properties) {
        return new Expression(properties);
    };

    /**
     * Encodes the specified Expression message. Does not implicitly {@link Expression.verify|verify} messages.
     * @function encode
     * @memberof Expression
     * @static
     * @param {IExpression} message Expression message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Expression.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && message.hasOwnProperty("type"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.type);
        if (message.innerExpression != null && message.hasOwnProperty("innerExpression"))
            $root.Expression.encode(message.innerExpression, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.operator != null && message.hasOwnProperty("operator"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.operator);
        if (message.left != null && message.hasOwnProperty("left"))
            $root.Expression.encode(message.left, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.right != null && message.hasOwnProperty("right"))
            $root.Expression.encode(message.right, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.fields != null && message.fields.length)
            for (var i = 0; i < message.fields.length; ++i)
                $root.FieldAccessor.encode(message.fields[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.value0 != null && message.hasOwnProperty("value0"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.value0);
        if (message.value1 != null && message.hasOwnProperty("value1"))
            writer.uint32(/* id 8, wireType 0 =*/64).bool(message.value1);
        if (message.value2 != null && message.hasOwnProperty("value2"))
            writer.uint32(/* id 9, wireType 0 =*/72).uint32(message.value2);
        if (message.value3 != null && message.hasOwnProperty("value3"))
            writer.uint32(/* id 10, wireType 1 =*/81).double(message.value3);
        return writer;
    };

    /**
     * Encodes the specified Expression message, length delimited. Does not implicitly {@link Expression.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Expression
     * @static
     * @param {IExpression} message Expression message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Expression.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Expression message from the specified reader or buffer.
     * @function decode
     * @memberof Expression
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Expression} Expression
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Expression.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Expression();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.type = reader.uint32();
                break;
            case 2:
                message.innerExpression = $root.Expression.decode(reader, reader.uint32());
                break;
            case 3:
                message.operator = reader.string();
                break;
            case 4:
                message.left = $root.Expression.decode(reader, reader.uint32());
                break;
            case 5:
                message.right = $root.Expression.decode(reader, reader.uint32());
                break;
            case 6:
                if (!(message.fields && message.fields.length))
                    message.fields = [];
                message.fields.push($root.FieldAccessor.decode(reader, reader.uint32()));
                break;
            case 7:
                message.value0 = reader.string();
                break;
            case 8:
                message.value1 = reader.bool();
                break;
            case 9:
                message.value2 = reader.uint32();
                break;
            case 10:
                message.value3 = reader.double();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Expression message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Expression
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Expression} Expression
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Expression.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Expression message.
     * @function verify
     * @memberof Expression
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Expression.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isInteger(message.type))
                return "type: integer expected";
        if (message.innerExpression != null && message.hasOwnProperty("innerExpression")) {
            var error = $root.Expression.verify(message.innerExpression);
            if (error)
                return "innerExpression." + error;
        }
        if (message.operator != null && message.hasOwnProperty("operator"))
            if (!$util.isString(message.operator))
                return "operator: string expected";
        if (message.left != null && message.hasOwnProperty("left")) {
            var error = $root.Expression.verify(message.left);
            if (error)
                return "left." + error;
        }
        if (message.right != null && message.hasOwnProperty("right")) {
            var error = $root.Expression.verify(message.right);
            if (error)
                return "right." + error;
        }
        if (message.fields != null && message.hasOwnProperty("fields")) {
            if (!Array.isArray(message.fields))
                return "fields: array expected";
            for (var i = 0; i < message.fields.length; ++i) {
                var error = $root.FieldAccessor.verify(message.fields[i]);
                if (error)
                    return "fields." + error;
            }
        }
        if (message.value0 != null && message.hasOwnProperty("value0")) {
            properties.value = 1;
            if (!$util.isString(message.value0))
                return "value0: string expected";
        }
        if (message.value1 != null && message.hasOwnProperty("value1")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            if (typeof message.value1 !== "boolean")
                return "value1: boolean expected";
        }
        if (message.value2 != null && message.hasOwnProperty("value2")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            if (!$util.isInteger(message.value2))
                return "value2: integer expected";
        }
        if (message.value3 != null && message.hasOwnProperty("value3")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            if (typeof message.value3 !== "number")
                return "value3: number expected";
        }
        return null;
    };

    /**
     * Creates an Expression message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Expression
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Expression} Expression
     */
    Expression.fromObject = function fromObject(object) {
        if (object instanceof $root.Expression)
            return object;
        var message = new $root.Expression();
        if (object.type != null)
            message.type = object.type >>> 0;
        if (object.innerExpression != null) {
            if (typeof object.innerExpression !== "object")
                throw TypeError(".Expression.innerExpression: object expected");
            message.innerExpression = $root.Expression.fromObject(object.innerExpression);
        }
        if (object.operator != null)
            message.operator = String(object.operator);
        if (object.left != null) {
            if (typeof object.left !== "object")
                throw TypeError(".Expression.left: object expected");
            message.left = $root.Expression.fromObject(object.left);
        }
        if (object.right != null) {
            if (typeof object.right !== "object")
                throw TypeError(".Expression.right: object expected");
            message.right = $root.Expression.fromObject(object.right);
        }
        if (object.fields) {
            if (!Array.isArray(object.fields))
                throw TypeError(".Expression.fields: array expected");
            message.fields = [];
            for (var i = 0; i < object.fields.length; ++i) {
                if (typeof object.fields[i] !== "object")
                    throw TypeError(".Expression.fields: object expected");
                message.fields[i] = $root.FieldAccessor.fromObject(object.fields[i]);
            }
        }
        if (object.value0 != null)
            message.value0 = String(object.value0);
        if (object.value1 != null)
            message.value1 = Boolean(object.value1);
        if (object.value2 != null)
            message.value2 = object.value2 >>> 0;
        if (object.value3 != null)
            message.value3 = Number(object.value3);
        return message;
    };

    /**
     * Creates a plain object from an Expression message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Expression
     * @static
     * @param {Expression} message Expression
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Expression.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.fields = [];
        if (options.defaults) {
            object.type = 0;
            object.innerExpression = null;
            object.operator = "";
            object.left = null;
            object.right = null;
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = message.type;
        if (message.innerExpression != null && message.hasOwnProperty("innerExpression"))
            object.innerExpression = $root.Expression.toObject(message.innerExpression, options);
        if (message.operator != null && message.hasOwnProperty("operator"))
            object.operator = message.operator;
        if (message.left != null && message.hasOwnProperty("left"))
            object.left = $root.Expression.toObject(message.left, options);
        if (message.right != null && message.hasOwnProperty("right"))
            object.right = $root.Expression.toObject(message.right, options);
        if (message.fields && message.fields.length) {
            object.fields = [];
            for (var j = 0; j < message.fields.length; ++j)
                object.fields[j] = $root.FieldAccessor.toObject(message.fields[j], options);
        }
        if (message.value0 != null && message.hasOwnProperty("value0")) {
            object.value0 = message.value0;
            if (options.oneofs)
                object.value = "value0";
        }
        if (message.value1 != null && message.hasOwnProperty("value1")) {
            object.value1 = message.value1;
            if (options.oneofs)
                object.value = "value1";
        }
        if (message.value2 != null && message.hasOwnProperty("value2")) {
            object.value2 = message.value2;
            if (options.oneofs)
                object.value = "value2";
        }
        if (message.value3 != null && message.hasOwnProperty("value3")) {
            object.value3 = options.json && !isFinite(message.value3) ? String(message.value3) : message.value3;
            if (options.oneofs)
                object.value = "value3";
        }
        return object;
    };

    /**
     * Converts this Expression to JSON.
     * @function toJSON
     * @memberof Expression
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Expression.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Expression;
})();

$root.TeapotTemplateMessage = (function() {

    /**
     * Properties of a TeapotTemplateMessage.
     * @exports ITeapotTemplateMessage
     * @interface ITeapotTemplateMessage
     * @property {number|null} [type] TeapotTemplateMessage type
     * @property {IRenderable|null} [root] TeapotTemplateMessage root
     */

    /**
     * Constructs a new TeapotTemplateMessage.
     * @exports TeapotTemplateMessage
     * @classdesc Represents a TeapotTemplateMessage.
     * @implements ITeapotTemplateMessage
     * @constructor
     * @param {ITeapotTemplateMessage=} [properties] Properties to set
     */
    function TeapotTemplateMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * TeapotTemplateMessage type.
     * @member {number} type
     * @memberof TeapotTemplateMessage
     * @instance
     */
    TeapotTemplateMessage.prototype.type = 0;

    /**
     * TeapotTemplateMessage root.
     * @member {IRenderable|null|undefined} root
     * @memberof TeapotTemplateMessage
     * @instance
     */
    TeapotTemplateMessage.prototype.root = null;

    /**
     * Creates a new TeapotTemplateMessage instance using the specified properties.
     * @function create
     * @memberof TeapotTemplateMessage
     * @static
     * @param {ITeapotTemplateMessage=} [properties] Properties to set
     * @returns {TeapotTemplateMessage} TeapotTemplateMessage instance
     */
    TeapotTemplateMessage.create = function create(properties) {
        return new TeapotTemplateMessage(properties);
    };

    /**
     * Encodes the specified TeapotTemplateMessage message. Does not implicitly {@link TeapotTemplateMessage.verify|verify} messages.
     * @function encode
     * @memberof TeapotTemplateMessage
     * @static
     * @param {ITeapotTemplateMessage} message TeapotTemplateMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TeapotTemplateMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && message.hasOwnProperty("type"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.type);
        if (message.root != null && message.hasOwnProperty("root"))
            $root.Renderable.encode(message.root, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified TeapotTemplateMessage message, length delimited. Does not implicitly {@link TeapotTemplateMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof TeapotTemplateMessage
     * @static
     * @param {ITeapotTemplateMessage} message TeapotTemplateMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TeapotTemplateMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a TeapotTemplateMessage message from the specified reader or buffer.
     * @function decode
     * @memberof TeapotTemplateMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {TeapotTemplateMessage} TeapotTemplateMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TeapotTemplateMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TeapotTemplateMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.type = reader.uint32();
                break;
            case 2:
                message.root = $root.Renderable.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a TeapotTemplateMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof TeapotTemplateMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {TeapotTemplateMessage} TeapotTemplateMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TeapotTemplateMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a TeapotTemplateMessage message.
     * @function verify
     * @memberof TeapotTemplateMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    TeapotTemplateMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isInteger(message.type))
                return "type: integer expected";
        if (message.root != null && message.hasOwnProperty("root")) {
            var error = $root.Renderable.verify(message.root);
            if (error)
                return "root." + error;
        }
        return null;
    };

    /**
     * Creates a TeapotTemplateMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof TeapotTemplateMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {TeapotTemplateMessage} TeapotTemplateMessage
     */
    TeapotTemplateMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.TeapotTemplateMessage)
            return object;
        var message = new $root.TeapotTemplateMessage();
        if (object.type != null)
            message.type = object.type >>> 0;
        if (object.root != null) {
            if (typeof object.root !== "object")
                throw TypeError(".TeapotTemplateMessage.root: object expected");
            message.root = $root.Renderable.fromObject(object.root);
        }
        return message;
    };

    /**
     * Creates a plain object from a TeapotTemplateMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof TeapotTemplateMessage
     * @static
     * @param {TeapotTemplateMessage} message TeapotTemplateMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    TeapotTemplateMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.type = 0;
            object.root = null;
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = message.type;
        if (message.root != null && message.hasOwnProperty("root"))
            object.root = $root.Renderable.toObject(message.root, options);
        return object;
    };

    /**
     * Converts this TeapotTemplateMessage to JSON.
     * @function toJSON
     * @memberof TeapotTemplateMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    TeapotTemplateMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return TeapotTemplateMessage;
})();

module.exports = $root;
