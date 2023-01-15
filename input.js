var input = (function () {
    'use strict';

    var mouseX;
    var mouseY;
    var inBounds;
    var mouseDown;


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

    function _inputMouseDown(down) {
        if(inBounds == true) {
            mouseDown = down;
        }          
    }

    function _setupInput(container) {
        container.on("mousemove", (event) => {
            input.inputMousePos(event.data.global.x, event.data.global.y);
        });
        container.on("mouseout", (event) => {
            input.inputMouseBounds(false);
        });
        container.on("mouseover", (event) => {
            input.inputMouseBounds(true);
        });
        
        container.on('pointerdown', (event) => {
            input.inputMouseDown(true);
        });
        
        container.on('pointerup', (event) => {
            input.inputMouseDown(false);
        });

    }

    return {
        inputMousePos: function (x, y) {
            _inputMousePos(x, y);
        },
        inputMouseBounds: function (bound) {
            _inputMouseBounds(bound);
        },
        inputMouseDown: function (down) {
            _inputMouseDown(down);
        },
        getMouseBounds: function () {
            return inBounds;
        },
        getMouseDown: function () {
            return mouseDown;
        },
        getMousePosX: function () {
            return mouseX;
        },
        getMousePosY: function () {
            return mouseY;
        },
        setupInput: function(container) {
            return _setupInput(container);
        }
    };
})();


