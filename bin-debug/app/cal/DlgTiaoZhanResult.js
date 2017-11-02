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
    var DlgTiaoZhanResult = (function (_super) {
        __extends(DlgTiaoZhanResult, _super);
        function DlgTiaoZhanResult() {
            return _super.call(this, lxl.Config.SKIN_PATH + "DlgTiaoZhanResult.exml") || this;
        }
        DlgTiaoZhanResult.prototype.onActivity = function () {
            var _this = this;
            _super.prototype.onActivity.call(this);
            var shape;
            shape = new egret.Shape();
            shape.graphics.beginFill(0x000000, 0.6);
            shape.graphics.drawRect(0, 0, this.width, this.height);
            shape.graphics.endFill();
            this.addChildAt(shape, 0);
            this.lab_percent.text = (100 - Math.floor(Cal.cuoTiBen.length * 100 / Cal.curQs.length)) + "%";
            this.lab_time.text = lxl.TimerUtils.formatTimeByMilSecond(Cal.tiaoZhanSeconds);
            this.btn_close.addEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
            this.btn_restart.addEventListener(lxl.CEvent.CLICK, this._restartHandler, this);
            this.btn_share.addEventListener(lxl.CEvent.CLICK, this._shareHandler, this);
            this._sound = Res.getRes("jieguo_mp3");
            this._sound.play(0, 1);
            var _loop_1 = function (i) {
                var ritem = new app.TiaoZhanResultItem();
                ritem.data = Cal.cuoTiBen[i];
                ritem.once(lxl.CEvent.LOAD_SKIN_COMPLETE, function () {
                    _this.group.addChild(ritem);
                }, this_1);
            };
            var this_1 = this;
            for (var i = Cal.cuoTiBen.length - 1; i >= 0; i--) {
                _loop_1(i);
            }
        };
        DlgTiaoZhanResult.prototype._closeHandler = function (e) {
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.BACK));
        };
        DlgTiaoZhanResult.prototype._restartHandler = function (e) {
            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.BACK, 1));
        };
        DlgTiaoZhanResult.prototype._shareHandler = function (e) {
            this._share = new app.DlgShare();
            this.pop(this._share);
            this._share.addEventListener(lxl.CEvent.CLOSE, this._shareClose, this);
        };
        DlgTiaoZhanResult.prototype._shareClose = function (e) {
            this._share.removeEventListener(lxl.CEvent.CLOSE, this._shareClose, this);
            this._share.dispose();
            lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.SHOW_LOGO_CHANGE));
        };
        DlgTiaoZhanResult.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.group.removeChildren();
            this.btn_close.removeEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
            this.btn_restart.removeEventListener(lxl.CEvent.CLICK, this._restartHandler, this);
        };
        return DlgTiaoZhanResult;
    }(lxl.CComponent));
    app.DlgTiaoZhanResult = DlgTiaoZhanResult;
    __reflect(DlgTiaoZhanResult.prototype, "app.DlgTiaoZhanResult");
})(app || (app = {}));
//# sourceMappingURL=DlgTiaoZhanResult.js.map