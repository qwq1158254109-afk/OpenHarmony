if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AuthPage_Params {
    user?: UserProfile;
    method?: AuthMethod;
    scene?: CampusScene;
    status?: AuthStatus;
    resultText?: string;
    progress?: number;
    hasLatestRecord?: boolean;
    latestRecord?: AuthRecord;
    collaboration?: CollaborationState;
    remoteSessionText?: string;
    devices?: CampusDevice[];
    methods?: AuthMethod[];
    scenes?: CampusScene[];
}
import router from "@ohos:router";
import { FeatureCard } from "@bundle:com.example.campusauth/entry/ets/components/FeatureCard";
import { PageTitleBar } from "@bundle:com.example.campusauth/entry/ets/components/PageTitleBar";
import { SectionHeader } from "@bundle:com.example.campusauth/entry/ets/components/SectionHeader";
import { StatusBadge } from "@bundle:com.example.campusauth/entry/ets/components/StatusBadge";
import type { AuthMethod, AuthRecord, AuthStatus, CampusScene } from '../models/Auth';
import type { CampusDevice } from '../models/Device';
import type { UserProfile } from '../models/User';
import { DeviceTrustManager } from "@bundle:com.example.campusauth/entry/ets/services/DeviceTrustManager";
import { DeviceService } from "@bundle:com.example.campusauth/entry/ets/services/DeviceService";
import { DistributedAuthService } from "@bundle:com.example.campusauth/entry/ets/services/DistributedAuthService";
import type { CollaborationState } from "@bundle:com.example.campusauth/entry/ets/services/DistributedAuthService";
import { MockData } from "@bundle:com.example.campusauth/entry/ets/services/MockData";
import { RemoteAuthService } from "@bundle:com.example.campusauth/entry/ets/services/RemoteAuthService";
import { AppColors, AppLayout, AppRoutes } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
import { FormatUtil } from "@bundle:com.example.campusauth/entry/ets/utils/FormatUtil";
import { AuthSessionService } from "@bundle:com.example.campusauth/entry/ets/services/AuthSessionService";
import { PermissionUtil } from "@bundle:com.example.campusauth/entry/ets/utils/PermissionUtil";
class AuthPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__user = new ObservedPropertyObjectPU(MockData.users[0], this, "user");
        this.__method = new ObservedPropertySimplePU('trusted_device', this, "method");
        this.__scene = new ObservedPropertySimplePU('classroom_checkin', this, "scene");
        this.__status = new ObservedPropertySimplePU('unauthenticated', this, "status");
        this.__resultText = new ObservedPropertySimplePU('等待发起认证', this, "resultText");
        this.__progress = new ObservedPropertySimplePU(0, this, "progress");
        this.__hasLatestRecord = new ObservedPropertySimplePU(false, this, "hasLatestRecord");
        this.__latestRecord = new ObservedPropertyObjectPU(MockData.records[0], this, "latestRecord");
        this.__collaboration = new ObservedPropertyObjectPU(DistributedAuthService.syncAuthState('unauthenticated'), this, "collaboration");
        this.__remoteSessionText = new ObservedPropertySimplePU('OpenHarmony Phone 发起认证，OpenHarmony Tablet 展示结果', this, "remoteSessionText");
        this.__devices = new ObservedPropertyObjectPU([], this, "devices");
        this.methods = ['trusted_device', 'qrcode', 'nearby_bluetooth'];
        this.scenes = ['attendance', 'lab_access', 'library_entry', 'classroom_checkin'];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AuthPage_Params) {
        if (params.user !== undefined) {
            this.user = params.user;
        }
        if (params.method !== undefined) {
            this.method = params.method;
        }
        if (params.scene !== undefined) {
            this.scene = params.scene;
        }
        if (params.status !== undefined) {
            this.status = params.status;
        }
        if (params.resultText !== undefined) {
            this.resultText = params.resultText;
        }
        if (params.progress !== undefined) {
            this.progress = params.progress;
        }
        if (params.hasLatestRecord !== undefined) {
            this.hasLatestRecord = params.hasLatestRecord;
        }
        if (params.latestRecord !== undefined) {
            this.latestRecord = params.latestRecord;
        }
        if (params.collaboration !== undefined) {
            this.collaboration = params.collaboration;
        }
        if (params.remoteSessionText !== undefined) {
            this.remoteSessionText = params.remoteSessionText;
        }
        if (params.devices !== undefined) {
            this.devices = params.devices;
        }
        if (params.methods !== undefined) {
            this.methods = params.methods;
        }
        if (params.scenes !== undefined) {
            this.scenes = params.scenes;
        }
    }
    updateStateVars(params: AuthPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__user.purgeDependencyOnElmtId(rmElmtId);
        this.__method.purgeDependencyOnElmtId(rmElmtId);
        this.__scene.purgeDependencyOnElmtId(rmElmtId);
        this.__status.purgeDependencyOnElmtId(rmElmtId);
        this.__resultText.purgeDependencyOnElmtId(rmElmtId);
        this.__progress.purgeDependencyOnElmtId(rmElmtId);
        this.__hasLatestRecord.purgeDependencyOnElmtId(rmElmtId);
        this.__latestRecord.purgeDependencyOnElmtId(rmElmtId);
        this.__collaboration.purgeDependencyOnElmtId(rmElmtId);
        this.__remoteSessionText.purgeDependencyOnElmtId(rmElmtId);
        this.__devices.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__user.aboutToBeDeleted();
        this.__method.aboutToBeDeleted();
        this.__scene.aboutToBeDeleted();
        this.__status.aboutToBeDeleted();
        this.__resultText.aboutToBeDeleted();
        this.__progress.aboutToBeDeleted();
        this.__hasLatestRecord.aboutToBeDeleted();
        this.__latestRecord.aboutToBeDeleted();
        this.__collaboration.aboutToBeDeleted();
        this.__remoteSessionText.aboutToBeDeleted();
        this.__devices.aboutToBeDeleted();
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
    private __method: ObservedPropertySimplePU<AuthMethod>;
    get method() {
        return this.__method.get();
    }
    set method(newValue: AuthMethod) {
        this.__method.set(newValue);
    }
    private __scene: ObservedPropertySimplePU<CampusScene>;
    get scene() {
        return this.__scene.get();
    }
    set scene(newValue: CampusScene) {
        this.__scene.set(newValue);
    }
    private __status: ObservedPropertySimplePU<AuthStatus>;
    get status() {
        return this.__status.get();
    }
    set status(newValue: AuthStatus) {
        this.__status.set(newValue);
    }
    private __resultText: ObservedPropertySimplePU<string>;
    get resultText() {
        return this.__resultText.get();
    }
    set resultText(newValue: string) {
        this.__resultText.set(newValue);
    }
    private __progress: ObservedPropertySimplePU<number>;
    get progress() {
        return this.__progress.get();
    }
    set progress(newValue: number) {
        this.__progress.set(newValue);
    }
    private __hasLatestRecord: ObservedPropertySimplePU<boolean>;
    get hasLatestRecord() {
        return this.__hasLatestRecord.get();
    }
    set hasLatestRecord(newValue: boolean) {
        this.__hasLatestRecord.set(newValue);
    }
    private __latestRecord: ObservedPropertyObjectPU<AuthRecord>;
    get latestRecord() {
        return this.__latestRecord.get();
    }
    set latestRecord(newValue: AuthRecord) {
        this.__latestRecord.set(newValue);
    }
    private __collaboration: ObservedPropertyObjectPU<CollaborationState>;
    get collaboration() {
        return this.__collaboration.get();
    }
    set collaboration(newValue: CollaborationState) {
        this.__collaboration.set(newValue);
    }
    private __remoteSessionText: ObservedPropertySimplePU<string>;
    get remoteSessionText() {
        return this.__remoteSessionText.get();
    }
    set remoteSessionText(newValue: string) {
        this.__remoteSessionText.set(newValue);
    }
    private __devices: ObservedPropertyObjectPU<CampusDevice[]>;
    get devices() {
        return this.__devices.get();
    }
    set devices(newValue: CampusDevice[]) {
        this.__devices.set(newValue);
    }
    private methods: AuthMethod[];
    private scenes: CampusScene[];
    aboutToAppear(): void {
        if (!PermissionUtil.ensurePageAccess(AppRoutes.auth)) {
            return;
        }
        this.user = AuthSessionService.currentUser() || MockData.users[0];
        this.devices = DeviceService.listDevices(this.user.id);
        this.remoteSessionText = RemoteAuthService.createSession(this.user.id).message;
    }
    private locationForScene(scene: CampusScene): string {
        if (scene === 'attendance') {
            return '信息楼 301 会议室';
        }
        if (scene === 'lab_access') {
            return '重点实验室 B102';
        }
        if (scene === 'library_entry') {
            return '图书馆北门';
        }
        if (scene === 'classroom_checkin') {
            return '综合教学楼 A203';
        }
        return '校园公共区域';
    }
    private methodMarker(method: AuthMethod): string {
        if (method === 'trusted_device') {
            return 'TD';
        }
        if (method === 'qrcode') {
            return 'QR';
        }
        return 'BT';
    }
    private sceneMarker(scene: CampusScene): string {
        if (scene === 'attendance') {
            return 'AT';
        }
        if (scene === 'lab_access') {
            return 'LB';
        }
        if (scene === 'library_entry') {
            return 'LI';
        }
        return 'CL';
    }
    private startAuthentication(): void {
        this.status = 'authenticating';
        this.progress = 42;
        this.resultText = '正在发现附近可信设备并校验身份';
        this.collaboration = DistributedAuthService.syncAuthState('authenticating');
        const session = RemoteAuthService.createSession(this.user.id);
        this.remoteSessionText = session.message;
        setTimeout(() => {
            const nearby = DistributedAuthService.discoverNearbyDevices(this.user.id);
            const deviceId = nearby.length > 0 ? nearby[0].id : 'phone-001';
            const record = RemoteAuthService.verifyFromRemote({
                userId: this.user.id,
                method: this.method,
                scene: this.scene,
                location: this.locationForScene(this.scene),
                deviceId
            });
            this.status = record.status;
            this.progress = record.result === 'success' ? 100 : 82;
            this.latestRecord = record;
            this.hasLatestRecord = true;
            this.resultText = record.result === 'success' ? '认证成功，结果已同步到协同设备' : '认证失败，请更换方式或联系管理员';
            this.remoteSessionText = RemoteAuthService.buildResultMessage(record, session);
            this.collaboration = DistributedAuthService.publishAuthResult(record, nearby);
        }, 800);
    }
    private reset(): void {
        this.status = 'unauthenticated';
        this.progress = 0;
        this.resultText = '等待发起认证';
        this.hasLatestRecord = false;
        this.remoteSessionText = 'OpenHarmony Phone 发起认证，OpenHarmony Tablet 展示结果';
        this.collaboration = DistributedAuthService.syncAuthState('unauthenticated');
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
                    let componentCall = new PageTitleBar(this, { title: '无感认证', subtitle: '设备靠近、身份核验、风险评估、跨端同步' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AuthPage.ets", line: 124, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '无感认证',
                            subtitle: '设备靠近、身份核验、风险评估、跨端同步'
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
            Column.create({ space: 14 });
            Column.padding(18);
            Column.backgroundColor(AppColors.hero);
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('认证流程状态');
            Text.fontSize(19);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.resultText);
            Text.fontSize(13);
            Text.fontColor('#D7EEF7');
            Text.lineHeight(20);
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        Column.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new StatusBadge(this, { text: this.status === 'unauthenticated' ? '未认证' : this.status === 'authenticating' ? '认证中' : this.status === 'success' ? '成功' : '失败', status: this.status }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AuthPage.ets", line: 141, col: 13 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: this.status === 'unauthenticated' ? '未认证' : this.status === 'authenticating' ? '认证中' : this.status === 'success' ? '成功' : '失败',
                            status: this.status
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
            Progress.create({ value: this.progress, total: 100, type: ProgressType.Linear });
            Progress.color(AppColors.accent);
            Progress.height(8);
        }, Progress);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.width('100%');
        }, Row);
        this.FlowStep.bind(this)('设备发现', this.progress >= 20);
        this.FlowStep.bind(this)('身份核验', this.progress >= 42);
        this.FlowStep.bind(this)('风险评估', this.progress >= 82);
        this.FlowStep.bind(this)('结果同步', this.progress >= 100);
        Row.pop();
        Column.pop();
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
            Text.create('分布式协同接口');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(AppColors.text);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.remoteSessionText} · ${FormatUtil.layoutModeLabel(this.collaboration.layoutMode)}`);
            Text.fontSize(12);
            Text.fontColor(AppColors.muted);
            Text.lineHeight(18);
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        Column.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new StatusBadge(this, { text: this.collaboration.channel, status: this.collaboration.status }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AuthPage.ets", line: 173, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: this.collaboration.channel,
                            status: this.collaboration.status
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
            Grid.create();
            Grid.columnsTemplate('1fr 1fr');
            Grid.columnsGap(12);
            Grid.rowsGap(12);
        }, Grid);
        {
            const itemCreation2 = (elmtId, isInitialRender) => {
                GridItem.create(() => { }, false);
            };
            const observedDeepRender = () => {
                this.observeComponentCreation2(itemCreation2, GridItem);
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
                            let componentCall = new SectionHeader(this, { title: '认证方式', subtitle: '选择本次无感认证能力' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AuthPage.ets", line: 184, col: 15 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    title: '认证方式',
                                    subtitle: '选择本次无感认证能力'
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
                            __Common__.create();
                            __Common__.onClick(() => {
                                this.method = item;
                            });
                        }, __Common__);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new FeatureCard(this, {
                                        title: FormatUtil.methodLabel(item),
                                        subtitle: item === 'trusted_device' ? '可信设备自动通过' : item === 'qrcode' ? '扫码完成身份核验' : '蓝牙/近场模拟识别',
                                        marker: this.methodMarker(item),
                                        active: this.method === item
                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AuthPage.ets", line: 186, col: 17 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            title: FormatUtil.methodLabel(item),
                                            subtitle: item === 'trusted_device' ? '可信设备自动通过' : item === 'qrcode' ? '扫码完成身份核验' : '蓝牙/近场模拟识别',
                                            marker: this.methodMarker(item),
                                            active: this.method === item
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
                    };
                    this.forEachUpdateFunction(elmtId, this.methods, forEachItemGenFunction, (item: AuthMethod) => item, false, false);
                }, ForEach);
                ForEach.pop();
                Column.pop();
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
                            let componentCall = new SectionHeader(this, { title: '校园场景', subtitle: this.locationForScene(this.scene) }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AuthPage.ets", line: 204, col: 15 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    title: '校园场景',
                                    subtitle: this.locationForScene(this.scene)
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
                            __Common__.create();
                            __Common__.onClick(() => {
                                this.scene = item;
                            });
                        }, __Common__);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new FeatureCard(this, {
                                        title: FormatUtil.sceneLabel(item),
                                        subtitle: this.locationForScene(item),
                                        marker: this.sceneMarker(item),
                                        active: this.scene === item
                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AuthPage.ets", line: 206, col: 17 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            title: FormatUtil.sceneLabel(item),
                                            subtitle: this.locationForScene(item),
                                            marker: this.sceneMarker(item),
                                            active: this.scene === item
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
                    };
                    this.forEachUpdateFunction(elmtId, this.scenes, forEachItemGenFunction, (item: CampusScene) => item, false, false);
                }, ForEach);
                ForEach.pop();
                Column.pop();
                GridItem.pop();
            };
            observedDeepRender();
        }
        Grid.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.padding(16);
            Column.backgroundColor(AppColors.surface);
            Column.borderRadius(8);
            Column.border({ width: 1, color: AppColors.border });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SectionHeader(this, { title: '协同设备', subtitle: this.collaboration.message }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AuthPage.ets", line: 228, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '协同设备',
                            subtitle: this.collaboration.message
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
                    Row.padding(12);
                    Row.backgroundColor(AppColors.surfaceSoft);
                    Row.borderRadius(8);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(FormatUtil.deviceTypeLabel(item.type).substring(0, 1));
                    Text.fontSize(15);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor(item.trusted ? '#FFFFFF' : AppColors.primary);
                    Text.textAlign(TextAlign.Center);
                    Text.width(38);
                    Text.height(38);
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
                    Text.fontSize(15);
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor(AppColors.text);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`${FormatUtil.deviceTypeLabel(item.type)} · ${item.trusted ? '可信设备' : '普通设备'} · ${item.online ? '在线' : '离线'}`);
                    Text.fontSize(12);
                    Text.fontColor(AppColors.muted);
                    Text.margin({ top: 4 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`${FormatUtil.distributedRoleLabel(item.distributedRole)} · ${DeviceTrustManager.label(item.trust.level)} ${item.trust.score}`);
                    Text.fontSize(12);
                    Text.fontColor(AppColors.muted);
                    Text.margin({ top: 4 });
                }, Text);
                Text.pop();
                Column.pop();
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new StatusBadge(this, { text: DeviceTrustManager.label(item.trust.level), status: DeviceTrustManager.badgeStatus(item.trust.level) }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AuthPage.ets", line: 257, col: 15 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    text: DeviceTrustManager.label(item.trust.level),
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
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.devices, forEachItemGenFunction, (item: CampusDevice) => item.id, false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.hasLatestRecord) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create({ space: 10 });
                        Column.width('100%');
                        Column.padding(16);
                        Column.backgroundColor(AppColors.surface);
                        Column.borderRadius(8);
                        Column.border({ width: 1, color: AppColors.border });
                    }, Column);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new SectionHeader(this, { title: '认证结果', subtitle: `${this.latestRecord.location} · ${FormatUtil.sceneLabel(this.latestRecord.scene)}` }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AuthPage.ets", line: 272, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        title: '认证结果',
                                        subtitle: `${this.latestRecord.location} · ${FormatUtil.sceneLabel(this.latestRecord.scene)}`
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
                        Row.create();
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`风险评分 ${this.latestRecord.risk.riskScore}`);
                        Text.fontSize(18);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor(AppColors.text);
                        Text.layoutWeight(1);
                    }, Text);
                    Text.pop();
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new StatusBadge(this, { text: FormatUtil.riskLabel(this.latestRecord.risk.riskLevel), status: this.latestRecord.risk.riskLevel }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AuthPage.ets", line: 279, col: 15 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        text: FormatUtil.riskLabel(this.latestRecord.risk.riskLevel),
                                        status: this.latestRecord.risk.riskLevel
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
                        Text.create(this.latestRecord.risk.riskReason);
                        Text.fontSize(13);
                        Text.fontColor(AppColors.muted);
                        Text.lineHeight(19);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.latestRecord.risk.suggestion);
                        Text.fontSize(12);
                        Text.fontColor(AppColors.primary);
                        Text.lineHeight(18);
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('开始认证');
            Button.layoutWeight(1);
            Button.height(48);
            Button.backgroundColor(AppColors.primary);
            Button.borderRadius(8);
            Button.onClick(() => this.startAuthentication());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('重新认证');
            Button.layoutWeight(1);
            Button.height(48);
            Button.fontColor(AppColors.primary);
            Button.backgroundColor(AppColors.cyanSoft);
            Button.borderRadius(8);
            Button.onClick(() => this.reset());
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('查看认证记录');
            Button.width('100%');
            Button.height(44);
            Button.fontColor(AppColors.primary);
            Button.backgroundColor(AppColors.surface);
            Button.borderRadius(8);
            Button.border({ width: 1, color: AppColors.border });
            Button.onClick(() => router.pushUrl({ url: AppRoutes.records }));
        }, Button);
        Button.pop();
        Column.pop();
        Scroll.pop();
    }
    FlowStep(title: string, completed: boolean, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.width(10);
            Blank.height(10);
            Blank.backgroundColor(completed ? AppColors.accent : AppColors.borderStrong);
            Blank.borderRadius(5);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(11);
            Text.fontColor(completed ? '#FFFFFF' : '#B9C8D6');
            Text.margin({ top: 6 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "AuthPage";
    }
}
registerNamedRoute(() => new AuthPage(undefined, {}), "", { bundleName: "com.example.campusauth", moduleName: "entry", pagePath: "pages/AuthPage", pageFullPath: "entry/src/main/ets/pages/AuthPage", integratedHsp: "false", moduleType: "followWithHap" });
