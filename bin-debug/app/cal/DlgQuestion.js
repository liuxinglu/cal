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
    var DlgQuestion = (function (_super) {
        __extends(DlgQuestion, _super);
        function DlgQuestion() {
            var _this = _super.call(this, lxl.Config.SKIN_PATH + "DlgQuestion.exml") || this;
            _this._isTiaoZhan = false;
            _this._hasDraw = false;
            _this._hasPrint = false;
            _this._arrShift = [];
            _this._answers = [];
            _this._qArr = [];
            _this._timer = new egret.Timer(20);
            return _this;
        }
        DlgQuestion.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.SHOW_LOGO_CHANGE));
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
                this["btn_" + i].needAniComplete = false;
                this["btn_" + i].addEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
            }
            this.btn_pri.addEventListener(lxl.CEvent.CLICK, this._printHandler, this);
            this.btn_pnt.addEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
            this.btn_clear.addEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
            this.btn_submit.eps = 1000;
            this.btn_submit.addEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this._timerHandler, this);
            this.btn_test.addEventListener(lxl.CEvent.CLICK, this._testHandler, this);
            this._insertQuestion();
            if (this._isTiaoZhan == true) {
                this.lab_timu.text = "第" + (Cal.curIndex) + "/" + Cal.curQs2.length + "题";
                this._timer.start();
                this.lab_time.text = "";
                this.lab_timu.visible = true;
            }
            else {
                this._timer.reset();
                this.lab_time.text = "";
                this.lab_timu.visible = false;
            }
        };
        DlgQuestion.prototype._testHandler = function (e) {
            if (this._hasDraw == false) {
                this._hasDraw = true;
                this._dlgDraw = new app.DlgDraw();
                this.pop(this._dlgDraw);
                this._dlgDraw.addEventListener(lxl.CEvent.CLOSE, this._closeTestHandler, this);
            }
        };
        DlgQuestion.prototype._closeTestHandler = function (e) {
            this._hasDraw = false;
            this._dlgDraw.removeEventListener(lxl.CEvent.CLOSE, this._closeTestHandler, this);
            this._dlgDraw.dispose();
        };
        DlgQuestion.prototype._printHandler = function (e) {
            if (egret.Capabilities.runtimeType == "web" && lxl.Tool.isPC_Mode() == true) {
                if (this._hasPrint == false) {
                    this._hasPrint = true;
                    this._dlgPrint = new app.DlgPrint();
                    this.pop(this._dlgPrint);
                    this._dlgPrint.addEventListener(egret.TouchEvent.TOUCH_TAP, this._closePrint, this);
                }
            }
            else {
                this.animation();
                return;
            }
        };
        DlgQuestion.prototype.animation = function () {
            var _this = this;
            this.g_totast.alpha = 0;
            this.g_totast.visible = true;
            egret.Tween.get(this.g_totast)
                .to({ alpha: 1 }, 300, egret.Ease.quintOut)
                .wait(1000)
                .to({ alpha: 0 }, 500, egret.Ease.quintIn).call(function () {
                _this.g_totast.visible = false;
            });
        };
        DlgQuestion.prototype._closePrint = function (e) {
            this._hasPrint = false;
            this._dlgPrint.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._closePrint, this);
            this._dlgPrint.dispose();
        };
        DlgQuestion.prototype._startGame = function () {
            this._insertQuestion();
            if (this._isTiaoZhan == true) {
                this.lab_timu.text = "第" + (Cal.curIndex) + "/" + Cal.curQs2.length + "题";
                this._timer.start();
            }
            else
                this._timer.reset();
        };
        DlgQuestion.prototype._timerHandler = function (e) {
            if ((this._timer.currentCount * 20) > Cal.tiaoZhanSeconds)
                Cal.tiaoZhanSeconds = this._timer.currentCount * 20;
            this.lab_time.text = lxl.TimerUtils.formatTimeByMilSecond(this._timer.currentCount * 20);
        };
        Object.defineProperty(DlgQuestion.prototype, "isTiaoZhan", {
            set: function (b) {
                this._isTiaoZhan = b;
            },
            enumerable: true,
            configurable: true
        });
        DlgQuestion.prototype._keyClickHandler = function (e) {
            this._sound = Res.getRes("anniu_mp3");
            this._sound.play(0, 1);
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.ANSWER_CLICK, e.param));
        };
        DlgQuestion.prototype._btnClickHandler = function (e) {
            this._sound = Res.getRes("anniu_mp3");
            this._sound.play(0, 1);
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.ANSWER_CLICK, e.param.target.name));
        };
        DlgQuestion.prototype._closeHandler = function (e) {
            Cal.curShift = 0;
            this._answers = [];
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.BACK, 0));
        };
        DlgQuestion.prototype._checkout = function (e) {
            var _this = this;
            if (Cal.plan[Cal.curShift][0] == this._answers.length) {
                var rightCount = 0;
                for (var i = 0; i < this.group.numChildren; i++) {
                    var temp = this.group.getChildAt(i).showAnswer();
                    rightCount += temp;
                }
                if (Cal.plan[Cal.curShift][0] == rightCount) {
                    this._arrShift.push(1);
                    if (Cal.plan[Cal.curShift][1] == this._arrShift.length) {
                        Cal.curShift++;
                        rightCount = 0;
                        this._arrShift = [];
                    }
                }
                else if (Cal.plan[Cal.curShift][2] <= (Cal.plan[Cal.curShift][0] - rightCount)) {
                    Cal.curShift = Cal.curShift <= 0 ? 0 : --Cal.curShift;
                    rightCount = 0;
                    this._arrShift = [];
                }
                else {
                    this._arrShift = [];
                    rightCount = 0;
                }
                this._answers = [];
                egret.Tween.get(this)
                    .wait(200)
                    .call(function () {
                    if (Cal.curShift >= 3) {
                        Cal.curShift = 0;
                        _this._showSuccess();
                    }
                    else {
                        _this._insertQuestion();
                    }
                }, this);
            }
        };
        DlgQuestion.prototype._checkout2 = function (e) {
            var _this = this;
            if (Cal.curQs.length >= Cal.MAX_SIZE) {
                this.btn_submit.touchEnabled = false;
                if (this._dlgtzResult)
                    return;
                for (var i = 0; i < this.group.numChildren; i++) {
                    var temp = this.group.getChildAt(i).showAnswer();
                    if (temp == 0) {
                        Cal.insertCuoTi(this.group.getChildAt(i).question);
                    }
                }
                this._showTiaoZhanResult();
                return;
            }
            for (var i = 0; i < this.group.numChildren; i++) {
                var temp = this.group.getChildAt(i).showAnswer();
                if (temp == 0) {
                    Cal.insertCuoTi(this.group.getChildAt(i).question);
                }
            }
            this._arrShift = [];
            this._answers = [];
            egret.Tween.get(this)
                .wait(200)
                .call(function () {
                if (Cal.curQs.length >= Cal.MAX_SIZE) {
                    _this.lab_timu.text = "第" + Cal.curIndex + "/" + Cal.curQs2.length + "题";
                    _this._showTiaoZhanResult();
                }
                else {
                    _this._insertQuestion();
                    _this.lab_timu.text = "第" + Cal.curIndex + "/" + Cal.curQs2.length + "题";
                }
            }, this);
        };
        DlgQuestion.prototype._insertQuestion = function () {
            var _this = this;
            var num = this.group.numChildren;
            for (var i = num - 1; i >= 0; i--) {
                this.group.getChildAt(i).removeEventListener(egret.TouchEvent.TOUCH_TAP, this._qunitClick, this);
                if (this._isTiaoZhan == false)
                    this.group.getChildAt(i).removeEventListener(lxl.CEvent.QUESTION_CHECKOUT, this._checkout, this);
                else
                    this.group.getChildAt(i).removeEventListener(lxl.CEvent.QUESTION_CHECKOUT, this._checkout2, this);
                this.group.getChildAt(i).dispose();
            }
            this.group.removeChildren();
            var qArr;
            if (this._isTiaoZhan == true) {
                qArr = Cal.getQuestionsByTiaoZhan();
            }
            else {
                qArr = Cal.getQuestionByCurShift();
            }
            if (qArr.length == 1)
                this.img_yi.visible = true;
            else
                this.img_yi.visible = false;
            this._qArr = qArr;
            for (var i = 0; i < this._qArr.length; i++) {
                var qunit = new app.QuestionUnit();
                qunit.param = qunit;
                qunit.index = i;
                qunit.addEventListener(egret.TouchEvent.TOUCH_TAP, this._qunitClick, this);
                if (this._isTiaoZhan == false)
                    qunit.addEventListener(lxl.CEvent.QUESTION_CHECKOUT, this._checkout, this);
                else
                    qunit.addEventListener(lxl.CEvent.QUESTION_CHECKOUT, this._checkout2, this);
                qunit.once(lxl.CEvent.LOAD_SKIN_COMPLETE, function (e) {
                    e.target.setQuestion(_this._qArr[e.target.index]);
                    _this.group.addChild(e.target);
                    if (_this._qArr.length == 1) {
                        _this._answers.push(e.target.index);
                        _this._answers = lxl.Tool.delSame(_this._answers);
                        e.target.focusIn();
                    }
                    if (_this.group.numChildren == 0) {
                        lxl.logs.log("group中没有子元素");
                    }
                }, this);
            }
        };
        DlgQuestion.prototype._qunitClick = function (e) {
            for (var i = 0; i < this._qArr.length; i++) {
                this.group.getChildAt(i).focusOut();
            }
            // let ee = lxl.Tool.copyObject(e);
            // egret.Tween.get(this)
            // 	.wait(200)
            // 	.call(()=>{
            this._answers.push(e.target.parent.index);
            this._answers = lxl.Tool.delSame(this._answers);
            e.target.parent.focusIn();
            // }, this);
        };
        DlgQuestion.prototype._showTiaoZhanResult = function () {
            if (this._dlgtzResult)
                return;
            this._dlgtzResult = new app.DlgTiaoZhanResult();
            this._dlgtzResult.once(lxl.CEvent.BACK, this.back2Handler, this);
            this.pop(this._dlgtzResult, true);
            this._timer.reset();
        };
        DlgQuestion.prototype.back2Handler = function (e) {
            this._dlgtzResult.dispose();
            this._dlgtzResult = null;
            if (e.param == 1) {
                this.btn_submit.touchEnabled = true;
                Cal.getQuestionsRestart();
                Cal.curQs = [];
                Cal.curIndex = 0;
                Cal.cuoTiBen = [];
                Cal.tiaoZhanSeconds = 0;
                this._startGame();
            }
            else {
                Cal.curQs = [];
                Cal.cuoTiBen = [];
                Cal.tiaoZhanSeconds = 0;
                this.dispatchEvent(new lxl.CEvent(lxl.CEvent.BACK, 0));
            }
        };
        DlgQuestion.prototype._showSuccess = function () {
            this._dlg = new app.DlgSuccess();
            this._dlg.once(lxl.CEvent.BACK, this._backHandler, this);
            this.pop(this._dlg, true);
        };
        DlgQuestion.prototype._backHandler = function (e) {
            Cal.curShift = 0;
            this._answers = [];
            this._dlg.dispose();
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.BACK, 1));
        };
        DlgQuestion.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.btn_close.removeEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
            for (var i = this.group.numChildren - 1; i >= 0; i--) {
                if (this._isTiaoZhan == false)
                    this.group.getChildAt(i).removeEventListener(lxl.CEvent.QUESTION_CHECKOUT, this._checkout, this);
                else
                    this.group.getChildAt(i).removeEventListener(lxl.CEvent.QUESTION_CHECKOUT, this._checkout2, this);
                this.group.removeChildAt(i);
            }
            for (var i = 0; i < 10; i++) {
                this["btn_" + i].removeEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
            }
            this._qArr = [];
            this._arrShift = [];
            this._answers = [];
            Cal.curQs = [];
            Cal.curQs2 = [];
            Cal.cuoTiBen = [];
            this.btn_pnt.removeEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
            this.btn_clear.removeEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
            this.btn_submit.removeEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
            this.isTiaoZhan = false;
            this._timer.removeEventListener(egret.TimerEvent.TIMER, this._timerHandler, this);
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
            this.btn_pri.removeEventListener(lxl.CEvent.CLICK, this._printHandler, this);
        };
        return DlgQuestion;
    }(lxl.CComponent));
    app.DlgQuestion = DlgQuestion;
    __reflect(DlgQuestion.prototype, "app.DlgQuestion");
})(app || (app = {}));
//# sourceMappingURL=DlgQuestion.js.map