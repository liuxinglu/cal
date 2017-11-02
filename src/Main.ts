var Res = lxl.GlobalData.getInstance().resManager;
var Cal = app.CalManager.getInstance();
var Rank = app.RankManager.getInstance();
class Main extends lxl.Application {
    
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected start(cb:any, ctx:any): void {
        super.start(cb, ctx);
        lxl.GlobalData.getInstance().root = this;
        this.root = new app.MainSence();
        this.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;
        this.stage.orientation = egret.OrientationMode.LANDSCAPE;
        Cal.loadMasterData(cb, ctx);
    }
}
