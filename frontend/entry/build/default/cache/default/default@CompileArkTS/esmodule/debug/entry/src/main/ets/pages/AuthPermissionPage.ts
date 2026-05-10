if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AuthPermissionPage_Params {
    permissionList?: AuthPermissionOption[];
    refreshVersion?: number;
}
import promptAction from "@ohos:promptAction";
import { PageTitleBar } from "@bundle:com.example.campusauth/entry/ets/components/PageTitleBar";
import { StatePanel } from "@bundle:com.example.campusauth/entry/ets/components/StatePanel";
import type { AuthPermissionOption } from '../models/CampusPortal';
import type { UserProfile } from '../models/User';
import { AuthSessionService } from "@bundle:com.example.campusauth/entry/ets/services/AuthSessionService";
import { PortalMockService } from "@bundle:com.example.campusauth/entry/ets/services/PortalMockService";
import { AppColors, AppLayout, AppRoutes } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
import { PermissionUtil } from "@bundle:com.example.campusauth/entry/ets/utils/PermissionUtil";
class AuthPermissionPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__permissionList = new ObservedPropertyObjectPU([], this, "permissionList");
        this.__refreshVersion = new ObservedPropertySimplePU(0, this, "refreshVersion");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AuthPermissionPage_Params) {
        if (params.permissionList !== undefined) {
            this.permissionList = params.permissionList;
        }
        if (params.refreshVersion !== undefined) {
            this.refreshVersion = params.refreshVersion;
        }
    }
    updateStateVars(params: AuthPermissionPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__permissionList.purgeDependencyOnElmtId(rmElmtId);
        this.__refreshVersion.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__permissionList.aboutToBeDeleted();
        this.__refreshVersion.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __permissionList: ObservedPropertyObjectPU<AuthPermissionOption[]>;
    get permissionList() {
        return this.__permissionList.get();
    }
    set permissionList(newValue: AuthPermissionOption[]) {
        this.__permissionList.set(newValue);
    }
    private __refreshVersion: ObservedPropertySimplePU<number>;
    get refreshVersion() {
        return this.__refreshVersion.get();
    }
    set refreshVersion(newValue: number) {
        this.__refreshVersion.set(newValue);
    }
    aboutToAppear(): void {
        if (!PermissionUtil.ensurePageAccess(AppRoutes.authPermission)) {
            return;
        }
        const currentUser: UserProfile | undefined = AuthSessionService.currentUser();
        this.permissionList = PortalMockService.authPermissions(currentUser);
    }
    private togglePermission(id: string | number): void {
        let changed: boolean = false;
        this.permissionList = this.permissionList.map((item: AuthPermissionOption) => {
            if (String(item.id) === String(id)) {
                changed = true;
                const enabled: boolean = !item.enabled;
                return {
                    id: item.id,
                    name: item.name,
                    scene: item.scene,
                    enabled: enabled,
                    riskLevel: enabled ? 'low' : 'high'
                } as AuthPermissionOption;
            }
            return item;
        });
        this.refreshVersion++;
        promptAction.showToast({
            message: changed ? '权限设置已更新' : '未找到对应权限项',
            duration: 1500
        });
        console.info(`permission toggled, id=${id}, changed=${changed}`);
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.refreshVersion}`);
            Text.height(0);
            Text.opacity(0);
        }, Text);
        Text.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PageTitleBar(this, { title: '我的授权设置', subtitle: '管理本人校园身份认证授权场景' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AuthPermissionPage.ets", line: 60, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '我的授权设置',
                            subtitle: '管理本人校园身份认证授权场景'
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
            if (this.permissionList.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new StatePanel(this, { state: 'empty', emptyText: '暂无本人授权设置', errorText: '授权设置加载失败' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AuthPermissionPage.ets", line: 62, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        state: 'empty',
                                        emptyText: '暂无本人授权设置',
                                        errorText: '授权设置加载失败'
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
                                Text.create(item.name);
                                Text.fontSize(17);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor(AppColors.text);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(item.scene);
                                Text.fontSize(12);
                                Text.fontColor(AppColors.muted);
                                Text.margin({ top: 4 });
                            }, Text);
                            Text.pop();
                            Column.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create({ space: 6 });
                                Row.padding({ left: 9, right: 9, top: 5, bottom: 5 });
                                Row.backgroundColor(item.enabled ? '#E8F8EF' : '#FFF0F0');
                                Row.borderRadius(8);
                                Row.border({ width: 1, color: item.enabled ? '#159957' : '#D93030' });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Blank.create();
                                Blank.width(6);
                                Blank.height(6);
                                Blank.backgroundColor(item.enabled ? '#159957' : '#D93030');
                                Blank.borderRadius(3);
                            }, Blank);
                            Blank.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(item.enabled ? '低风险' : '高风险');
                                Text.fontSize(12);
                                Text.fontWeight(FontWeight.Medium);
                                Text.fontColor(item.enabled ? '#159957' : '#D93030');
                            }, Text);
                            Text.pop();
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Button.createWithLabel(item.enabled ? '已开启' : '已关闭');
                                Button.width(90);
                                Button.height(36);
                                Button.fontSize(13);
                                Button.fontColor(item.enabled ? '#FFFFFF' : '#0F6F86');
                                Button.backgroundColor(item.enabled ? '#0F6F86' : '#E6F6FB');
                                Button.borderRadius(8);
                                Button.margin({ left: 10 });
                                Button.zIndex(2);
                                Button.onClick(() => {
                                    this.togglePermission(item.id);
                                });
                            }, Button);
                            Button.pop();
                            Row.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.permissionList, forEachItemGenFunction, (item: AuthPermissionOption): string => `${String(item.id)}-${item.enabled ? 'on' : 'off'}`, false, false);
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
        return "AuthPermissionPage";
    }
}
registerNamedRoute(() => new AuthPermissionPage(undefined, {}), "", { bundleName: "com.example.campusauth", moduleName: "entry", pagePath: "pages/AuthPermissionPage", pageFullPath: "entry/src/main/ets/pages/AuthPermissionPage", integratedHsp: "false", moduleType: "followWithHap" });
