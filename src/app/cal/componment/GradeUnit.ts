module app {
	export class GradeUnit extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "GradeUnitSKin.exml");
		}

		private btn_left:lxl.ui.CButton;
		private btn_right:lxl.ui.CButton;
		private lab_grade:eui.Label;
		private scroll:eui.Scroller;
		private group:eui.Group;

		onActivity() {
			super.onActivity();
			this.btn_left.addEventListener(lxl.CEvent.CLICK, this._updateView, this);
			this.btn_right.addEventListener(lxl.CEvent.CLICK, this._updateView, this);
		}

		private _updateView(e:lxl.CEvent) {
			if(e.param.target.name == "btn_left") {
				Cal.curGrade--;
				Cal.curGrade = Cal.curGrade < 1 ? 1 : Cal.curGrade;
			} else if(e.param.target.name == "btn_right") {
				Cal.curGrade++;
				Cal.curGrade = Cal.curGrade > 5 ? 5 : Cal.curGrade;
			}
			this.setGrade(Cal.curGrade);
		}

		setGrade(grade:number) {
			switch (grade) {
				case 1:this.lab_grade.text = "一年级";break;
				case 2:this.lab_grade.text = "二年级";break;
				case 3:this.lab_grade.text = "三年级";break;
				case 4:this.lab_grade.text = "四年级";break;
				case 5:this.lab_grade.text = "五年级";break;
			}
			this.group.removeChildren();
			this.scroll.viewport.scrollV = 0;
			let knowledgeArr = Cal.getKnowledgeByGrade(grade);
			for(let i = 0; i < knowledgeArr.length; i++) {
				let kunit = new KnowledgeUnit();
				kunit.param = i;
				kunit.addEventListener(lxl.CEvent.LOAD_SKIN_COMPLETE, ()=>{
					kunit.setKnowledge(knowledgeArr[kunit.param]);
					this.group.addChild(kunit);
				}, kunit);
			}
		}

		dispose() {
			super.dispose();
		}
	}
}