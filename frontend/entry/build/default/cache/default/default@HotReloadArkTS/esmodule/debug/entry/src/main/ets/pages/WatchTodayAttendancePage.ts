if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WatchTodayAttendancePage_Params {
    state?: PageLoadState;
    items?: WatchAttendanceItem[];
}
import { PageTitleBar } from "@bundle:com.example.campusauth/entry/ets/components/PageTitleBar";
import { StatePanel } from "@bundle:com.example.campusauth/entry/ets/components/StatePanel";
import type { PageLoadState, WatchAttendanceItem } from '../models/CampusPortal';
import { PortalMockService } from "@bundle:com.example.campusauth/entry/ets/services/PortalMockService";
import { AppColors, AppLayout } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
class WatchTodayAttendancePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__state = new ObservedPropertySimplePU('loading', this, "state");
        this.__items = new ObservedPropertyObjectPU([], this, "items");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WatchTodayAttendancePage_Params) {
        if (params.state !== undefined) {
            this.state = params.state;
        }
        if (params.items !== undefined) {
            this.items = params.items;
        }
    }
    updateStateVars(params: WatchTodayAttendancePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__state.purgeDependencyOnElmtId(rmElmtId);
        this.__items.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__state.aboutToBeDeleted();
        this.__items.aboutToBeDeleted();
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
    private __items: ObservedPropertyObjectPU<WatchAttendanceItem[]>;
    get items() {
        return this.__items.get();
    }
    set items(newValue: WatchAttendanceItem[]) {
        this.__items.set(newValue);
    }
    aboutToAppear(): void {
        this.items = PortalMockService.watchAttendance();
        this.state = this.items.length === 0 ? 'empty' : 'ready';
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.backgroundColor(AppColors.background);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 14 });
            Column.width('100%');
            Column.constraintSize({ maxWidth: 520 });
            Column.alignSelf(ItemAlign.Center);
            Column.padding({ left: AppLayout.pagePadding, right: AppLayout.pagePadding, bottom: 30 });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PageTitleBar(this, { title: '手表端今日考勤', subtitle: '适配手表端的轻量考勤提醒' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/WatchTodayAttendancePage.ets", line: 21, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '手表端今日考勤',
                            subtitle: '适配手表端的轻量考勤提醒'
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
                                let componentCall = new StatePanel(this, { state: this.state, emptyText: '今日暂无考勤任务', errorText: '手表考勤加载失败' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/WatchTodayAttendancePage.ets", line: 23, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        state: this.state,
                                        emptyText: '今日暂无考勤任务',
                                        errorText: '手表考勤加载失败'
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
                                Text.create(item.time);
                                Text.fontSize(20);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor(AppColors.primary);
                                Text.width(64);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.alignItems(HorizontalAlign.Start);
                                Column.layoutWeight(1);
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(item.title);
                                Text.fontSize(16);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor(AppColors.text);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`${item.place} · ${item.status}`);
                                Text.fontSize(12);
                                Text.fontColor(item.status === '已签到' ? AppColors.success : AppColors.warning);
                                Text.margin({ top: 4 });
                            }, Text);
                            Text.pop();
                            Column.pop();
                            Row.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.items, forEachItemGenFunction, (item: WatchAttendanceItem): string => item.id, false, false);
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
        return "WatchTodayAttendancePage";
    }
}
registerNamedRoute(() => new WatchTodayAttendancePage(undefined, {}), "", { bundleName: "com.example.campusauth", moduleName: "entry", pagePath: "pages/WatchTodayAttendancePage", pageFullPath: "entry/src/main/ets/pages/WatchTodayAttendancePage", integratedHsp: "false", moduleType: "followWithHap" });
