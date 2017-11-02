module app {
	export class TestUnit extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "TestUnitSkin.exml");
		}

		private img_1:eui.Image;
		private img_2:eui.Image;
		private img_3:eui.Image;
		private img_4:eui.Image;
		private img_5:eui.Image;

		onActivity() {
			super.onActivity();
			this.img_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this._gradeClick, this);
			this.img_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this._gradeClick, this);
			this.img_3.addEventListener(egret.TouchEvent.TOUCH_TAP, this._gradeClick, this);
			this.img_4.addEventListener(egret.TouchEvent.TOUCH_TAP, this._gradeClick, this);
			this.img_5.addEventListener(egret.TouchEvent.TOUCH_TAP, this._gradeClick, this);
		}

		private _gradeClick(e:egret.TouchEvent) {
			Cal.curGrade = parseInt(e.target.name);
			let knowledgeArr = Cal.getKnowledgeByGrade(Cal.curGrade);
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.GRADE_SELECT));
		}

		dispose() {
			super.dispose();
			this.img_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._gradeClick, this);
			this.img_2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._gradeClick, this);
			this.img_3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._gradeClick, this);
			this.img_4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._gradeClick, this);
			this.img_5.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._gradeClick, this);
		}
	}
}