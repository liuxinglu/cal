module lxl.ui {
	export class TabButton extends eui.Button{
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onActivity, this);
			this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.dispose, this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._clickHandler, this);
			this.funOnActivity = this.onActivity;
			this.funDispose = this.dispose;
		}

		delegate:any;

		tabIndex:number;
		funOnActivity:Function;
		funDispose:Function;
		hasActivi:boolean = false;
		hasDispos:boolean = false;

		onActivity():void {
			for(var i = 0; i < this.numChildren; i++) {
				this.doAcivity((this.getChildAt(i) as CComponent));
			}
			this.hasActivi = true;
		}

		private doAcivity(com:CComponent) {
			if(com.hasOwnProperty("funOnActivity") && com.hasActivi == false)
				com["funOnActivity"]();
			if(com.numChildren == 0) {
				return;
			} else {
				for(var i = 0; i < com.numChildren; i++) {
					this.doAcivity((com.getChildAt(i) as CComponent));
				}
			}
		}

		private _clickHandler(e:egret.TouchEvent) {
			let ee = lxl.Tool.copyObject(e);
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLICK, ee));
		}

		dispose():void {
           for(var i = 0; i < this.numChildren; i++) {
				this.doDispos((this.getChildAt(i) as CComponent));
			}
			this.parent.removeChild(this);
			this.hasDispos = true;
		}

		private doDispos(com:CComponent) {
			if(com.hasOwnProperty("funDispose") && com.hasDispos == false)
				com["funDispose"]();
			if(com.numChildren == 0) {
				return;
			} else {
				for(var i = 0; i < com.numChildren; i++) {
					this.doDispos((com.getChildAt(i) as CComponent));
				}
			}
		}
	}
}