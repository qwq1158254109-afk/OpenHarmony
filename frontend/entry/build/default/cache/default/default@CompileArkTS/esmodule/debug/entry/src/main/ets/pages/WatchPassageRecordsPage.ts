if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WatchPassageRecordsPage_Params {
    state?: PageLoadState;
    records?: PassageRecordItem[];
}
import { PageTitleBar } from "@bundle:com.example.campusauth/entry/ets/components/PageTitleBar";
import { StatePanel } from "@bundle:com.example.campusauth/entry/ets/components/StatePanel";
import { StatusBadge } from "@bundle:com.example.campusauth/entry/ets/components/StatusBadge";
import type { PageLoadState, PassageRecordItem } from '../models/CampusPortal';
import { PortalMockService } from "@bundle:com.example.campusauth/entry/ets/services/PortalMockService";
import { AppColors, AppLayout } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
class WatchPassageRecordsPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__state = new ObservedPropertySimplePU('loading', this, "state");
        this.__records = new ObservedPropertyObjectPU([], this, "records");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WatchPassageRecordsPage_Params) {
        if (params.state !== undefined) {
            this.state = params.state;
        }
        if (params.records !== undefined) {
            this.records = params.records;
        }
    }
    updateStateVars(params: WatchPassageRecordsPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__state.purgeDependencyOnElmtId(rmElmtId);
        this.__records.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__state.aboutToBeDeleted();
        this.__records.aboutToBeDeleted();
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
    private __records: ObservedPropertyObjectPU<PassageRecordItem[]>;
    get records() {
        return this.__records.get();
    }
    set records(newValue: PassageRecordItem[]) {
        this.__records.set(newValue);
    }
    aboutToAppear(): void {
        this.records = PortalMockService.passageRecords().filter((item: PassageRecordItem) => item.deviceId.includes('watch'));
        this.state = this.records.length === 0 ? 'empty' : 'ready';
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
                    let componentCall = new PageTitleBar(this, { title: '手表端通行记录', subtitle: '查看手表近场认证反馈' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/WatchPassageRecordsPage.ets", line: 22, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '手表端通行记录',
                            subtitle: '查看手表近场认证反馈'
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
                                let componentCall = new StatePanel(this, { state: this.state, emptyText: '暂无手表通行记录', errorText: '通行记录加载失败' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/WatchPassageRecordsPage.ets", line: 24, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        state: this.state,
                                        emptyText: '暂无手表通行记录',
                                        errorText: '通行记录加载失败'
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
                                Column.create({ space: 8 });
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
                                Text.create(item.place);
                                Text.fontSize(16);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor(AppColors.text);
                                Text.layoutWeight(1);
                            }, Text);
                            Text.pop();
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new StatusBadge(this, { text: item.result, status: item.riskLevel === 'high' ? 'failed' : 'success' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/WatchPassageRecordsPage.ets", line: 34, col: 17 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                text: item.result,
                                                status: item.riskLevel === 'high' ? 'failed' : 'success'
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "StatusBadge" });
                            }
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`${item.time} · ${item.deviceId}`);
                                Text.fontSize(12);
                                Text.fontColor(AppColors.muted);
                            }, Text);
                            Text.pop();
                            Column.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.records, forEachItemGenFunction, (item: PassageRecordItem): string => item.id, false, false);
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
        return "WatchPassageRecordsPage";
    }
}
registerNamedRoute(() => new WatchPassageRecordsPage(undefined, {}), "", { bundleName: "com.example.campusauth", moduleName: "entry", pagePath: "pages/WatchPassageRecordsPage", pageFullPath: "entry/src/main/ets/pages/WatchPassageRecordsPage", integratedHsp: "false", moduleType: "followWithHap" });
