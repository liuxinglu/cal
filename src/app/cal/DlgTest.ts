module app {
	export class DlgTest extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "DlgTestSkin.exml");
		}

		private group:eui.Group;
		private btn_close:lxl.ui.CButton;
		private btn_0:lxl.ui.CButton;
		private btn_1:lxl.ui.CButton;
		private btn_2:lxl.ui.CButton;
		private btn_3:lxl.ui.CButton;
		private btn_4:lxl.ui.CButton;
		private btn_5:lxl.ui.CButton;
		private btn_6:lxl.ui.CButton;
		private btn_7:lxl.ui.CButton;
		private btn_8:lxl.ui.CButton;
		private btn_9:lxl.ui.CButton;
		private btn_pnt:lxl.ui.CButton;
		private btn_clear:lxl.ui.CButton;
		private btn_submit:lxl.ui.CButton;
		private lab_num:eui.Label;
		private _needCheckKnowledgeIndexPoint:Array<number> = [];
		private _dlgTestResult:DlgTestResult;
		private _dlgQ:DlgQuestion;
		private _curKnowledge:Knowledge;
		private _q:Question;
		private _curIndex = 0;
		private _sound:egret.Sound;
		private btn_test:lxl.ui.CButton;

		onActivity() {
			super.onActivity();
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.SHOW_LOGO_CHANGE));
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.KNOWLEDGE_SELECT, this._testCheckHandler, this);
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
			let shape:egret.Shape;
			shape= new egret.Shape();
			shape.graphics.beginFill(0x000000, 0.6);
			shape.graphics.drawRect(0, 0, this.width, this.height);
			shape.graphics.endFill();
			this.addChildAt(shape, 0);
			this.btn_close.addEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
			for(let i = 0; i < 10; i++) {
				this["btn_" + i].addEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
			}
			this.btn_pnt.addEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
			this.btn_clear.addEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
			this.btn_submit.eps = 1000;
			this.btn_submit.addEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
			Cal.indexs = [];
			Cal.getIndexsByCount(3);
			this._insertQuestion();
			this.lab_num.text = (Cal.curTestIndex + 1) + "/" + (Cal.curKnowledges.length);
			this.btn_test.addEventListener(lxl.CEvent.CLICK, this._testHandler, this);
		}

		private _dlgDraw:DlgDraw;
		private _hasDraw:boolean = false;
		private _testHandler(e:lxl.CEvent) {
			if(this._hasDraw == false) {
				this._hasDraw = true;
				this._dlgDraw = new DlgDraw();
				this.pop(this._dlgDraw);
				this._dlgDraw.addEventListener(lxl.CEvent.CLOSE, this._closeTestHandler, this);
			}
		}

		private _closeTestHandler(e:lxl.CEvent) {
			this._dlgDraw.removeEventListener(lxl.CEvent.CLOSE, this._closeTestHandler, this);
			this._dlgDraw.dispose();
		}

		dispose() {
			super.dispose();
			Cal.curShift = 0;
			Cal.curTestIndex = 0;
			Cal.needCheckKnowledges = [];
			this._needCheckKnowledgeIndexPoint = [];
			this._curIndex = 0;
			this._curKnowledge = null;
			this._q = null;
			lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.KNOWLEDGE_SELECT, this._testCheckHandler, this);
			this.btn_close.removeEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
			for(let i = 0; i < 10; i++) {
				this["btn_" + i].removeEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
			}
			this.btn_pnt.removeEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
			this.btn_clear.removeEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
			this.btn_submit.removeEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
			let num = this.group.numChildren;
			for(let i = num - 1; i >= 0; i--) {
				this.group.getChildAt(i).removeEventListener(egret.TouchEvent.TOUCH_TAP, this._qunitClick, this);
				(this.group.getChildAt(i) as QuestionUnit).dispose();
			}
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
		}

		
		private _testCheckHandler(e:lxl.CEvent) {
			Cal.setConfigQAByKnowledge(e.param as Knowledge);
			this._curKnowledge = (e.param as Knowledge);
			this._dlgQ = new DlgQuestion();
			this._dlgTestResult.pop(this._dlgQ, true);
			this._dlgQ.addEventListener(lxl.CEvent.BACK, this._backMainHandler, this);
		}

		private _backMainHandler(e:lxl.CEvent) {
			if(e.param == 1) {
				this._curKnowledge.pass = "true";
				Cal.updateNeedCheckKnowledgesState(this._curKnowledge);
			}
			this._dlgQ.removeEventListener(lxl.CEvent.BACK, this._backMainHandler, this);
			this._dlgQ.dispose();
			this._dlgQ = null;
			this._dlgTestResult.updateView();
		}

		private _keyClickHandler(e:lxl.CEvent) {
			this._sound = Res.getRes("anniu_mp3");
			this._sound.play(0, 1);
			if(e.param != "submit") {
				lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.ANSWER_CLICK, e.param));
			} else {
				this._checkout(e);
			}
		}

		private _btnClickHandler(e:lxl.CEvent) {
			this._sound = Res.getRes("anniu_mp3");
			this._sound.play(0, 1);
			if(e.param.target.name != "submit") {
				lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.ANSWER_CLICK, e.param.target.name));
			} else {
				this._checkout(e);
			}
		}

		private _closeHandler(e:lxl.CEvent) {
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.BACK, 0));
		}

		private _qunitClick(e:egret.TouchEvent) {
			(this.group.getChildAt(0) as QuestionUnit).focusOut();
			let ee = lxl.Tool.copyObject(e);
			// egret.Tween.get(this)
			// 	.wait(200)
			// 	.call(()=>{
					(ee.target.parent as QuestionUnit).focusIn();
				// }, this);
		}

		
		private _checkout(e:lxl.CEvent) {
			let num = this.group.numChildren;
			if(num > 1 || num == 0)
				return;
			let temp = (this.group.getChildAt(0) as QuestionUnit).showAnswer();
			if(temp == 0) {
				let kIndex = Cal.curTestIndex;
				this._needCheckKnowledgeIndexPoint.push(kIndex);
				Cal.curTestIndex++;
				this._curIndex = 0;
			} else {
				if(this._curIndex == 2 && (Cal.curTestIndex + 1) == Cal.curKnowledges.length) {
					Cal.curTestIndex = Cal.curKnowledges.length;
				}
			}
			if(Cal.curKnowledges.length == Cal.curTestIndex) {//测试结束
				Cal.needCheckKnowledges = [];
				for(let i = 0; i < this._needCheckKnowledgeIndexPoint.length; i++) {
					let k = Cal.curKnowledges[Cal.curKnowledges.length - 1 - this._needCheckKnowledgeIndexPoint[i]];
					Cal.needCheckKnowledges.push(k);
				}
				// Cal.needCheckKnowledges.reverse();
				let num = this.group.numChildren;
				for(let i = num - 1; i >= 0; i--) {
					this.group.getChildAt(i).removeEventListener(egret.TouchEvent.TOUCH_TAP, this._qunitClick, this);
					// this.group.getChildAt(i).removeEventListener(lxl.CEvent.QUESTION_CHECKOUT_TEST, this._checkout, this);
					(this.group.getChildAt(i) as QuestionUnit).dispose();
				}
				if(Cal.needCheckKnowledges.length == 0) {
					this._showSuccess();
				} else {
					this._dlgTestResult = new DlgTestResult();
					this.pop(this._dlgTestResult);
					this._dlgTestResult.addEventListener(lxl.CEvent.CLOSE, this._closeTestResultHandler, this);
				}
				
			} else {
				egret.Tween.get(this)
					.wait(200)
					.call(()=>{
						this._insertQuestion();
					}, this);
			}
		}

		private _dlg:DlgSuccess;
		private _showSuccess() {
			this._dlg = new DlgSuccess();
			this._dlg.once(lxl.CEvent.BACK, this._backHandler, this);
			this.pop(this._dlg, true);
		}

		private _backHandler(e:lxl.CEvent) {
			Cal.curShift = 0;
			this._dlg.dispose();
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.BACK, 0));
		}

		private _closeTestResultHandler(e:lxl.CEvent) {
			this._dlgTestResult.removeEventListener(lxl.CEvent.CLOSE, this._closeTestResultHandler, this);
			this._dlgTestResult.dispose();
			Cal.curTestIndex = 0;
			Cal.needCheckKnowledges = [];
			this._needCheckKnowledgeIndexPoint = [];
			this._closeHandler(e);
		}

		
		private _insertQuestion() {
			let num = this.group.numChildren;
			for(let i = num - 1; i >= 0; i--) {
				this.group.getChildAt(i).removeEventListener(egret.TouchEvent.TOUCH_TAP, this._qunitClick, this);
				// this.group.getChildAt(i).removeEventListener(lxl.CEvent.QUESTION_CHECKOUT_TEST, this._checkout, this);
				(this.group.getChildAt(i) as QuestionUnit).dispose();
			}
			let qArr:Question = Cal.getQuestionByKnowledgeIndex(this._curIndex);
			this._curIndex = this._curIndex + 1;
			if(Cal.curTestIndex + 1 > Cal.curKnowledges.length)
				this.lab_num.text = (Cal.curTestIndex) + "/" + (Cal.curKnowledges.length);
			else
				this.lab_num.text = (Cal.curTestIndex + 1) + "/" + (Cal.curKnowledges.length);
			if(qArr == undefined)
				return;
			if(this._curIndex == 3)
				this._curIndex = 0;
			this._q = qArr;
			let qunit = new QuestionUnit();
			qunit.param = qunit;
			qunit.addEventListener(egret.TouchEvent.TOUCH_TAP, this._qunitClick, this);
			qunit.addEventListener(lxl.CEvent.QUESTION_CHECKOUT, this._checkout, this);
			qunit.once(lxl.CEvent.LOAD_SKIN_COMPLETE, (e:lxl.CEvent)=>{
				e.target.setQuestion(this._q);
				this.group.addChild(e.target);
				e.target.focusIn();
			}, this);
		}
	}
}