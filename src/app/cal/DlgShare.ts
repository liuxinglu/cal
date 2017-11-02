module app {
	export class DlgShare extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "DlgShareSkin.exml");
		}

		private img_tip:eui.Image;
		private img_title:eui.Image;
		private lab_desc:eui.Label;
		private lab_desc2:eui.Label;
		private lab_knowledge:eui.Label;
		private lab_rate:eui.Label;
		private lab_time:eui.Label;
		private lab_title:eui.Label;

		onActivity():void {
			super.onActivity();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._close2Handler, this);
			this.lab_time.text = "用时" + Math.floor(Cal.tiaoZhanSeconds / 1000) + "秒";
			egret.Tween.get(this.img_tip)
				.wait(5000)
				.to({alpha:0}, 2000);
			this.lab_rate.text = (100 - Math.floor(Cal.cuoTiBen.length * 100 / Cal.curQs.length)) + "%";
			this.lab_knowledge.text = Cal.knowledge.knowledge;
			let kArr:Array<string> = Rank.getRankNamesByRateAndTime(Cal.knowledge);
			this.lab_title.text = kArr[1];
			this.lab_desc.text = kArr[2];
			this.lab_desc2.text = kArr[3];
			this.img_title.source = "img_zhuangyuan_" + kArr[0] + "_png";
		}

		private _close2Handler(e:egret.TouchEvent):void {
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLOSE, 0));
		}

		dispose() {
			super.dispose();
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._close2Handler, this);
		}
	}
}