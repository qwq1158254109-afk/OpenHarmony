if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AdminAttendanceStatsPage_Params {
    state?: PageLoadState;
    metrics?: AttendanceMetric[];
}
import { PageTitleBar } from "@bundle:com.example.campusauth/entry/ets/components/PageTitleBar";
import { StatePanel } from "@bundle:com.example.campusauth/entry/ets/components/StatePanel";
import type { AttendanceMetric, PageLoadState } from '../models/CampusPortal';
import { PortalMockService } from "@bundle:com.example.campusauth/entry/ets/services/PortalMockService";
import { AppColors, AppLayout } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
class AdminAttendanceStatsPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__state = new ObservedPropertySimplePU('loading', this, "state");
        this.__metrics = new ObservedPropertyObjectPU([], this, "metrics");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AdminAttendanceStatsPage_Params) {
        if (params.state !== undefined) {
            this.state = params.state;
        }
        if (params.metrics !== undefined) {
            this.metrics = params.metrics;
        }
    }
    updateStateVars(params: AdminAttendanceStatsPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__state.purgeDependencyOnElmtId(rmElmtId);
        this.__metrics.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__state.aboutToBeDeleted();
        this.__metrics.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __state: ObservedPropertySimplePU<PageLoadState>;
    get state() {
        return this.__state.get();
    }
    set state(newValue: PageLoadState) {
        this.__state.set(newValue);
    }
    private __metrics: ObservedPropertyObjectPU<AttendanceMetric[]>;
    get metrics() {
        return this.__metrics.get();
    }
    set metrics(newValue: AttendanceMetric[]) {
        this.__metrics.set(newValue);
    }
    aboutToAppear(): void {
        this.metrics = PortalMockService.attendanceMetrics();
        this.state = this.metrics.length === 0 ? 'empty' : 'ready';
    }
    private rate(item: AttendanceMetric): number {
        return item.total === 0 ? 0 : Math.round(item.attended * 100 / item.total);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.backgroundColor(AppColors.background);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.width('100%');
            Column.constraintSize({ maxWidth: AppLayout.pageMaxWidth });
            Column.alignSelf(ItemAlign.Center);
            Column.padding({ left: AppLayout.pagePadding, right: AppLayout.pagePadding, bottom: 30 });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PageTitleBar(this, { title: '管理员出勤统计', subtitle: '管理员视角汇总课程出勤和异常缺勤' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AdminAttendanceStatsPage.ets", line: 25, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '管理员出勤统计',
                            subtitle: '管理员视角汇总课程出勤和异常缺勤'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "PageTitleBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.state !== 'ready') {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new StatePanel(this, { state: this.state, emptyText: '暂无出勤统计', errorText: '出勤统计加载失败' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AdminAttendanceStatsPage.ets", line: 27, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        state: this.state,
                                        emptyText: '暂无出勤统计',
                                        errorText: '出勤统计加载失败'
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "StatePanel" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.width('100%');
                                Row.padding(14);
                                Row.backgroundColor(AppColors.surface);
                                Row.borderRadius(8);
                                Row.border({ width: 1, color: AppColors.border });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.alignItems(HorizontalAlign.Start);
                                Column.layoutWeight(1);
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(item.course);
                                Text.fontSize(17);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor(AppColors.text);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`出勤 ${item.attended}/${item.total} · 最近 ${item.latestTime}`);
                                Text.fontSize(12);
                                Text.fontColor(AppColors.muted);
                                Text.margin({ top: 4 });
                            }, Text);
                            Text.pop();
                            Column.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`${this.rate(item)}%`);
                                Text.fontSize(24);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor(this.rate(item) >= 90 ? AppColors.success : AppColors.warning);
                            }, Text);
                            Text.pop();
                            Row.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.metrics, forEachItemGenFunction, (item: AttendanceMetric): string => item.id, false, false);
                    }, ForEach);
                    ForEach.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "AdminAttendanceStatsPage";
    }
}
registerNamedRoute(() => new AdminAttendanceStatsPage(undefined, {}), "", { bundleName: "com.example.campusauth", moduleName: "entry", pagePath: "pages/AdminAttendanceStatsPage", pageFullPath: "entry/src/main/ets/pages/AdminAttendanceStatsPage", integratedHsp: "false", moduleType: "followWithHap" });
