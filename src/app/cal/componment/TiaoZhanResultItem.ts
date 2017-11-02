module app {
	export class TiaoZhanResultItem extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "TiaoZhanResultItemSkin.exml");
		}

		private lab_question:eui.Label;
		data:Question;
		
		onActivity() {
			super.onActivity();
			this.lab_question.text = this.data.question;
		}

		dispose() {
			super.dispose();
		}
	}
}