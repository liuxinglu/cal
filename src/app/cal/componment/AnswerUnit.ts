module app {
	export class AnswerUnit extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "AnswerUnitSkin.exml");
		}

		private lab_answer:eui.Label;
		private img_state:eui.Image;
		isRightAnswer:boolean = false;

		onActivity() {
			super.onActivity();
		}

		setText(str:string) {
			this.lab_answer.text = str;
		}

		setState(s:string) {
			this.img_state.visible = true;
			if(s == "right") {
				this.lab_answer.textColor = 0x82F754;
				this.img_state.source = "img_duigou_png";
			} else if(s == "wrong") {
				this.lab_answer.textColor = 0xF44444;
				this.img_state.source = "img_cuowu_png";
			} else if(s == "click") {
				this.img_state.source = "img_xuanzhong_png";
			} else if(s == "reset") {
				this.img_state.visible = false;
			}
		}

		dispose() {
			super.dispose();
		}
	}
}