module app {
	export class DlgQuestion extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "DlgQuestion.exml");
			this._timer = new egret.Timer(20);
		}

		private topTitle:TopTitle;
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
		private img_yi:eui.Image;
		private lab_time:eui.Label;
		private lab_timu:eui.Label;

		private _isTiaoZhan:boolean = false;
		private _timer:egret.Timer;
		private _sound:egret.Sound;
		private btn_pri:lxl.ui.CButton;
		private g_totast:eui.Group;
		private btn_test:lxl.ui.CButton;

		onActivity() {
			super.onActivity();
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.SHOW_LOGO_CHANGE));
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
				this["btn_" + i].needAniComplete = false;
				this["btn_" + i].addEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
			}
			this.btn_pri.addEventListener(lxl.CEvent.CLICK, this._printHandler, this);
			this.btn_pnt.addEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
			this.btn_clear.addEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
			this.btn_submit.eps = 1000;
			this.btn_submit.addEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
			this._timer.addEventListener(egret.TimerEvent.TIMER, this._timerHandler, this);
			this.btn_test.addEventListener(lxl.CEvent.CLICK, this._testHandler, this);
			this._insertQuestion();
			if(this._isTiaoZhan == true) {
				this.lab_timu.text = "第" + (Cal.curIndex) +  "/" + Cal.curQs2.length + "题";
				this._timer.start();
				this.lab_time.text = "";
				this.lab_timu.visible = true;
			} else {
				this._timer.reset();
				this.lab_time.text = "";
				this.lab_timu.visible = false;
			}
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
			this._hasDraw = false;
			this._dlgDraw.removeEventListener(lxl.CEvent.CLOSE, this._closeTestHandler, this);
			this._dlgDraw.dispose();
		}

		private _dlgPrint:DlgPrint;
		private _hasPrint:boolean = false;
		private _printHandler(e:TouchEvent) {
			if(egret.Capabilities.runtimeType == "web" && lxl.Tool.isPC_Mode() == true) {
				if(this._hasPrint == false) {
					this._hasPrint = true;
					this._dlgPrint = new DlgPrint();
					this.pop(this._dlgPrint);
					this._dlgPrint.addEventListener(egret.TouchEvent.TOUCH_TAP, this._closePrint, this);
				}
			}
			else {
				this.animation();
				return;
			}
		}

		private animation():void {
			this.g_totast.alpha = 0;
			this.g_totast.visible = true;
			egret.Tween.get( this.g_totast )
				.to( { alpha: 1}, 300, egret.Ease.quintOut )
				.wait( 1000 )
				.to( { alpha: 0}, 500, egret.Ease.quintIn  ).call( ()=>{
					this.g_totast.visible = false;
				} );
		}

		private _closePrint(e:egret.TouchEvent) {
			this._hasPrint = false;
			this._dlgPrint.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._closePrint, this);
			this._dlgPrint.dispose();
		}

		private _startGame() {
			this._insertQuestion();
			if(this._isTiaoZhan == true) {
				this.lab_timu.text = "第" + (Cal.curIndex) +  "/" + Cal.curQs2.length + "题";
				this._timer.start();
			}
			else
				this._timer.reset();
		}

		private _timerHandler(e:egret.TimerEvent) {
			if((this._timer.currentCount * 20) > Cal.tiaoZhanSeconds)
				Cal.tiaoZhanSeconds = this._timer.currentCount * 20;
			this.lab_time.text = lxl.TimerUtils.formatTimeByMilSecond(this._timer.currentCount * 20);
		}


		private _tiaoZhanIndex:number;
		set isTiaoZhan(b:boolean) {
			this._isTiaoZhan = b;
			
		}

		private _keyClickHandler(e:lxl.CEvent) {
			this._sound = Res.getRes("anniu_mp3");
			this._sound.play(0, 1);
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.ANSWER_CLICK, e.param));
		}

		private _btnClickHandler(e:lxl.CEvent) {
			this._sound = Res.getRes("anniu_mp3");
			this._sound.play(0, 1);
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.ANSWER_CLICK, e.param.target.name));
		}

		private _closeHandler(e:lxl.CEvent) {
			Cal.curShift = 0;
			this._answers = [];
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.BACK, 0));
		}

		private _arrShift = [];
		private _answers = [];
		private _checkout(e:lxl.CEvent) {
			if(Cal.plan[Cal.curShift][0] == this._answers.length) {
				let rightCount = 0;
				for(let i = 0; i < this.group.numChildren; i++) {
					let temp = (this.group.getChildAt(i) as QuestionUnit).showAnswer();
					rightCount += temp;
				}
				if(Cal.plan[Cal.curShift][0] == rightCount) {//全对计入进阶次数
					this._arrShift.push(1);
					if(Cal.plan[Cal.curShift][1] == this._arrShift.length) {//全对次数满足进阶
						Cal.curShift++;
						rightCount = 0;
						this._arrShift = [];
					}
				}
				else if(Cal.plan[Cal.curShift][2] <= (Cal.plan[Cal.curShift][0] - rightCount)) { //单次错误次数太多 降阶
					Cal.curShift = Cal.curShift <= 0 ? 0 : --Cal.curShift;
					rightCount = 0;
					this._arrShift = [];
				} else {
					this._arrShift = [];
					rightCount = 0;
				}
				this._answers = [];
				egret.Tween.get(this)
					.wait(200)
					.call(()=>{
						if(Cal.curShift >= 3) {
							Cal.curShift = 0;
							this._showSuccess();
						} else {
							this._insertQuestion();
						}
					}, this);
			}
		}

		private _checkout2(e:lxl.CEvent) {
			if(Cal.curQs.length >= Cal.MAX_SIZE) {
				this.btn_submit.touchEnabled = false;
				if(this._dlgtzResult)
					return;
				for(let i = 0; i < this.group.numChildren; i++) {
					let temp = (this.group.getChildAt(i) as QuestionUnit).showAnswer();
					if(temp == 0) {
						Cal.insertCuoTi((this.group.getChildAt(i) as QuestionUnit).question);
					}
				}
				this._showTiaoZhanResult();
				return;
			}
			for(let i = 0; i < this.group.numChildren; i++) {
				let temp = (this.group.getChildAt(i) as QuestionUnit).showAnswer();
				if(temp == 0) {
					Cal.insertCuoTi((this.group.getChildAt(i) as QuestionUnit).question);
				}
			}
			this._arrShift = [];
			this._answers = [];
			egret.Tween.get(this)
			.wait(200)
			.call(()=>{
				if(Cal.curQs.length >= Cal.MAX_SIZE) {
					this.lab_timu.text = "第" + Cal.curIndex +  "/" + Cal.curQs2.length + "题";
					this._showTiaoZhanResult();
				} else {
					this._insertQuestion();
					this.lab_timu.text = "第" + Cal.curIndex +  "/" + Cal.curQs2.length + "题";
				}
			}, this);
		}

		private _qArr = [];
		private _insertQuestion() {
			let num = this.group.numChildren;
			for(let i = num - 1; i >= 0; i--) {
				this.group.getChildAt(i).removeEventListener(egret.TouchEvent.TOUCH_TAP, this._qunitClick, this);
				if(this._isTiaoZhan == false)
					this.group.getChildAt(i).removeEventListener(lxl.CEvent.QUESTION_CHECKOUT, this._checkout, this);
				else
					this.group.getChildAt(i).removeEventListener(lxl.CEvent.QUESTION_CHECKOUT, this._checkout2, this);
				(this.group.getChildAt(i) as QuestionUnit).dispose();
			}
			this.group.removeChildren();
			let qArr:Array<Question>;
			if(this._isTiaoZhan == true) {
				qArr = Cal.getQuestionsByTiaoZhan();
			} else {
				qArr = Cal.getQuestionByCurShift();
			}
			if(qArr.length == 1)
				this.img_yi.visible = true;
			else 
				this.img_yi.visible = false;
			this._qArr = qArr;
			for(let i = 0; i < this._qArr.length; i++) {
				let qunit = new QuestionUnit();
				qunit.param = qunit;
				qunit.index = i;
				qunit.addEventListener(egret.TouchEvent.TOUCH_TAP, this._qunitClick, this);
				if(this._isTiaoZhan == false)
					qunit.addEventListener(lxl.CEvent.QUESTION_CHECKOUT, this._checkout, this);
				else
					qunit.addEventListener(lxl.CEvent.QUESTION_CHECKOUT, this._checkout2, this);
				qunit.once(lxl.CEvent.LOAD_SKIN_COMPLETE, (e:lxl.CEvent)=>{
					e.target.setQuestion(this._qArr[e.target.index]);
					this.group.addChild(e.target);
					if(this._qArr.length == 1) {
						this._answers.push(e.target.index);
						this._answers = lxl.Tool.delSame(this._answers);
						e.target.focusIn();
					}
					if(this.group.numChildren == 0) {
						lxl.logs.log("group中没有子元素");
					}
				}, this);
			}

		}

		private _qunitClick(e:egret.TouchEvent) {
			for(let i = 0; i < this._qArr.length; i++) {
				(this.group.getChildAt(i) as QuestionUnit).focusOut();
			} 
			// let ee = lxl.Tool.copyObject(e);
			// egret.Tween.get(this)
			// 	.wait(200)
			// 	.call(()=>{
			this._answers.push(e.target.parent.index);
			this._answers = lxl.Tool.delSame(this._answers);
			(e.target.parent as QuestionUnit).focusIn();
				// }, this);
		}

		private _dlgtzResult:DlgTiaoZhanResult;
		private _showTiaoZhanResult() {
			if(this._dlgtzResult)
				return;
			this._dlgtzResult = new DlgTiaoZhanResult();
			this._dlgtzResult.once(lxl.CEvent.BACK, this.back2Handler, this);
			this.pop(this._dlgtzResult, true);
			this._timer.reset();
		}

		private back2Handler(e:lxl.CEvent) {
			this._dlgtzResult.dispose();
			this._dlgtzResult = null;
			if(e.param == 1) {
				this.btn_submit.touchEnabled = true;
				Cal.getQuestionsRestart();
				Cal.curQs = [];
				Cal.curIndex = 0;
				Cal.cuoTiBen = [];
				Cal.tiaoZhanSeconds = 0;
				this._startGame();
			} else {
				Cal.curQs = [];
				Cal.cuoTiBen = [];
				Cal.tiaoZhanSeconds = 0;
				this.dispatchEvent(new lxl.CEvent(lxl.CEvent.BACK, 0));
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
			this._answers = [];
			this._dlg.dispose();
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.BACK, 1));
		}

		dispose() {
			super.dispose();
			this.btn_close.removeEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
			for(let i = this.group.numChildren - 1; i >= 0 ; i--) {
				if(this._isTiaoZhan == false)
					this.group.getChildAt(i).removeEventListener(lxl.CEvent.QUESTION_CHECKOUT, this._checkout, this);
				else
					this.group.getChildAt(i).removeEventListener(lxl.CEvent.QUESTION_CHECKOUT, this._checkout2, this);
				this.group.removeChildAt(i);
			}
			for(let i = 0; i < 10; i++) {
				this["btn_" + i].removeEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
			}
			this._qArr = [];
			this._arrShift = [];
			this._answers = [];
			Cal.curQs = [];
			Cal.curQs2 = [];
			Cal.cuoTiBen = [];
			this.btn_pnt.removeEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
			this.btn_clear.removeEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
			this.btn_submit.removeEventListener(lxl.CEvent.CLICK, this._btnClickHandler, this);
			this.isTiaoZhan = false;
			this._timer.removeEventListener(egret.TimerEvent.TIMER, this._timerHandler, this);
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
			this.btn_pri.removeEventListener(lxl.CEvent.CLICK, this._printHandler, this);
		}
	}
}