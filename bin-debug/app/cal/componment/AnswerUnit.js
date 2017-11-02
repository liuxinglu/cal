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
    var AnswerUnit = (function (_super) {
        __extends(AnswerUnit, _super);
        function AnswerUnit() {
            var _this = _super.call(this, lxl.Config.SKIN_PATH + "AnswerUnitSkin.exml") || this;
            _this.isRightAnswer = false;
            return _this;
        }
        AnswerUnit.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
        };
        AnswerUnit.prototype.setText = function (str) {
            this.lab_answer.text = str;
        };
        AnswerUnit.prototype.setState = function (s) {
            this.img_state.visible = true;
            if (s == "right") {
                this.lab_answer.textColor = 0x82F754;
                this.img_state.source = "img_duigou_png";
            }
            else if (s == "wrong") {
                this.lab_answer.textColor = 0xF44444;
                this.img_state.source = "img_cuowu_png";
            }
            else if (s == "click") {
                this.img_state.source = "img_xuanzhong_png";
            }
            else if (s == "reset") {
                this.img_state.visible = false;
            }
        };
        AnswerUnit.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return AnswerUnit;
    }(lxl.CComponent));
    app.AnswerUnit = AnswerUnit;
    __reflect(AnswerUnit.prototype, "app.AnswerUnit");
})(app || (app = {}));
//# sourceMappingURL=AnswerUnit.js.map