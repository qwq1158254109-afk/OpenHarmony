if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface OverviewPage_Params {
    state?: PageLoadState;
    user?: UserProfile;
    stats?: PortalStat[];
    studentActions?: PortalAction[];
    watchActions?: PortalAction[];
    terminalActions?: PortalAction[];
    adminActions?: PortalAction[];
    demoActions?: PortalAction[];
}
import router from "@ohos:router";
import promptAction from "@ohos:promptAction";
import { FeatureCard } from "@bundle:com.example.campusauth/entry/ets/components/FeatureCard";
import { SectionHeader } from "@bundle:com.example.campusauth/entry/ets/components/SectionHeader";
import { StatePanel } from "@bundle:com.example.campusauth/entry/ets/components/StatePanel";
import { StatCard } from "@bundle:com.example.campusauth/entry/ets/components/StatCard";
import type { PageLoadState, PortalAction, PortalStat } from '../models/CampusPortal';
import type { UserProfile } from '../models/User';
import { AuthSessionService } from "@bundle:com.example.campusauth/entry/ets/services/AuthSessionService";
import { MockData } from "@bundle:com.example.campusauth/entry/ets/services/MockData";
import { PortalMockService } from "@bundle:com.example.campusauth/entry/ets/services/PortalMockService";
import { AppColors, AppLayout, AppRoutes } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
import { FormatUtil } from "@bundle:com.example.campusauth/entry/ets/utils/FormatUtil";
class OverviewPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__state = new ObservedPropertySimplePU('loading', this, "state");
        this.__user = new ObservedPropertyObjectPU(MockData.users[0], this, "user");
        this.__stats = new ObservedPropertyObjectPU([], this, "stats");
        this.__studentActions = new ObservedPropertyObjectPU([], this, "studentActions");
        this.__watchActions = new ObservedPropertyObjectPU([], this, "watchActions");
        this.__terminalActions = new ObservedPropertyObjectPU([], this, "terminalActions");
        this.__adminActions = new ObservedPropertyObjectPU([], this, "adminActions");
        this.__demoActions = new ObservedPropertyObjectPU([], this, "demoActions");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: OverviewPage_Params) {
        if (params.state !== undefined) {
            this.state = params.state;
        }
        if (params.user !== undefined) {
            this.user = params.user;
        }
        if (params.stats !== undefined) {
            this.stats = params.stats;
        }
        if (params.studentActions !== undefined) {
            this.studentActions = params.studentActions;
        }
        if (params.watchActions !== undefined) {
            this.watchActions = params.watchActions;
        }
        if (params.terminalActions !== undefined) {
            this.terminalActions = params.terminalActions;
        }
        if (params.adminActions !== undefined) {
            this.adminActions = params.adminActions;
        }
        if (params.demoActions !== undefined) {
            this.demoActions = params.demoActions;
        }
    }
    updateStateVars(params: OverviewPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__state.purgeDependencyOnElmtId(rmElmtId);
        this.__user.purgeDependencyOnElmtId(rmElmtId);
        this.__stats.purgeDependencyOnElmtId(rmElmtId);
        this.__studentActions.purgeDependencyOnElmtId(rmElmtId);
        this.__watchActions.purgeDependencyOnElmtId(rmElmtId);
        this.__terminalActions.purgeDependencyOnElmtId(rmElmtId);
        this.__adminActions.purgeDependencyOnElmtId(rmElmtId);
        this.__demoActions.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__state.aboutToBeDeleted();
        this.__user.aboutToBeDeleted();
        this.__stats.aboutToBeDeleted();
        this.__studentActions.aboutToBeDeleted();
        this.__watchActions.aboutToBeDeleted();
        this.__terminalActions.aboutToBeDeleted();
        this.__adminActions.aboutToBeDeleted();
        this.__demoActions.aboutToBeDeleted();
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
    private __user: ObservedPropertyObjectPU<UserProfile>;
    get user() {
        return this.__user.get();
    }
    set user(newValue: UserProfile) {
        this.__user.set(newValue);
    }
    private __stats: ObservedPropertyObjectPU<PortalStat[]>;
    get stats() {
        return this.__stats.get();
    }
    set stats(newValue: PortalStat[]) {
        this.__stats.set(newValue);
    }
    private __studentActions: ObservedPropertyObjectPU<PortalAction[]>;
    get studentActions() {
        return this.__studentActions.get();
    }
    set studentActions(newValue: PortalAction[]) {
        this.__studentActions.set(newValue);
    }
    private __watchActions: ObservedPropertyObjectPU<PortalAction[]>;
    get watchActions() {
        return this.__watchActions.get();
    }
    set watchActions(newValue: PortalAction[]) {
        this.__watchActions.set(newValue);
    }
    private __terminalActions: ObservedPropertyObjectPU<PortalAction[]>;
    get terminalActions() {
        return this.__terminalActions.get();
    }
    set terminalActions(newValue: PortalAction[]) {
        this.__terminalActions.set(newValue);
    }
    private __adminActions: ObservedPropertyObjectPU<PortalAction[]>;
    get adminActions() {
        return this.__adminActions.get();
    }
    set adminActions(newValue: PortalAction[]) {
        this.__adminActions.set(newValue);
    }
    private __demoActions: ObservedPropertyObjectPU<PortalAction[]>;
    get demoActions() {
        return this.__demoActions.get();
    }
    set demoActions(newValue: PortalAction[]) {
        this.__demoActions.set(newValue);
    }
    aboutToAppear(): void {
        const currentUser = AuthSessionService.currentUser();
        if (!AuthSessionService.isLoggedIn() || !currentUser) {
            router.replaceUrl({ url: AppRoutes.login });
            return;
        }
        this.user = currentUser;
        this.stats = PortalMockService.overviewStats();
        this.studentActions = PortalMockService.studentActions();
        this.watchActions = PortalMockService.watchActions();
        this.terminalActions = PortalMockService.terminalActions();
        this.adminActions = PortalMockService.adminActions();
        this.demoActions = PortalMockService.demoActions();
        this.state = this.stats.length === 0 ? 'empty' : 'ready';
    }
    private go(url: string): void {
        router.pushUrl({ url });
    }
    private colorOf(status: string): string {
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
    private logout(): void {
        AlertDialog.show({
            title: '确认退出',
            message: '确定要退出当前账号吗？',
            primaryButton: { value: '取消', action: () => { } },
            secondaryButton: {
                value: '确认退出',
                fontColor: AppColors.danger,
                action: () => {
                    AuthSessionService.clearLogin();
                    promptAction.showToast({ message: '已退出登录' });
                    router.replaceUrl({ url: AppRoutes.login });
                }
            }
        });
    }
    ActionGrid(title: string, subtitle: string, actions: PortalAction[], parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.width('100%');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SectionHeader(this, { title: title, subtitle: subtitle }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/OverviewPage.ets", line: 80, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: title,
                            subtitle: subtitle
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
            if (actions.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new StatePanel(this, { state: 'empty', emptyText: '暂无可用功能' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/OverviewPage.ets", line: 82, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        state: 'empty',
                                        emptyText: '暂无可用功能'
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
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        __Common__.create();
                                        __Common__.onClick(() => this.go(item.route));
                                    }, __Common__);
                                    {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            if (isInitialRender) {
                                                let componentCall = new FeatureCard(this, {
                                                    title: item.title,
                                                    subtitle: item.subtitle,
                                                    marker: item.marker,
                                                    active: item.status === 'success'
                                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/OverviewPage.ets", line: 87, col: 15 });
                                                ViewPU.create(componentCall);
                                                let paramsLambda = () => {
                                                    return {
                                                        title: item.title,
                                                        subtitle: item.subtitle,
                                                        marker: item.marker,
                                                        active: item.status === 'success'
                                                    };
                                                };
                                                componentCall.paramsGenerator_ = paramsLambda;
                                            }
                                            else {
                                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                                            }
                                        }, { name: "FeatureCard" });
                                    }
                                    __Common__.pop();
                                    GridItem.pop();
                                };
                                observedDeepRender();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, actions, forEachItemGenFunction, (item: PortalAction): string => item.title, false, false);
                    }, ForEach);
                    ForEach.pop();
                    Grid.pop();
                });
            }
        }, If);
        If.pop();
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(18);
            Row.backgroundColor(AppColors.hero);
            Row.borderRadius(8);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('校园分布式无感身份认证系统');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.user.name} · ${this.user.account} · ${FormatUtil.roleLabel(this.user.role)}`);
            Text.fontSize(13);
            Text.fontColor('#D7EEF7');
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('退出登录');
            Button.height(36);
            Button.fontSize(13);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor('#2D9CDB');
            Button.borderRadius(8);
            Button.onClick(() => this.logout());
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.state !== 'ready') {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new StatePanel(this, { state: this.state, emptyText: '暂无首页数据', errorText: '首页数据加载失败' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/OverviewPage.ets", line: 135, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        state: this.state,
                                        emptyText: '暂无首页数据',
                                        errorText: '首页数据加载失败'
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
                        Grid.create();
                        Grid.columnsTemplate('1fr 1fr');
                        Grid.columnsGap(12);
                        Grid.rowsGap(12);
                        Grid.height(264);
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
                                    {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            if (isInitialRender) {
                                                let componentCall = new StatCard(this, { title: item.title, value: item.value, hint: item.hint, color: this.colorOf(item.status) }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/OverviewPage.ets", line: 140, col: 17 });
                                                ViewPU.create(componentCall);
                                                let paramsLambda = () => {
                                                    return {
                                                        title: item.title,
                                                        value: item.value,
                                                        hint: item.hint,
                                                        color: this.colorOf(item.status)
                                                    };
                                                };
                                                componentCall.paramsGenerator_ = paramsLambda;
                                            }
                                            else {
                                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                                            }
                                        }, { name: "StatCard" });
                                    }
                                    GridItem.pop();
                                };
                                observedDeepRender();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.stats, forEachItemGenFunction, (item: PortalStat): string => item.title, false, false);
                    }, ForEach);
                    ForEach.pop();
                    Grid.pop();
                    this.ActionGrid.bind(this)('学生端', '实名认证、设备绑定、权限设置、通行与考勤', ObservedObject.GetRawObject(this.studentActions));
                    this.ActionGrid.bind(this)('答辩演示', '现场演示用一键模拟流程，不依赖真实设备', ObservedObject.GetRawObject(this.demoActions));
                    this.ActionGrid.bind(this)('手表端', '面向轻量设备的今日考勤和通行反馈', ObservedObject.GetRawObject(this.watchActions));
                    this.ActionGrid.bind(this)('校园终端端', '终端备案与实时认证大屏', ObservedObject.GetRawObject(this.terminalActions));
                    this.ActionGrid.bind(this)('管理员端', '出勤、权限、门禁规则与黑名单治理', ObservedObject.GetRawObject(this.adminActions));
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
        return "OverviewPage";
    }
}
registerNamedRoute(() => new OverviewPage(undefined, {}), "", { bundleName: "com.example.campusauth", moduleName: "entry", pagePath: "pages/OverviewPage", pageFullPath: "entry/src/main/ets/pages/OverviewPage", integratedHsp: "false", moduleType: "followWithHap" });
