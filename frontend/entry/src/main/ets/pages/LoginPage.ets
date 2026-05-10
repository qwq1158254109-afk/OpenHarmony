import router from '@ohos.router';
import promptAction from '@ohos.promptAction';
import { LoginResult } from '../models/User';
import { AuthService } from '../services/AuthService';
import { AuthSessionService } from '../services/AuthSessionService';
import { AppColors, AppLayout, AppRoutes } from '../utils/Constants';
import { FormatUtil } from '../utils/FormatUtil';
import { UserProfile, UserRole } from '../models/User';

@Entry
@Component
struct LoginPage {
  @State account: string = 'student001';
  @State password: string = '123456';
  @State role: UserRole = 'student';
  @State errorMessage: string = '';
  @State loginMessage: string = '等待登录';
  @State loggingIn: boolean = false;
  @State loginButtonHover: boolean = false;
  @State registerButtonHover: boolean = false;
  @State roleButtonHover: string = '';
  private roles: UserRole[] = ['student', 'teacher', 'admin'];

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
    } else if (item === 'teacher') {
      this.account = 'teacher001';
    } else {
      this.account = 'admin001';
    }
  }

  private goRegister(): void {
    router.pushUrl({ url: AppRoutes.register });
  }

  @Builder
  CapabilityCard(index: string, title: string, desc: string) {
    Row() {
      Text(index)
        .fontSize(14)
        .fontWeight(FontWeight.Bold)
        .fontColor('#FFFFFF')
        .textAlign(TextAlign.Center)
        .width(34)
        .height(34)
        .backgroundColor(AppColors.accent)
        .borderRadius(10)
      Column() {
        Text(title)
          .fontSize(13)
          .fontWeight(FontWeight.Bold)
          .fontColor('#0F766E')
          .maxLines(1)
          .textOverflow({ overflow: TextOverflow.None })
        Text(desc)
          .fontSize(10)
          .fontColor('#64748B')
          .lineHeight(14)
          .margin({ top: 2 })
          .maxLines(2)
          .textOverflow({ overflow: TextOverflow.None })
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
      .margin({ left: 8 })
    }
    .width('100%')
    .height(54)
    .alignItems(VerticalAlign.Center)
    .padding(7)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
  }

  build() {
    Scroll() {
      Column({ space: 12 }) {
        Column() {
          Row() {
            Column() {
              Text('Campus Distributed Authentication\nSystem')
                .fontSize(11)
                .fontColor('#BDEBFF')
                .lineHeight(14)
            }
            .alignItems(HorizontalAlign.Start)
            .layoutWeight(1)
            Text('OH')
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
              .fontColor(AppColors.hero)
              .textAlign(TextAlign.Center)
              .width(42)
              .height(42)
              .backgroundColor('#DDF3FA')
              .borderRadius(12)
          }
          .width('100%')
          .alignItems(VerticalAlign.Top)

          Text('校园分布式无感\n身份认证系统')
            .fontSize(23)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FFFFFF')
            .lineHeight(30)
            .width('100%')
            .margin({ top: 12 })

          Text('面向智慧校园的多设备协同认证、设备绑定与 AI 风险评估平台')
            .fontSize(12)
            .fontColor('#CDE7EF')
            .lineHeight(18)
            .margin({ top: 8 })
            .width('100%')

          Row({ space: 10 }) {
            Column() {
              this.CapabilityCard('01', '无感认证', '靠近设备自动识别')
            }
            .layoutWeight(1)
            Column() {
              this.CapabilityCard('02', '多端协同', '手机发起设备联动')
            }
            .layoutWeight(1)
          }
          .width('100%')
          .margin({ top: 14 })
        }
        .width('100%')
        .height(278)
        .justifyContent(FlexAlign.Start)
        .padding({ left: 18, right: 18, top: 16, bottom: 16 })
        .backgroundColor(AppColors.hero)
        .borderRadius(14)
        .margin({ top: 10 })

        Column({ space: 12 }) {
          Text('登录系统')
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor(AppColors.text)
            .width('100%')

          TextInput({ placeholder: '学号 / 工号', text: this.account })
            .height(46)
            .fontSize(15)
            .backgroundColor(AppColors.surfaceSoft)
            .borderRadius(8)
            .border({ width: 1, color: AppColors.border })
            .padding({ left: 12, right: 12 })
            .onChange((value: string) => {
              this.account = value;
            })

          TextInput({ placeholder: '密码', text: this.password })
            .height(46)
            .fontSize(15)
            .type(InputType.Password)
            .backgroundColor(AppColors.surfaceSoft)
            .borderRadius(8)
            .border({ width: 1, color: AppColors.border })
            .padding({ left: 12, right: 12 })
            .onChange((value: string) => {
              this.password = value;
            })

          Text(this.loginMessage)
            .fontSize(12)
            .fontColor(this.loginMessage === '登录失败' ? AppColors.danger : AppColors.primary)
            .width('100%')

          Column() {
            Text('选择身份')
              .fontSize(13)
              .fontColor(AppColors.muted)
              .width('100%')
              .margin({ bottom: 8 })
            Row({ space: 10 }) {
              ForEach(this.roles, (item: UserRole) => {
                Button(FormatUtil.roleLabel(item))
                  .layoutWeight(1)
                  .height(38)
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
                    this.switchRole(item);
                  })
              }, (item: UserRole) => item)
            }
            .width('100%')
          }

          if (this.errorMessage.length > 0) {
            Text(this.errorMessage)
              .fontSize(13)
              .fontColor(AppColors.danger)
              .width('100%')
              .padding(10)
              .backgroundColor(AppColors.dangerSoft)
              .borderRadius(8)
          }

          Button(this.loggingIn ? '正在登录...' : '进入智慧校园认证平台')
            .width('100%')
            .height(46)
            .fontSize(15)
            .fontWeight(FontWeight.Medium)
            .fontColor('#FFFFFF')
            .backgroundColor(this.loggingIn ? AppColors.borderStrong : (this.loginButtonHover ? AppColors.accent : AppColors.primary))
            .borderRadius(8)
            .shadow({
              radius: this.loginButtonHover ? 14 : 4,
              color: this.loginButtonHover ? '#26000000' : '#10000000',
              offsetX: 0,
              offsetY: this.loginButtonHover ? 5 : 2
            })
            .scale({ x: this.loginButtonHover ? 1.02 : 1, y: this.loginButtonHover ? 1.02 : 1 })
            .animation({ duration: 150, curve: Curve.EaseOut })
            .hoverEffect(HoverEffect.Highlight)
            .onHover((isHover: boolean) => {
              this.loginButtonHover = isHover && !this.loggingIn;
            })
            .onClick(() => {
              this.submit();
            })

          Button('立即注册')
            .width('100%')
            .height(40)
            .fontSize(14)
            .fontColor(this.registerButtonHover ? '#FFFFFF' : AppColors.primary)
            .backgroundColor(this.registerButtonHover ? AppColors.accent : AppColors.cyanSoft)
            .borderRadius(8)
            .shadow({
              radius: this.registerButtonHover ? 12 : 3,
              color: this.registerButtonHover ? '#22000000' : '#0A000000',
              offsetX: 0,
              offsetY: this.registerButtonHover ? 4 : 1
            })
            .scale({ x: this.registerButtonHover ? 1.02 : 1, y: this.registerButtonHover ? 1.02 : 1 })
            .animation({ duration: 150, curve: Curve.EaseOut })
            .hoverEffect(HoverEffect.Highlight)
            .onHover((isHover: boolean) => {
              this.registerButtonHover = isHover;
            })
            .onClick(() => {
              this.goRegister();
            })

          Text('测试账号：student001 / teacher001 / admin001，密码均为 123456')
            .fontSize(12)
            .fontColor(AppColors.muted)
            .lineHeight(18)
            .width('100%')
        }
        .width('100%')
        .padding(16)
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
}
