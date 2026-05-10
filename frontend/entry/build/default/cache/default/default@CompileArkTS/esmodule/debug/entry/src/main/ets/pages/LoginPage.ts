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
    loginButtonHover?: boolean;
    registerButtonHover?: boolean;
    roleButtonHover?: string;
    roles?: UserRole[];
}
import router from "@ohos:router";
import promptAction from "@ohos:promptAction";
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
        this.__loginButtonHover = new ObservedPropertySimplePU(false, this, "loginButtonHover");
        this.__registerButtonHover = new ObservedPropertySimplePU(false, this, "registerButtonHover");
        this.__roleButtonHover = new ObservedPropertySimplePU('', this, "roleButtonHover");
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
        if (params.loginButtonHover !== undefined) {
            this.loginButtonHover = params.loginButtonHover;
        }
        if (params.registerButtonHover !== undefined) {
            this.registerButtonHover = params.registerButtonHover;
        }
        if (params.roleButtonHover !== undefined) {
            this.roleButtonHover = params.roleButtonHover;
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
        this.__loginButtonHover.purgeDependencyOnElmtId(rmElmtId);
        this.__registerButtonHover.purgeDependencyOnElmtId(rmElmtId);
        this.__roleButtonHover.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__account.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__role.aboutToBeDeleted();
        this.__errorMessage.aboutToBeDeleted();
        this.__loginMessage.aboutToBeDeleted();
        this.__loggingIn.aboutToBeDeleted();
        this.__loginButtonHover.aboutToBeDeleted();
        this.__registerButtonHover.aboutToBeDeleted();
        this.__roleButtonHover.aboutToBeDeleted();
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
    private __loginButtonHover: ObservedPropertySimplePU<boolean>;
    get loginButtonHover() {
        return this.__loginButtonHover.get();
    }
    set loginButtonHover(newValue: boolean) {
        this.__loginButtonHover.set(newValue);
    }
    private __registerButtonHover: ObservedPropertySimplePU<boolean>;
    get registerButtonHover() {
        return this.__registerButtonHover.get();
    }
    set registerButtonHover(newValue: boolean) {
        this.__registerButtonHover.set(newValue);
    }
    private __roleButtonHover: ObservedPropertySimplePU<string>;
    get roleButtonHover() {
        return this.__roleButtonHover.get();
    }
    set roleButtonHover(newValue: string) {
        this.__roleButtonHover.set(newValue);
    }
    private roles: UserRole[];
    aboutToAppear(): void {
        AuthSessionService.initialize();
        const user = AuthSessionService.currentUser();
        if (AuthSessionService.isLoggedIn() && user) {
            router.replaceUrl({ url: AppRoutes.overview });
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
            router.replaceUrl({ url: AppRoutes.overview });
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
    private goRegister(): void {
        router.pushUrl({ url: AppRoutes.register });
    }
    CapabilityCard(index: string, title: string, desc: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(54);
            Row.alignItems(VerticalAlign.Center);
            Row.padding(7);
            Row.backgroundColor('#FFFFFF');
            Row.borderRadius(12);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(index);
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.textAlign(TextAlign.Center);
            Text.width(34);
            Text.height(34);
            Text.backgroundColor(AppColors.accent);
            Text.borderRadius(10);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
            Column.margin({ left: 8 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(13);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#0F766E');
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.None });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(desc);
            Text.fontSize(10);
            Text.fontColor('#64748B');
            Text.lineHeight(14);
            Text.margin({ top: 2 });
            Text.maxLines(2);
            Text.textOverflow({ overflow: TextOverflow.None });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.backgroundColor(AppColors.background);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.width('100%');
            Column.constraintSize({ maxWidth: AppLayout.pageMaxWidth });
            Column.alignSelf(ItemAlign.Center);
            Column.padding({ left: AppLayout.pagePadding, right: AppLayout.pagePadding, bottom: 32 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height(278);
            Column.justifyContent(FlexAlign.Start);
            Column.padding({ left: 18, right: 18, top: 16, bottom: 16 });
            Column.backgroundColor(AppColors.hero);
            Column.borderRadius(14);
            Column.margin({ top: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.alignItems(VerticalAlign.Top);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Campus Distributed Authentication\nSystem');
            Text.fontSize(11);
            Text.fontColor('#BDEBFF');
            Text.lineHeight(14);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('OH');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(AppColors.hero);
            Text.textAlign(TextAlign.Center);
            Text.width(42);
            Text.height(42);
            Text.backgroundColor('#DDF3FA');
            Text.borderRadius(12);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('校园分布式无感\n身份认证系统');
            Text.fontSize(23);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.lineHeight(30);
            Text.width('100%');
            Text.margin({ top: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('面向智慧校园的多设备协同认证、设备绑定与 AI 风险评估平台');
            Text.fontSize(12);
            Text.fontColor('#CDE7EF');
            Text.lineHeight(18);
            Text.margin({ top: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 10 });
            Row.width('100%');
            Row.margin({ top: 14 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.CapabilityCard.bind(this)('01', '无感认证', '靠近设备自动识别');
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.CapabilityCard.bind(this)('02', '多端协同', '手机发起设备联动');
        Column.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor(AppColors.surface);
            Column.borderRadius(8);
            Column.border({ width: 1, color: AppColors.border });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('登录系统');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(AppColors.text);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '学号 / 工号', text: this.account });
            TextInput.height(46);
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
            TextInput.height(46);
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
                    globalThis.Context.animation({ duration: 150, curve: Curve.EaseOut });
                    Button.layoutWeight(1);
                    Button.height(38);
                    Button.fontSize(14);
                    Button.fontColor((this.role === item || this.roleButtonHover === item) ? '#FFFFFF' : AppColors.primary);
                    Button.backgroundColor((this.role === item || this.roleButtonHover === item) ? AppColors.accent : AppColors.cyanSoft);
                    Button.borderRadius(8);
                    Button.shadow({
                        radius: this.roleButtonHover === item ? 10 : 2,
                        color: this.roleButtonHover === item ? '#22000000' : '#08000000',
                        offsetX: 0,
                        offsetY: this.roleButtonHover === item ? 4 : 1
                    });
                    Button.scale({ x: this.roleButtonHover === item ? 1.03 : 1, y: this.roleButtonHover === item ? 1.03 : 1 });
                    globalThis.Context.animation(null);
                    Button.hoverEffect(HoverEffect.Highlight);
                    Button.onHover((isHover: boolean) => {
                        this.roleButtonHover = isHover ? item : '';
                    });
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
            globalThis.Context.animation({ duration: 150, curve: Curve.EaseOut });
            Button.width('100%');
            Button.height(46);
            Button.fontSize(15);
            Button.fontWeight(FontWeight.Medium);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor(this.loggingIn ? AppColors.borderStrong : (this.loginButtonHover ? AppColors.accent : AppColors.primary));
            Button.borderRadius(8);
            Button.shadow({
                radius: this.loginButtonHover ? 14 : 4,
                color: this.loginButtonHover ? '#26000000' : '#10000000',
                offsetX: 0,
                offsetY: this.loginButtonHover ? 5 : 2
            });
            Button.scale({ x: this.loginButtonHover ? 1.02 : 1, y: this.loginButtonHover ? 1.02 : 1 });
            globalThis.Context.animation(null);
            Button.hoverEffect(HoverEffect.Highlight);
            Button.onHover((isHover: boolean) => {
                this.loginButtonHover = isHover && !this.loggingIn;
            });
            Button.onClick(() => {
                this.submit();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('立即注册');
            globalThis.Context.animation({ duration: 150, curve: Curve.EaseOut });
            Button.width('100%');
            Button.height(40);
            Button.fontSize(14);
            Button.fontColor(this.registerButtonHover ? '#FFFFFF' : AppColors.primary);
            Button.backgroundColor(this.registerButtonHover ? AppColors.accent : AppColors.cyanSoft);
            Button.borderRadius(8);
            Button.shadow({
                radius: this.registerButtonHover ? 12 : 3,
                color: this.registerButtonHover ? '#22000000' : '#0A000000',
                offsetX: 0,
                offsetY: this.registerButtonHover ? 4 : 1
            });
            Button.scale({ x: this.registerButtonHover ? 1.02 : 1, y: this.registerButtonHover ? 1.02 : 1 });
            globalThis.Context.animation(null);
            Button.hoverEffect(HoverEffect.Highlight);
            Button.onHover((isHover: boolean) => {
                this.registerButtonHover = isHover;
            });
            Button.onClick(() => {
                this.goRegister();
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
