if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AttendanceStatsPage_Params {
    state?: PageLoadState;
    metrics?: AttendanceMetric[];
}
import { PageTitleBar } from "@bundle:com.example.campusauth/entry/ets/components/PageTitleBar";
import { StatePanel } from "@bundle:com.example.campusauth/entry/ets/components/StatePanel";
import type { AttendanceMetric, PageLoadState } from '../models/CampusPortal';
import { PortalMockService } from "@bundle:com.example.campusauth/entry/ets/services/PortalMockService";
import { AppColors, AppLayout } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
class AttendanceStatsPage extends ViewPU {
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
    setInitiallyProvidedValue(params: AttendanceStatsPage_Params) {
        if (params.state !== undefined) {
            this.state = params.state;
        }
        if (params.metrics !== undefined) {
            this.metrics = params.metrics;
        }
    }
    updateStateVars(params: AttendanceStatsPage_Params) {
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
        if (item.total === 0) {
            return 0;
        }
        return Math.round(item.attended * 100 / item.total);
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
                    let componentCall = new PageTitleBar(this, { title: '考勤统计', subtitle: '按课程展示学生到课率和最近签到时间' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AttendanceStatsPage.ets", line: 28, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '考勤统计',
                            subtitle: '按课程展示学生到课率和最近签到时间'
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
                                let componentCall = new StatePanel(this, { state: this.state, emptyText: '暂无考勤数据', errorText: '考勤数据加载失败' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AttendanceStatsPage.ets", line: 30, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        state: this.state,
                                        emptyText: '暂无考勤数据',
                                        errorText: '考勤数据加载失败'
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
                                Column.create({ space: 10 });
                                Column.width('100%');
                                Column.padding(14);
                                Column.backgroundColor(AppColors.surface);
                                Column.borderRadius(8);
                                Column.border({ width: 1, color: AppColors.border });
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(item.course);
                                Text.fontSize(17);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor(AppColors.text);
                                Text.layoutWeight(1);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`${this.rate(item)}%`);
                                Text.fontSize(22);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor(this.rate(item) >= 90 ? AppColors.success : AppColors.warning);
                            }, Text);
                            Text.pop();
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Progress.create({ value: this.rate(item), total: 100, type: ProgressType.Linear });
                                Progress.color(this.rate(item) >= 90 ? AppColors.success : AppColors.warning);
                                Progress.height(8);
                            }, Progress);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`已签到 ${item.attended}/${item.total} · 最近 ${item.latestTime}`);
                                Text.fontSize(12);
                                Text.fontColor(AppColors.muted);
                            }, Text);
                            Text.pop();
                            Column.pop();
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
        return "AttendanceStatsPage";
    }
}
registerNamedRoute(() => new AttendanceStatsPage(undefined, {}), "", { bundleName: "com.example.campusauth", moduleName: "entry", pagePath: "pages/AttendanceStatsPage", pageFullPath: "entry/src/main/ets/pages/AttendanceStatsPage", integratedHsp: "false", moduleType: "followWithHap" });
