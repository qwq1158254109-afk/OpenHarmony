if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DashboardPage_Params {
    user?: UserProfile;
    todayCount?: number;
    latestStatus?: string;
    latestRisk?: string;
    onlineDeviceCount?: number;
    trustedDeviceCount?: number;
    menuActions?: PortalAction[];
    hoverMenuKey?: string;
}
import router from "@ohos:router";
import promptAction from "@ohos:promptAction";
import { FeatureCard } from "@bundle:com.example.campusauth/entry/ets/components/FeatureCard";
import { PageTitleBar } from "@bundle:com.example.campusauth/entry/ets/components/PageTitleBar";
import { SectionHeader } from "@bundle:com.example.campusauth/entry/ets/components/SectionHeader";
import { StatCard } from "@bundle:com.example.campusauth/entry/ets/components/StatCard";
import { StatusBadge } from "@bundle:com.example.campusauth/entry/ets/components/StatusBadge";
import type { AuthRecord } from '../models/Auth';
import type { PortalAction } from '../models/CampusPortal';
import type { CampusDevice } from '../models/Device';
import type { UserProfile } from '../models/User';
import { AuthService } from "@bundle:com.example.campusauth/entry/ets/services/AuthService";
import { AuthSessionService } from "@bundle:com.example.campusauth/entry/ets/services/AuthSessionService";
import { DeviceService } from "@bundle:com.example.campusauth/entry/ets/services/DeviceService";
import { MockData } from "@bundle:com.example.campusauth/entry/ets/services/MockData";
import { PortalMockService } from "@bundle:com.example.campusauth/entry/ets/services/PortalMockService";
import { AppColors, AppLayout, AppRoutes } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
import { FormatUtil } from "@bundle:com.example.campusauth/entry/ets/utils/FormatUtil";
import { PermissionUtil } from "@bundle:com.example.campusauth/entry/ets/utils/PermissionUtil";
class DashboardPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__user = new ObservedPropertyObjectPU(MockData.users[0], this, "user");
        this.__todayCount = new ObservedPropertySimplePU(0, this, "todayCount");
        this.__latestStatus = new ObservedPropertySimplePU('未认证', this, "latestStatus");
        this.__latestRisk = new ObservedPropertySimplePU('低风险', this, "latestRisk");
        this.__onlineDeviceCount = new ObservedPropertySimplePU(0, this, "onlineDeviceCount");
        this.__trustedDeviceCount = new ObservedPropertySimplePU(0, this, "trustedDeviceCount");
        this.__menuActions = new ObservedPropertyObjectPU([], this, "menuActions");
        this.__hoverMenuKey = new ObservedPropertySimplePU('', this, "hoverMenuKey");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DashboardPage_Params) {
        if (params.user !== undefined) {
            this.user = params.user;
        }
        if (params.todayCount !== undefined) {
            this.todayCount = params.todayCount;
        }
        if (params.latestStatus !== undefined) {
            this.latestStatus = params.latestStatus;
        }
        if (params.latestRisk !== undefined) {
            this.latestRisk = params.latestRisk;
        }
        if (params.onlineDeviceCount !== undefined) {
            this.onlineDeviceCount = params.onlineDeviceCount;
        }
        if (params.trustedDeviceCount !== undefined) {
            this.trustedDeviceCount = params.trustedDeviceCount;
        }
        if (params.menuActions !== undefined) {
            this.menuActions = params.menuActions;
        }
        if (params.hoverMenuKey !== undefined) {
            this.hoverMenuKey = params.hoverMenuKey;
        }
    }
    updateStateVars(params: DashboardPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__user.purgeDependencyOnElmtId(rmElmtId);
        this.__todayCount.purgeDependencyOnElmtId(rmElmtId);
        this.__latestStatus.purgeDependencyOnElmtId(rmElmtId);
        this.__latestRisk.purgeDependencyOnElmtId(rmElmtId);
        this.__onlineDeviceCount.purgeDependencyOnElmtId(rmElmtId);
        this.__trustedDeviceCount.purgeDependencyOnElmtId(rmElmtId);
        this.__menuActions.purgeDependencyOnElmtId(rmElmtId);
        this.__hoverMenuKey.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__user.aboutToBeDeleted();
        this.__todayCount.aboutToBeDeleted();
        this.__latestStatus.aboutToBeDeleted();
        this.__latestRisk.aboutToBeDeleted();
        this.__onlineDeviceCount.aboutToBeDeleted();
        this.__trustedDeviceCount.aboutToBeDeleted();
        this.__menuActions.aboutToBeDeleted();
        this.__hoverMenuKey.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __user: ObservedPropertyObjectPU<UserProfile>;
    get user() {
        return this.__user.get();
    }
    set user(newValue: UserProfile) {
        this.__user.set(newValue);
    }
    private __todayCount: ObservedPropertySimplePU<number>;
    get todayCount() {
        return this.__todayCount.get();
    }
    set todayCount(newValue: number) {
        this.__todayCount.set(newValue);
    }
    private __latestStatus: ObservedPropertySimplePU<string>;
    get latestStatus() {
        return this.__latestStatus.get();
    }
    set latestStatus(newValue: string) {
        this.__latestStatus.set(newValue);
    }
    private __latestRisk: ObservedPropertySimplePU<string>;
    get latestRisk() {
        return this.__latestRisk.get();
    }
    set latestRisk(newValue: string) {
        this.__latestRisk.set(newValue);
    }
    private __onlineDeviceCount: ObservedPropertySimplePU<number>;
    get onlineDeviceCount() {
        return this.__onlineDeviceCount.get();
    }
    set onlineDeviceCount(newValue: number) {
        this.__onlineDeviceCount.set(newValue);
    }
    private __trustedDeviceCount: ObservedPropertySimplePU<number>;
    get trustedDeviceCount() {
        return this.__trustedDeviceCount.get();
    }
    set trustedDeviceCount(newValue: number) {
        this.__trustedDeviceCount.set(newValue);
    }
    private __menuActions: ObservedPropertyObjectPU<PortalAction[]>;
    get menuActions() {
        return this.__menuActions.get();
    }
    set menuActions(newValue: PortalAction[]) {
        this.__menuActions.set(newValue);
    }
    private __hoverMenuKey: ObservedPropertySimplePU<string>;
    get hoverMenuKey() {
        return this.__hoverMenuKey.get();
    }
    set hoverMenuKey(newValue: string) {
        this.__hoverMenuKey.set(newValue);
    }
    aboutToAppear(): void {
        AuthSessionService.initialize();
        const currentUser = AuthSessionService.currentUser();
        if (!AuthSessionService.isLoggedIn() || !currentUser) {
            router.replaceUrl({ url: AppRoutes.login });
            return;
        }
        this.user = currentUser;
        const records = AuthService.recentRecords(this.user.id);
        const devices = DeviceService.listDevices(this.user.id);
        if (this.user.role === 'student') {
            this.menuActions = PortalMockService.studentActions();
        }
        else if (this.user.role === 'teacher') {
            this.menuActions = PortalMockService.teacherActions();
        }
        else {
            this.menuActions = PortalMockService.adminActions();
        }
        this.todayCount = records.length;
        this.onlineDeviceCount = devices.filter((item: CampusDevice) => item.online).length;
        this.trustedDeviceCount = devices.filter((item: CampusDevice) => item.trusted).length;
        if (records.length > 0) {
            this.latestStatus = records[0].result === 'success' ? '认证成功' : '认证失败';
            this.latestRisk = FormatUtil.riskLabel(records[0].risk.riskLevel);
        }
    }
    private go(url: string): void {
        if (!PermissionUtil.canViewFeature(this.user.role, url)) {
            promptAction.showToast({ message: '当前角色无权访问该功能' });
            return;
        }
        router.pushUrl({ url });
    }
    private handleMenuHover(key: string, isHover: boolean): void {
        if (isHover) {
            this.hoverMenuKey = key;
            return;
        }
        if (this.hoverMenuKey === key) {
            this.hoverMenuKey = '';
        }
    }
    private logout(): void {
        AlertDialog.show({
            title: '确认退出',
            message: '确定要退出当前账号吗？',
            primaryButton: {
                value: '取消',
                action: () => {
                }
            },
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
    private recentRecords(): AuthRecord[] {
        return AuthService.recentRecords(this.user.id).slice(0, 3);
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
            Column.padding({ left: AppLayout.pagePadding, right: AppLayout.pagePadding, bottom: 28 });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PageTitleBar(this, {
                        title: '智慧校园认证中心',
                        subtitle: `${this.user.name} · ${FormatUtil.roleLabel(this.user.role)} · ${this.user.department}`,
                        showBack: false
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DashboardPage.ets", line: 105, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '智慧校园认证中心',
                            subtitle: `${this.user.name} · ${FormatUtil.roleLabel(this.user.role)} · ${this.user.department}`,
                            showBack: false
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
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('退出登录');
            Button.height(36);
            Button.fontSize(13);
            Button.fontColor(AppColors.danger);
            Button.backgroundColor(AppColors.dangerSoft);
            Button.borderRadius(8);
            Button.onClick(() => {
                this.logout();
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.alignItems(VerticalAlign.Center);
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
            Text.create('OpenHarmony 分布式无感身份认证');
            Text.fontSize(23);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('手机、平板和穿戴设备协同完成身份核验，适配考勤、门禁、图书馆和课堂签到场景。');
            Text.fontSize(13);
            Text.fontColor('#D7EEF7');
            Text.lineHeight(20);
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.user.avatarText);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(AppColors.hero);
            Text.textAlign(TextAlign.Center);
            Text.width(52);
            Text.height(52);
            Text.backgroundColor('#DFF6FF');
            Text.borderRadius(8);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.columnsTemplate('1fr 1fr');
            Grid.columnsGap(12);
            Grid.rowsGap(12);
            Grid.height(264);
        }, Grid);
        {
            const itemCreation2 = (elmtId, isInitialRender) => {
                GridItem.create(() => { }, false);
            };
            const observedDeepRender = () => {
                this.observeComponentCreation2(itemCreation2, GridItem);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new StatCard(this, { title: '当前学号', value: this.user.account, hint: FormatUtil.roleLabel(this.user.role), color: AppColors.primary }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DashboardPage.ets", line: 157, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    title: '当前学号',
                                    value: this.user.account,
                                    hint: FormatUtil.roleLabel(this.user.role),
                                    color: AppColors.primary
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
        {
            const itemCreation2 = (elmtId, isInitialRender) => {
                GridItem.create(() => { }, false);
            };
            const observedDeepRender = () => {
                this.observeComponentCreation2(itemCreation2, GridItem);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new StatCard(this, { title: '身份状态', value: '已登录', hint: `${this.user.college}`, color: AppColors.success }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DashboardPage.ets", line: 160, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    title: '身份状态',
                                    value: '已登录',
                                    hint: `${this.user.college}`,
                                    color: AppColors.success
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
        {
            const itemCreation2 = (elmtId, isInitialRender) => {
                GridItem.create(() => { }, false);
            };
            const observedDeepRender = () => {
                this.observeComponentCreation2(itemCreation2, GridItem);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new StatCard(this, { title: '设备状态', value: `${this.onlineDeviceCount}/${this.trustedDeviceCount}`, hint: '在线设备 / 可信设备', color: AppColors.accent }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DashboardPage.ets", line: 163, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    title: '设备状态',
                                    value: `${this.onlineDeviceCount}/${this.trustedDeviceCount}`,
                                    hint: '在线设备 / 可信设备',
                                    color: AppColors.accent
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
        {
            const itemCreation2 = (elmtId, isInitialRender) => {
                GridItem.create(() => { }, false);
            };
            const observedDeepRender = () => {
                this.observeComponentCreation2(itemCreation2, GridItem);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new StatCard(this, { title: '最近认证', value: this.latestStatus, hint: `次数 ${this.todayCount} · ${this.latestRisk}`, color: this.latestStatus === '认证成功' ? AppColors.success : AppColors.warning }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DashboardPage.ets", line: 166, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    title: '最近认证',
                                    value: this.latestStatus,
                                    hint: `次数 ${this.todayCount} · ${this.latestRisk}`,
                                    color: this.latestStatus === '认证成功' ? AppColors.success : AppColors.warning
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
        Grid.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.width('100%');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SectionHeader(this, { title: '快捷入口', subtitle: `${FormatUtil.roleLabel(this.user.role)}可访问功能` }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DashboardPage.ets", line: 175, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '快捷入口',
                            subtitle: `${FormatUtil.roleLabel(this.user.role)}可访问功能`
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
                        this.MenuButton.bind(this)(item.title, item.subtitle, item.marker, item.route, item.status === 'success');
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, this.menuActions, forEachItemGenFunction, (item: PortalAction): string => item.id, false, false);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SectionHeader(this, { title: '最近认证', subtitle: '手机发起，平板同步展示认证结果' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DashboardPage.ets", line: 190, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '最近认证',
                            subtitle: '手机发起，平板同步展示认证结果'
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
                    Text.create(FormatUtil.sceneLabel(item.scene));
                    Text.fontSize(16);
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor(AppColors.text);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`${item.time} · ${item.location}`);
                    Text.fontSize(12);
                    Text.fontColor(AppColors.muted);
                    Text.margin({ top: 4 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`${item.deviceName} · ${FormatUtil.methodLabel(item.method)}`);
                    Text.fontSize(12);
                    Text.fontColor(AppColors.muted);
                    Text.margin({ top: 4 });
                }, Text);
                Text.pop();
                Column.pop();
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new StatusBadge(this, { text: item.result === 'success' ? '通过' : '失败', status: item.status }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DashboardPage.ets", line: 209, col: 15 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    text: item.result === 'success' ? '通过' : '失败',
                                    status: item.status
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
            };
            this.forEachUpdateFunction(elmtId, this.recentRecords(), forEachItemGenFunction, (item: AuthRecord): string => item.id, false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
    MenuButton(title: string, subtitle: string, marker: string, url: string, active: boolean, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height(120);
            Column.borderRadius(16);
            Column.hoverEffect(HoverEffect.Highlight);
            Column.onHover((isHover: boolean) => {
                this.handleMenuHover(url, isHover);
            });
            Column.onClick(() => {
                this.go(url);
            });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new FeatureCard(this, {
                        title: title,
                        subtitle: subtitle,
                        marker: marker,
                        active: active || this.hoverMenuKey === url,
                        hover: this.hoverMenuKey === url
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DashboardPage.ets", line: 230, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: title,
                            subtitle: subtitle,
                            marker: marker,
                            active: active || this.hoverMenuKey === url,
                            hover: this.hoverMenuKey === url
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "FeatureCard" });
        }
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "DashboardPage";
    }
}
registerNamedRoute(() => new DashboardPage(undefined, {}), "", { bundleName: "com.example.campusauth", moduleName: "entry", pagePath: "pages/DashboardPage", pageFullPath: "entry/src/main/ets/pages/DashboardPage", integratedHsp: "false", moduleType: "followWithHap" });
