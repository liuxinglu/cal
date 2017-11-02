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
    var QuestionUnit = (function (_super) {
        __extends(QuestionUnit, _super);
        function QuestionUnit() {
            var _this = _super.call(this, lxl.Config.SKIN_PATH + "QuestionUnitSkin.exml") || this;
            _this.curAnswerName = "";
            _this.customAnswer = "";
            return _this;
        }
        QuestionUnit.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this.btn_clear.addEventListener(lxl.CEvent.CLICK, this._clearHandler, this);
        };
        QuestionUnit.prototype._clearHandler = function (e) {
            this.customAnswer = "";
            this.lab_answer.text = this.customAnswer;
        };
        QuestionUnit.prototype.focusIn = function () {
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.ANSWER_CLICK, this._clickAnswerHandler2, this);
            // egret.Tween.get(this.btn_clear)
            // 	.to({x : 1093}, 200);
            // this.img_sel.visible = true;
            this.lab_question.textColor = 0xff7e00;
            this.lab_answer.textColor = 0xff7e00;
        };
        QuestionUnit.prototype.focusOut = function () {
            lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.ANSWER_CLICK, this._clickAnswerHandler2, this);
            // egret.Tween.get(this.btn_clear)
            // 	.to({x : 969}, 200);
            // this.img_sel.visible = false;
            this.lab_question.textColor = 0x000000;
            this.lab_answer.textColor = 0x000000;
        };
        QuestionUnit.prototype._clickAnswerHandler2 = function (e) {
            if (e.param == "pnt") {
                this.customAnswer += ".";
            }
            else if (e.param == "clear") {
                this.customAnswer = "";
            }
            else if (e.param == "submit") {
                this.dispatchEvent(new lxl.CEvent(lxl.CEvent.QUESTION_CHECKOUT)); //, this.param
            }
            else
                this.customAnswer += e.param;
            this.lab_answer.text = this.customAnswer;
        };
        QuestionUnit.prototype.showAnswer = function () {
            var flag = 0;
            if (this.customAnswer == "") {
                this.img_bg.source = "img_dacuo_png";
                this._sound = Res.getRes("dacuo_mp3");
                this._sound.play(0, 1);
                return flag;
            }
            if (this.customAnswer == this.question.answer) {
                flag = 1;
                this._sound = Res.getRes("dadui_mp3");
                this._sound.play(0, 1);
                this.img_bg.source = "img_dadui_png";
            }
            else {
                this._sound = Res.getRes("dacuo_mp3");
                this._sound.play(0, 1);
                this.img_bg.source = "img_dacuo_png";
            }
            return flag;
        };
        QuestionUnit.prototype.setQuestion = function (q) {
            this.question = q;
            this.lab_question.text = this.question.question;
        };
        QuestionUnit.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.ANSWER_CLICK, this._clickAnswerHandler2, this);
            this.btn_clear.removeEventListener(lxl.CEvent.CLICK, this._clearHandler, this);
            this.index = null;
            this.question = null;
            this.curAnswerName = "";
            this.customAnswer = "";
        };
        return QuestionUnit;
    }(lxl.CComponent));
    app.QuestionUnit = QuestionUnit;
    __reflect(QuestionUnit.prototype, "app.QuestionUnit");
})(app || (app = {}));
//# sourceMappingURL=QuestionUnit.js.map