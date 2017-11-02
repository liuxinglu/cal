module app {
	export class TabButtonBar extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "TabButtonBar.exml");
		}

		private btn_0:lxl.ui.TabButton;
		private btn_1:lxl.ui.TabButton;
		private btn_2:lxl.ui.TabButton;
		curActIndex:number = 0;

		onActivity() {
			super.onActivity();
			this.btn_0.tabIndex = 0;
			this.btn_1.tabIndex = 1;
			this.btn_2.tabIndex = 2;
			this.btn_0.addEventListener(lxl.CEvent.CLICK, this._tabClickHandler, this);
			this.btn_1.addEventListener(lxl.CEvent.CLICK, this._tabClickHandler, this);
			this.btn_2.addEventListener(lxl.CEvent.CLICK, this._tabClickHandler, this);
		}

		private _tabClickHandler(e:lxl.CEvent) {
			this.setActIndex(e.param.target.tabIndex);
		}

		setActIndex(index:number) {
			for(let i = 0; i < 3; i++) {
				this["btn_" + i].currentState = "normal";
			}
			this.curActIndex = index;
			this["btn_" + index].currentState = "sel";
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.TAB_ACTIVITY, index));
		}

		dispose() {
			super.dispose();
		}
	}
}