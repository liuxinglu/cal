module app {
	export class CalManager {
		public constructor() {
		}

		configTotalData:Array<lxl.data.Map>;
		configQAData:Array<Question>;//当前知识点题库
		configKnowledgeData:Array<lxl.data.Map>;//知识点数组 按年级做key
		gradeArr:Array<string> = ["一年级", "二年级", "三年级", "四年级", "五年级"];
		curGrade:number = 1;//当前年级 1-5
		plan:Array<Array<number>> = [[1, 3, 0], [1, 3, 0], [1, 3, 0]];//[3, 3, 2], [5, 1, 3]];//[每次需答题数， 升阶需要连续答对的次数, 降阶需要打错的题数]
		curShift:number = 0;
		curMode:number = 0;//0测试 1巩固 2挑战;

		curKnowledges:Array<Knowledge> = [];//测试 当前年级下所有的知识点
		curTestIndex:number = 0;//测试 知识点索引
		needCheckKnowledges:Array<Knowledge> = [];//测试出来需要加强的知识点

		curIndex:number = 0;//挑战游标
		curQs:Array<Question> = [];
		tiaoZhanSeconds:number = 0;//挑战完成的秒数
		cuoTiBen:Array<Question> = [];
		curQs2:Array<Question> = [];
		MAX_SIZE:number = 20;
		knowledge:Knowledge;

		getTiaoZhanQs() {
			let arr2 = [];
			let arr = [];
			let arr3 = [];
			this.curIndex = 0;
			for(let i = this.curIndex; i < this.configQAData.length; i++) {
				if(i == (this.curIndex + Cal.MAX_SIZE))
					break;
				arr2.push(this.configQAData[i]);
			}
			for(let i = 0; i < arr2.length; i++) {
				arr.push(i);
			}
			arr = lxl.MathUtil.getRandomArrBySortArr(arr, 12);
			for(let i = 0; i < arr.length; i++) {
				arr3.push(arr2[arr[i]]);
			}
			this.curQs2 = arr3;
		}

		getQuestionsByTiaoZhan():Array<Question> {
			let arr = [];
			arr.push(this.curQs2[this.curIndex]);
			this.curQs.push(this.curQs2[this.curIndex]);
			this.curIndex++;
			return arr;
		}

		getQuestionsRestart() {
			this.curQs2 = [];
			this.curQs = [];
			for(let i = 0; i < this.cuoTiBen.length; i++) {
				let q:Question = lxl.Tool.copyObject(this.cuoTiBen[i]);
				this.curQs2.push(q);
			}
			let delta = Cal.MAX_SIZE - this.curQs2.length;
			if(this.curIndex == Cal.MAX_SIZE)
				this.curIndex = 0;
			for(let i = this.curIndex; i < this.curIndex + delta; i++) {
				let q:Question = this.configQAData[i];
				this.curQs2.push(q);
			}
			this.curIndex = 0;
		}

		insertCuoTi(q:Question) {
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
		}

		private _gradeMaxCount = [40, 20, 40, 80, 9];
		indexs:Array<number> = [];
		getIndexsByCount(count:number) {
			for(let i = 0; i < count; i++) {
				this.indexs.push(Math.floor(this._gradeMaxCount[(this.curGrade - 1)] * Math.random()))
			}
			this.indexs = lxl.Tool.delSame(this.indexs);
			if(this.indexs.length < count) {
				this.getIndexsByCount(count);
			} else 
				return;
		}
		/***
		 * 对同一知识点获取三道题 之后获取下一知识点的三道题
		 * @param index 同一知识点的三道题的索引
		 */
		getQuestionByKnowledgeIndex(index:number):Question {
			if(index == 2) {
				this.curTestIndex++;
			}
			if(this.curKnowledges.length - this.curTestIndex <= 0) {
				this.curTestIndex = 0;
				return undefined;
			}
			let k:Knowledge = this.curKnowledges[this.curKnowledges.length - this.curTestIndex - 1];
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
		}

		getQuestionByCurShift():Array<Question> {
			let index = Math.floor((this.configQAData.length - 5) * Math.random());
			let arr = [];
			if(index <= this.configQAData.length - this.plan[this.curShift][0]) {
				for(let i = 0; i < this.plan[this.curShift][0]; i++) {
					arr.push(this.configQAData[index + i]);
				}
			}
			if(arr.length == 0)
				lxl.logs.fatal("随机到最大值。");
			return arr;
		}

		/**
		 * 获得知识点对应的题目列表
		 * @param knowledge 要查找的知识点
		 * @param isTest 是否是测试模块
		 */
		setConfigQAByKnowledge(knowledge:Knowledge, isTest:boolean = false) {
			this.configQAData = [];
			let data;
			this.knowledge = knowledge;
			for(let i = 0; i < this.configTotalData.length; i++) {
				if(this.configTotalData[i].k == this.curGrade.toString()) {
					for(let j = 0; j < this.configTotalData[i].v.length; j++) {
						if(this.configTotalData[i].v[j].knowledge.knowledge == knowledge.knowledge) {
							this.configQAData.push(this.configTotalData[i].v[j]);
						}
					}
					break;
				}
			}
			if(this.configQAData.length >= 20)
				Cal.MAX_SIZE = 20;
			else 
				Cal.MAX_SIZE = this.configQAData.length;
		}

		updateConfigKnowledgeState(knowledge:Knowledge) {
			let arr = this.getKnowledgeByGrade(this.curGrade);
			for(let i = 0; i < arr.length; i++) {
				if(arr[i].knowledge == knowledge.knowledge) {
					arr[i].pass = knowledge.pass;
					break;
				}
			}
		}

		updateNeedCheckKnowledgesState(knowledge:Knowledge) {
			for(let i = 0; i < this.needCheckKnowledges.length; i++) {
				if(this.needCheckKnowledges[i].knowledge == knowledge.knowledge) {
					this.needCheckKnowledges[i].pass = knowledge.pass;
					break;
				}
			}
		}

		/**
		 * 通过年级获得知识点列表
		 * @param grade 年级
		 */
		getKnowledgeByGrade(grade:number):Array<Knowledge> {
			for(let i = 0; i < 6; i++) {
				if(this.configKnowledgeData[i].k == grade.toString()) {
					this.curKnowledges = this.configKnowledgeData[i].v;
					return this.configKnowledgeData[i].v;
				}
			}
			return [];
		}

		/**
		 * 获得所有的知识点
		 */
		getAllKnowledge(isTest:boolean = false):Array<lxl.data.Map> {
			let data;
			let dataArr = [];
			let dataArr2 = [];
			for(let i = 1; i < 6; i++) {
				if(isTest == false) {
					data = JSON.parse(Res.getRes("grade" + i + "Normal_txt"));
				} else {
					data = JSON.parse(Res.getRes("grade" + i + "Test_txt"));
				}
				let arr2 = [];
				let arr:Array<Knowledge> = [];
				data.forEach(e => {
					arr.push(new Knowledge(e.k));
					let q = new Question();
					q.index = e.i;
					q.knowledge = new Knowledge(e.k);
					q.grade = e.g;
					q.answer = e.a;
					q.question = e.q;
					arr2.push(q);
				});
				arr = this.delSame(arr);
				arr.reverse();
				arr2.reverse();
				let m = new lxl.data.Map(i.toString(), arr);//年级 知识点
				dataArr.push(m);
				let m2 = new lxl.data.Map(i.toString(), arr2);
				dataArr2.push(m2);
			}
			this.configTotalData = dataArr2;
			this.configKnowledgeData = dataArr;
			return dataArr;
		}

		delSame(arr:Array<Knowledge>):Array<Knowledge> {
			var res = [];
			var json = {};
			for(var i = 0; i < arr.length; i++){
				if(!json[arr[i].knowledge]){
					res.push(arr[i]);
					json[arr[i].knowledge] = 1;
				}
			}
			return res;
		}

		private cb:any;
		private ctx:any;

		loadMasterData(cb:any, ctx:any) {
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
		}

		private _onResourceLoadComplete(e:lxl.CEvent) {
			this.cb.call(this.ctx);
		}

		private static _instance: CalManager;
		public static getInstance(): CalManager {
			if (this._instance == null)
				this._instance = new CalManager();
			return this._instance;
		}
	}
}