module lxl {
	export class CEventInit implements EventInit {
		bubbles: boolean;
		cancelable: boolean;
	}

	export class CEvent extends egret.Event{
		/**
		 *连接到服务器 
		 */		
		public static CONNECT_SERVER:string = "CEVENT::CONNECT_SERVER";
		
		/**
		 *连接失败 
		 */		
		public static CONNECT_FAIL:string = "CEVENT::CONNECT_FAIL";

		/**
		 *加载资源完成 
		 */		
		public static LOAD_SKIN_COMPLETE:string = "CEVENT::LOAD_SKIN_COMPLETE";
		/**
		 * 加载配置完成
		 */
		public static LOAD_CONFIG_COMPLETE:string = "CEVENT::LOAD_CONFIG_COMPLETE";
		/**
		 * 加载一组资源完成
		 */
		public static LOAD_GROUP_COMPLETE:string = "CEVENT::LOAD_GROUP_COMPLETE";
		/**
		 * 加载进度
		 */
		public static LOAD_PROGRESS:string = "CEVENT::LOAD_PROGRESS";

		public static CLICK:string = "CEVENT::CLICK";

		//完成选择
		public static SEL_COMPLETE:string = "CEVENT::SEL_COMPLETE";
		//成功完成游戏
		public static SUCCESS:string = "CEVENT::SUCCESS";
		//返回
		public static BACK:string = "CEVENT::BACK";
		//左右上下
		public static UP:string = "CEVENT::UP";
		public static DOWN:string = "CEVENT::DOWN";
		public static LEFT:string = "CEVENT::LEFT";
		public static RIGHT:string = "CEVENT::RIGHT";
		public static SPACE:string = "CEVENT::SPACE";
		public static STAGE_CLICK:string = "CEVENT::STAGE_CLICK";
		//护眼模式
		public static PROTECTE_EYE:string = "CEVENT::PROTECTE_EYE";
		public static EYE_CHANGE:string = "CEVENT::EYE_CHANGE";
		
		public static TAB_ACTIVITY:string = "CEVENT::TAB_ACTIVITY";
		public static KNOWLEDGE_ACTIVITY:string = "CEVENT::KNOWLEDGE_ACTIVITY";
		public static QUESTION_CHECKOUT:string = "CEVENT::QUESTION_CHECKOUT";
		public static QUESTION_CHECKOUT_TEST:string = "CEVENT::QUESTION_CHECKOUTTest";
		public static ANSWER_CLICK:string = "CEVENT::ANSWER_CLICK";
		public static ANSWER_CLICK_OUT:string = "CEVENT::ANSWER_CLICK_OUT";
		public static GRADE_SELECT:string = "CEVENT::GRADE_SELECT";
		public static KNOWLEDGE_SELECT:string = "CEVENT::KNOWLEDGE_SELECT";

		//显示logo
		public static SHOW_LOGO_CHANGE:string = "CEVENT::SHOW_LOGO_CHANGE";

		//显示开发者名单
		public static SHOW_INFO:string = "CEVENT::SHOW_INFO";
		public static KEY_0:string = "CEVENT::KEY_0";
		public static KEY_1:string = "CEVENT::KEY_1";
		public static KEY_2:string = "CEVENT::KEY_2";
		public static KEY_3:string = "CEVENT::KEY_3";
		public static KEY_4:string = "CEVENT::KEY_4";
		public static KEY_5:string = "CEVENT::KEY_5";
		public static KEY_6:string = "CEVENT::KEY_6";
		public static KEY_7:string = "CEVENT::KEY_7";
		public static KEY_8:string = "CEVENT::KEY_8";
		public static KEY_9:string = "CEVENT::KEY_9";
		public static KEY__:string = "CEVENT::KEY__";
		public static KEY_ENTER:string = "CEVENT::KEY_ENTER";
		public static KEY_DEL:string = "CEVENT::KEY_DEL";
		public static KEY_ADD:string = "CEVENT::KEY_ADD";
		public static KEY_MULTIPLY:string = "CEVENT::KEY_MULTIPLY";
		public static KEY_SUBTRACT:string = "CEVENT::KEY_SUBTRACT";
		public static KEY_DIVIDE:string = "CEVENT::KEY_DIVIDE";
		private _param:any;
		cancelBubble;
		public constructor(type:string, param:any = null, timeSpan:number = 0, bubbles:boolean = false, cancelable:boolean = false)
		{
			super(type, bubbles, cancelable, param);
			// let ceinit:CEventInit = new CEventInit();
			// ceinit.bubbles = bubbles;
			// ceinit.cancelable = cancelable;
			this._param = param;
		}

		public get param():any {
			return this._param;
		}

	}
}