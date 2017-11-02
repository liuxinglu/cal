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
    var DlgPrint = (function (_super) {
        __extends(DlgPrint, _super);
        function DlgPrint() {
            return _super.call(this, lxl.Config.SKIN_PATH + "DlgPrint.exml") || this;
        }
        DlgPrint.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            var shape;
            shape = new egret.Shape();
            shape.graphics.beginFill(0x000000, 0.6);
            shape.graphics.drawRect(0, 0, this.width, this.height);
            shape.graphics.endFill();
            this.addChildAt(shape, 0);
            for (var i = 0; i < 20; i++) {
                this["q" + i].text = "";
                this["a" + i].text = "";
            }
            var arr = [];
            var arr3 = [];
            for (var i = 0; i < Cal.configQAData.length; i++) {
                arr.push(i);
            }
            arr = lxl.MathUtil.getRandomArrBySortArr(arr, 12);
            for (var i = 0; i < arr.length; i++) {
                arr3.push(Cal.configQAData[arr[i]]);
            }
            for (var i = 0; i < Cal.MAX_SIZE; i++) {
                this["q" + i].text = "(" + (i + 1) + ")" + arr3[i].question;
                this["a" + i].text = "(" + (i + 1) + ")" + arr3[i].answer;
            }
            this.lab_questions.text = Cal.configQAData[0].knowledge.knowledge;
            this.lab_answers.text = Cal.configQAData[0].knowledge.knowledge + "的答案";
            if (egret.Capabilities.runtimeType == "web") {
                egret.Tween.get(this)
                    .wait(500)
                    .call(function () {
                    window.print();
                });
            }
        };
        DlgPrint.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return DlgPrint;
    }(lxl.CComponent));
    app.DlgPrint = DlgPrint;
    __reflect(DlgPrint.prototype, "app.DlgPrint");
})(app || (app = {}));
//# sourceMappingURL=DlgPrint.js.map