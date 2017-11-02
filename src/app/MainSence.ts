module app {
	export class MainSence extends lxl.ui.CLayer {
		public constructor() {
			super();
		}

		onActivity(): void {
            super.onActivity();
			let main:MainView = new app.MainView();
			main.width = this.stage.stageWidth;
			main.height = this.stage.stageHeight;
			main.name = "man";
			main.once(lxl.CEvent.LOAD_SKIN_COMPLETE, ()=>{
				Cal.getAllKnowledge();
				this.addChild(main);
			}, this);
			main.addEventListener(lxl.CEvent.BACK, this._backMainHandler, this);
		}

		private _backMainHandler(e:lxl.CEvent) {
			this.getChildByName("man").removeEventListener(lxl.CEvent.BACK, this._backMainHandler, this);
			(this.getChildByName("man") as MainView).dispose();
		}
	}
}