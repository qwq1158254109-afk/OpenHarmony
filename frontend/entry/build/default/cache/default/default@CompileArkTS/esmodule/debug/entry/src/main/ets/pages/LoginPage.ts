if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LoginPage_Params {
    account?: string;
    password?: string;
    role?: UserRole;
    errorMessage?: string;
    loginMessage?: string;
    loggingIn?: boolean;
    roles?: UserRole[];
}
import router from "@ohos:router";
import promptAction from "@ohos:promptAction";
import { FeatureCard } from "@bundle:com.example.campusauth/entry/ets/components/FeatureCard";
import type { LoginResult } from '../models/User';
import { AuthService } from "@bundle:com.example.campusauth/entry/ets/services/AuthService";
import { AuthSessionService } from "@bundle:com.example.campusauth/entry/ets/services/AuthSessionService";
import { AppColors, AppLayout, AppRoutes } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
import { FormatUtil } from "@bundle:com.example.campusauth/entry/ets/utils/FormatUtil";
import type { UserRole } from '../models/User';
class LoginPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__account = new ObservedPropertySimplePU('student001', this, "account");
        this.__password = new ObservedPropertySimplePU('123456', this, "password");
        this.__role = new ObservedPropertySimplePU('student', this, "role");
        this.__errorMessage = new ObservedPropertySimplePU('', this, "errorMessage");
        this.__loginMessage = new ObservedPropertySimplePU('等待登录', this, "loginMessage");
        this.__loggingIn = new ObservedPropertySimplePU(false, this, "loggingIn");
        this.roles = ['student', 'teacher', 'admin'];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LoginPage_Params) {
        if (params.account !== undefined) {
            this.account = params.account;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.role !== undefined) {
            this.role = params.role;
        }
        if (params.errorMessage !== undefined) {
            this.errorMessage = params.errorMessage;
        }
        if (params.loginMessage !== undefined) {
            this.loginMessage = params.loginMessage;
        }
        if (params.loggingIn !== undefined) {
            this.loggingIn = params.loggingIn;
        }
        if (params.roles !== undefined) {
            this.roles = params.roles;
        }
    }
    updateStateVars(params: LoginPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__account.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__role.purgeDependencyOnElmtId(rmElmtId);
        this.__errorMessage.purgeDependencyOnElmtId(rmElmtId);
        this.__loginMessage.purgeDependencyOnElmtId(rmElmtId);
        this.__loggingIn.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__account.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__role.aboutToBeDeleted();
        this.__errorMessage.aboutToBeDeleted();
        this.__loginMessage.aboutToBeDeleted();
        this.__loggingIn.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __account: ObservedPropertySimplePU<string>;
    get account() {
        return this.__account.get();
    }
    set account(newValue: string) {
        this.__account.set(newValue);
    }
    private __password: ObservedPropertySimplePU<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    private __role: ObservedPropertySimplePU<UserRole>;
    get role() {
        return this.__role.get();
    }
    set role(newValue: UserRole) {
        this.__role.set(newValue);
    }
    private __errorMessage: ObservedPropertySimplePU<string>;
    get errorMessage() {
        return this.__errorMessage.get();
    }
    set errorMessage(newValue: string) {
        this.__errorMessage.set(newValue);
    }
    private __loginMessage: ObservedPropertySimplePU<string>;
    get loginMessage() {
        return this.__loginMessage.get();
    }
    set loginMessage(newValue: string) {
        this.__loginMessage.set(newValue);
    }
    private __loggingIn: ObservedPropertySimplePU<boolean>;
    get loggingIn() {
        return this.__loggingIn.get();
    }
    set loggingIn(newValue: boolean) {
        this.__loggingIn.set(newValue);
    }
    private roles: UserRole[];
    aboutToAppear(): void {
        AuthSessionService.initialize();
        const user = AuthSessionService.currentUser();
        if (AuthSessionService.isLoggedIn() && user) {
            router.replaceUrl({ url: AppRoutes.dashboard });
        }
    }
    private submit(): void {
        if (this.loggingIn) {
            return;
        }
        this.loggingIn = true;
        this.errorMessage = '';
        this.loginMessage = '正在登录...';
        setTimeout(() => {
            const result: LoginResult = AuthService.login(this.account, this.password, this.role);
            this.loggingIn = false;
            if (!result.success || !result.user) {
                this.errorMessage = result.message;
                this.loginMessage = '登录失败';
                promptAction.showToast({ message: result.message });
                return;
            }
            AuthSessionService.saveLogin(result.user);
            this.loginMessage = '登录成功';
            promptAction.showToast({ message: '登录成功' });
            router.replaceUrl({ url: AppRoutes.dashboard });
        }, 300);
    }
    private switchRole(item: UserRole): void {
        this.role = item;
        if (item === 'student') {
            this.account = 'student001';
        }
        else if (item === 'teacher') {
            this.account = 'teacher001';
        }
        else {
            this.account = 'admin001';
        }
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
            Column.padding({ left: AppLayout.pagePadding, right: AppLayout.pagePadding, bottom: 32 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.width('100%');
            Column.padding(20);
            Column.backgroundColor(AppColors.hero);
            Column.borderRadius(8);
            Column.margin({ top: 18 });
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
            Text.create('Campus Distributed Authentication System');
            Text.fontSize(13);
            Text.fontColor('#BDEBFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('校园分布式无感身份认证系统');
            Text.fontSize(30);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.margin({ top: 6 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('面向智慧校园的多设备协同认证、设备绑定与 AI 风险评估平台');
            Text.fontSize(14);
            Text.fontColor('#D7EEF7');
            Text.lineHeight(21);
            Text.margin({ top: 10 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('OH');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(AppColors.hero);
            Text.textAlign(TextAlign.Center);
            Text.width(54);
            Text.height(54);
            Text.backgroundColor('#DFF6FF');
            Text.borderRadius(8);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.columnsTemplate('1fr 1fr');
            Grid.columnsGap(12);
            Grid.height(82);
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
                            let componentCall = new FeatureCard(this, { title: '无感认证', subtitle: '靠近设备后自动识别身份', marker: '01', active: true }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/LoginPage.ets", line: 101, col: 15 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    title: '无感认证',
                                    subtitle: '靠近设备后自动识别身份',
                                    marker: '01',
                                    active: true
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "FeatureCard" });
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
                            let componentCall = new FeatureCard(this, { title: '多端协同', subtitle: '手机发起，平板同步结果', marker: '02' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/LoginPage.ets", line: 104, col: 15 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    title: '多端协同',
                                    subtitle: '手机发起，平板同步结果',
                                    marker: '02'
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "FeatureCard" });
                }
                GridItem.pop();
            };
            observedDeepRender();
        }
        Grid.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.width('100%');
            Column.padding(20);
            Column.backgroundColor(AppColors.surface);
            Column.borderRadius(8);
            Column.border({ width: 1, color: AppColors.border });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('登录系统');
            Text.fontSize(22);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(AppColors.text);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '学号 / 工号', text: this.account });
            TextInput.height(50);
            TextInput.fontSize(15);
            TextInput.backgroundColor(AppColors.surfaceSoft);
            TextInput.borderRadius(8);
            TextInput.border({ width: 1, color: AppColors.border });
            TextInput.padding({ left: 12, right: 12 });
            TextInput.onChange((value: string) => {
                this.account = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '密码', text: this.password });
            TextInput.height(50);
            TextInput.fontSize(15);
            TextInput.type(InputType.Password);
            TextInput.backgroundColor(AppColors.surfaceSoft);
            TextInput.borderRadius(8);
            TextInput.border({ width: 1, color: AppColors.border });
            TextInput.padding({ left: 12, right: 12 });
            TextInput.onChange((value: string) => {
                this.password = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.loginMessage);
            Text.fontSize(12);
            Text.fontColor(this.loginMessage === '登录失败' ? AppColors.danger : AppColors.primary);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('选择身份');
            Text.fontSize(13);
            Text.fontColor(AppColors.muted);
            Text.width('100%');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 10 });
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(FormatUtil.roleLabel(item));
                    Button.layoutWeight(1);
                    Button.height(42);
                    Button.fontSize(14);
                    Button.fontColor(this.role === item ? '#FFFFFF' : AppColors.primary);
                    Button.backgroundColor(this.role === item ? AppColors.primary : AppColors.cyanSoft);
                    Button.borderRadius(8);
                    Button.onClick(() => {
                        this.switchRole(item);
                    });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, this.roles, forEachItemGenFunction, (item: UserRole) => item, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.errorMessage.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.errorMessage);
                        Text.fontSize(13);
                        Text.fontColor(AppColors.danger);
                        Text.width('100%');
                        Text.padding(10);
                        Text.backgroundColor(AppColors.dangerSoft);
                        Text.borderRadius(8);
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.loggingIn ? '正在登录...' : '进入智慧校园认证平台');
            Button.width('100%');
            Button.height(50);
            Button.fontSize(16);
            Button.fontWeight(FontWeight.Medium);
            Button.backgroundColor(this.loggingIn ? AppColors.borderStrong : AppColors.primary);
            Button.borderRadius(8);
            Button.onClick(() => {
                this.submit();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('测试账号：student001 / teacher001 / admin001，密码均为 123456');
            Text.fontSize(12);
            Text.fontColor(AppColors.muted);
            Text.lineHeight(18);
            Text.width('100%');
        }, Text);
        Text.pop();
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "LoginPage";
    }
}
registerNamedRoute(() => new LoginPage(undefined, {}), "", { bundleName: "com.example.campusauth", moduleName: "entry", pagePath: "pages/LoginPage", pageFullPath: "entry/src/main/ets/pages/LoginPage", integratedHsp: "false", moduleType: "followWithHap" });
