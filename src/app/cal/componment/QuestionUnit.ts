module app {
	export class QuestionUnit extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "QuestionUnitSkin.exml");
		}

		private img_bg:eui.Image;
		private lab_question:eui.Label;
		private lab_answer:eui.Label;
		private btn_clear:lxl.ui.CButton;
		private img_sel:eui.Image;
		index:any;
		question:Question;
		curAnswerName:string = "";
		customAnswer:string = "";

		private _sound:egret.Sound;

		onActivity() {
			super.onActivity();
			this.btn_clear.addEventListener(lxl.CEvent.CLICK, this._clearHandler, this);
		}

		private _clearHandler(e:lxl.CEvent) {
			this.customAnswer = "";
			this.lab_answer.text = this.customAnswer;
		}

		focusIn() {
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.ANSWER_CLICK, this._clickAnswerHandler2, this);
			// egret.Tween.get(this.btn_clear)
			// 	.to({x : 1093}, 200);
			// this.img_sel.visible = true;
			this.lab_question.textColor = 0xff7e00;
			this.lab_answer.textColor = 0xff7e00;
		}

		focusOut() {
			lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.ANSWER_CLICK, this._clickAnswerHandler2, this);
			// egret.Tween.get(this.btn_clear)
			// 	.to({x : 969}, 200);
			// this.img_sel.visible = false;
			this.lab_question.textColor = 0x000000;
			this.lab_answer.textColor = 0x000000;
		}

		private _clickAnswerHandler2(e:lxl.CEvent) {
			if(e.param == "pnt") {
				this.customAnswer += ".";
			} else if(e.param == "clear") {
				this.customAnswer = "";
			} else if(e.param == "submit") {
				this.dispatchEvent(new lxl.CEvent(lxl.CEvent.QUESTION_CHECKOUT));//, this.param
			} else 
				this.customAnswer += e.param;
			this.lab_answer.text = this.customAnswer;
		}

		showAnswer():number {
			let flag = 0;
			if(this.customAnswer == "") {
				this.img_bg.source = "img_dacuo_png";
				this._sound = Res.getRes("dacuo_mp3");
				this._sound.play(0, 1);
				return flag;
			}
			if(this.customAnswer == this.question.answer) {
				flag = 1;
				this._sound = Res.getRes("dadui_mp3");
				this._sound.play(0, 1);
				this.img_bg.source = "img_dadui_png";
			} else {
				this._sound = Res.getRes("dacuo_mp3");
				this._sound.play(0, 1);
				this.img_bg.source = "img_dacuo_png";
			}
			return flag;
		}

		setQuestion(q:Question) {
			this.question = q;
			this.lab_question.text = this.question.question;
		}

		dispose() {
			super.dispose();
			lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.ANSWER_CLICK, this._clickAnswerHandler2, this);
			this.btn_clear.removeEventListener(lxl.CEvent.CLICK, this._clearHandler, this);
			this.index = null;
			this.question = null;
			this.curAnswerName = "";
			this.customAnswer = "";
		}
	}
}