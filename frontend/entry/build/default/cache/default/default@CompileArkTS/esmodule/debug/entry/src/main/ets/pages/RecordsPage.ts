if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface RecordsPage_Params {
    user?: UserProfile;
    filter?: RecordFilter;
    pageTitle?: string;
    pageSubtitle?: string;
    filters?: RecordFilter[];
}
import { PageTitleBar } from "@bundle:com.example.campusauth/entry/ets/components/PageTitleBar";
import { SectionHeader } from "@bundle:com.example.campusauth/entry/ets/components/SectionHeader";
import { StatCard } from "@bundle:com.example.campusauth/entry/ets/components/StatCard";
import { StatusBadge } from "@bundle:com.example.campusauth/entry/ets/components/StatusBadge";
import type { AuthRecord } from '../models/Auth';
import type { UserProfile } from '../models/User';
import { AuthService } from "@bundle:com.example.campusauth/entry/ets/services/AuthService";
import { AuthSessionService } from "@bundle:com.example.campusauth/entry/ets/services/AuthSessionService";
import { MockData } from "@bundle:com.example.campusauth/entry/ets/services/MockData";
import { AppColors, AppLayout, AppRoutes } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
import { FormatUtil } from "@bundle:com.example.campusauth/entry/ets/utils/FormatUtil";
import { PermissionUtil } from "@bundle:com.example.campusauth/entry/ets/utils/PermissionUtil";
type RecordFilter = 'all' | 'success' | 'failed' | 'high';
class RecordsPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__user = new ObservedPropertyObjectPU(MockData.users[0], this, "user");
        this.__filter = new ObservedPropertySimplePU('all', this, "filter");
        this.__pageTitle = new ObservedPropertySimplePU('个人风险提醒', this, "pageTitle");
        this.__pageSubtitle = new ObservedPropertySimplePU('查看本人账号、设备、登录环境是否存在异常', this, "pageSubtitle");
        this.filters = ['all', 'success', 'failed', 'high'];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: RecordsPage_Params) {
        if (params.user !== undefined) {
            this.user = params.user;
        }
        if (params.filter !== undefined) {
            this.filter = params.filter;
        }
        if (params.pageTitle !== undefined) {
            this.pageTitle = params.pageTitle;
        }
        if (params.pageSubtitle !== undefined) {
            this.pageSubtitle = params.pageSubtitle;
        }
        if (params.filters !== undefined) {
            this.filters = params.filters;
        }
    }
    updateStateVars(params: RecordsPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__user.purgeDependencyOnElmtId(rmElmtId);
        this.__filter.purgeDependencyOnElmtId(rmElmtId);
        this.__pageTitle.purgeDependencyOnElmtId(rmElmtId);
        this.__pageSubtitle.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__user.aboutToBeDeleted();
        this.__filter.aboutToBeDeleted();
        this.__pageTitle.aboutToBeDeleted();
        this.__pageSubtitle.aboutToBeDeleted();
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
    private __filter: ObservedPropertySimplePU<RecordFilter>;
    get filter() {
        return this.__filter.get();
    }
    set filter(newValue: RecordFilter) {
        this.__filter.set(newValue);
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
    private filters: RecordFilter[];
    aboutToAppear(): void {
        if (!PermissionUtil.ensurePageAccess(AppRoutes.records)) {
            return;
        }
        this.user = AuthSessionService.currentUser() || MockData.users[0];
        if (this.user.role === 'teacher') {
            this.pageTitle = '学生异常提醒';
            this.pageSubtitle = '仅查看任课班级范围内认证异常与课堂认证记录';
        }
        else if (this.user.role === 'admin') {
            this.pageTitle = '系统审计记录';
            this.pageSubtitle = '查看全局认证、通行、设备登录和风险处置记录';
        }
    }
    private filterLabel(item: RecordFilter): string {
        if (item === 'all') {
            return '全部';
        }
        if (item === 'success') {
            return '成功';
        }
        if (item === 'failed') {
            return '失败';
        }
        return '高风险';
    }
    private records(): AuthRecord[] {
        const allRecords = AuthService.recentRecordsByRole(this.user);
        if (this.filter === 'success' || this.filter === 'failed') {
            return allRecords.filter(item => item.result === this.filter);
        }
        if (this.filter === 'high') {
            return allRecords.filter(item => item.risk.riskLevel === 'high');
        }
        return allRecords;
    }
    private allRecords(): AuthRecord[] {
        return AuthService.recentRecordsByRole(this.user);
    }
    private accountFor(record: AuthRecord): string {
        const user = MockData.users.find((item: UserProfile) => item.id === record.userId);
        return user ? user.account : record.userId;
    }
    private deviceIdFor(record: AuthRecord): string {
        const device = MockData.devices.find(item => item.userId === record.userId && item.name === record.deviceName);
        return device ? device.id : record.deviceName;
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
                    let componentCall = new PageTitleBar(this, { title: this.pageTitle, subtitle: this.pageSubtitle }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/RecordsPage.ets", line: 80, col: 9 });
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
            Grid.create();
            Grid.columnsTemplate('1fr 1fr');
            Grid.columnsGap(12);
            Grid.height(126);
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
                            let componentCall = new StatCard(this, { title: '记录总数', value: `${this.allRecords().length}`, hint: '当前身份可见记录', color: AppColors.primary }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/RecordsPage.ets", line: 84, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    title: '记录总数',
                                    value: `${this.allRecords().length}`,
                                    hint: '当前身份可见记录',
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
                            let componentCall = new StatCard(this, { title: '高风险', value: `${this.allRecords().filter(item => item.risk.riskLevel === 'high').length}`, hint: this.user.role === 'student' ? '仅本人异常提醒' : '需重点关注', color: AppColors.danger }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/RecordsPage.ets", line: 87, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    title: '高风险',
                                    value: `${this.allRecords().filter(item => item.risk.riskLevel === 'high').length}`,
                                    hint: this.user.role === 'student' ? '仅本人异常提醒' : '需重点关注',
                                    color: AppColors.danger
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
            Column.padding(16);
            Column.backgroundColor(AppColors.surface);
            Column.borderRadius(8);
            Column.border({ width: 1, color: AppColors.border });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SectionHeader(this, { title: '记录筛选', subtitle: '按认证结果和风险等级快速查看' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/RecordsPage.ets", line: 95, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '记录筛选',
                            subtitle: '按认证结果和风险等级快速查看'
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
            Row.create({ space: 8 });
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(this.filterLabel(item));
                    Button.layoutWeight(1);
                    Button.height(38);
                    Button.fontSize(13);
                    Button.fontColor(this.filter === item ? '#FFFFFF' : AppColors.primary);
                    Button.backgroundColor(this.filter === item ? AppColors.primary : AppColors.cyanSoft);
                    Button.borderRadius(8);
                    Button.onClick(() => {
                        this.filter = item;
                    });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, this.filters, forEachItemGenFunction, (item: RecordFilter) => item, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Column.pop();
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
                    Text.create(FormatUtil.sceneLabel(item.scene).substring(0, 1));
                    Text.fontSize(16);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor('#FFFFFF');
                    Text.textAlign(TextAlign.Center);
                    Text.width(40);
                    Text.height(40);
                    Text.backgroundColor(item.result === 'success' ? AppColors.primary : AppColors.danger);
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
                    Text.create(`${FormatUtil.sceneLabel(item.scene)} · ${item.userName}`);
                    Text.fontSize(17);
                    Text.fontWeight(FontWeight.Bold);
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
                Column.pop();
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new StatusBadge(this, { text: item.result === 'success' ? '成功' : '失败', status: item.status }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/RecordsPage.ets", line: 142, col: 15 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    text: item.result === 'success' ? '成功' : '失败',
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
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`${item.deviceName} · ${FormatUtil.methodLabel(item.method)}`);
                    Text.fontSize(13);
                    Text.fontColor(AppColors.muted);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create({ space: 10 });
                    Row.width('100%');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`学号：${this.accountFor(item)}`);
                    Text.fontSize(12);
                    Text.fontColor(AppColors.text);
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`设备 ID：${this.deviceIdFor(item)}`);
                    Text.fontSize(12);
                    Text.fontColor(AppColors.text);
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`风险评分 ${item.risk.riskScore}`);
                    Text.fontSize(13);
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor(AppColors.text);
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new StatusBadge(this, { text: FormatUtil.riskLabel(item.risk.riskLevel), status: item.risk.riskLevel }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/RecordsPage.ets", line: 164, col: 15 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    text: FormatUtil.riskLabel(item.risk.riskLevel),
                                    status: item.risk.riskLevel
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
                    Text.create(item.risk.riskReason);
                    Text.fontSize(12);
                    Text.fontColor(AppColors.muted);
                    Text.lineHeight(18);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.risk.suggestion);
                    Text.fontSize(12);
                    Text.fontColor(AppColors.primary);
                    Text.lineHeight(18);
                }, Text);
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.records(), forEachItemGenFunction, (item: AuthRecord) => item.id, false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "RecordsPage";
    }
}
registerNamedRoute(() => new RecordsPage(undefined, {}), "", { bundleName: "com.example.campusauth", moduleName: "entry", pagePath: "pages/RecordsPage", pageFullPath: "entry/src/main/ets/pages/RecordsPage", integratedHsp: "false", moduleType: "followWithHap" });
