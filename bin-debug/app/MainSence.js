var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var MainSence = (function (_super) {
        __extends(MainSence, _super);
        function MainSence() {
            return _super.call(this) || this;
        }
        MainSence.prototype.onActivity = function () {
            var _this = this;
            _super.prototype.onActivity.call(this);
            var main = new app.MainView();
            main.width = this.stage.stageWidth;
            main.height = this.stage.stageHeight;
            main.name = "man";
            main.once(lxl.CEvent.LOAD_SKIN_COMPLETE, function () {
                Cal.getAllKnowledge();
                _this.addChild(main);
            }, this);
            main.addEventListener(lxl.CEvent.BACK, this._backMainHandler, this);
        };
        MainSence.prototype._backMainHandler = function (e) {
            this.getChildByName("man").removeEventListener(lxl.CEvent.BACK, this._backMainHandler, this);
            this.getChildByName("man").dispose();
        };
        return MainSence;
    }(lxl.ui.CLayer));
    app.MainSence = MainSence;
    __reflect(MainSence.prototype, "app.MainSence");
})(app || (app = {}));
//# sourceMappingURL=MainSence.js.map