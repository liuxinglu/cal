module app {
	export class DlgDraw extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "DlgDrawSkin.exml");
		}

		private btn_close:lxl.ui.CButton;
		private btn_save:lxl.ui.CButton;
		private btn_earse:lxl.ui.CButton;
		private _shape:egret.Shape;
		private _bmpSnap:egret.Bitmap;

		onActivity() {
			super.onActivity();
			this.btn_earse.addEventListener(lxl.CEvent.CLICK, this._clearHandler, this);
			this.btn_save.addEventListener(lxl.CEvent.CLICK, this._saveHandler, this);
			this.btn_close.addEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touchBegin, this);
			
			let shape = new egret.Shape();
			shape.graphics.beginFill(0x000000, 0.8);
			shape.graphics.drawRect(0, 0, this.width, this.height);
			shape.graphics.endFill();
			this.addChildAt(shape, 0);

			this._shape = new egret.Shape();
			this.addChild(this._shape);
			this._shape.graphics.lineStyle(2, 0x999999);
			lxl.Tool.callJS("getLocat", this.getLoc, this);
		}

		getLoc(arr:Array<any>) {
			console.log(arr.toString());
		}

		private _isErase:boolean = false;
		private _clearHandler(e:lxl.CEvent) {
			this._shape.graphics.clear();	
			this._shape.graphics.lineStyle(2, 0x999999);
		}

		private _saveHandler(e:lxl.CEvent) {
			let rt:egret.RenderTexture = new egret.RenderTexture();
			rt.drawToTexture(this._shape, new egret.Rectangle(0, 0, this.stage.stageWidth, this.stage.stageHeight));
			rt.saveToFile("image/png", "screen_snap.png", new egret.Rectangle(0, 0, this.stage.stageWidth, this.stage.stageHeight));
		}

		private _closeHandler(e:lxl.CEvent) {
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLOSE));
		}

		private _touchBegin(e:egret.TouchEvent) {
			this._shape.graphics.moveTo(e.stageX, e.stageY);
			this._shape.graphics.lineTo(e.stageX, e.stageY);
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._touchMove, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this._touchEnd, this);
		}

		private _touchMove(e:egret.TouchEvent) {
			this._shape.graphics.lineTo(e.stageX, e.stageY);
		}

		private _touchEnd(e:egret.TouchEvent) {
			this._shape.graphics.lineTo(e.stageX, e.stageY);
			this.removeEventListener(egret.TouchEvent.TOUCH_END, this._touchEnd, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._touchMove, this);
		}

		dispose() {
			super.dispose();
			this.btn_earse.removeEventListener(lxl.CEvent.CLICK, this._clearHandler, this);
			this.btn_save.removeEventListener(lxl.CEvent.CLICK, this._saveHandler, this);
			this.btn_close.removeEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touchBegin, this);
		}
	}
}