if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AdminPermissionPage_Params {
    state?: PageLoadState;
    permissions?: AdminPermissionItem[];
}
import promptAction from "@ohos:promptAction";
import { PageTitleBar } from "@bundle:com.example.campusauth/entry/ets/components/PageTitleBar";
import { StatePanel } from "@bundle:com.example.campusauth/entry/ets/components/StatePanel";
import type { AdminPermissionItem, PageLoadState } from '../models/CampusPortal';
import { PortalMockService } from "@bundle:com.example.campusauth/entry/ets/services/PortalMockService";
import { AppColors, AppLayout } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
class AdminPermissionPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__state = new ObservedPropertySimplePU('loading', this, "state");
        this.__permissions = new ObservedPropertyObjectPU([], this, "permissions");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AdminPermissionPage_Params) {
        if (params.state !== undefined) {
            this.state = params.state;
        }
        if (params.permissions !== undefined) {
            this.permissions = params.permissions;
        }
    }
    updateStateVars(params: AdminPermissionPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__state.purgeDependencyOnElmtId(rmElmtId);
        this.__permissions.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__state.aboutToBeDeleted();
        this.__permissions.aboutToBeDeleted();
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
    private __permissions: ObservedPropertyObjectPU<AdminPermissionItem[]>;
    get permissions() {
        return this.__permissions.get();
    }
    set permissions(newValue: AdminPermissionItem[]) {
        this.__permissions.set(newValue);
    }
    aboutToAppear(): void {
        this.permissions = PortalMockService.adminPermissions();
        this.state = this.permissions.length === 0 ? 'empty' : 'ready';
    }
    private revoke(item: AdminPermissionItem): void {
        AlertDialog.show({
            title: '确认撤销权限',
            message: `确定撤销 ${item.owner} 的 ${item.role} 权限吗？`,
            primaryButton: { value: '取消', action: () => { } },
            secondaryButton: {
                value: '确认撤销',
                fontColor: AppColors.danger,
                action: () => {
                    this.permissions = this.permissions.filter((permission: AdminPermissionItem) => permission.id !== item.id);
                    this.state = this.permissions.length === 0 ? 'empty' : 'ready';
                    promptAction.showToast({ message: '权限已撤销' });
                }
            }
        });
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
                    let componentCall = new PageTitleBar(this, { title: '管理员权限管理', subtitle: '管理不同角色的数据访问和配置权限' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AdminPermissionPage.ets", line: 39, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '管理员权限管理',
                            subtitle: '管理不同角色的数据访问和配置权限'
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
                                let componentCall = new StatePanel(this, { state: this.state, emptyText: '暂无权限项', errorText: '权限数据加载失败' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AdminPermissionPage.ets", line: 41, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        state: this.state,
                                        emptyText: '暂无权限项',
                                        errorText: '权限数据加载失败'
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
                                Text.create(`${item.role} · ${item.owner}`);
                                Text.fontSize(17);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor(AppColors.text);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`${item.scope} · ${item.enabled ? '已启用' : '已停用'}`);
                                Text.fontSize(12);
                                Text.fontColor(AppColors.muted);
                                Text.margin({ top: 4 });
                            }, Text);
                            Text.pop();
                            Column.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Button.createWithLabel('撤销');
                                Button.height(36);
                                Button.fontSize(13);
                                Button.fontColor(AppColors.danger);
                                Button.backgroundColor(AppColors.dangerSoft);
                                Button.borderRadius(8);
                                Button.onClick(() => this.revoke(item));
                            }, Button);
                            Button.pop();
                            Row.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.permissions, forEachItemGenFunction, (item: AdminPermissionItem): string => item.id, false, false);
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
        return "AdminPermissionPage";
    }
}
registerNamedRoute(() => new AdminPermissionPage(undefined, {}), "", { bundleName: "com.example.campusauth", moduleName: "entry", pagePath: "pages/AdminPermissionPage", pageFullPath: "entry/src/main/ets/pages/AdminPermissionPage", integratedHsp: "false", moduleType: "followWithHap" });
