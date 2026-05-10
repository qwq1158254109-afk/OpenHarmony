if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface OverviewPage_Params {
    state?: PageLoadState;
    user?: UserProfile;
    studentActions?: PortalAction[];
    teacherActions?: PortalAction[];
    watchActions?: PortalAction[];
    terminalActions?: PortalAction[];
    adminActions?: PortalAction[];
    demoActions?: PortalAction[];
    selectedCategory?: string;
    hoverServiceId?: string;
    selectedServiceId?: string;
    logoutHover?: boolean;
    serviceScroller?: Scroller;
}
import router from "@ohos:router";
import promptAction from "@ohos:promptAction";
import { CategoryTabs } from "@bundle:com.example.campusauth/entry/ets/components/CategoryTabs";
import type { CategoryTabItem } from "@bundle:com.example.campusauth/entry/ets/components/CategoryTabs";
import { ServiceIconItem } from "@bundle:com.example.campusauth/entry/ets/components/ServiceIconItem";
import { StatePanel } from "@bundle:com.example.campusauth/entry/ets/components/StatePanel";
import type { PageLoadState, PortalAction } from '../models/CampusPortal';
import type { UserProfile } from '../models/User';
import { AuthSessionService } from "@bundle:com.example.campusauth/entry/ets/services/AuthSessionService";
import { MockData } from "@bundle:com.example.campusauth/entry/ets/services/MockData";
import { PortalMockService } from "@bundle:com.example.campusauth/entry/ets/services/PortalMockService";
import { AppRoutes } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
import { PermissionUtil } from "@bundle:com.example.campusauth/entry/ets/utils/PermissionUtil";
interface ServiceGroup {
    id: string;
    title: string;
    subtitle: string;
    items: PortalAction[];
}
class OverviewPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__state = new ObservedPropertySimplePU('loading', this, "state");
        this.__user = new ObservedPropertyObjectPU(MockData.users[0], this, "user");
        this.__studentActions = new ObservedPropertyObjectPU([], this, "studentActions");
        this.__teacherActions = new ObservedPropertyObjectPU([], this, "teacherActions");
        this.__watchActions = new ObservedPropertyObjectPU([], this, "watchActions");
        this.__terminalActions = new ObservedPropertyObjectPU([], this, "terminalActions");
        this.__adminActions = new ObservedPropertyObjectPU([], this, "adminActions");
        this.__demoActions = new ObservedPropertyObjectPU([], this, "demoActions");
        this.__selectedCategory = new ObservedPropertySimplePU('', this, "selectedCategory");
        this.__hoverServiceId = new ObservedPropertySimplePU('', this, "hoverServiceId");
        this.__selectedServiceId = new ObservedPropertySimplePU('', this, "selectedServiceId");
        this.__logoutHover = new ObservedPropertySimplePU(false, this, "logoutHover");
        this.serviceScroller = new Scroller();
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
        if (params.studentActions !== undefined) {
            this.studentActions = params.studentActions;
        }
        if (params.teacherActions !== undefined) {
            this.teacherActions = params.teacherActions;
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
        if (params.selectedCategory !== undefined) {
            this.selectedCategory = params.selectedCategory;
        }
        if (params.hoverServiceId !== undefined) {
            this.hoverServiceId = params.hoverServiceId;
        }
        if (params.selectedServiceId !== undefined) {
            this.selectedServiceId = params.selectedServiceId;
        }
        if (params.logoutHover !== undefined) {
            this.logoutHover = params.logoutHover;
        }
        if (params.serviceScroller !== undefined) {
            this.serviceScroller = params.serviceScroller;
        }
    }
    updateStateVars(params: OverviewPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__state.purgeDependencyOnElmtId(rmElmtId);
        this.__user.purgeDependencyOnElmtId(rmElmtId);
        this.__studentActions.purgeDependencyOnElmtId(rmElmtId);
        this.__teacherActions.purgeDependencyOnElmtId(rmElmtId);
        this.__watchActions.purgeDependencyOnElmtId(rmElmtId);
        this.__terminalActions.purgeDependencyOnElmtId(rmElmtId);
        this.__adminActions.purgeDependencyOnElmtId(rmElmtId);
        this.__demoActions.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedCategory.purgeDependencyOnElmtId(rmElmtId);
        this.__hoverServiceId.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedServiceId.purgeDependencyOnElmtId(rmElmtId);
        this.__logoutHover.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__state.aboutToBeDeleted();
        this.__user.aboutToBeDeleted();
        this.__studentActions.aboutToBeDeleted();
        this.__teacherActions.aboutToBeDeleted();
        this.__watchActions.aboutToBeDeleted();
        this.__terminalActions.aboutToBeDeleted();
        this.__adminActions.aboutToBeDeleted();
        this.__demoActions.aboutToBeDeleted();
        this.__selectedCategory.aboutToBeDeleted();
        this.__hoverServiceId.aboutToBeDeleted();
        this.__selectedServiceId.aboutToBeDeleted();
        this.__logoutHover.aboutToBeDeleted();
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
    private __studentActions: ObservedPropertyObjectPU<PortalAction[]>;
    get studentActions() {
        return this.__studentActions.get();
    }
    set studentActions(newValue: PortalAction[]) {
        this.__studentActions.set(newValue);
    }
    private __teacherActions: ObservedPropertyObjectPU<PortalAction[]>;
    get teacherActions() {
        return this.__teacherActions.get();
    }
    set teacherActions(newValue: PortalAction[]) {
        this.__teacherActions.set(newValue);
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
    private __selectedCategory: ObservedPropertySimplePU<string>;
    get selectedCategory() {
        return this.__selectedCategory.get();
    }
    set selectedCategory(newValue: string) {
        this.__selectedCategory.set(newValue);
    }
    private __hoverServiceId: ObservedPropertySimplePU<string>;
    get hoverServiceId() {
        return this.__hoverServiceId.get();
    }
    set hoverServiceId(newValue: string) {
        this.__hoverServiceId.set(newValue);
    }
    private __selectedServiceId: ObservedPropertySimplePU<string>;
    get selectedServiceId() {
        return this.__selectedServiceId.get();
    }
    set selectedServiceId(newValue: string) {
        this.__selectedServiceId.set(newValue);
    }
    private __logoutHover: ObservedPropertySimplePU<boolean>;
    get logoutHover() {
        return this.__logoutHover.get();
    }
    set logoutHover(newValue: boolean) {
        this.__logoutHover.set(newValue);
    }
    private serviceScroller: Scroller;
    aboutToAppear(): void {
        const currentUser = AuthSessionService.currentUser();
        if (!AuthSessionService.isLoggedIn() || !currentUser) {
            router.replaceUrl({ url: AppRoutes.login });
            return;
        }
        this.user = currentUser;
        this.studentActions = this.user.role === 'student' ? PortalMockService.studentActions() : [];
        this.teacherActions = this.user.role === 'teacher' ? PortalMockService.teacherActions() : [];
        this.watchActions = this.user.role === 'student' ? PortalMockService.watchActions() : [];
        this.terminalActions = this.user.role === 'admin' ? PortalMockService.terminalActions() : [];
        this.adminActions = this.user.role === 'admin' ? PortalMockService.adminActions() : [];
        this.demoActions = this.user.role === 'admin' ? PortalMockService.demoActions() : [];
        const groups = this.visibleGroups();
        this.selectedCategory = groups.length > 0 ? groups[0].id : '';
        this.hoverServiceId = '';
        this.selectedServiceId = '';
        this.state = groups.length === 0 ? 'empty' : 'ready';
    }
    private visibleGroups(): ServiceGroup[] {
        return [
            { id: 'student', title: '学生端', subtitle: '本人认证、设备、授权、记录和通行状态', items: this.studentActions } as ServiceGroup,
            { id: 'teacher', title: '教师端', subtitle: '课程班级认证、学生异常提醒和课堂签到', items: this.teacherActions } as ServiceGroup,
            { id: 'watch', title: '穿戴设备', subtitle: '面向本人手表的今日考勤和通行反馈', items: this.watchActions } as ServiceGroup,
            { id: 'admin', title: '管理员端', subtitle: '风险评估、权限管理、系统审计和数据统计', items: this.adminActions } as ServiceGroup,
            { id: 'terminal', title: '设备管理', subtitle: '终端备案、设备接入和实时认证大屏', items: this.terminalActions } as ServiceGroup,
            { id: 'demo', title: '答辩演示', subtitle: '现场演示流程，不依赖真实设备', items: this.demoActions } as ServiceGroup
        ].filter((group: ServiceGroup) => group.items.length > 0);
    }
    private categoryTabs(): CategoryTabItem[] {
        return this.visibleGroups().map((group: ServiceGroup) => {
            return { id: group.id, title: group.title } as CategoryTabItem;
        });
    }
    private orderedGroups(): ServiceGroup[] {
        return this.visibleGroups();
    }
    private handleCategorySelect(id: string): void {
        this.selectedCategory = id;
        setTimeout(() => {
            this.serviceScroller.scrollTo({
                xOffset: 0,
                yOffset: this.groupScrollOffset(id),
                animation: { duration: 260, curve: Curve.EaseOut }
            });
        }, 30);
    }
    private groupScrollOffset(id: string): number {
        const groups = this.visibleGroups();
        let offset = 0;
        for (let index = 0; index < groups.length; index++) {
            if (groups[index].id === id) {
                return offset;
            }
            offset += this.groupVisualHeight(groups[index]);
        }
        return 0;
    }
    private groupVisualHeight(group: ServiceGroup): number {
        const rowCount = Math.ceil(group.items.length / 4);
        const gridHeight = rowCount * 150 + Math.max(0, rowCount - 1) * 26;
        return this.sectionTopMargin(group) + 34 + 22 + gridHeight;
    }
    private sectionTopMargin(group: ServiceGroup): number {
        if (this.user.role === 'teacher' && group.id === 'teacher') {
            return 14;
        }
        return 30;
    }
    private handleServiceHover(id: string, isHover: boolean): void {
        if (isHover) {
            this.hoverServiceId = id;
            return;
        }
        if (this.hoverServiceId === id) {
            this.hoverServiceId = '';
        }
    }
    private openService(item: PortalAction): void {
        this.selectedServiceId = item.id;
        if (!PermissionUtil.canViewFeature(this.user.role, item.route)) {
            promptAction.showToast({ message: '当前角色无权访问该功能' });
            return;
        }
        setTimeout(() => {
            router.pushUrl({ url: item.route });
        }, 160);
    }
    private logout(): void {
        AlertDialog.show({
            title: '确认退出',
            message: '确定要退出当前账号吗？',
            primaryButton: { value: '取消', action: () => { } },
            secondaryButton: {
                value: '确认退出',
                fontColor: '#C53030',
                action: () => {
                    AuthSessionService.clearLogin();
                    promptAction.showToast({ message: '已退出登录' });
                    router.replaceUrl({ url: AppRoutes.login });
                }
            }
        });
    }
    ServiceSection(group: ServiceGroup, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(group.title);
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#111827');
            Text.width('100%');
            Text.margin({ top: this.sectionTopMargin(group), bottom: 22 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.columnsTemplate('1fr 1fr 1fr 1fr');
            Grid.columnsGap(12);
            Grid.rowsGap(26);
            Grid.width('100%');
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
                            Column.create();
                            Column.width('100%');
                            Column.height(150);
                            Column.alignItems(HorizontalAlign.Center);
                            Column.justifyContent(FlexAlign.Start);
                            Column.onHover((isHover: boolean) => {
                                this.handleServiceHover(item.id, isHover);
                            });
                            Column.onClick(() => {
                                this.openService(item);
                            });
                        }, Column);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new ServiceIconItem(this, {
                                        item: item,
                                        active: this.hoverServiceId === item.id || this.selectedServiceId === item.id
                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/OverviewPage.ets", line: 166, col: 15 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            item: item,
                                            active: this.hoverServiceId === item.id || this.selectedServiceId === item.id
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "ServiceIconItem" });
                        }
                        Column.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, group.items, forEachItemGenFunction, (item: PortalAction): string => item.id, false, false);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#FFFFFF');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 20, right: 20, top: 28, bottom: 22 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.width(56);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('服务中心');
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#111827');
            Text.textAlign(TextAlign.Center);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('退出');
            Text.fontSize(15);
            Text.fontColor(this.logoutHover ? '#2D9CDB' : '#6B7280');
            Text.textAlign(TextAlign.Center);
            Text.width(56);
            Text.height(36);
            Text.backgroundColor(this.logoutHover ? '#EAF8FC' : Color.Transparent);
            Text.borderRadius(18);
            Text.onHover((isHover: boolean) => {
                this.logoutHover = isHover;
            });
            Text.onClick(() => {
                this.logout();
            });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.state === 'ready') {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new CategoryTabs(this, {
                                    items: this.categoryTabs(),
                                    selectedId: this.selectedCategory,
                                    onSelect: (id: string) => {
                                        this.handleCategorySelect(id);
                                    }
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/OverviewPage.ets", line: 222, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        items: this.categoryTabs(),
                                        selectedId: this.selectedCategory,
                                        onSelect: (id: string) => {
                                            this.handleCategorySelect(id);
                                        }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    selectedId: this.selectedCategory
                                });
                            }
                        }, { name: "CategoryTabs" });
                    }
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Divider.create();
                        Divider.color('#EEEEEE');
                        Divider.margin({ top: 20 });
                    }, Divider);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create(this.serviceScroller);
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ left: 24, right: 24, bottom: 34 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.state !== 'ready') {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new StatePanel(this, { state: this.state, emptyText: '暂无可用服务', errorText: '服务数据加载失败' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/OverviewPage.ets", line: 237, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        state: this.state,
                                        emptyText: '暂无可用服务',
                                        errorText: '服务数据加载失败'
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
                            const group = _item;
                            this.ServiceSection.bind(this)(group);
                        };
                        this.forEachUpdateFunction(elmtId, this.orderedGroups(), forEachItemGenFunction, (group: ServiceGroup): string => group.id, false, false);
                    }, ForEach);
                    ForEach.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "OverviewPage";
    }
}
registerNamedRoute(() => new OverviewPage(undefined, {}), "", { bundleName: "com.example.campusauth", moduleName: "entry", pagePath: "pages/OverviewPage", pageFullPath: "entry/src/main/ets/pages/OverviewPage", integratedHsp: "false", moduleType: "followWithHap" });
