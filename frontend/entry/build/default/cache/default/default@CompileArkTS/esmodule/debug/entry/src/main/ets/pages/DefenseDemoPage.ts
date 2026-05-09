if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DefenseDemoPage_Params {
    state?: PageLoadState;
    scenarios?: DefenseDemoScenario[];
    runningId?: string;
    resultTitle?: string;
    resultSummary?: string;
    resultDetail?: string;
    resultStatus?: PortalStatus;
    resultTime?: string;
    logs?: DefenseDemoLog[];
}
import promptAction from "@ohos:promptAction";
import { PageTitleBar } from "@bundle:com.example.campusauth/entry/ets/components/PageTitleBar";
import { SectionHeader } from "@bundle:com.example.campusauth/entry/ets/components/SectionHeader";
import { StatePanel } from "@bundle:com.example.campusauth/entry/ets/components/StatePanel";
import type { DefenseDemoLog, DefenseDemoResult, DefenseDemoScenario, PageLoadState, PortalStatus } from '../models/CampusPortal';
import { PortalMockService } from "@bundle:com.example.campusauth/entry/ets/services/PortalMockService";
import { AppColors, AppLayout } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
class DefenseDemoPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__state = new ObservedPropertySimplePU('loading', this, "state");
        this.__scenarios = new ObservedPropertyObjectPU([], this, "scenarios");
        this.__runningId = new ObservedPropertySimplePU('', this, "runningId");
        this.__resultTitle = new ObservedPropertySimplePU('等待演示', this, "resultTitle");
        this.__resultSummary = new ObservedPropertySimplePU('请选择一个演示动作，系统会模拟认证链路、日志和结果。', this, "resultSummary");
        this.__resultDetail = new ObservedPropertySimplePU('演示模式只使用 Mock 数据，不依赖真实设备、门禁或考勤硬件。', this, "resultDetail");
        this.__resultStatus = new ObservedPropertySimplePU('info', this, "resultStatus");
        this.__resultTime = new ObservedPropertySimplePU('--:--:--', this, "resultTime");
        this.__logs = new ObservedPropertyObjectPU([], this, "logs");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DefenseDemoPage_Params) {
        if (params.state !== undefined) {
            this.state = params.state;
        }
        if (params.scenarios !== undefined) {
            this.scenarios = params.scenarios;
        }
        if (params.runningId !== undefined) {
            this.runningId = params.runningId;
        }
        if (params.resultTitle !== undefined) {
            this.resultTitle = params.resultTitle;
        }
        if (params.resultSummary !== undefined) {
            this.resultSummary = params.resultSummary;
        }
        if (params.resultDetail !== undefined) {
            this.resultDetail = params.resultDetail;
        }
        if (params.resultStatus !== undefined) {
            this.resultStatus = params.resultStatus;
        }
        if (params.resultTime !== undefined) {
            this.resultTime = params.resultTime;
        }
        if (params.logs !== undefined) {
            this.logs = params.logs;
        }
    }
    updateStateVars(params: DefenseDemoPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__state.purgeDependencyOnElmtId(rmElmtId);
        this.__scenarios.purgeDependencyOnElmtId(rmElmtId);
        this.__runningId.purgeDependencyOnElmtId(rmElmtId);
        this.__resultTitle.purgeDependencyOnElmtId(rmElmtId);
        this.__resultSummary.purgeDependencyOnElmtId(rmElmtId);
        this.__resultDetail.purgeDependencyOnElmtId(rmElmtId);
        this.__resultStatus.purgeDependencyOnElmtId(rmElmtId);
        this.__resultTime.purgeDependencyOnElmtId(rmElmtId);
        this.__logs.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__state.aboutToBeDeleted();
        this.__scenarios.aboutToBeDeleted();
        this.__runningId.aboutToBeDeleted();
        this.__resultTitle.aboutToBeDeleted();
        this.__resultSummary.aboutToBeDeleted();
        this.__resultDetail.aboutToBeDeleted();
        this.__resultStatus.aboutToBeDeleted();
        this.__resultTime.aboutToBeDeleted();
        this.__logs.aboutToBeDeleted();
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
    private __scenarios: ObservedPropertyObjectPU<DefenseDemoScenario[]>;
    get scenarios() {
        return this.__scenarios.get();
    }
    set scenarios(newValue: DefenseDemoScenario[]) {
        this.__scenarios.set(newValue);
    }
    private __runningId: ObservedPropertySimplePU<string>;
    get runningId() {
        return this.__runningId.get();
    }
    set runningId(newValue: string) {
        this.__runningId.set(newValue);
    }
    private __resultTitle: ObservedPropertySimplePU<string>;
    get resultTitle() {
        return this.__resultTitle.get();
    }
    set resultTitle(newValue: string) {
        this.__resultTitle.set(newValue);
    }
    private __resultSummary: ObservedPropertySimplePU<string>;
    get resultSummary() {
        return this.__resultSummary.get();
    }
    set resultSummary(newValue: string) {
        this.__resultSummary.set(newValue);
    }
    private __resultDetail: ObservedPropertySimplePU<string>;
    get resultDetail() {
        return this.__resultDetail.get();
    }
    set resultDetail(newValue: string) {
        this.__resultDetail.set(newValue);
    }
    private __resultStatus: ObservedPropertySimplePU<PortalStatus>;
    get resultStatus() {
        return this.__resultStatus.get();
    }
    set resultStatus(newValue: PortalStatus) {
        this.__resultStatus.set(newValue);
    }
    private __resultTime: ObservedPropertySimplePU<string>;
    get resultTime() {
        return this.__resultTime.get();
    }
    set resultTime(newValue: string) {
        this.__resultTime.set(newValue);
    }
    private __logs: ObservedPropertyObjectPU<DefenseDemoLog[]>;
    get logs() {
        return this.__logs.get();
    }
    set logs(newValue: DefenseDemoLog[]) {
        this.__logs.set(newValue);
    }
    aboutToAppear(): void {
        this.scenarios = PortalMockService.defenseDemoScenarios();
        this.state = this.scenarios.length === 0 ? 'empty' : 'ready';
    }
    private runScenario(item: DefenseDemoScenario): void {
        if (this.runningId.length > 0) {
            promptAction.showToast({ message: '演示正在执行，请稍候' });
            return;
        }
        this.runningId = item.id;
        this.resultTitle = '正在执行演示';
        this.resultSummary = item.title;
        this.resultDetail = '正在模拟设备发现、风险评估、权限判断和结果同步...';
        this.resultStatus = item.status;
        this.resultTime = '执行中';
        setTimeout(() => {
            const result: DefenseDemoResult = PortalMockService.defenseDemoResult(item.id);
            this.resultTitle = result.title;
            this.resultSummary = result.summary;
            this.resultDetail = result.detail;
            this.resultStatus = result.status;
            this.resultTime = result.timestamp;
            const logItem: DefenseDemoLog = {
                id: `${item.id}-${Date.now()}`,
                scenarioTitle: item.title,
                message: result.detail,
                result: result.summary,
                timestamp: result.timestamp,
                status: result.status
            };
            this.logs = [logItem].concat(this.logs);
            this.runningId = '';
            promptAction.showToast({ message: result.title });
        }, 650);
    }
    private colorOf(status: PortalStatus): string {
        if (status === 'success') {
            return AppColors.success;
        }
        if (status === 'warning') {
            return AppColors.warning;
        }
        if (status === 'danger') {
            return AppColors.danger;
        }
        return AppColors.primary;
    }
    private buttonText(item: DefenseDemoScenario): string {
        if (this.runningId === item.id) {
            return '执行中...';
        }
        return item.buttonText;
    }
    ScenarioCard(item: DefenseDemoScenario, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.width('100%');
            Column.padding(14);
            Column.backgroundColor(AppColors.surface);
            Column.borderRadius(8);
            Column.border({ width: 1, color: this.colorOf(item.status) });
            Column.shadow({ radius: 10, color: '#120F5068', offsetX: 0, offsetY: 4 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.marker);
            Text.fontSize(15);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.textAlign(TextAlign.Center);
            Text.width(42);
            Text.height(42);
            Text.backgroundColor(this.colorOf(item.status));
            Text.borderRadius(8);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
            Column.margin({ left: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.title);
            Text.fontSize(17);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(AppColors.text);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.subtitle);
            Text.fontSize(12);
            Text.fontColor(AppColors.muted);
            Text.lineHeight(18);
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.buttonText(item));
            Button.width('100%');
            Button.height(42);
            Button.fontSize(14);
            Button.fontWeight(FontWeight.Medium);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor(this.runningId.length > 0 && this.runningId !== item.id ? AppColors.borderStrong : this.colorOf(item.status));
            Button.borderRadius(8);
            Button.onClick(() => this.runScenario(item));
        }, Button);
        Button.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.backgroundColor(AppColors.background);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 18 });
            Column.width('100%');
            Column.constraintSize({ maxWidth: AppLayout.pageMaxWidth });
            Column.alignSelf(ItemAlign.Center);
            Column.padding({ left: AppLayout.pagePadding, right: AppLayout.pagePadding, bottom: 30 });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PageTitleBar(this, { title: '答辩演示模式', subtitle: '一键模拟无感身份认证核心场景，适合现场演示' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DefenseDemoPage.ets", line: 135, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '答辩演示模式',
                            subtitle: '一键模拟无感身份认证核心场景，适合现场演示'
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
            Column.create({ space: 10 });
            Column.width('100%');
            Column.padding(18);
            Column.backgroundColor(this.colorOf(this.resultStatus));
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.resultTitle);
            Text.fontSize(22);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.resultTime);
            Text.fontSize(13);
            Text.fontColor('#D7EEF7');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.resultSummary);
            Text.fontSize(15);
            Text.fontColor('#EAF7F0');
            Text.lineHeight(22);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.resultDetail);
            Text.fontSize(13);
            Text.fontColor('#D7EEF7');
            Text.lineHeight(20);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.state !== 'ready') {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new StatePanel(this, { state: this.state, emptyText: '暂无演示动作', errorText: '演示模式加载失败' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DefenseDemoPage.ets", line: 163, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        state: this.state,
                                        emptyText: '暂无演示动作',
                                        errorText: '演示模式加载失败'
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
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new SectionHeader(this, { title: '一键演示动作', subtitle: '建议从上到下按场景顺序演示' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DefenseDemoPage.ets", line: 165, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        title: '一键演示动作',
                                        subtitle: '建议从上到下按场景顺序演示'
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Grid.create();
                        Grid.columnsTemplate('1fr 1fr');
                        Grid.columnsGap(12);
                        Grid.rowsGap(12);
                    }, Grid);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            {
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    GridItem.create(() => { }, false);
                                };
                                const observedDeepRender = () => {
                                    this.observeComponentCreation2(itemCreation2, GridItem);
                                    this.ScenarioCard.bind(this)(item);
                                    GridItem.pop();
                                };
                                observedDeepRender();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.scenarios, forEachItemGenFunction, (item: DefenseDemoScenario): string => item.id, false, false);
                    }, ForEach);
                    ForEach.pop();
                    Grid.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.width('100%');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SectionHeader(this, { title: '演示日志', subtitle: '每次点击都会写入一条 Mock 日志，便于答辩追踪' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DefenseDemoPage.ets", line: 179, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '演示日志',
                            subtitle: '每次点击都会写入一条 Mock 日志，便于答辩追踪'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "SectionHeader" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.logs.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new StatePanel(this, { state: 'empty', emptyText: '尚未执行演示动作' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DefenseDemoPage.ets", line: 181, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        state: 'empty',
                                        emptyText: '尚未执行演示动作'
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
                                Column.border({ width: 1, color: this.colorOf(item.status) });
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(item.scenarioTitle);
                                Text.fontSize(16);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor(AppColors.text);
                                Text.layoutWeight(1);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(item.timestamp);
                                Text.fontSize(12);
                                Text.fontColor(AppColors.muted);
                            }, Text);
                            Text.pop();
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(item.result);
                                Text.fontSize(13);
                                Text.fontColor(this.colorOf(item.status));
                                Text.lineHeight(19);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(item.message);
                                Text.fontSize(12);
                                Text.fontColor(AppColors.muted);
                                Text.lineHeight(18);
                            }, Text);
                            Text.pop();
                            Column.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.logs, forEachItemGenFunction, (item: DefenseDemoLog): string => item.id, false, false);
                    }, ForEach);
                    ForEach.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "DefenseDemoPage";
    }
}
registerNamedRoute(() => new DefenseDemoPage(undefined, {}), "", { bundleName: "com.example.campusauth", moduleName: "entry", pagePath: "pages/DefenseDemoPage", pageFullPath: "entry/src/main/ets/pages/DefenseDemoPage", integratedHsp: "false", moduleType: "followWithHap" });
