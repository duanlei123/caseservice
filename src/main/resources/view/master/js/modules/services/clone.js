/**=========================================================
 * Module: clone.js
 * Utility library to use across the theme
 =========================================================*/

App.service('clone', function() {

    /**
     * 复制对象
     * @param obj
     * @returns {*}
     */
    var _deepClone = function (obj) {
        var result = {}, oClass = _isClass(obj);
        if (oClass === "Object") {
            result = {};
        } else if (oClass === "Array") {
            result = [];
        } else {
            return obj;
        }
        for (var key in obj) {
            var copy = obj[key];
            if (_isClass(copy) == "Object") {
                result[key] = arguments.callee(copy);
            } else if (_isClass(copy) == "Array") {
                result[key] = arguments.callee(copy);
            } else {
                result[key] = obj[key];
            }
        }
        return result;
    };

    var _isClass = function (o) {
        if (o === null) return "Null";
        if (o === undefined) return "Undefined";
        return Object.prototype.toString.call(o).slice(8, -1);
    };

    return {
        deepClone: _deepClone
    }
});