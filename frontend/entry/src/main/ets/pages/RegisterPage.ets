import router from '@ohos.router';
import promptAction from '@ohos.promptAction';
import { PageTitleBar } from '../components/PageTitleBar';
import { RegisterRequest, RegisterResponse, RegisterRole } from '../models/User';
import { AuthService } from '../services/AuthService';
import { AppColors, AppLayout, AppRoutes } from '../utils/Constants';
import { FormatUtil } from '../utils/FormatUtil';

@Entry
@Component
struct RegisterPage {
  @State username: string = '';
  @State password: string = '';
  @State confirmPassword: string = '';
  @State realName: string = '';
  @State userCode: string = '';
  @State role: RegisterRole = 'student';
  @State phone: string = '';
  @State email: string = '';
  @State submitting: boolean = false;
  @State tipMessage: string = '管理员账号由系统预置或后台创建';
  @State submitButtonHover: boolean = false;
  @State loginButtonHover: boolean = false;
  @State roleButtonHover: string = '';
  private roles: RegisterRole[] = ['student', 'teacher'];

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

  build() {
    Scroll() {
      Column({ space: 18 }) {
        PageTitleBar({ title: '用户注册', subtitle: '创建校园认证账号' })

        Column({ space: 12 }) {
          Text('创建校园认证账号')
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FFFFFF')
          Text('注册成功后可使用用户名和密码登录，角色权限将自动进入对应学生端或教师端。')
            .fontSize(13)
            .fontColor('#D7EEF7')
            .lineHeight(20)
        }
        .width('100%')
        .alignItems(HorizontalAlign.Start)
        .padding(18)
        .backgroundColor(AppColors.hero)
        .borderRadius(8)

        Column({ space: 14 }) {
          this.FormInput('用户名', '请输入 4 到 20 位用户名', this.username, false)
          this.FormInput('密码', '请输入不少于 6 位密码', this.password, true)
          this.FormInput('确认密码', '请再次输入密码', this.confirmPassword, true)
          this.FormInput('姓名', '请输入真实姓名', this.realName, false)
          this.FormInput('学号/工号', '请输入学号或工号', this.userCode, false)

          Column() {
            Text('选择角色')
              .fontSize(13)
              .fontColor(AppColors.muted)
              .width('100%')
              .margin({ bottom: 8 })
            Row({ space: 10 }) {
              ForEach(this.roles, (item: RegisterRole) => {
                Button(FormatUtil.roleLabel(item))
                  .layoutWeight(1)
                  .height(42)
                  .fontSize(14)
                  .fontColor((this.role === item || this.roleButtonHover === item) ? '#FFFFFF' : AppColors.primary)
                  .backgroundColor((this.role === item || this.roleButtonHover === item) ? AppColors.accent : AppColors.cyanSoft)
                  .borderRadius(8)
                  .shadow({
                    radius: this.roleButtonHover === item ? 10 : 2,
                    color: this.roleButtonHover === item ? '#22000000' : '#08000000',
                    offsetX: 0,
                    offsetY: this.roleButtonHover === item ? 4 : 1
                  })
                  .scale({ x: this.roleButtonHover === item ? 1.03 : 1, y: this.roleButtonHover === item ? 1.03 : 1 })
                  .animation({ duration: 150, curve: Curve.EaseOut })
                  .hoverEffect(HoverEffect.Highlight)
                  .onHover((isHover: boolean) => {
                    this.roleButtonHover = isHover ? item : '';
                  })
                  .onClick(() => {
                    this.role = item;
                  })
              }, (item: RegisterRole): string => item)
            }
            .width('100%')
          }

          this.FormInput('手机号', '选填，例如 13800138000', this.phone, false)
          this.FormInput('邮箱', '选填，例如 user@example.com', this.email, false)

          Text(this.tipMessage)
            .fontSize(12)
            .fontColor(this.tipMessage.includes('失败') || this.tipMessage.includes('不') || this.tipMessage.includes('请输入') ? AppColors.danger : AppColors.primary)
            .lineHeight(18)
            .width('100%')

          Button(this.submitting ? '正在注册...' : '注册')
            .width('100%')
            .height(50)
            .fontSize(16)
            .fontWeight(FontWeight.Medium)
            .fontColor('#FFFFFF')
            .backgroundColor(this.submitting ? AppColors.borderStrong : (this.submitButtonHover ? AppColors.accent : AppColors.primary))
            .borderRadius(8)
            .shadow({
              radius: this.submitButtonHover ? 14 : 4,
              color: this.submitButtonHover ? '#26000000' : '#10000000',
              offsetX: 0,
              offsetY: this.submitButtonHover ? 5 : 2
            })
            .scale({ x: this.submitButtonHover ? 1.02 : 1, y: this.submitButtonHover ? 1.02 : 1 })
            .animation({ duration: 150, curve: Curve.EaseOut })
            .hoverEffect(HoverEffect.Highlight)
            .onHover((isHover: boolean) => {
              this.submitButtonHover = isHover && !this.submitting;
            })
            .onClick(() => {
              this.submit();
            })

          Button('已有账号？去登录')
            .width('100%')
            .height(44)
            .fontSize(14)
            .fontColor(this.loginButtonHover ? '#FFFFFF' : AppColors.primary)
            .backgroundColor(this.loginButtonHover ? AppColors.accent : AppColors.cyanSoft)
            .borderRadius(8)
            .shadow({
              radius: this.loginButtonHover ? 12 : 3,
              color: this.loginButtonHover ? '#22000000' : '#0A000000',
              offsetX: 0,
              offsetY: this.loginButtonHover ? 4 : 1
            })
            .scale({ x: this.loginButtonHover ? 1.02 : 1, y: this.loginButtonHover ? 1.02 : 1 })
            .animation({ duration: 150, curve: Curve.EaseOut })
            .hoverEffect(HoverEffect.Highlight)
            .onHover((isHover: boolean) => {
              this.loginButtonHover = isHover;
            })
            .onClick(() => {
              this.goLogin();
            })
        }
        .width('100%')
        .padding(18)
        .backgroundColor(AppColors.surface)
        .borderRadius(8)
        .border({ width: 1, color: AppColors.border })
      }
      .width('100%')
      .constraintSize({ maxWidth: AppLayout.pageMaxWidth })
      .alignSelf(ItemAlign.Center)
      .padding({ left: AppLayout.pagePadding, right: AppLayout.pagePadding, bottom: 32 })
    }
    .backgroundColor(AppColors.background)
  }

  @Builder
  FormInput(label: string, placeholder: string, value: string, passwordMode: boolean) {
    Column() {
      Text(label)
        .fontSize(13)
        .fontColor(AppColors.muted)
        .width('100%')
        .margin({ bottom: 8 })
      TextInput({ placeholder: placeholder, text: value })
        .height(48)
        .fontSize(15)
        .type(passwordMode ? InputType.Password : InputType.Normal)
        .backgroundColor(AppColors.surfaceSoft)
        .borderRadius(8)
        .border({ width: 1, color: AppColors.border })
        .padding({ left: 12, right: 12 })
        .onChange((text: string) => {
          if (label === '用户名') {
            this.username = text;
          } else if (label === '密码') {
            this.password = text;
          } else if (label === '确认密码') {
            this.confirmPassword = text;
          } else if (label === '姓名') {
            this.realName = text;
          } else if (label === '学号/工号') {
            this.userCode = text;
          } else if (label === '手机号') {
            this.phone = text;
          } else {
            this.email = text;
          }
        })
    }
    .width('100%')
  }
}
