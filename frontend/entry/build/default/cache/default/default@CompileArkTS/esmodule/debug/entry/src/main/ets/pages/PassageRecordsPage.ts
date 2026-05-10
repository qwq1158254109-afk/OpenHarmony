if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PassageRecordsPage_Params {
    state?: PageLoadState;
    records?: PassageRecordItem[];
    pageTitle?: string;
    pageSubtitle?: string;
}
import { PageTitleBar } from "@bundle:com.example.campusauth/entry/ets/components/PageTitleBar";
import { StatePanel } from "@bundle:com.example.campusauth/entry/ets/components/StatePanel";
import { StatusBadge } from "@bundle:com.example.campusauth/entry/ets/components/StatusBadge";
import type { PageLoadState, PassageRecordItem } from '../models/CampusPortal';
import type { UserProfile } from '../models/User';
import { AuthSessionService } from "@bundle:com.example.campusauth/entry/ets/services/AuthSessionService";
import { PortalMockService } from "@bundle:com.example.campusauth/entry/ets/services/PortalMockService";
import { AppColors, AppLayout, AppRoutes } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
import { FormatUtil } from "@bundle:com.example.campusauth/entry/ets/utils/FormatUtil";
import { PermissionUtil } from "@bundle:com.example.campusauth/entry/ets/utils/PermissionUtil";
class PassageRecordsPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__state = new ObservedPropertySimplePU('loading', this, "state");
        this.__records = new ObservedPropertyObjectPU([], this, "records");
        this.__pageTitle = new ObservedPropertySimplePU('我的认证记录', this, "pageTitle");
        this.__pageSubtitle = new ObservedPropertySimplePU('查看本人近期认证、通行、设备登录记录', this, "pageSubtitle");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PassageRecordsPage_Params) {
        if (params.state !== undefined) {
            this.state = params.state;
        }
        if (params.records !== undefined) {
            this.records = params.records;
        }
        if (params.pageTitle !== undefined) {
            this.pageTitle = params.pageTitle;
        }
        if (params.pageSubtitle !== undefined) {
            this.pageSubtitle = params.pageSubtitle;
        }
    }
    updateStateVars(params: PassageRecordsPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__state.purgeDependencyOnElmtId(rmElmtId);
        this.__records.purgeDependencyOnElmtId(rmElmtId);
        this.__pageTitle.purgeDependencyOnElmtId(rmElmtId);
        this.__pageSubtitle.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__state.aboutToBeDeleted();
        this.__records.aboutToBeDeleted();
        this.__pageTitle.aboutToBeDeleted();
        this.__pageSubtitle.aboutToBeDeleted();
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
    private __pageTitle: ObservedPropertySimplePU<string>;
    get pageTitle() {
        return this.__pageTitle.get();
    }
    set pageTitle(newValue: string) {
        this.__pageTitle.set(newValue);
    }
    private __pageSubtitle: ObservedPropertySimplePU<string>;
    get pageSubtitle() {
        return this.__pageSubtitle.get();
    }
    set pageSubtitle(newValue: string) {
        this.__pageSubtitle.set(newValue);
    }
    aboutToAppear(): void {
        if (!PermissionUtil.ensurePageAccess(AppRoutes.passageRecords)) {
            return;
        }
        const currentUser: UserProfile | undefined = AuthSessionService.currentUser();
        if (currentUser?.role === 'teacher') {
            this.pageTitle = '课堂签到记录';
            this.pageSubtitle = '查看任课班级教学场景签到与认证记录';
        }
        else if (currentUser?.role === 'admin') {
            this.pageTitle = '系统审计记录';
            this.pageSubtitle = '查看全局认证、通行和风险处置记录';
        }
        this.records = PortalMockService.passageRecords(currentUser);
        this.state = this.records.length === 0 ? 'empty' : 'ready';
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
                    let componentCall = new PageTitleBar(this, { title: this.pageTitle, subtitle: this.pageSubtitle }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/PassageRecordsPage.ets", line: 39, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: this.pageTitle,
                            subtitle: this.pageSubtitle
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
                                let componentCall = new StatePanel(this, { state: this.state, emptyText: '暂无通行记录', errorText: '通行记录加载失败' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/PassageRecordsPage.ets", line: 41, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        state: this.state,
                                        emptyText: '暂无通行记录',
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
                                Column.create({ space: 10 });
                                Column.width('100%');
                                Column.padding(14);
                                Column.backgroundColor(AppColors.surface);
                                Column.borderRadius(8);
                                Column.border({ width: 1, color: item.riskLevel === 'high' ? AppColors.danger : AppColors.border });
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(item.place);
                                Text.fontSize(17);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor(AppColors.text);
                                Text.layoutWeight(1);
                            }, Text);
                            Text.pop();
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new StatusBadge(this, { text: item.result, status: item.riskLevel === 'high' ? 'failed' : 'success' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/PassageRecordsPage.ets", line: 51, col: 17 });
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
                                Row.create({ space: 10 });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`学号：${item.studentId}`);
                                Text.fontSize(12);
                                Text.fontColor(AppColors.muted);
                                Text.layoutWeight(1);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`设备 ID：${item.deviceId}`);
                                Text.fontSize(12);
                                Text.fontColor(AppColors.muted);
                                Text.layoutWeight(1);
                            }, Text);
                            Text.pop();
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(item.time);
                                Text.fontSize(12);
                                Text.fontColor(AppColors.muted);
                                Text.layoutWeight(1);
                            }, Text);
                            Text.pop();
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new StatusBadge(this, { text: FormatUtil.riskLabel(item.riskLevel), status: item.riskLevel }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/PassageRecordsPage.ets", line: 68, col: 17 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                text: FormatUtil.riskLabel(item.riskLevel),
                                                status: item.riskLevel
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
        return "PassageRecordsPage";
    }
}
registerNamedRoute(() => new PassageRecordsPage(undefined, {}), "", { bundleName: "com.example.campusauth", moduleName: "entry", pagePath: "pages/PassageRecordsPage", pageFullPath: "entry/src/main/ets/pages/PassageRecordsPage", integratedHsp: "false", moduleType: "followWithHap" });
