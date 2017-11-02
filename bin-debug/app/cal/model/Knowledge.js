var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var Knowledge = (function () {
        function Knowledge(str) {
            if (str === void 0) { str = ""; }
            this.knowledge = "";
            this._pass = "false";
            this.knowledge = str;
        }
        Object.defineProperty(Knowledge.prototype, "pass", {
            get: function () {
                if (egret.localStorage.getItem(this.knowledge) != undefined && egret.localStorage.getItem(this.knowledge) != "")
                    return egret.localStorage.getItem(this.knowledge);
                else
                    return this._pass;
            },
            set: function (str) {
                egret.localStorage.setItem(this.knowledge, str);
                this._pass = str;
            },
            enumerable: true,
            configurable: true
        });
        return Knowledge;
    }());
    app.Knowledge = Knowledge;
    __reflect(Knowledge.prototype, "app.Knowledge");
})(app || (app = {}));
//# sourceMappingURL=Knowledge.js.map