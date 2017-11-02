module app {
	export class TopTitle extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "TopTitle.exml");
		}

		dispose() {
			super.dispose();
		}
	}
}