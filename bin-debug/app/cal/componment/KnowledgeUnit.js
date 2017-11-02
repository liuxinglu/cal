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
    var KnowledgeUnit = (function (_super) {
        __extends(KnowledgeUnit, _super);
        function KnowledgeUnit() {
            var _this = _super.call(this, lxl.Config.SKIN_PATH + "KnowledgeUnit.exml") || this;
            _this._isMove = false;
            return _this;
        }
        KnowledgeUnit.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            // this.img_bg.touchEnabled = true;
            // this.img_pass.touchEnabled = true;
            // this.lab_knowledge.touchEnabled = true;
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._clickHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._moveHandler, this);
        };
        KnowledgeUnit.prototype._moveHandler = function (e) {
            this._isMove = true;
        };
        KnowledgeUnit.prototype._clickHandler = function (e) {
            if (this._isMove == false)
                lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KNOWLEDGE_ACTIVITY, this._knowledge));
        };
        KnowledgeUnit.prototype.setKnowledge = function (k) {
            this.lab_knowledge.text = k.knowledge;
            if (k.pass == "true") {
                if (Cal.curMode == 2)
                    this.img_pass.visible = false;
                else
                    this.img_pass.visible = true;
            }
            else {
                this.img_pass.visible = false;
            }
            this._knowledge = k;
        };
        KnowledgeUnit.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._clickHandler, this);
        };
        return KnowledgeUnit;
    }(lxl.CComponent));
    app.KnowledgeUnit = KnowledgeUnit;
    __reflect(KnowledgeUnit.prototype, "app.KnowledgeUnit");
})(app || (app = {}));
//# sourceMappingURL=KnowledgeUnit.js.map