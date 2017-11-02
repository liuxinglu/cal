module lxl.ui {
	export class CButton extends eui.Button{
		public constructor() {
			super();
			this.addEventListener( egret.TouchEvent.TOUCH_TAP, this._onClick, this );
            this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onActivity, this);
		}

        /** 点击频度限制 */
        private _eps:number = 0;
        needAniComplete:boolean = true;
        private _timer:egret.Timer;
        private _clickEps:number = 0;

        private onActivity(e:eui.UIEvent):void {
            // this.init();
        }

        set eps(e:number) {
            this._eps = e;
            if(this._timer) {
                this._timer.reset();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this._timerHandler, this);
                this._timer = new egret.Timer(this._eps);
                this._timer.addEventListener(egret.TimerEvent.TIMER, this._timerHandler, this);
                this._timer.start();
            } else {
                this._timer = new egret.Timer(this._eps);
                this._timer.addEventListener(egret.TimerEvent.TIMER, this._timerHandler, this);
                this._timer.start();
            }
        }

        get eps():number {
            return this._eps;
        }

        public init():void {
            if(this.eps > 0){
                this._timer = new egret.Timer(this.eps);
                this._timer.addEventListener(egret.TimerEvent.TIMER, this._timerHandler, this);
                this._timer.start();
            }
        }

        private _timerHandler(e:egret.TimerEvent):void {
            this._clickEps = this._clickEps == this.eps ? this.eps : (this._clickEps + this.eps);
        }

		private _onClick(e:egret.TouchEvent):void {
            this.scaleX = this.scaleY = 0.9;
            let ee = lxl.Tool.copyObject(e);
            if(this.needAniComplete) {
                egret.Tween.get( this )
                    .to( { scaleX: 0.9, scaleY:0.9 }, 200)
                    .to( { scaleX: 1, scaleY: 1 }, 100)
                    .call(function() {
                        if(this.eps == this._clickEps) {
                            this._clickEps = 0;
                            this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLICK, ee));
                        }
                    }, this);
            } else {
                 egret.Tween.get( this )
                    .to( { scaleX: 0.9, scaleY:0.9 }, 200)
                    .to( { scaleX: 1, scaleY: 1 }, 100);
                this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLICK, ee));
            }
        }

	}
}