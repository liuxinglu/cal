var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var RankManager = (function () {
        function RankManager() {
            this._rankSplits = [
                ["20以内的加减混合", "10以内的加法", "10以内的减法", "20以内的不进位加法", "20以内的不退位减法", "20以内的进位加法", "20以内的退位减法", "20以内的加法", "20以内的减法", "两位数加一位数的加法", "两位数加整十数的加法", "两位数减一位数的减法", "两位数减整十数的减法", "10以内的连减", "10以内的加减混合", "20以内的连加", "20以内的连减", "20以内的加减混合"],
                ["和在100以内的连加", "被减数在100以内的连减", "100以内连加连减混合运算"],
                ["两位数加两位数的加法", "两位数减两位数的减法", "整十数减两位数的减法", "乘数在6以内的乘法", "乘数在9以内的乘法", "6以内的表内除法", "9以内的表内除法", "整十数加减法", "整百数减整百数", "尾数为0三位数加法", "尾数为0三位数减法"],
                ["表内乘加混合", "10以内除法加法混合运算", "10以内整数连乘", "10以内整数连除", "10以内整数乘除混合运算", "含有小括号的混合运算"],
                ["一位数乘整十数", "一位数乘两位数", "一位数除整十整百数", "一位数除两位数", "整十数乘整十数", "整百数乘整十数", "一位数的四则运算", "两位数除以一位数"],
                ["两位数加两位数", "三位数加三位数", "三位数减三位数", "整百数减三位数", "一位数乘三位数", "尾数是0的三位数乘法", "一位数除三位数", "整十数乘两位数", "末尾是0的三位数乘一位数", "一位数除三位数的除法"],
                ["两位数乘两位数", "万以内的加减法", "两位数连续乘一位数", "整百数连续除以一位数", "百以内两位数连减两位数"],
                [],
                []
            ];
            this._gradeSeconds = [
                [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140],
                [60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160],
                [60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160],
                [80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180],
                [60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160],
                [120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220],
                [140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240],
                [180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380],
                [180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380]
            ];
            this._gradeRate = [0.1, 0.1, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.3];
            this._titles = [
                ["0", "状元", "超过99%的同学", "学霸,你已经打败了几乎所有人！"],
                ["1", "榜眼", "超过90%的同学", "距离学霸只有一步之遥，加油！"],
                ["2", "探花", "超过85%的同学", "恭喜进入头甲，努力成为状元吧！"],
                ["3", "进士", "超过80%的同学", "恭喜金榜题名，向头甲发起挑战吧！"],
                ["4", "同进士", "超过75%的同学", "快接近进士出身了，真不错！"],
                ["5", "会元", "超过70%的同学", "不赖啊，下次争取金榜题名！"],
                ["6", "贡士", "超过65%的同学", "有些实力啊，但强中自有强中手！"],
                ["7", "解元", "超过55%的同学", "超过了不少人，但也要挑战不少人。"],
                ["8", "举人", "超过45%的同学", "中举只是开始，路，还很长！"],
                ["9", "秀才", "超过35%的同学", "实力稍欠，但有中举潜质。"],
                ["10", "书生", "超过25%的同学", "不要着急，多加练习，一切才刚刚开始！"],
                ["11", "书童", "加油！再接再厉！", "初出茅庐，厚积薄发！"]
            ];
        }
        RankManager.prototype.getIndexByKnowledge = function (knowledge) {
            for (var i = 0; i < this._rankSplits.length; i++) {
                for (var j = 0; j < this._rankSplits[i].length; j++) {
                    if (this._rankSplits[i][j] == knowledge.knowledge) {
                        return i;
                    }
                }
            }
        };
        RankManager.prototype.getJudgeTitleIndex = function (index) {
            var rate = Math.floor(Cal.cuoTiBen.length * 100 / Cal.curQs.length) / 100;
            var delta = Math.floor(Cal.tiaoZhanSeconds / 1000) * rate;
            var staticUnit = 0;
            var fastTime = this._gradeSeconds[index][0];
            var lowTime = this._gradeSeconds[index][this._gradeSeconds[index].length - 1];
            staticUnit = (lowTime * this._gradeRate[index] - fastTime * 0.05) / 10;
            var ind = 0;
            for (var i = 0; i < this._gradeSeconds[index].length; i++) {
                if (i == 0) {
                    if (delta <= fastTime * 0.05) {
                        ind = i;
                        break;
                    }
                }
                else {
                    if (i != this._gradeSeconds[index].length - 1) {
                        if (fastTime * 0.05 + i * staticUnit < delta && delta <= fastTime * 0.05 + (i + 1) * staticUnit) {
                            ind = i;
                            break;
                        }
                    }
                    else {
                        if (delta > fastTime * 0.05 + i * staticUnit) {
                            ind = i;
                            break;
                        }
                    }
                }
            }
            return ind;
        };
        RankManager.prototype.getRankNamesByRateAndTime = function (knowledge) {
            var rate = Math.floor(Cal.cuoTiBen.length * 100 / Cal.curQs.length) / 100;
            if (rate == 0) {
                var index = -1;
                for (var i = 0; i < this._gradeSeconds[Cal.curGrade - 1].length; i++) {
                    if (i == 0) {
                        if (Cal.tiaoZhanSeconds / 1000 <= this._gradeSeconds[Cal.curGrade - 1][i]) {
                            index = i;
                            break;
                        }
                    }
                    else {
                        if (Cal.tiaoZhanSeconds / 1000 <= this._gradeSeconds[Cal.curGrade - 1][i] && Cal.tiaoZhanSeconds / 1000 > this._gradeSeconds[Cal.curGrade - 1][i - 1]) {
                            index = i;
                            break;
                        }
                    }
                }
                if (index == -1) {
                    return this._titles[this._titles.length];
                }
                else {
                    return this._titles[index];
                }
            }
            else {
                var ind = this.getIndexByKnowledge(knowledge);
                if (ind == undefined) {
                    if (Cal.curGrade == 4) {
                        ind = 7;
                    }
                    else if (Cal.curGrade == 5) {
                        ind = 8;
                    }
                }
                var index = 0;
                if (Cal.curGrade == 1 || Cal.curGrade == 2) {
                    if (rate <= 0.1) {
                        index = this.getJudgeTitleIndex(ind);
                        return this._titles[index + 1];
                    }
                    else {
                        if (rate <= 0.2) {
                            return ["8", "举人", "超过45%的同学", "中举只是开始，路，还很长！"];
                        }
                        else if (rate <= 0.5) {
                            return ["9", "秀才", "超过35%的同学", "实力稍欠，但有中举潜质。"];
                        }
                        else if (rate <= 0.8) {
                            return ["10", "书生", "超过25%的同学", "不要着急，多加练习，一切才刚刚开始！"];
                        }
                        else if (rate <= 1) {
                            return ["11", "书童", "加油！再接再厉！", "初出茅庐，厚积薄发！"];
                        }
                    }
                }
                else if (Cal.curGrade == 3) {
                    if (rate <= 0.2) {
                        index = this.getJudgeTitleIndex(ind);
                        return this._titles[index + 1];
                    }
                    else {
                        if (rate <= 0.3) {
                            return ["8", "举人", "超过45%的同学", "中举只是开始，路，还很长！"];
                        }
                        else if (rate <= 0.5) {
                            return ["9", "秀才", "超过35%的同学", "实力稍欠，但有中举潜质。"];
                        }
                        else if (rate <= 0.8) {
                            return ["10", "书生", "超过25%的同学", "不要着急，多加练习，一切才刚刚开始！"];
                        }
                        else if (rate <= 1) {
                            return ["11", "书童", "加油！再接再厉！", "初出茅庐，厚积薄发！"];
                        }
                    }
                }
                else if (Cal.curGrade == 4 || Cal.curGrade == 5) {
                    if (rate <= 0.3) {
                        index = this.getJudgeTitleIndex(ind);
                        return this._titles[index + 1];
                    }
                    else {
                        if (rate <= 0.4) {
                            return ["8", "举人", "超过45%的同学", "中举只是开始，路，还很长！"];
                        }
                        else if (rate <= 0.5) {
                            return ["9", "秀才", "超过35%的同学", "实力稍欠，但有中举潜质。"];
                        }
                        else if (rate <= 0.8) {
                            return ["10", "书生", "超过25%的同学", "不要着急，多加练习，一切才刚刚开始！"];
                        }
                        else if (rate <= 1) {
                            return ["11", "书童", "加油！再接再厉！", "初出茅庐，厚积薄发！"];
                        }
                    }
                }
            }
        };
        RankManager.getInstance = function () {
            if (this._instance == null)
                this._instance = new RankManager();
            return this._instance;
        };
        return RankManager;
    }());
    app.RankManager = RankManager;
    __reflect(RankManager.prototype, "app.RankManager");
})(app || (app = {}));
//# sourceMappingURL=RankManager.js.map