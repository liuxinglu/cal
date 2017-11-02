var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var Question = (function () {
        function Question() {
        }
        return Question;
    }());
    app.Question = Question;
    __reflect(Question.prototype, "app.Question");
})(app || (app = {}));
//# sourceMappingURL=Question.js.map