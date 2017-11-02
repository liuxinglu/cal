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
    var DlgShare = (function (_super) {
        __extends(DlgShare, _super);
        function DlgShare() {
            return _super.call(this, lxl.Config.SKIN_PATH + "DlgShareSkin.exml") || this;
        }
        DlgShare.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._close2Handler, this);
            this.lab_time.text = "用时" + Math.floor(Cal.tiaoZhanSeconds / 1000) + "秒";
            egret.Tween.get(this.img_tip)
                .wait(5000)
                .to({ alpha: 0 }, 2000);
            this.lab_rate.text = (100 - Math.floor(Cal.cuoTiBen.length * 100 / Cal.curQs.length)) + "%";
            this.lab_knowledge.text = Cal.knowledge.knowledge;
            var kArr = Rank.getRankNamesByRateAndTime(Cal.knowledge);
            this.lab_title.text = kArr[1];
            this.lab_desc.text = kArr[2];
            this.lab_desc2.text = kArr[3];
            this.img_title.source = "img_zhuangyuan_" + kArr[0] + "_png";
        };
        DlgShare.prototype._close2Handler = function (e) {
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLOSE, 0));
        };
        DlgShare.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._close2Handler, this);
        };
        return DlgShare;
    }(lxl.CComponent));
    app.DlgShare = DlgShare;
    __reflect(DlgShare.prototype, "app.DlgShare");
})(app || (app = {}));
//# sourceMappingURL=DlgShare.js.map