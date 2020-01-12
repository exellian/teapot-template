/*let isNodeJs: boolean = false;

(function() {
    // Establish the root object, `window` in the browser, or `global` on the server.
    var root = this;

    // Create a reference to this
    var _ = new Object();

    // Export the Underscore object for **CommonJS**, with backwards-compatibility
    // for the old `require()` API. If we're not in CommonJS, add `_` to the
    // global object.
    if (typeof module !== 'undefined' && module.exports) {
            module.exports = _;
            root._ = _;
            isNodeJs = true;
    } else {
            root._ = _;
    }
})();

*/
export default class Runtime {

     public static isNodeJS(): boolean {
         return true;
     }
}
