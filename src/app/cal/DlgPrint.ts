module app {
	export class DlgPrint extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "DlgPrint.exml");
		}

		private lab_title:eui.Label;
		private lab_questions:eui.Label;
		private lab_answers:eui.Label;
		private q0:eui.Label;
		private q1:eui.Label;
		private q2:eui.Label;
		private q3:eui.Label;
		private q4:eui.Label;
		private q5:eui.Label;
		private q6:eui.Label;
		private q7:eui.Label;
		private q8:eui.Label;
		private q9:eui.Label;
		private q10:eui.Label;
		private q11:eui.Label;
		private q12:eui.Label;
		private q13:eui.Label;
		private q14:eui.Label;
		private q15:eui.Label;
		private q16:eui.Label;
		private q17:eui.Label;
		private q18:eui.Label;
		private q19:eui.Label;
		private a0:eui.Label;
		private a1:eui.Label;
		private a2:eui.Label;
		private a3:eui.Label;
		private a4:eui.Label;
		private a5:eui.Label;
		private a6:eui.Label;
		private a7:eui.Label;
		private a8:eui.Label;
		private a9:eui.Label;
		private a10:eui.Label;
		private a11:eui.Label;
		private a12:eui.Label;
		private a13:eui.Label;
		private a14:eui.Label;
		private a15:eui.Label;
		private a16:eui.Label;
		private a17:eui.Label;
		private a18:eui.Label;
		private a19:eui.Label;

		onActivity() {
			super.onActivity();
			let shape:egret.Shape;
			shape= new egret.Shape();
			shape.graphics.beginFill(0x000000, 0.6);
			shape.graphics.drawRect(0, 0, this.width, this.height);
			shape.graphics.endFill();
			this.addChildAt(shape, 0);
			for(let i = 0; i < 20; i++) {
				this["q" + i].text = "";
				this["a" + i].text = "";
			}
			let arr = [];
			let arr3 = [];
			for(let i = 0; i < Cal.configQAData.length; i++) {
				arr.push(i);
			}
			arr = lxl.MathUtil.getRandomArrBySortArr(arr, 12);
			for(let i = 0; i < arr.length; i++) {
				arr3.push(Cal.configQAData[arr[i]]);
			}
			for(let i = 0; i < Cal.MAX_SIZE; i++) {
				this["q" + i].text = "(" + (i + 1) + ")" + arr3[i].question;
				this["a" + i].text = "(" + (i + 1) + ")" + arr3[i].answer;
			}
			this.lab_questions.text = Cal.configQAData[0].knowledge.knowledge;
			this.lab_answers.text = Cal.configQAData[0].knowledge.knowledge + "的答案";
			if(egret.Capabilities.runtimeType == "web") {
				egret.Tween.get(this)
					.wait(500)
					.call(()=>{
						window.print();
					});
			}
		}

		dispose() {
			super.dispose();
		}
	}
}