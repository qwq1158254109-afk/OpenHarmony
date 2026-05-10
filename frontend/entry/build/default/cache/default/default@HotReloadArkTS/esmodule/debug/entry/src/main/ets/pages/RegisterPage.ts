if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface RegisterPage_Params {
    username?: string;
    password?: string;
    confirmPassword?: string;
    realName?: string;
    userCode?: string;
    role?: RegisterRole;
    phone?: string;
    email?: string;
    submitting?: boolean;
    tipMessage?: string;
    submitButtonHover?: boolean;
    loginButtonHover?: boolean;
    roleButtonHover?: string;
    roles?: RegisterRole[];
}
import router from "@ohos:router";
import promptAction from "@ohos:promptAction";
import { PageTitleBar } from "@bundle:com.example.campusauth/entry/ets/components/PageTitleBar";
import type { RegisterRequest, RegisterResponse, RegisterRole } from '../models/User';
import { AuthService } from "@bundle:com.example.campusauth/entry/ets/services/AuthService";
import { AppColors, AppLayout, AppRoutes } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
import { FormatUtil } from "@bundle:com.example.campusauth/entry/ets/utils/FormatUtil";
class RegisterPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__username = new ObservedPropertySimplePU('', this, "username");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.__confirmPassword = new ObservedPropertySimplePU('', this, "confirmPassword");
        this.__realName = new ObservedPropertySimplePU('', this, "realName");
        this.__userCode = new ObservedPropertySimplePU('', this, "userCode");
        this.__role = new ObservedPropertySimplePU('student', this, "role");
        this.__phone = new ObservedPropertySimplePU('', this, "phone");
        this.__email = new ObservedPropertySimplePU('', this, "email");
        this.__submitting = new ObservedPropertySimplePU(false, this, "submitting");
        this.__tipMessage = new ObservedPropertySimplePU('管理员账号由系统预置或后台创建', this, "tipMessage");
        this.__submitButtonHover = new ObservedPropertySimplePU(false, this, "submitButtonHover");
        this.__loginButtonHover = new ObservedPropertySimplePU(false, this, "loginButtonHover");
        this.__roleButtonHover = new ObservedPropertySimplePU('', this, "roleButtonHover");
        this.roles = ['student', 'teacher'];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: RegisterPage_Params) {
        if (params.username !== undefined) {
            this.username = params.username;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.confirmPassword !== undefined) {
            this.confirmPassword = params.confirmPassword;
        }
        if (params.realName !== undefined) {
            this.realName = params.realName;
        }
        if (params.userCode !== undefined) {
            this.userCode = params.userCode;
        }
        if (params.role !== undefined) {
            this.role = params.role;
        }
        if (params.phone !== undefined) {
            this.phone = params.phone;
        }
        if (params.email !== undefined) {
            this.email = params.email;
        }
        if (params.submitting !== undefined) {
            this.submitting = params.submitting;
        }
        if (params.tipMessage !== undefined) {
            this.tipMessage = params.tipMessage;
        }
        if (params.submitButtonHover !== undefined) {
            this.submitButtonHover = params.submitButtonHover;
        }
        if (params.loginButtonHover !== undefined) {
            this.loginButtonHover = params.loginButtonHover;
        }
        if (params.roleButtonHover !== undefined) {
            this.roleButtonHover = params.roleButtonHover;
        }
        if (params.roles !== undefined) {
            this.roles = params.roles;
        }
    }
    updateStateVars(params: RegisterPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__username.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__confirmPassword.purgeDependencyOnElmtId(rmElmtId);
        this.__realName.purgeDependencyOnElmtId(rmElmtId);
        this.__userCode.purgeDependencyOnElmtId(rmElmtId);
        this.__role.purgeDependencyOnElmtId(rmElmtId);
        this.__phone.purgeDependencyOnElmtId(rmElmtId);
        this.__email.purgeDependencyOnElmtId(rmElmtId);
        this.__submitting.purgeDependencyOnElmtId(rmElmtId);
        this.__tipMessage.purgeDependencyOnElmtId(rmElmtId);
        this.__submitButtonHover.purgeDependencyOnElmtId(rmElmtId);
        this.__loginButtonHover.purgeDependencyOnElmtId(rmElmtId);
        this.__roleButtonHover.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__username.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__confirmPassword.aboutToBeDeleted();
        this.__realName.aboutToBeDeleted();
        this.__userCode.aboutToBeDeleted();
        this.__role.aboutToBeDeleted();
        this.__phone.aboutToBeDeleted();
        this.__email.aboutToBeDeleted();
        this.__submitting.aboutToBeDeleted();
        this.__tipMessage.aboutToBeDeleted();
        this.__submitButtonHover.aboutToBeDeleted();
        this.__loginButtonHover.aboutToBeDeleted();
        this.__roleButtonHover.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __username: ObservedPropertySimplePU<string>;
    get username() {
        return this.__username.get();
    }
    set username(newValue: string) {
        this.__username.set(newValue);
    }
    private __password: ObservedPropertySimplePU<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    private __confirmPassword: ObservedPropertySimplePU<string>;
    get confirmPassword() {
        return this.__confirmPassword.get();
    }
    set confirmPassword(newValue: string) {
        this.__confirmPassword.set(newValue);
    }
    private __realName: ObservedPropertySimplePU<string>;
    get realName() {
        return this.__realName.get();
    }
    set realName(newValue: string) {
        this.__realName.set(newValue);
    }
    private __userCode: ObservedPropertySimplePU<string>;
    get userCode() {
        return this.__userCode.get();
    }
    set userCode(newValue: string) {
        this.__userCode.set(newValue);
    }
    private __role: ObservedPropertySimplePU<RegisterRole>;
    get role() {
        return this.__role.get();
    }
    set role(newValue: RegisterRole) {
        this.__role.set(newValue);
    }
    private __phone: ObservedPropertySimplePU<string>;
    get phone() {
        return this.__phone.get();
    }
    set phone(newValue: string) {
        this.__phone.set(newValue);
    }
    private __email: ObservedPropertySimplePU<string>;
    get email() {
        return this.__email.get();
    }
    set email(newValue: string) {
        this.__email.set(newValue);
    }
    private __submitting: ObservedPropertySimplePU<boolean>;
    get submitting() {
        return this.__submitting.get();
    }
    set submitting(newValue: boolean) {
        this.__submitting.set(newValue);
    }
    private __tipMessage: ObservedPropertySimplePU<string>;
    get tipMessage() {
        return this.__tipMessage.get();
    }
    set tipMessage(newValue: string) {
        this.__tipMessage.set(newValue);
    }
    private __submitButtonHover: ObservedPropertySimplePU<boolean>;
    get submitButtonHover() {
        return this.__submitButtonHover.get();
    }
    set submitButtonHover(newValue: boolean) {
        this.__submitButtonHover.set(newValue);
    }
    private __loginButtonHover: ObservedPropertySimplePU<boolean>;
    get loginButtonHover() {
        return this.__loginButtonHover.get();
    }
    set loginButtonHover(newValue: boolean) {
        this.__loginButtonHover.set(newValue);
    }
    private __roleButtonHover: ObservedPropertySimplePU<string>;
    get roleButtonHover() {
        return this.__roleButtonHover.get();
    }
    set roleButtonHover(newValue: string) {
        this.__roleButtonHover.set(newValue);
    }
    private roles: RegisterRole[];
    private goLogin(): void {
        router.replaceUrl({ url: AppRoutes.login });
    }
    private validate(): string {
        const username = this.username.trim();
        const password = this.password.trim();
        const confirmPassword = this.confirmPassword.trim();
        const realName = this.realName.trim();
        const userCode = this.userCode.trim();
        const phone = this.phone.trim();
        const email = this.email.trim();
        if (username.length === 0) {
            return '请输入用户名';
        }
        if (username.length < 4 || username.length > 20) {
            return '用户名长度应为 4 到 20 位';
        }
        if (password.length === 0) {
            return '请输入密码';
        }
        if (password.length < 6) {
            return '密码长度不能少于 6 位';
        }
        if (password !== confirmPassword) {
            return '两次输入的密码不一致';
        }
        if (realName.length === 0) {
            return '请输入姓名';
        }
        if (userCode.length === 0) {
            return '请输入学号/工号';
        }
        if (this.role !== 'student' && this.role !== 'teacher') {
            return '请选择用户角色';
        }
        if (phone.length > 0 && !/^1[3-9]\d{9}$/.test(phone)) {
            return '请输入正确的手机号';
        }
        if (email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return '请输入正确的邮箱';
        }
        return '';
    }
    private submit(): void {
        if (this.submitting) {
            return;
        }
        const errorMessage = this.validate();
        if (errorMessage.length > 0) {
            promptAction.showToast({ message: errorMessage });
            this.tipMessage = errorMessage;
            return;
        }
        this.submitting = true;
        this.tipMessage = '正在提交注册信息...';
        const request: RegisterRequest = {
            username: this.username.trim(),
            password: this.password.trim(),
            realName: this.realName.trim(),
            userCode: this.userCode.trim(),
            role: this.role,
            phone: this.phone.trim(),
            email: this.email.trim()
        };
        AuthService.register(request)
            .then((result: RegisterResponse) => {
            this.submitting = false;
            if (!result.success) {
                this.tipMessage = result.message;
                promptAction.showToast({ message: result.message });
                return;
            }
            promptAction.showToast({ message: '注册成功，请登录' });
            router.replaceUrl({ url: AppRoutes.login });
        })
            .catch((error: Error) => {
            this.submitting = false;
            this.tipMessage = `注册失败：${error.message}`;
            promptAction.showToast({ message: this.tipMessage });
        });
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
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PageTitleBar(this, { title: '用户注册', subtitle: '创建校园认证账号' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/RegisterPage.ets", line: 116, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '用户注册',
                            subtitle: '创建校园认证账号'
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
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
            Column.padding(18);
            Column.backgroundColor(AppColors.hero);
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('创建校园认证账号');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('注册成功后可使用用户名和密码登录，角色权限将自动进入对应学生端或教师端。');
            Text.fontSize(13);
            Text.fontColor('#D7EEF7');
            Text.lineHeight(20);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 14 });
            Column.width('100%');
            Column.padding(18);
            Column.backgroundColor(AppColors.surface);
            Column.borderRadius(8);
            Column.border({ width: 1, color: AppColors.border });
        }, Column);
        this.FormInput.bind(this)('用户名', '请输入 4 到 20 位用户名', this.username, false);
        this.FormInput.bind(this)('密码', '请输入不少于 6 位密码', this.password, true);
        this.FormInput.bind(this)('确认密码', '请再次输入密码', this.confirmPassword, true);
        this.FormInput.bind(this)('姓名', '请输入真实姓名', this.realName, false);
        this.FormInput.bind(this)('学号/工号', '请输入学号或工号', this.userCode, false);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('选择角色');
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
                    Button.height(42);
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
                        this.role = item;
                    });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, this.roles, forEachItemGenFunction, (item: RegisterRole): string => item, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Column.pop();
        this.FormInput.bind(this)('手机号', '选填，例如 13800138000', this.phone, false);
        this.FormInput.bind(this)('邮箱', '选填，例如 user@example.com', this.email, false);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.tipMessage);
            Text.fontSize(12);
            Text.fontColor(this.tipMessage.includes('失败') || this.tipMessage.includes('不') || this.tipMessage.includes('请输入') ? AppColors.danger : AppColors.primary);
            Text.lineHeight(18);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.submitting ? '正在注册...' : '注册');
            globalThis.Context.animation({ duration: 150, curve: Curve.EaseOut });
            Button.width('100%');
            Button.height(50);
            Button.fontSize(16);
            Button.fontWeight(FontWeight.Medium);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor(this.submitting ? AppColors.borderStrong : (this.submitButtonHover ? AppColors.accent : AppColors.primary));
            Button.borderRadius(8);
            Button.shadow({
                radius: this.submitButtonHover ? 14 : 4,
                color: this.submitButtonHover ? '#26000000' : '#10000000',
                offsetX: 0,
                offsetY: this.submitButtonHover ? 5 : 2
            });
            Button.scale({ x: this.submitButtonHover ? 1.02 : 1, y: this.submitButtonHover ? 1.02 : 1 });
            globalThis.Context.animation(null);
            Button.hoverEffect(HoverEffect.Highlight);
            Button.onHover((isHover: boolean) => {
                this.submitButtonHover = isHover && !this.submitting;
            });
            Button.onClick(() => {
                this.submit();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('已有账号？去登录');
            globalThis.Context.animation({ duration: 150, curve: Curve.EaseOut });
            Button.width('100%');
            Button.height(44);
            Button.fontSize(14);
            Button.fontColor(this.loginButtonHover ? '#FFFFFF' : AppColors.primary);
            Button.backgroundColor(this.loginButtonHover ? AppColors.accent : AppColors.cyanSoft);
            Button.borderRadius(8);
            Button.shadow({
                radius: this.loginButtonHover ? 12 : 3,
                color: this.loginButtonHover ? '#22000000' : '#0A000000',
                offsetX: 0,
                offsetY: this.loginButtonHover ? 4 : 1
            });
            Button.scale({ x: this.loginButtonHover ? 1.02 : 1, y: this.loginButtonHover ? 1.02 : 1 });
            globalThis.Context.animation(null);
            Button.hoverEffect(HoverEffect.Highlight);
            Button.onHover((isHover: boolean) => {
                this.loginButtonHover = isHover;
            });
            Button.onClick(() => {
                this.goLogin();
            });
        }, Button);
        Button.pop();
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
    FormInput(label: string, placeholder: string, value: string, passwordMode: boolean, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.fontSize(13);
            Text.fontColor(AppColors.muted);
            Text.width('100%');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: placeholder, text: value });
            TextInput.height(48);
            TextInput.fontSize(15);
            TextInput.type(passwordMode ? InputType.Password : InputType.Normal);
            TextInput.backgroundColor(AppColors.surfaceSoft);
            TextInput.borderRadius(8);
            TextInput.border({ width: 1, color: AppColors.border });
            TextInput.padding({ left: 12, right: 12 });
            TextInput.onChange((text: string) => {
                if (label === '用户名') {
                    this.username = text;
                }
                else if (label === '密码') {
                    this.password = text;
                }
                else if (label === '确认密码') {
                    this.confirmPassword = text;
                }
                else if (label === '姓名') {
                    this.realName = text;
                }
                else if (label === '学号/工号') {
                    this.userCode = text;
                }
                else if (label === '手机号') {
                    this.phone = text;
                }
                else {
                    this.email = text;
                }
            });
        }, TextInput);
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "RegisterPage";
    }
}
registerNamedRoute(() => new RegisterPage(undefined, {}), "", { bundleName: "com.example.campusauth", moduleName: "entry", pagePath: "pages/RegisterPage", pageFullPath: "entry/src/main/ets/pages/RegisterPage", integratedHsp: "false", moduleType: "followWithHap" });
