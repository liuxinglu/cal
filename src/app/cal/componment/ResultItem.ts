module app {
	export class ResultItem extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "ResultItemSkin.exml");
		}

		private lab_knowledge:eui.Label;
		private img_pass:eui.Image;
		data:Knowledge;

		onActivity() {
			super.onActivity();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._clickHandler, this);
			this.lab_knowledge.text = this.data.knowledge;
			this.img_pass.visible = this.data.pass == "true" ? true : false;
		}

		updateData() {
			this.lab_knowledge.text = this.data.knowledge;
			this.img_pass.visible = this.data.pass == "true" ? true : false;
		}

		private _clickHandler(e:egret.TouchEvent) {
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KNOWLEDGE_SELECT, this.data));
		}

		dispose() {
			super.dispose();
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._clickHandler, this);
		}
	}
}