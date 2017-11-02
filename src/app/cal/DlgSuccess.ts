module app {
	export class DlgSuccess extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "DlgSuccess.exml");
		}

		private img_bg:eui.Image;
		private _sound:egret.Sound;
		
		onActivity() {
			super.onActivity();
			let shape:egret.Shape;
			shape= new egret.Shape();
			shape.graphics.beginFill(0x000000, 0.6);
			shape.graphics.drawRect(0, 0, this.width, this.height);
			shape.graphics.endFill();
			this.addChildAt(shape, 0);
			this.ani();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._clickHandler, this);
			this._sound = Res.getRes("jieguo_mp3");
			this._sound.play(0, 1);
		}

		private _clickHandler(e:egret.TouchEvent) {
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.BACK));
		}

		ani() {
			egret.Tween.get(this.img_bg)
				.to({rotation: 359}, 2000)
				.call(()=>{
					this.img_bg.rotation = 0;
					this.ani();
				}, this);
		}

		dispose() {
			super.dispose();
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._clickHandler, this);
			egret.Tween.removeAllTweens();
		}
	}
}