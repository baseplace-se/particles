var input = (function () {
    'use strict';

    var mouseX;
    var mouseY;
    var inBounds;

    function _inputMousePos(x, y) {
        if (inBounds == true) {
            mouseX = x;
            mouseY = y;

        } else {
            mouseX = null;
            mouseY = null;
        }
    }

    function _inputMouseBounds(bound) {
        inBounds = bound;
    }

    return {
        inputMousePos: function (x, y) {
            _inputMousePos(x, y);
        },
        inputMouseBounds: function (bound) {
            _inputMouseBounds(bound);
        },
        getMouseBounds: function () {
            return inBounds;
        },
        getMousePosX: function () {
            return mouseX;
        },
        getMousePosY: function () {
            return mouseY;
        }
    };
})();