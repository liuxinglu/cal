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
    var DlgTest = (function (_super) {
        __extends(DlgTest, _super);
        function DlgTest() {
            var _this = _super.call(this, lxl.Config.SKIN_PATH + "DlgTestSkin.exml") || this;
            _this._needCheckKnowledgeIndexPoint = [];
            _this._curIndex = 0;
            _this._hasDraw = false;
            return _this;
        }
        DlgTest.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.SHOW_LOGO_CHANGE));
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.KNOWLEDGE_SELECT, this._testCheckHandler, this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.KEY_0, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.KEY_1, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.KEY_2, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.KEY_3, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.KEY_4, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.KEY_5, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.KEY_6, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.KEY_7, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.KEY_8, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.KEY_9, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.KEY__, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.KEY_ENTER, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.KEY_DEL, this._keyClickHandler, this);
            var shape;
            shape = new egret.Shape();
            shape.graphics.beginFill(0x000000, 0.6);
            shape.graphics.drawRect(0, 0, this.width, this.height);
            shape.graphics.endFill();
            this.addChildAt(shape, 0);
            this.btn_close.addEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
            for (var i = 0; i < 10; i++) {
                this["btn_" + i].addEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
            }
            this.btn_pnt.addEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
            this.btn_clear.addEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
            this.btn_submit.eps = 1000;
            this.btn_submit.addEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
            Cal.indexs = [];
            Cal.getIndexsByCount(3);
            this._insertQuestion();
            this.lab_num.text = (Cal.curTestIndex + 1) + "/" + (Cal.curKnowledges.length);
            this.btn_test.addEventListener(lxl.CEvent.CLICK, this._testHandler, this);
        };
        DlgTest.prototype._testHandler = function (e) {
            if (this._hasDraw == false) {
                this._hasDraw = true;
                this._dlgDraw = new app.DlgDraw();
                this.pop(this._dlgDraw);
                this._dlgDraw.addEventListener(lxl.CEvent.CLOSE, this._closeTestHandler, this);
            }
        };
        DlgTest.prototype._closeTestHandler = function (e) {
            this._dlgDraw.removeEventListener(lxl.CEvent.CLOSE, this._closeTestHandler, this);
            this._dlgDraw.dispose();
        };
        DlgTest.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            Cal.curShift = 0;
            Cal.curTestIndex = 0;
            Cal.needCheckKnowledges = [];
            this._needCheckKnowledgeIndexPoint = [];
            this._curIndex = 0;
            this._curKnowledge = null;
            this._q = null;
            lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.KNOWLEDGE_SELECT, this._testCheckHandler, this);
            this.btn_close.removeEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
            for (var i = 0; i < 10; i++) {
                this["btn_" + i].removeEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
            }
            this.btn_pnt.removeEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
            this.btn_clear.removeEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
            this.btn_submit.removeEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
            var num = this.group.numChildren;
            for (var i = num - 1; i >= 0; i--) {
                this.group.getChildAt(i).removeEventListener(egret.TouchEvent.TOUCH_TAP, this._qunitClick, this);
                this.group.getChildAt(i).dispose();
            }
            lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.KEY_0, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.KEY_1, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.KEY_2, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.KEY_3, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.KEY_4, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.KEY_5, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.KEY_6, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.KEY_7, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.KEY_8, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.KEY_9, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.KEY__, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.KEY_ENTER, this._keyClickHandler, this);
            lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.KEY_DEL, this._keyClickHandler, this);
        };
        DlgTest.prototype._testCheckHandler = function (e) {
            Cal.setConfigQAByKnowledge(e.param);
            this._curKnowledge = e.param;
            this._dlgQ = new app.DlgQuestion();
            this._dlgTestResult.pop(this._dlgQ, true);
            this._dlgQ.addEventListener(lxl.CEvent.BACK, this._backMainHandler, this);
        };
        DlgTest.prototype._backMainHandler = function (e) {
            if (e.param == 1) {
                this._curKnowledge.pass = "true";
                Cal.updateNeedCheckKnowledgesState(this._curKnowledge);
            }
            this._dlgQ.removeEventListener(lxl.CEvent.BACK, this._backMainHandler, this);
            this._dlgQ.dispose();
            this._dlgQ = null;
            this._dlgTestResult.updateView();
        };
        DlgTest.prototype._keyClickHandler = function (e) {
            this._sound = Res.getRes("anniu_mp3");
            this._sound.play(0, 1);
            if (e.param != "submit") {
                lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.ANSWER_CLICK, e.param));
            }
            else {
                this._checkout(e);
            }
        };
        DlgTest.prototype._btnClickHandler = function (e) {
            this._sound = Res.getRes("anniu_mp3");
            this._sound.play(0, 1);
            if (e.param.target.name != "submit") {
                lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.ANSWER_CLICK, e.param.target.name));
            }
            else {
                this._checkout(e);
            }
        };
        DlgTest.prototype._closeHandler = function (e) {
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.BACK, 0));
        };
        DlgTest.prototype._qunitClick = function (e) {
            this.group.getChildAt(0).focusOut();
            var ee = lxl.Tool.copyObject(e);
            // egret.Tween.get(this)
            // 	.wait(200)
            // 	.call(()=>{
            ee.target.parent.focusIn();
            // }, this);
        };
        DlgTest.prototype._checkout = function (e) {
            var _this = this;
            var num = this.group.numChildren;
            if (num > 1 || num == 0)
                return;
            var temp = this.group.getChildAt(0).showAnswer();
            if (temp == 0) {
                var kIndex = Cal.curTestIndex;
                this._needCheckKnowledgeIndexPoint.push(kIndex);
                Cal.curTestIndex++;
                this._curIndex = 0;
            }
            else {
                if (this._curIndex == 2 && (Cal.curTestIndex + 1) == Cal.curKnowledges.length) {
                    Cal.curTestIndex = Cal.curKnowledges.length;
                }
            }
            if (Cal.curKnowledges.length == Cal.curTestIndex) {
                Cal.needCheckKnowledges = [];
                for (var i = 0; i < this._needCheckKnowledgeIndexPoint.length; i++) {
                    var k = Cal.curKnowledges[Cal.curKnowledges.length - 1 - this._needCheckKnowledgeIndexPoint[i]];
                    Cal.needCheckKnowledges.push(k);
                }
                // Cal.needCheckKnowledges.reverse();
                var num_1 = this.group.numChildren;
                for (var i = num_1 - 1; i >= 0; i--) {
                    this.group.getChildAt(i).removeEventListener(egret.TouchEvent.TOUCH_TAP, this._qunitClick, this);
                    // this.group.getChildAt(i).removeEventListener(lxl.CEvent.QUESTION_CHECKOUT_TEST, this._checkout, this);
                    this.group.getChildAt(i).dispose();
                }
                if (Cal.needCheckKnowledges.length == 0) {
                    this._showSuccess();
                }
                else {
                    this._dlgTestResult = new app.DlgTestResult();
                    this.pop(this._dlgTestResult);
                    this._dlgTestResult.addEventListener(lxl.CEvent.CLOSE, this._closeTestResultHandler, this);
                }
            }
            else {
                egret.Tween.get(this)
                    .wait(200)
                    .call(function () {
                    _this._insertQuestion();
                }, this);
            }
        };
        DlgTest.prototype._showSuccess = function () {
            this._dlg = new app.DlgSuccess();
            this._dlg.once(lxl.CEvent.BACK, this._backHandler, this);
            this.pop(this._dlg, true);
        };
        DlgTest.prototype._backHandler = function (e) {
            Cal.curShift = 0;
            this._dlg.dispose();
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.BACK, 0));
        };
        DlgTest.prototype._closeTestResultHandler = function (e) {
            this._dlgTestResult.removeEventListener(lxl.CEvent.CLOSE, this._closeTestResultHandler, this);
            this._dlgTestResult.dispose();
            Cal.curTestIndex = 0;
            Cal.needCheckKnowledges = [];
            this._needCheckKnowledgeIndexPoint = [];
            this._closeHandler(e);
        };
        DlgTest.prototype._insertQuestion = function () {
            var _this = this;
            var num = this.group.numChildren;
            for (var i = num - 1; i >= 0; i--) {
                this.group.getChildAt(i).removeEventListener(egret.TouchEvent.TOUCH_TAP, this._qunitClick, this);
                // this.group.getChildAt(i).removeEventListener(lxl.CEvent.QUESTION_CHECKOUT_TEST, this._checkout, this);
                this.group.getChildAt(i).dispose();
            }
            var qArr = Cal.getQuestionByKnowledgeIndex(this._curIndex);
            this._curIndex = this._curIndex + 1;
            if (Cal.curTestIndex + 1 > Cal.curKnowledges.length)
                this.lab_num.text = (Cal.curTestIndex) + "/" + (Cal.curKnowledges.length);
            else
                this.lab_num.text = (Cal.curTestIndex + 1) + "/" + (Cal.curKnowledges.length);
            if (qArr == undefined)
                return;
            if (this._curIndex == 3)
                this._curIndex = 0;
            this._q = qArr;
            var qunit = new app.QuestionUnit();
            qunit.param = qunit;
            qunit.addEventListener(egret.TouchEvent.TOUCH_TAP, this._qunitClick, this);
            qunit.addEventListener(lxl.CEvent.QUESTION_CHECKOUT, this._checkout, this);
            qunit.once(lxl.CEvent.LOAD_SKIN_COMPLETE, function (e) {
                e.target.setQuestion(_this._q);
                _this.group.addChild(e.target);
                e.target.focusIn();
            }, this);
        };
        return DlgTest;
    }(lxl.CComponent));
    app.DlgTest = DlgTest;
    __reflect(DlgTest.prototype, "app.DlgTest");
})(app || (app = {}));
//# sourceMappingURL=DlgTest.js.map