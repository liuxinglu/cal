module app {
	export class Knowledge {
		public constructor(str:string = "") {
			this.knowledge = str;
		}

		knowledge:string ="";
		private _pass:string = "false";

		set pass(str:string) {
			egret.localStorage.setItem(this.knowledge, str);
			this._pass = str;
		}

		get pass():string {
			if(egret.localStorage.getItem(this.knowledge) != undefined && egret.localStorage.getItem(this.knowledge) != "")
				return egret.localStorage.getItem(this.knowledge);
			else 
				return this._pass;
		}
	}
}