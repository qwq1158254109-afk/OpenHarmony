if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DeviceBindPage_Params {
    state?: PageLoadState;
    devices?: BoundDeviceInfo[];
}
import promptAction from "@ohos:promptAction";
import { PageTitleBar } from "@bundle:com.example.campusauth/entry/ets/components/PageTitleBar";
import { StatePanel } from "@bundle:com.example.campusauth/entry/ets/components/StatePanel";
import type { BoundDeviceInfo, PageLoadState } from '../models/CampusPortal';
import { PortalMockService } from "@bundle:com.example.campusauth/entry/ets/services/PortalMockService";
import { AppColors, AppLayout } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
class DeviceBindPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__state = new ObservedPropertySimplePU('loading', this, "state");
        this.__devices = new ObservedPropertyObjectPU([], this, "devices");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DeviceBindPage_Params) {
        if (params.state !== undefined) {
            this.state = params.state;
        }
        if (params.devices !== undefined) {
            this.devices = params.devices;
        }
    }
    updateStateVars(params: DeviceBindPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__state.purgeDependencyOnElmtId(rmElmtId);
        this.__devices.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__state.aboutToBeDeleted();
        this.__devices.aboutToBeDeleted();
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
    private __devices: ObservedPropertyObjectPU<BoundDeviceInfo[]>;
    get devices() {
        return this.__devices.get();
    }
    set devices(newValue: BoundDeviceInfo[]) {
        this.__devices.set(newValue);
    }
    aboutToAppear(): void {
        this.devices = PortalMockService.boundDevices();
        this.state = this.devices.length === 0 ? 'empty' : 'ready';
    }
    private removeDevice(item: BoundDeviceInfo): void {
        AlertDialog.show({
            title: '确认解绑',
            message: `确定要解绑设备 ${item.name} 吗？`,
            primaryButton: { value: '取消', action: () => { } },
            secondaryButton: {
                value: '确认解绑',
                fontColor: AppColors.danger,
                action: () => {
                    this.devices = this.devices.filter((device: BoundDeviceInfo) => device.id !== item.id);
                    this.state = this.devices.length === 0 ? 'empty' : 'ready';
                    promptAction.showToast({ message: '设备已解绑' });
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
                    let componentCall = new PageTitleBar(this, { title: '设备绑定', subtitle: '绑定和管理参与无感认证的可信设备' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DeviceBindPage.ets", line: 39, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '设备绑定',
                            subtitle: '绑定和管理参与无感认证的可信设备'
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
                                let componentCall = new StatePanel(this, { state: this.state, emptyText: '暂无绑定设备', errorText: '设备列表加载失败' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DeviceBindPage.ets", line: 41, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        state: this.state,
                                        emptyText: '暂无绑定设备',
                                        errorText: '设备列表加载失败'
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
                                Text.create(item.type.substring(0, 1));
                                Text.fontSize(18);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor('#FFFFFF');
                                Text.textAlign(TextAlign.Center);
                                Text.width(44);
                                Text.height(44);
                                Text.backgroundColor(item.online ? AppColors.primary : AppColors.muted);
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
                                Text.create(item.name);
                                Text.fontSize(17);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor(AppColors.text);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`${item.id} · ${item.trustLevel} · ${item.online ? '在线' : '离线'}`);
                                Text.fontSize(12);
                                Text.fontColor(AppColors.muted);
                                Text.margin({ top: 4 });
                            }, Text);
                            Text.pop();
                            Column.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Button.createWithLabel('解绑');
                                Button.height(36);
                                Button.fontSize(13);
                                Button.fontColor(AppColors.danger);
                                Button.backgroundColor(AppColors.dangerSoft);
                                Button.borderRadius(8);
                                Button.onClick(() => this.removeDevice(item));
                            }, Button);
                            Button.pop();
                            Row.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.devices, forEachItemGenFunction, (item: BoundDeviceInfo): string => item.id, false, false);
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
        return "DeviceBindPage";
    }
}
registerNamedRoute(() => new DeviceBindPage(undefined, {}), "", { bundleName: "com.example.campusauth", moduleName: "entry", pagePath: "pages/DeviceBindPage", pageFullPath: "entry/src/main/ets/pages/DeviceBindPage", integratedHsp: "false", moduleType: "followWithHap" });
