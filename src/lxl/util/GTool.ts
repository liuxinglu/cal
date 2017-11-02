module lxl {
	export class GTool {
		public constructor() {
		}

		static randomTrianglePoints(d:number, h:number):Array<egret.Point> {
			let arr:Array<egret.Point> = [];
			//通過一點和距離以及另一點的X坐標算出另一點的Y坐標，然後就能確定這兩個點的直線方程式
			let pnt1:egret.Point = new egret.Point(Math.floor(Math.random() * 100 + 300), Math.floor(Math.random() * 100 + 200));
			let funX:number = Math.random() * d + pnt1.x 
			let funY:number = Math.sqrt(Math.pow(d, 2) - Math.pow(funX - pnt1.x, 2)) + pnt1.y;
			let pnt2:egret.Point = new egret.Point(funX, funY);
			let kbArr1:Array<number> = this.getKBFromTwoPoint(pnt1, pnt2);
			//知道了直線方程式就可以知道它的垂線方程式以及這兩條線的交點坐標
			let funBT:number = funY + funX / kbArr1[0];
			let funXT:number = kbArr1[0] * (funBT - kbArr1[1]) / (Math.pow(kbArr1[0], 2) + 1);
			let funYT:number = (Math.pow(kbArr1[0], 2) * (funBT - kbArr1[1])) / (Math.pow(kbArr1[0], 2) + 1) + kbArr1[1];
			//通過交點坐標和高度確定另一點坐標
			// let funX1T:number = Math.random() * h + funXT;
			// let funY1T:number = Math.sqrt(Math.pow(h, 2) - Math.pow(funX1T - funXT, 2)) + funXT;
			let funPnt:egret.Point = new egret.Point(funXT, funYT);
			let pnt3:egret.Point = new egret.Point();
			for(let i = funXT; i < funXT + h; i++) {
				pnt3.x = i;
				pnt3.y = -1 * i / kbArr1[0] + funBT;//Math.sqrt(Math.pow(h, 2) - Math.pow(i - funXT, 2)) + funXT;
				if(egret.Point.distance(pnt3, funPnt) == h)
					break;
			}
			// funX1T = pnt3.x;
			// funY1T = pnt3.y;
			arr = [pnt1, pnt3, pnt2];
			for(let i = 0; i < arr.length; i++) {
				if(arr[i].x > lxl.GlobalData.getInstance().root.width) {
					arr = this.randomTrianglePoints(d, h);
					break;
				}
				if(i == arr.length - 1) {
					return arr;
				}
			}
		}

		/**
		 * 通过固定的底和高随机绘制三角形
		 * d 底边长度
		 * h 高的长度
		 */
		static drawRandomTriangle(g:egret.Graphics, d:number, h:number):Array<egret.Point> {
			let arr:Array<egret.Point> = [];
			arr = this.randomTrianglePoints(d, h);
			g.lineStyle(1, 0x979797);
			g.beginFill(0x00B88E, 0.8);
			g.moveTo(arr[0].x, arr[0].y);
			g.lineTo(arr[1].x, arr[1].y);
			g.lineTo(arr[2].x, arr[2].y);
			g.lineTo(arr[0].x, arr[0].y);
			g.endFill();
			lxl.logs.log("d: " + d + ", h: " + h);
			lxl.logs.log(arr.toString());
			return arr;
		}

		static drawTriangleByStaticSide(g:egret.Graphics, pntArr:Array<egret.Point>) {
			g.lineStyle(1, 0x979797);
			g.beginFill(0xA6D10A, 0.8);
			g.moveTo(pntArr[0].x, pntArr[0].y);
			g.lineTo(pntArr[1].x, pntArr[1].y);
			g.lineTo(pntArr[2].x, pntArr[2].y);
			g.lineTo(pntArr[0].x, pntArr[0].y);
			g.endFill();
		}

		/**
		 * 通过pnt1，pnt2确定一条平行线，该平行线过pnt3
		 */
		static drawParallelLine(g:egret.Graphics, pnt1:egret.Point, pnt2:egret.Point,  pnt3:egret.Point):Array<number> {
			let k:number = this.getKBFromTwoPoint(pnt1, pnt2)[0];
			let lineB:number = pnt3.y - k * pnt3.x;
			let yy:number = 0;
			let xx:number = -1 * lineB / k;
			let yy2:number = 640;
			let xx2:number = (yy2 - lineB) / k;
			g.lineStyle(1, 0x979797);
			g.moveTo(pnt3.x, pnt3.y);
			g.lineTo(xx, yy);
			g.moveTo(pnt3.x, pnt3.y);
			g.lineTo(xx2, yy2);
			return [k, lineB];
		}

		static getKBFromTwoPoint(pnt1:egret.Point, pnt2:egret.Point):Array<number> {
			let funB:number = (pnt2.x * pnt1.y - pnt1.x * pnt2.y) / (pnt2.x - pnt1.x);
			let k:number = (pnt2.y - funB) / pnt2.x;
			return [k, funB];
		}

		/**
		 * 获取相对于k b的垂线k b
		 */
		// static getVerticalLineKAndB(k:number, b:number):Array<number> {
		// 	let funBT:number = funY + funX / k;
		// 	let funXT:number = k * (funBT - b) / (Math.pow(k, 2) + 1);
		// 	let funYT:number = (Math.pow(k, 2) * (funBT - b)) / (Math.pow(k, 2) + 1) + b;
		// }

		/**
		 * 带箭头的线
		 */
		static drawArrowWithVector(g:egret.Graphics, pnt1:egret.Point, pnt2:egret.Point):void {
				//箭头长度
				var len:number = 10;
				//箭头与直线的夹角
				var _a:number = 30;
				var x1:number = pnt1.x;
				var y1:number = pnt1.y;
				var x2:number = pnt2.x;
				var y2:number = pnt2.y;
				var angle:number = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
				g.lineStyle(5, 0xff5566);
				g.moveTo(x2, y2);
				g.lineTo(x2 + len * Math.cos((angle - _a) * (Math.PI / 180)), y2 + len * Math.sin((angle - _a) * (Math.PI / 180)));
				g.moveTo(x2, y2);
				g.lineTo(x2 + len * Math.cos((angle + _a) * (Math.PI / 180)), y2 + len * Math.sin((angle + _a) * (Math.PI / 180)));
				g.moveTo(x1, y1);
				g.lineTo(x2, y2);   
		}

		/**
		 * color 填充色 
		 * r 半径
		 * pnt 圆心 
		 * pntAngle 旋转角度所在点 
		 */
		static drawFan(g:egret.Graphics, color:number, r:number, startFrom:number, pnt:egret.Point): void {
			g.beginFill(color,50);
			g.lineStyle(0,0xff0000);
			g.moveTo(pnt.x, pnt.y);
			let angle:number = 0;
			angle = (Math.abs(angle) > 360) ? 360 : angle;
			let n:number = Math.ceil(Math.abs(angle) / 45);
			let angleA:number = angle / n;
			angleA = angleA * Math.PI / 180;
			startFrom = startFrom * Math.PI / 180;
			g.lineTo(pnt.x + r * Math.cos(startFrom), pnt.y + r * Math.sin(startFrom));
			for (let i = 1; i <= n; i++) {
				startFrom += angleA;
				let angleMid = startFrom - angleA / 2;
				let bx = pnt.x + r / Math.cos(angleA / 2) * Math.cos(angleMid);
				let by = pnt.y + r / Math.cos(angleA / 2) * Math.sin(angleMid);
				let cx = pnt.x + r * Math.cos(startFrom);
				let cy = pnt.y + r * Math.sin(startFrom);
				g.curveTo(bx, by, cx, cy);
			}
			if (angle != 360) {
				g.lineTo(pnt.x, pnt.y);
			}
			g.endFill();
		}
	}
}