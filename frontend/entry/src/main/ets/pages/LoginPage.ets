import router from '@ohos.router';
import promptAction from '@ohos.promptAction';
import { FeatureCard } from '../components/FeatureCard';
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
  private roles: UserRole[] = ['student', 'teacher', 'admin'];

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
    } else if (item === 'teacher') {
      this.account = 'teacher001';
    } else {
      this.account = 'admin001';
    }
  }

  build() {
    Scroll() {
      Column({ space: 18 }) {
        Column({ space: 16 }) {
          Row() {
            Column() {
              Text('Campus Distributed Authentication System')
                .fontSize(13)
                .fontColor('#BDEBFF')
              Text('校园分布式无感身份认证系统')
                .fontSize(30)
                .fontWeight(FontWeight.Bold)
                .fontColor('#FFFFFF')
                .margin({ top: 6 })
              Text('面向智慧校园的多设备协同认证、设备绑定与 AI 风险评估平台')
                .fontSize(14)
                .fontColor('#D7EEF7')
                .lineHeight(21)
                .margin({ top: 10 })
            }
            .alignItems(HorizontalAlign.Start)
            .layoutWeight(1)
            Text('OH')
              .fontSize(18)
              .fontWeight(FontWeight.Bold)
              .fontColor(AppColors.hero)
              .textAlign(TextAlign.Center)
              .width(54)
              .height(54)
              .backgroundColor('#DFF6FF')
              .borderRadius(8)
          }
          .width('100%')

          Grid() {
            GridItem() {
              FeatureCard({ title: '无感认证', subtitle: '靠近设备后自动识别身份', marker: '01', active: true })
            }
            GridItem() {
              FeatureCard({ title: '多端协同', subtitle: '手机发起，平板同步结果', marker: '02' })
            }
          }
          .columnsTemplate('1fr 1fr')
          .columnsGap(12)
          .height(82)
        }
        .width('100%')
        .padding(20)
        .backgroundColor(AppColors.hero)
        .borderRadius(8)
        .margin({ top: 18 })

        Column({ space: 16 }) {
          Text('登录系统')
            .fontSize(22)
            .fontWeight(FontWeight.Bold)
            .fontColor(AppColors.text)
            .width('100%')

          TextInput({ placeholder: '学号 / 工号', text: this.account })
            .height(50)
            .fontSize(15)
            .backgroundColor(AppColors.surfaceSoft)
            .borderRadius(8)
            .border({ width: 1, color: AppColors.border })
            .padding({ left: 12, right: 12 })
            .onChange((value: string) => {
              this.account = value;
            })

          TextInput({ placeholder: '密码', text: this.password })
            .height(50)
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
                  .height(42)
                  .fontSize(14)
                  .fontColor(this.role === item ? '#FFFFFF' : AppColors.primary)
                  .backgroundColor(this.role === item ? AppColors.primary : AppColors.cyanSoft)
                  .borderRadius(8)
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
            .height(50)
            .fontSize(16)
            .fontWeight(FontWeight.Medium)
            .backgroundColor(this.loggingIn ? AppColors.borderStrong : AppColors.primary)
            .borderRadius(8)
            .onClick(() => {
              this.submit();
            })

          Text('测试账号：student001 / teacher001 / admin001，密码均为 123456')
            .fontSize(12)
            .fontColor(AppColors.muted)
            .lineHeight(18)
            .width('100%')
        }
        .width('100%')
        .padding(20)
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
