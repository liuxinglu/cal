module app {
	export class DlgTestResult extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "DlgTestResultSkin.exml");
		}

		private group:eui.Group;
		private _sound:egret.Sound;
		private btn_close:lxl.ui.CButton;

		onActivity() {
			super.onActivity();
			let shape:egret.Shape;
			shape= new egret.Shape();
			shape.graphics.beginFill(0x000000, 0.6);
			shape.graphics.drawRect(0, 0, this.width, this.height);
			shape.graphics.endFill();
			this.addChildAt(shape, 0);
			this.btn_close.addEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
			this._sound = Res.getRes("jieguo_mp3");
			this._sound.play(0, 1);
			for(let i = Cal.needCheckKnowledges.length - 1; i >= 0; i--) {
				let ritem = new ResultItem();
				ritem.data = Cal.needCheckKnowledges[i];
				ritem.once(lxl.CEvent.LOAD_SKIN_COMPLETE, ()=>{
					this.group.addChild(ritem);
				}, this);
			}
		}

		private _closeHandler(e:lxl.CEvent) {
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLOSE));
		}

		updateView() {
			for(let i = Cal.needCheckKnowledges.length - 1; i >= 0 ; i--) {
				(this.group.getChildAt(i) as ResultItem).data = Cal.needCheckKnowledges[i];
				(this.group.getChildAt(i) as ResultItem).updateData();
			}
		}

		dispose() {
			super.dispose();
			this.group.removeChildren();
			this.btn_close.removeEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
		}
	}
}