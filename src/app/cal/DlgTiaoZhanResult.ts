module app {
	export class DlgTiaoZhanResult extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "DlgTiaoZhanResult.exml");
		}

		private btn_close:lxl.ui.CButton;
		private lab_percent:eui.Label;
		private lab_time:eui.Label;
		private btn_restart:lxl.ui.CButton;
		private btn_share:lxl.ui.CButton;
		private group:eui.Group;
		private _sound:egret.Sound;

		onActivity() {
			super.onActivity();
			let shape:egret.Shape;
			shape= new egret.Shape();
			shape.graphics.beginFill(0x000000, 0.6);
			shape.graphics.drawRect(0, 0, this.width, this.height);
			shape.graphics.endFill();
			this.addChildAt(shape, 0);
			this.lab_percent.text =  (100 - Math.floor(Cal.cuoTiBen.length * 100 / Cal.curQs.length)) + "%";
			this.lab_time.text = lxl.TimerUtils.formatTimeByMilSecond(Cal.tiaoZhanSeconds);
			this.btn_close.addEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
			this.btn_restart.addEventListener(lxl.CEvent.CLICK, this._restartHandler, this);
			this.btn_share.addEventListener(lxl.CEvent.CLICK, this._shareHandler, this);
			this._sound = Res.getRes("jieguo_mp3");
			this._sound.play(0, 1);
			for(let i = Cal.cuoTiBen.length - 1; i >= 0; i--) {
				let ritem = new TiaoZhanResultItem();
				ritem.data = Cal.cuoTiBen[i];
				ritem.once(lxl.CEvent.LOAD_SKIN_COMPLETE, ()=>{
					this.group.addChild(ritem);
				}, this);
			}
		}

		private _closeHandler(e:lxl.CEvent) {
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.BACK));
		}

		private _restartHandler(e:lxl.CEvent) {
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.BACK, 1));
		}

		private _share:app.DlgShare;
		private _shareHandler(e:lxl.CEvent) {
			lxl.Tool.callJS("shareMsg");
			this._share = new app.DlgShare();
			this.pop(this._share);
			this._share.addEventListener(lxl.CEvent.CLOSE, this._shareClose, this);
		}

		private _shareClose(e:lxl.CEvent) {
			this._share.removeEventListener(lxl.CEvent.CLOSE, this._shareClose, this);
			this._share.dispose();
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.SHOW_LOGO_CHANGE));
		}

		dispose() {
			super.dispose();
			this.group.removeChildren();
			this.btn_close.removeEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
			this.btn_restart.removeEventListener(lxl.CEvent.CLICK, this._restartHandler, this);
		}
	}
}