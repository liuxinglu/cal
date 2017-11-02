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
    var GradeUnit = (function (_super) {
        __extends(GradeUnit, _super);
        function GradeUnit() {
            return _super.call(this, lxl.Config.SKIN_PATH + "GradeUnitSKin.exml") || this;
        }
        GradeUnit.prototype.onActivity = function () {
            _super.prototype.onActivity.call(this);
            this.btn_left.addEventListener(lxl.CEvent.CLICK, this._updateView, this);
            this.btn_right.addEventListener(lxl.CEvent.CLICK, this._updateView, this);
        };
        GradeUnit.prototype._updateView = function (e) {
            if (e.param.target.name == "btn_left") {
                Cal.curGrade--;
                Cal.curGrade = Cal.curGrade < 1 ? 1 : Cal.curGrade;
            }
            else if (e.param.target.name == "btn_right") {
                Cal.curGrade++;
                Cal.curGrade = Cal.curGrade > 5 ? 5 : Cal.curGrade;
            }
            this.setGrade(Cal.curGrade);
        };
        GradeUnit.prototype.setGrade = function (grade) {
            var _this = this;
            switch (grade) {
                case 1:
                    this.lab_grade.text = "一年级";
                    break;
                case 2:
                    this.lab_grade.text = "二年级";
                    break;
                case 3:
                    this.lab_grade.text = "三年级";
                    break;
                case 4:
                    this.lab_grade.text = "四年级";
                    break;
                case 5:
                    this.lab_grade.text = "五年级";
                    break;
            }
            this.group.removeChildren();
            this.scroll.viewport.scrollV = 0;
            var knowledgeArr = Cal.getKnowledgeByGrade(grade);
            var _loop_1 = function (i) {
                var kunit = new app.KnowledgeUnit();
                kunit.param = i;
                kunit.addEventListener(lxl.CEvent.LOAD_SKIN_COMPLETE, function () {
                    kunit.setKnowledge(knowledgeArr[kunit.param]);
                    _this.group.addChild(kunit);
                }, kunit);
            };
            for (var i = 0; i < knowledgeArr.length; i++) {
                _loop_1(i);
            }
        };
        GradeUnit.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return GradeUnit;
    }(lxl.CComponent));
    app.GradeUnit = GradeUnit;
    __reflect(GradeUnit.prototype, "app.GradeUnit");
})(app || (app = {}));
//# sourceMappingURL=GradeUnit.js.map