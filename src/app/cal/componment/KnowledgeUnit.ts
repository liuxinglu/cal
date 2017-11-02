module app {
	export class KnowledgeUnit extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "KnowledgeUnit.exml");
		}

		private img_bg:eui.Image;
		private img_pass:eui.Image;
		private lab_knowledge:eui.Label;
		private _knowledge:Knowledge;
		private _isMove:boolean = false;

		onActivity() {
			super.onActivity();
			// this.img_bg.touchEnabled = true;
			// this.img_pass.touchEnabled = true;
			// this.lab_knowledge.touchEnabled = true;
			this.touchEnabled = true;
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._clickHandler, this);
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._moveHandler, this);
		}

		private _moveHandler(e:egret.TouchEvent) {
			this._isMove = true;
		}

		private _clickHandler(e:egret.TouchEvent) {
			if(this._isMove == false)
				lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.KNOWLEDGE_ACTIVITY, this._knowledge));
		}

		setKnowledge(k:Knowledge) {
			this.lab_knowledge.text = k.knowledge;
			if(k.pass == "true") {
				if(Cal.curMode == 2)
					this.img_pass.visible = false;
				else
					this.img_pass.visible = true;
			} else {
				this.img_pass.visible = false;
			}
			this._knowledge = k;
		}

		dispose() {
			super.dispose();
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._clickHandler, this);
		}
	}
}