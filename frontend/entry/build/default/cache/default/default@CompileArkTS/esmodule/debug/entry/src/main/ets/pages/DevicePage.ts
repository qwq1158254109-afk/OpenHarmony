if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DevicePage_Params {
    user?: UserProfile;
    devices?: CampusDevice[];
    newType?: DeviceType;
    types?: DeviceType[];
}
import { FeatureCard } from "@bundle:com.example.campusauth/entry/ets/components/FeatureCard";
import { PageTitleBar } from "@bundle:com.example.campusauth/entry/ets/components/PageTitleBar";
import { SectionHeader } from "@bundle:com.example.campusauth/entry/ets/components/SectionHeader";
import { StatusBadge } from "@bundle:com.example.campusauth/entry/ets/components/StatusBadge";
import type { CampusDevice, DeviceType } from '../models/Device';
import type { UserProfile } from '../models/User';
import { AuthSessionService } from "@bundle:com.example.campusauth/entry/ets/services/AuthSessionService";
import { DeviceTrustManager } from "@bundle:com.example.campusauth/entry/ets/services/DeviceTrustManager";
import { DeviceService } from "@bundle:com.example.campusauth/entry/ets/services/DeviceService";
import { MockData } from "@bundle:com.example.campusauth/entry/ets/services/MockData";
import { AppColors, AppLayout, AppRoutes } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
import { FormatUtil } from "@bundle:com.example.campusauth/entry/ets/utils/FormatUtil";
import { PermissionUtil } from "@bundle:com.example.campusauth/entry/ets/utils/PermissionUtil";
class DevicePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__user = new ObservedPropertyObjectPU(MockData.users[0], this, "user");
        this.__devices = new ObservedPropertyObjectPU([], this, "devices");
        this.__newType = new ObservedPropertySimplePU('tablet', this, "newType");
        this.types = ['phone', 'tablet', 'wearable'];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DevicePage_Params) {
        if (params.user !== undefined) {
            this.user = params.user;
        }
        if (params.devices !== undefined) {
            this.devices = params.devices;
        }
        if (params.newType !== undefined) {
            this.newType = params.newType;
        }
        if (params.types !== undefined) {
            this.types = params.types;
        }
    }
    updateStateVars(params: DevicePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__user.purgeDependencyOnElmtId(rmElmtId);
        this.__devices.purgeDependencyOnElmtId(rmElmtId);
        this.__newType.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__user.aboutToBeDeleted();
        this.__devices.aboutToBeDeleted();
        this.__newType.aboutToBeDeleted();
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
    private __devices: ObservedPropertyObjectPU<CampusDevice[]>;
    get devices() {
        return this.__devices.get();
    }
    set devices(newValue: CampusDevice[]) {
        this.__devices.set(newValue);
    }
    private __newType: ObservedPropertySimplePU<DeviceType>;
    get newType() {
        return this.__newType.get();
    }
    set newType(newValue: DeviceType) {
        this.__newType.set(newValue);
    }
    private types: DeviceType[];
    aboutToAppear(): void {
        if (!PermissionUtil.ensurePageAccess(AppRoutes.devices)) {
            return;
        }
        this.user = AuthSessionService.currentUser() || MockData.users[0];
        this.refresh();
    }
    private refresh(): void {
        this.devices = DeviceService.listDevices(this.user.id);
    }
    private addDevice(): void {
        DeviceService.bindDevice({
            userId: this.user.id,
            deviceName: DeviceService.nextDeviceName(this.newType),
            deviceType: this.newType,
            trusted: false
        });
        this.refresh();
    }
    private typeMarker(type: DeviceType): string {
        if (type === 'phone') {
            return 'PH';
        }
        if (type === 'tablet') {
            return 'TB';
        }
        return 'WT';
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
                    let componentCall = new PageTitleBar(this, { title: '设备管理', subtitle: '绑定手机、平板和穿戴设备，配置可信认证能力' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DevicePage.ets", line: 58, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '设备管理',
                            subtitle: '绑定手机、平板和穿戴设备，配置可信认证能力'
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
            Column.create({ space: 12 });
            Column.padding(16);
            Column.backgroundColor(AppColors.surface);
            Column.borderRadius(8);
            Column.border({ width: 1, color: AppColors.border });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SectionHeader(this, { title: '添加协同设备', subtitle: '模拟 OpenHarmony 分布式设备加入认证网络' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DevicePage.ets", line: 61, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '添加协同设备',
                            subtitle: '模拟 OpenHarmony 分布式设备加入认证网络'
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
            Grid.columnsGap(10);
            Grid.rowsGap(10);
            Grid.height(182);
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
                            __Common__.onClick(() => {
                                this.newType = item;
                            });
                        }, __Common__);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new FeatureCard(this, {
                                        title: FormatUtil.deviceTypeLabel(item),
                                        subtitle: DeviceService.nextDeviceName(item),
                                        marker: this.typeMarker(item),
                                        active: this.newType === item
                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DevicePage.ets", line: 65, col: 17 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            title: FormatUtil.deviceTypeLabel(item),
                                            subtitle: DeviceService.nextDeviceName(item),
                                            marker: this.typeMarker(item),
                                            active: this.newType === item
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
            this.forEachUpdateFunction(elmtId, this.types, forEachItemGenFunction, (item: DeviceType) => item, false, false);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('添加设备');
            Button.width('100%');
            Button.height(44);
            Button.backgroundColor(AppColors.primary);
            Button.borderRadius(8);
            Button.onClick(() => this.addDevice());
        }, Button);
        Button.pop();
        Column.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SectionHeader(this, { title: '已绑定设备', subtitle: '可信设备可参与无感认证和跨端同步' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DevicePage.ets", line: 93, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '已绑定设备',
                            subtitle: '可信设备可参与无感认证和跨端同步'
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
                            Text.create(this.typeMarker(item.type));
                            Text.fontSize(14);
                            Text.fontWeight(FontWeight.Bold);
                            Text.fontColor(item.trusted ? '#FFFFFF' : AppColors.primary);
                            Text.textAlign(TextAlign.Center);
                            Text.width(42);
                            Text.height(42);
                            Text.backgroundColor(item.trusted ? AppColors.primary : AppColors.cyanSoft);
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
                            Text.create(`${FormatUtil.deviceTypeLabel(item.type)} · ${item.lastSeen}`);
                            Text.fontSize(12);
                            Text.fontColor(AppColors.muted);
                            Text.margin({ top: 4 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(`${item.deviceOs} · ${FormatUtil.distributedRoleLabel(item.distributedRole)}`);
                            Text.fontSize(12);
                            Text.fontColor(AppColors.muted);
                            Text.margin({ top: 4 });
                        }, Text);
                        Text.pop();
                        Column.pop();
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new StatusBadge(this, { text: item.online ? '在线' : '离线', status: item.online ? 'success' : 'unauthenticated' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DevicePage.ets", line: 125, col: 19 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            text: item.online ? '在线' : '离线',
                                            status: item.online ? 'success' : 'unauthenticated'
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
                            Row.create();
                        }, Row);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new StatusBadge(this, { text: `${DeviceTrustManager.label(item.trust.level)} ${item.trust.score}`, status: DeviceTrustManager.badgeStatus(item.trust.level) }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DevicePage.ets", line: 128, col: 19 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            text: `${DeviceTrustManager.label(item.trust.level)} ${item.trust.score}`,
                                            status: DeviceTrustManager.badgeStatus(item.trust.level)
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "StatusBadge" });
                        }
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Blank.create();
                            Blank.layoutWeight(1);
                        }, Blank);
                        Blank.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.trust.factors.join('、'));
                            Text.fontSize(12);
                            Text.fontColor(AppColors.muted);
                            Text.lineHeight(18);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create({ space: 10 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Button.createWithLabel(item.trusted ? '取消可信' : '设为可信');
                            Button.layoutWeight(1);
                            Button.height(38);
                            Button.fontSize(13);
                            Button.fontColor(AppColors.primary);
                            Button.backgroundColor(AppColors.cyanSoft);
                            Button.borderRadius(8);
                            Button.onClick(() => {
                                DeviceService.toggleTrusted(item.id);
                                this.refresh();
                            });
                        }, Button);
                        Button.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Button.createWithLabel('删除');
                            Button.layoutWeight(1);
                            Button.height(38);
                            Button.fontSize(13);
                            Button.fontColor(AppColors.danger);
                            Button.backgroundColor(AppColors.dangerSoft);
                            Button.borderRadius(8);
                            Button.onClick(() => {
                                DeviceService.removeDevice(item.id);
                                this.refresh();
                            });
                        }, Button);
                        Button.pop();
                        Row.pop();
                        Column.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, this.devices, forEachItemGenFunction, (item: CampusDevice) => item.id, false, false);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "DevicePage";
    }
}
registerNamedRoute(() => new DevicePage(undefined, {}), "", { bundleName: "com.example.campusauth", moduleName: "entry", pagePath: "pages/DevicePage", pageFullPath: "entry/src/main/ets/pages/DevicePage", integratedHsp: "false", moduleType: "followWithHap" });
