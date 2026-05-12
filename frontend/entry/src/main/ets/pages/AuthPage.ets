import router from '@ohos.router';
import { FeatureCard } from '../components/FeatureCard';
import { PageTitleBar } from '../components/PageTitleBar';
import { SectionHeader } from '../components/SectionHeader';
import { StatusBadge } from '../components/StatusBadge';
import { AuthMethod, AuthRecord, AuthStatus, CampusScene } from '../models/Auth';
import { CampusDevice } from '../models/Device';
import { UserProfile } from '../models/User';
import { DeviceTrustManager } from '../services/DeviceTrustManager';
import { DeviceService } from '../services/DeviceService';
import { CollaborationState, DistributedAuthService } from '../services/DistributedAuthService';
import { MockData } from '../services/MockData';
import { RemoteAuthService } from '../services/RemoteAuthService';
import { AppColors, AppLayout, AppRoutes } from '../utils/Constants';
import { FormatUtil } from '../utils/FormatUtil';
import { AuthSessionService } from '../services/AuthSessionService';
import { PermissionUtil } from '../utils/PermissionUtil';

@Entry
@Component
struct AuthPage {
  @State user: UserProfile = MockData.users[0];
  @State method: AuthMethod = 'trusted_device';
  @State scene: CampusScene = 'classroom_checkin';
  @State hasSelectedMethod: boolean = false;
  @State hasSelectedScene: boolean = false;
  @State status: AuthStatus = 'unauthenticated';
  @State resultText: string = '等待发起认证';
  @State progress: number = 0;
  @State hasLatestRecord: boolean = false;
  @State latestRecord: AuthRecord = MockData.records[0];
  @State collaboration: CollaborationState = DistributedAuthService.syncAuthState('unauthenticated');
  @State remoteSessionText: string = 'OpenHarmony Phone 发起认证，OpenHarmony Tablet 展示结果';
  @State devices: CampusDevice[] = [];
  private methods: AuthMethod[] = ['trusted_device', 'qrcode', 'nearby_bluetooth'];
  private scenes: CampusScene[] = ['attendance', 'lab_access', 'library_entry', 'classroom_checkin'];

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

  private methodActive(method: AuthMethod): boolean {
    return this.hasSelectedMethod && this.method === method;
  }

  private sceneActive(scene: CampusScene): boolean {
    return this.hasSelectedScene && this.scene === scene;
  }

  private sceneSubtitle(): string {
    return this.hasSelectedScene ? this.locationForScene(this.scene) : '请选择校园认证场景';
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

  build() {
    Scroll() {
      Column({ space: 18 }) {
        PageTitleBar({ title: '无感认证', subtitle: '设备靠近、身份核验、风险评估、跨端同步' })

        Column({ space: 14 }) {
          Row() {
            Column() {
              Text('认证流程状态')
                .fontSize(19)
                .fontWeight(FontWeight.Bold)
                .fontColor('#FFFFFF')
              Text(this.resultText)
                .fontSize(13)
                .fontColor('#D7EEF7')
                .lineHeight(20)
                .margin({ top: 8 })
            }
            .alignItems(HorizontalAlign.Start)
            .layoutWeight(1)
            StatusBadge({ text: this.status === 'unauthenticated' ? '未认证' : this.status === 'authenticating' ? '认证中' : this.status === 'success' ? '成功' : '失败', status: this.status })
          }
          .width('100%')
          Progress({ value: this.progress, total: 100, type: ProgressType.Linear })
            .color(AppColors.accent)
            .height(8)
          Row({ space: 8 }) {
            this.FlowStep('设备发现', this.progress >= 20)
            this.FlowStep('身份核验', this.progress >= 42)
            this.FlowStep('风险评估', this.progress >= 82)
            this.FlowStep('结果同步', this.progress >= 100)
          }
          .width('100%')
        }
        .padding(18)
        .backgroundColor(AppColors.hero)
        .borderRadius(8)

        Row() {
          Column() {
            Text('分布式协同接口')
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
              .fontColor(AppColors.text)
            Text(`${this.remoteSessionText} · ${FormatUtil.layoutModeLabel(this.collaboration.layoutMode)}`)
              .fontSize(12)
              .fontColor(AppColors.muted)
              .lineHeight(18)
              .margin({ top: 5 })
          }
          .alignItems(HorizontalAlign.Start)
          .layoutWeight(1)
          StatusBadge({ text: this.collaboration.channel, status: this.collaboration.status })
        }
        .width('100%')
        .padding(14)
        .backgroundColor(AppColors.surface)
        .borderRadius(8)
        .border({ width: 1, color: AppColors.border })

        Grid() {
          GridItem() {
            Column({ space: 12 }) {
              SectionHeader({ title: '认证方式', subtitle: '选择本次无感认证能力' })
              ForEach(this.methods, (item: AuthMethod) => {
                FeatureCard({
                  title: FormatUtil.methodLabel(item),
                  subtitle: item === 'trusted_device' ? '可信设备自动通过' : item === 'qrcode' ? '扫码完成身份核验' : '蓝牙/近场模拟识别',
                  marker: this.methodMarker(item),
                  active: this.methodActive(item)
                })
                  .onClick(() => {
                    this.method = item;
                    this.hasSelectedMethod = true;
                  })
              }, (item: AuthMethod) => item)
            }
            .padding(16)
            .backgroundColor(AppColors.surface)
            .borderRadius(8)
            .border({ width: 1, color: AppColors.border })
          }
          GridItem() {
            Column({ space: 12 }) {
              SectionHeader({ title: '校园场景', subtitle: this.sceneSubtitle() })
              ForEach(this.scenes, (item: CampusScene) => {
                FeatureCard({
                  title: FormatUtil.sceneLabel(item),
                  subtitle: this.locationForScene(item),
                  marker: this.sceneMarker(item),
                  active: this.sceneActive(item)
                })
                  .onClick(() => {
                    this.scene = item;
                    this.hasSelectedScene = true;
                  })
              }, (item: CampusScene) => item)
            }
            .padding(16)
            .backgroundColor(AppColors.surface)
            .borderRadius(8)
            .border({ width: 1, color: AppColors.border })
          }
        }
        .columnsTemplate('1fr 1fr')
        .columnsGap(12)
        .rowsGap(12)

        Column({ space: 10 }) {
          SectionHeader({ title: '协同设备', subtitle: this.collaboration.message })
          ForEach(this.devices, (item: CampusDevice) => {
            Row() {
              Text(FormatUtil.deviceTypeLabel(item.type).substring(0, 1))
                .fontSize(15)
                .fontWeight(FontWeight.Bold)
                .fontColor(item.trusted ? '#FFFFFF' : AppColors.primary)
                .textAlign(TextAlign.Center)
                .width(38)
                .height(38)
                .backgroundColor(item.trusted ? AppColors.primary : AppColors.cyanSoft)
                .borderRadius(8)
              Column() {
                Text(item.name)
                  .fontSize(15)
                  .fontWeight(FontWeight.Medium)
                  .fontColor(AppColors.text)
                Text(`${FormatUtil.deviceTypeLabel(item.type)} · ${item.trusted ? '可信设备' : '普通设备'} · ${item.online ? '在线' : '离线'}`)
                  .fontSize(12)
                  .fontColor(AppColors.muted)
                  .margin({ top: 4 })
                Text(`${FormatUtil.distributedRoleLabel(item.distributedRole)} · ${DeviceTrustManager.label(item.trust.level)} ${item.trust.score}`)
                  .fontSize(12)
                  .fontColor(AppColors.muted)
                  .margin({ top: 4 })
              }
              .alignItems(HorizontalAlign.Start)
              .layoutWeight(1)
              .margin({ left: 12 })
              StatusBadge({ text: DeviceTrustManager.label(item.trust.level), status: DeviceTrustManager.badgeStatus(item.trust.level) })
            }
            .width('100%')
            .padding(12)
            .backgroundColor(AppColors.surfaceSoft)
            .borderRadius(8)
          }, (item: CampusDevice) => item.id)
        }
        .padding(16)
        .backgroundColor(AppColors.surface)
        .borderRadius(8)
        .border({ width: 1, color: AppColors.border })

        if (this.hasLatestRecord) {
          Column({ space: 10 }) {
            SectionHeader({ title: '认证结果', subtitle: `${this.latestRecord.location} · ${FormatUtil.sceneLabel(this.latestRecord.scene)}` })
            Row() {
              Text(`风险评分 ${this.latestRecord.risk.riskScore}`)
                .fontSize(18)
                .fontWeight(FontWeight.Bold)
                .fontColor(AppColors.text)
                .layoutWeight(1)
              StatusBadge({ text: FormatUtil.riskLabel(this.latestRecord.risk.riskLevel), status: this.latestRecord.risk.riskLevel })
            }
            Text(this.latestRecord.risk.riskReason)
              .fontSize(13)
              .fontColor(AppColors.muted)
              .lineHeight(19)
            Text(this.latestRecord.risk.suggestion)
              .fontSize(12)
              .fontColor(AppColors.primary)
              .lineHeight(18)
          }
          .width('100%')
          .padding(16)
          .backgroundColor(AppColors.surface)
          .borderRadius(8)
          .border({ width: 1, color: AppColors.border })
        }

        Row({ space: 12 }) {
          Button('开始认证')
            .layoutWeight(1)
            .height(48)
            .backgroundColor(AppColors.primary)
            .borderRadius(8)
            .onClick(() => this.startAuthentication())
          Button('重新认证')
            .layoutWeight(1)
            .height(48)
            .fontColor(AppColors.primary)
            .backgroundColor(AppColors.cyanSoft)
            .borderRadius(8)
            .onClick(() => this.reset())
        }

        Button('查看认证记录')
          .width('100%')
          .height(44)
          .fontColor(AppColors.primary)
          .backgroundColor(AppColors.surface)
          .borderRadius(8)
          .border({ width: 1, color: AppColors.border })
          .onClick(() => router.pushUrl({ url: AppRoutes.records }))
      }
      .width('100%')
      .constraintSize({ maxWidth: AppLayout.pageMaxWidth })
      .alignSelf(ItemAlign.Center)
      .padding({ left: AppLayout.pagePadding, right: AppLayout.pagePadding, bottom: 30 })
    }
    .backgroundColor(AppColors.background)
  }

  @Builder
  FlowStep(title: string, completed: boolean) {
    Column() {
      Blank()
        .width(10)
        .height(10)
        .backgroundColor(completed ? AppColors.accent : AppColors.borderStrong)
        .borderRadius(5)
      Text(title)
        .fontSize(11)
        .fontColor(completed ? '#FFFFFF' : '#B9C8D6')
        .margin({ top: 6 })
    }
    .layoutWeight(1)
    .alignItems(HorizontalAlign.Center)
  }
}
