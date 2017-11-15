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
    var MainView = (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            return _super.call(this, lxl.Config.SKIN_PATH + "MainView.exml") || this;
        }
        MainView.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this.btn_tabBtns.addEventListener(lxl.CEvent.TAB_ACTIVITY, this._updateTabView, this);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.KNOWLEDGE_ACTIVITY, this._showQuestionDlg, this);
            this.testUnit.addEventListener(lxl.CEvent.GRADE_SELECT, this._gradeSelHandler, this);
            this.btn_tabBtns.setActIndex(2);
            lxl.CDispatcher.getInstance().addListener(lxl.CEvent.SHOW_INFO, this._showInfo, this);
        };
        MainView.prototype._showInfo = function (e) {
        };
        MainView.prototype._gradeSelHandler = function (e) {
            this._dlgTest = new app.DlgTest();
            this.pop(this._dlgTest, true);
            this._dlgTest.addEventListener(lxl.CEvent.BACK, this._backTestHandler, this);
        };
        MainView.prototype._backTestHandler = function (e) {
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.SHOW_LOGO_CHANGE));
            this._dlgTest.removeEventListener(lxl.CEvent.BACK, this._backTestHandler, this);
            this._dlgTest.dispose();
            this._dlgTest = null;
        };
        MainView.prototype._showQuestionDlg = function (e) {
            Cal.setConfigQAByKnowledge(e.param);
            this._curKnowledge = e.param;
            this._dlgQ = new app.DlgQuestion();
            if (this.btn_tabBtns.curActIndex == 1)
                this._dlgQ.isTiaoZhan = false;
            else if (this.btn_tabBtns.curActIndex == 2) {
                Cal.getTiaoZhanQs();
                this._dlgQ.isTiaoZhan = true;
            }
            this.pop(this._dlgQ, true);
            this._dlgQ.addEventListener(lxl.CEvent.BACK, this._backMainHandler, this);
        };
        MainView.prototype._backMainHandler = function (e) {
            if (e.param == 1) {
                this._curKnowledge.pass = "true";
                Cal.updateConfigKnowledgeState(this._curKnowledge);
                this.btn_tabBtns.setActIndex(1);
            }
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.SHOW_LOGO_CHANGE));
            this._dlgQ.removeEventListener(lxl.CEvent.BACK, this._backMainHandler, this);
            this._dlgQ.dispose();
            this._dlgQ = null;
        };
        MainView.prototype._updateTabView = function (e) {
            this.gradeUnit.visible = false;
            this.testUnit.visible = false;
            Cal.curMode = e.param;
            if (e.param == 0) {
                this.img_frontBg.visible = true;
                this.img_bg.source = "img_bg_png";
                this.testUnit.visible = true;
            }
            else if (e.param == 1) {
                this.img_frontBg.visible = false;
                this.img_bg.source = "img_bg_gongGu_png";
                this.gradeUnit.setGrade(Cal.curGrade);
                this.gradeUnit.visible = true;
            }
            else if (e.param == 2) {
                this.img_frontBg.visible = false;
                this.img_bg.source = "img_bg_gongGu_2_png";
                this.gradeUnit.setGrade(Cal.curGrade);
                this.gradeUnit.visible = true;
            }
        };
        MainView.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return MainView;
    }(lxl.CComponent));
    app.MainView = MainView;
    __reflect(MainView.prototype, "app.MainView");
})(app || (app = {}));
//# sourceMappingURL=MainView.js.map