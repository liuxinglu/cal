module app {
	export class MainView extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "MainView.exml");
		}

		private btn_tabBtns:TabButtonBar;
		private topTitle:TopTitle;
		private gradeUnit:GradeUnit;
		private testUnit:TestUnit;
		private img_bg:eui.Image;
		private img_frontBg:eui.Image;
		
		onActivity() {
			super.onActivity();
			this.btn_tabBtns.addEventListener(lxl.CEvent.TAB_ACTIVITY, this._updateTabView, this);
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.KNOWLEDGE_ACTIVITY, this._showQuestionDlg, this);
			this.testUnit.addEventListener(lxl.CEvent.GRADE_SELECT, this._gradeSelHandler, this);
			this.btn_tabBtns.setActIndex(0);
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.SHOW_INFO, this._showInfo, this);
		}

		private _showInfo(e:lxl.CEvent) {
			
		}

		private _dlgTest:DlgTest;
		private _gradeSelHandler(e:lxl.CEvent) {
			this._dlgTest = new DlgTest();
			this.pop(this._dlgTest, true);
			this._dlgTest.addEventListener(lxl.CEvent.BACK, this._backTestHandler, this);
		}

		private _backTestHandler(e:lxl.CEvent) {
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.SHOW_LOGO_CHANGE));
			this._dlgTest.removeEventListener(lxl.CEvent.BACK, this._backTestHandler, this);
			this._dlgTest.dispose();
			this._dlgTest = null;
		}

		private _dlgQ:DlgQuestion;
		private _curKnowledge:Knowledge;
		private _showQuestionDlg(e:lxl.CEvent) {
			Cal.setConfigQAByKnowledge(e.param as Knowledge);
			this._curKnowledge = (e.param as Knowledge);
			this._dlgQ = new DlgQuestion();
			if(this.btn_tabBtns.curActIndex == 1)
				this._dlgQ.isTiaoZhan = false;
			else if(this.btn_tabBtns.curActIndex == 2) {
				Cal.getTiaoZhanQs();
				this._dlgQ.isTiaoZhan = true;
			}
			this.pop(this._dlgQ, true);
			this._dlgQ.addEventListener(lxl.CEvent.BACK, this._backMainHandler, this);
		}

		private _backMainHandler(e:lxl.CEvent) {
			if(e.param == 1) {
				this._curKnowledge.pass = "true";
				Cal.updateConfigKnowledgeState(this._curKnowledge);
				this.btn_tabBtns.setActIndex(1);
			}
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.SHOW_LOGO_CHANGE));
			this._dlgQ.removeEventListener(lxl.CEvent.BACK, this._backMainHandler, this);
			this._dlgQ.dispose();
			this._dlgQ = null;
		}

		private _updateTabView(e:lxl.CEvent) {
			this.gradeUnit.visible = false;
			this.testUnit.visible = false;
			Cal.curMode = e.param;
			if(e.param == 0) {
				this.img_frontBg.visible = true;
				this.img_bg.source = "img_bg_png";
				this.testUnit.visible = true;
			} else if(e.param == 1) {
				this.img_frontBg.visible = false;
				this.img_bg.source = "img_bg_gongGu_png";
				this.gradeUnit.setGrade(Cal.curGrade);
				this.gradeUnit.visible = true;
			} else if(e.param == 2) {
				this.img_frontBg.visible = false;
				this.img_bg.source = "img_bg_gongGu_2_png";
				this.gradeUnit.setGrade(Cal.curGrade);
				this.gradeUnit.visible = true;
			}
		}

		dispose() {
			super.dispose();
		}
	}
}