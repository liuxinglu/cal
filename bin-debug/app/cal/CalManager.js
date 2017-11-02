var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var CalManager = (function () {
        function CalManager() {
            this.gradeArr = ["一年级", "二年级", "三年级", "四年级", "五年级"];
            this.curGrade = 1; //当前年级 1-5
            this.plan = [[1, 3, 0], [1, 3, 0], [1, 3, 0]]; //[3, 3, 2], [5, 1, 3]];//[每次需答题数， 升阶需要连续答对的次数, 降阶需要打错的题数]
            this.curShift = 0;
            this.curMode = 0; //0测试 1巩固 2挑战;
            this.curKnowledges = []; //测试 当前年级下所有的知识点
            this.curTestIndex = 0; //测试 知识点索引
            this.needCheckKnowledges = []; //测试出来需要加强的知识点
            this.curIndex = 0; //挑战游标
            this.curQs = [];
            this.tiaoZhanSeconds = 0; //挑战完成的秒数
            this.cuoTiBen = [];
            this.curQs2 = [];
            this.MAX_SIZE = 20;
            this._gradeMaxCount = [40, 20, 40, 80, 9];
            this.indexs = [];
        }
        CalManager.prototype.getTiaoZhanQs = function () {
            var arr2 = [];
            var arr = [];
            var arr3 = [];
            this.curIndex = 0;
            for (var i = this.curIndex; i < this.configQAData.length; i++) {
                if (i == (this.curIndex + Cal.MAX_SIZE))
                    break;
                arr2.push(this.configQAData[i]);
            }
            for (var i = 0; i < arr2.length; i++) {
                arr.push(i);
            }
            arr = lxl.MathUtil.getRandomArrBySortArr(arr, 12);
            for (var i = 0; i < arr.length; i++) {
                arr3.push(arr2[arr[i]]);
            }
            this.curQs2 = arr3;
        };
        CalManager.prototype.getQuestionsByTiaoZhan = function () {
            var arr = [];
            arr.push(this.curQs2[this.curIndex]);
            this.curQs.push(this.curQs2[this.curIndex]);
            this.curIndex++;
            return arr;
        };
        CalManager.prototype.getQuestionsRestart = function () {
            this.curQs2 = [];
            this.curQs = [];
            for (var i = 0; i < this.cuoTiBen.length; i++) {
                var q = lxl.Tool.copyObject(this.cuoTiBen[i]);
                this.curQs2.push(q);
            }
            var delta = Cal.MAX_SIZE - this.curQs2.length;
            if (this.curIndex == Cal.MAX_SIZE)
                this.curIndex = 0;
            for (var i = this.curIndex; i < this.curIndex + delta; i++) {
                var q = this.configQAData[i];
                this.curQs2.push(q);
            }
            this.curIndex = 0;
        };
        CalManager.prototype.insertCuoTi = function (q) {
            // let b:boolean = false;
            // for(let i = 0; i < this.cuoTiBen.length; i++) {
            // 	if(this.cuoTiBen[i].question == q.question){
            // 		b = true;
            // 		break;
            // 	}
            // }
            // if(b == false) {
            this.cuoTiBen.push(q);
            // }
        };
        CalManager.prototype.getIndexsByCount = function (count) {
            for (var i = 0; i < count; i++) {
                this.indexs.push(Math.floor(this._gradeMaxCount[(this.curGrade - 1)] * Math.random()));
            }
            this.indexs = lxl.Tool.delSame(this.indexs);
            if (this.indexs.length < count) {
                this.getIndexsByCount(count);
            }
            else
                return;
        };
        /***
         * 对同一知识点获取三道题 之后获取下一知识点的三道题
         * @param index 同一知识点的三道题的索引
         */
        CalManager.prototype.getQuestionByKnowledgeIndex = function (index) {
            if (index == 2) {
                this.curTestIndex++;
            }
            if (this.curKnowledges.length - this.curTestIndex <= 0) {
                this.curTestIndex = 0;
                return undefined;
            }
            var k = this.curKnowledges[this.curKnowledges.length - this.curTestIndex - 1];
            this.setConfigQAByKnowledge(k);
            return this.configQAData[this.indexs[index]];
            // switch (this.curGrade) {
            // 	case 1:
            // 	case 2:
            // 	return this.configQAData[ind];
            // 	case 3:
            // 	return this.configQAData[ind];
            // 	case 4:
            // 	return this.configQAData[ind];
            // 	case 5:
            // 	return this.configQAData[ind];
            // }	
        };
        CalManager.prototype.getQuestionByCurShift = function () {
            var index = Math.floor((this.configQAData.length - 5) * Math.random());
            var arr = [];
            if (index <= this.configQAData.length - this.plan[this.curShift][0]) {
                for (var i = 0; i < this.plan[this.curShift][0]; i++) {
                    arr.push(this.configQAData[index + i]);
                }
            }
            if (arr.length == 0)
                lxl.logs.fatal("随机到最大值。");
            return arr;
        };
        /**
         * 获得知识点对应的题目列表
         * @param knowledge 要查找的知识点
         * @param isTest 是否是测试模块
         */
        CalManager.prototype.setConfigQAByKnowledge = function (knowledge, isTest) {
            if (isTest === void 0) { isTest = false; }
            this.configQAData = [];
            var data;
            this.knowledge = knowledge;
            for (var i = 0; i < this.configTotalData.length; i++) {
                if (this.configTotalData[i].k == this.curGrade.toString()) {
                    for (var j = 0; j < this.configTotalData[i].v.length; j++) {
                        if (this.configTotalData[i].v[j].knowledge.knowledge == knowledge.knowledge) {
                            this.configQAData.push(this.configTotalData[i].v[j]);
                        }
                    }
                    break;
                }
            }
            if (this.configQAData.length >= 20)
                Cal.MAX_SIZE = 20;
            else
                Cal.MAX_SIZE = this.configQAData.length;
        };
        CalManager.prototype.updateConfigKnowledgeState = function (knowledge) {
            var arr = this.getKnowledgeByGrade(this.curGrade);
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].knowledge == knowledge.knowledge) {
                    arr[i].pass = knowledge.pass;
                    break;
                }
            }
        };
        CalManager.prototype.updateNeedCheckKnowledgesState = function (knowledge) {
            for (var i = 0; i < this.needCheckKnowledges.length; i++) {
                if (this.needCheckKnowledges[i].knowledge == knowledge.knowledge) {
                    this.needCheckKnowledges[i].pass = knowledge.pass;
                    break;
                }
            }
        };
        /**
         * 通过年级获得知识点列表
         * @param grade 年级
         */
        CalManager.prototype.getKnowledgeByGrade = function (grade) {
            for (var i = 0; i < 6; i++) {
                if (this.configKnowledgeData[i].k == grade.toString()) {
                    this.curKnowledges = this.configKnowledgeData[i].v;
                    return this.configKnowledgeData[i].v;
                }
            }
            return [];
        };
        /**
         * 获得所有的知识点
         */
        CalManager.prototype.getAllKnowledge = function (isTest) {
            if (isTest === void 0) { isTest = false; }
            var data;
            var dataArr = [];
            var dataArr2 = [];
            var _loop_1 = function (i) {
                if (isTest == false) {
                    data = JSON.parse(Res.getRes("grade" + i + "Normal_txt"));
                }
                else {
                    data = JSON.parse(Res.getRes("grade" + i + "Test_txt"));
                }
                var arr2 = [];
                var arr = [];
                data.forEach(function (e) {
                    arr.push(new app.Knowledge(e.k));
                    var q = new app.Question();
                    q.index = e.i;
                    q.knowledge = new app.Knowledge(e.k);
                    q.grade = e.g;
                    q.answer = e.a;
                    q.question = e.q;
                    arr2.push(q);
                });
                arr = this_1.delSame(arr);
                arr.reverse();
                arr2.reverse();
                var m = new lxl.data.Map(i.toString(), arr); //年级 知识点
                dataArr.push(m);
                var m2 = new lxl.data.Map(i.toString(), arr2);
                dataArr2.push(m2);
            };
            var this_1 = this;
            for (var i = 1; i < 6; i++) {
                _loop_1(i);
            }
            this.configTotalData = dataArr2;
            this.configKnowledgeData = dataArr;
            return dataArr;
        };
        CalManager.prototype.delSame = function (arr) {
            var res = [];
            var json = {};
            for (var i = 0; i < arr.length; i++) {
                if (!json[arr[i].knowledge]) {
                    res.push(arr[i]);
                    json[arr[i].knowledge] = 1;
                }
            }
            return res;
        };
        CalManager.prototype.loadMasterData = function (cb, ctx) {
            Res.addListener(lxl.CEvent.LOAD_GROUP_COMPLETE, this._onResourceLoadComplete, this);
            Res.loadGroup("txt");
            // Res.getResByUrl(lxl.Config.DATA_PATH + "masterData.txt", function (e:egret.Event) {
            // 	let config = JSON.parse(e.currentTarget.data);
            // 	this.configData = [];
            // 	config.forEach(element => {
            // 		element.level;
            // 		element.index;
            // 		this.configData.push();
            // 	});
            this.cb = cb;
            this.ctx = ctx;
            // }, this, egret.URLLoaderDataFormat.TEXT);
        };
        CalManager.prototype._onResourceLoadComplete = function (e) {
            this.cb.call(this.ctx);
        };
        CalManager.getInstance = function () {
            if (this._instance == null)
                this._instance = new CalManager();
            return this._instance;
        };
        return CalManager;
    }());
    app.CalManager = CalManager;
    __reflect(CalManager.prototype, "app.CalManager");
})(app || (app = {}));
//# sourceMappingURL=CalManager.js.map