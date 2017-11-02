module lxl {
	export class TimerUtils {
		public constructor() {
		}

		static formatTimeByMilSecond(timeStamp) {
			let distancetime = timeStamp;
			let ms = Math.floor(distancetime % 1000);
			let sec = Math.floor(distancetime / 1000 % 60);
			let min = Math.floor(distancetime / 1000 / 60 % 60);
			let hour =Math.floor(distancetime / 1000 / 60 / 60 % 24);
			let strMs = "";
			let strSec = "";
			let strMin = "";
			let strHour = "";
			if(ms < 100){
				strMs = "0"+ ms;
			} else
				strMs = "" + ms;
			if(sec < 10){
				strSec = "0"+ sec;
			} else 
				strSec = "" + sec;
			if(min < 10){
				strMin = "0"+ min;
			} else 
				strMin = "" + min;
			
			return strMin + ":" + strSec + ":" + strMs;
		}

		static formatTimeBySecond(s:number):string {
			let str = "";
			let min = Math.floor(s / 60);
			let sec = s % 60;
			let hour = Math.floor(min / 60);
			if(hour > 0) {
				min = min % 60;
				str = this.formatMinite(hour) + ":" + this.formatMinite(min) + ":" + this.formatSecond(sec);
			} else {
				str = "00:" + this.formatMinite(min) + ":" + this.formatSecond(sec);
			}
			return str;
		}

		static formatMinite(min:number):string {
			let str = "";
			if(min < 10) {
				str = "0" + min;
				return str;
			} else if(min < 60) {
				str = "" + min;
				return str;
			}
			return str;
		}

		static formatSecond(sec:number):string {
			let str = "";
			if(sec < 10) {
				str = "0" + sec;
				return str;
			} else if(sec <= 59) {
				str = "" + sec;
				return str;
			}
			return str;
		}
	}
}