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
    var TestUnit = (function (_super) {
        __extends(TestUnit, _super);
        function TestUnit() {
            return _super.call(this, lxl.Config.SKIN_PATH + "TestUnitSkin.exml") || this;
        }
        TestUnit.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this.img_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this._gradeClick, this);
            this.img_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this._gradeClick, this);
            this.img_3.addEventListener(egret.TouchEvent.TOUCH_TAP, this._gradeClick, this);
            this.img_4.addEventListener(egret.TouchEvent.TOUCH_TAP, this._gradeClick, this);
            this.img_5.addEventListener(egret.TouchEvent.TOUCH_TAP, this._gradeClick, this);
        };
        TestUnit.prototype._gradeClick = function (e) {
            Cal.curGrade = parseInt(e.target.name);
            var knowledgeArr = Cal.getKnowledgeByGrade(Cal.curGrade);
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.GRADE_SELECT));
        };
        TestUnit.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.img_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._gradeClick, this);
            this.img_2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._gradeClick, this);
            this.img_3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._gradeClick, this);
            this.img_4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._gradeClick, this);
            this.img_5.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._gradeClick, this);
        };
        return TestUnit;
    }(lxl.CComponent));
    app.TestUnit = TestUnit;
    __reflect(TestUnit.prototype, "app.TestUnit");
})(app || (app = {}));
//# sourceMappingURL=TestUnit.js.map