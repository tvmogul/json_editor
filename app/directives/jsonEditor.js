(function() {

    var jsonEditorCtrl = function($rootScope) {
        $rootScope.editor = {};

        $rootScope.editor.update = function(content, caretPosition) {
            if (content) {
                $rootScope.editor.input = $rootScope.editor.input || "";

                if (caretPosition) {
                    var start = $rootScope.editor.input.substring(0, caretPosition);
                    var end = $rootScope.editor.input.substr(caretPosition);

                    $rootScope.editor.input = start + content + end;
                }
                else {
                    $rootScope.editor.input = $rootScope.editor.input + content;
                }
            }
        };

        $rootScope.editor.validate = function() {
            if ($rootScope.editor.input && $rootScope.editor.input.length > 0) {
                try {
                    $rootScope.editor.json = angular.fromJson($rootScope.editor.input);
                }
                catch (exception) {
                    return false;
                }
            }

            return true;
        };

        $rootScope.editor.validationClass = function() {
            return $rootScope.editor.validate() ? "" : "has-error";
        };

        $rootScope.editor.clear = function() {
            $rootScope.editor.input = "";
        };

        $rootScope.editor.prettify = function() {
            if ($rootScope.editor.input && $rootScope.editor.validate()) {
                var jsonInput = angular.fromJson($rootScope.editor.input);

                $rootScope.editor.input = angular.toJson(jsonInput, true);
            }
        };

        $rootScope.editor.minify = function() {
            if ($rootScope.editor.input && $rootScope.editor.validate()) {
                var jsonInput = angular.fromJson($rootScope.editor.input);

                $rootScope.editor.input = angular.toJson(jsonInput, false);
            }
        };

        $rootScope.editor.setCaretPosition = function(event) {
            if (event) {
                $rootScope.editor.caretPosition = event.target.selectionStart ? event.target.selectionStart : 0;
            }
        };

        $rootScope.editor.onClearButtonClick = function() {
            $rootScope.editor.clear();
        };

        $rootScope.editor.onPrettifyButtonClick = function() {
            $rootScope.editor.prettify();
        };

        $rootScope.editor.onMinifyButtonClick = function() {
            $rootScope.editor.minify();
        };
    };

    jsonEditorCtrl.$inject = ["$rootScope"];

    var jsonEditor = function() {
        return {
            restrict: "E",
            replace: true,
            controller: jsonEditorCtrl,
            templateUrl: "/json-editor.html"
        };
    };

    angular.module("jsonEditorApp", [])
        .directive("jsonEditor", jsonEditor);

}());