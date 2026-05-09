import promptAction from '@ohos.promptAction';
import { PageTitleBar } from '../components/PageTitleBar';
import { SectionHeader } from '../components/SectionHeader';
import { StatePanel } from '../components/StatePanel';
import {
  DefenseDemoLog,
  DefenseDemoResult,
  DefenseDemoScenario,
  PageLoadState,
  PortalStatus
} from '../models/CampusPortal';
import { PortalMockService } from '../services/PortalMockService';
import { AppColors, AppLayout } from '../utils/Constants';

@Entry
@Component
struct DefenseDemoPage {
  @State state: PageLoadState = 'loading';
  @State scenarios: DefenseDemoScenario[] = [];
  @State runningId: string = '';
  @State resultTitle: string = '等待演示';
  @State resultSummary: string = '请选择一个演示动作，系统会模拟认证链路、日志和结果。';
  @State resultDetail: string = '演示模式只使用 Mock 数据，不依赖真实设备、门禁或考勤硬件。';
  @State resultStatus: PortalStatus = 'info';
  @State resultTime: string = '--:--:--';
  @State logs: DefenseDemoLog[] = [];

  aboutToAppear(): void {
    this.scenarios = PortalMockService.defenseDemoScenarios();
    this.state = this.scenarios.length === 0 ? 'empty' : 'ready';
  }

  private runScenario(item: DefenseDemoScenario): void {
    if (this.runningId.length > 0) {
      promptAction.showToast({ message: '演示正在执行，请稍候' });
      return;
    }
    this.runningId = item.id;
    this.resultTitle = '正在执行演示';
    this.resultSummary = item.title;
    this.resultDetail = '正在模拟设备发现、风险评估、权限判断和结果同步...';
    this.resultStatus = item.status;
    this.resultTime = '执行中';

    setTimeout(() => {
      const result: DefenseDemoResult = PortalMockService.defenseDemoResult(item.id);
      this.resultTitle = result.title;
      this.resultSummary = result.summary;
      this.resultDetail = result.detail;
      this.resultStatus = result.status;
      this.resultTime = result.timestamp;
      const logItem: DefenseDemoLog = {
        id: `${item.id}-${Date.now()}`,
        scenarioTitle: item.title,
        message: result.detail,
        result: result.summary,
        timestamp: result.timestamp,
        status: result.status
      };
      this.logs = [logItem].concat(this.logs);
      this.runningId = '';
      promptAction.showToast({ message: result.title });
    }, 650);
  }

  private colorOf(status: PortalStatus): string {
    if (status === 'success') {
      return AppColors.success;
    }
    if (status === 'warning') {
      return AppColors.warning;
    }
    if (status === 'danger') {
      return AppColors.danger;
    }
    return AppColors.primary;
  }

  private buttonText(item: DefenseDemoScenario): string {
    if (this.runningId === item.id) {
      return '执行中...';
    }
    return item.buttonText;
  }

  @Builder
  ScenarioCard(item: DefenseDemoScenario) {
    Column({ space: 12 }) {
      Row() {
        Text(item.marker)
          .fontSize(15)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFF')
          .textAlign(TextAlign.Center)
          .width(42)
          .height(42)
          .backgroundColor(this.colorOf(item.status))
          .borderRadius(8)
        Column() {
          Text(item.title)
            .fontSize(17)
            .fontWeight(FontWeight.Bold)
            .fontColor(AppColors.text)
          Text(item.subtitle)
            .fontSize(12)
            .fontColor(AppColors.muted)
            .lineHeight(18)
            .margin({ top: 4 })
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)
        .margin({ left: 12 })
      }
      Button(this.buttonText(item))
        .width('100%')
        .height(42)
        .fontSize(14)
        .fontWeight(FontWeight.Medium)
        .fontColor('#FFFFFF')
        .backgroundColor(this.runningId.length > 0 && this.runningId !== item.id ? AppColors.borderStrong : this.colorOf(item.status))
        .borderRadius(8)
        .onClick(() => this.runScenario(item))
    }
    .width('100%')
    .padding(14)
    .backgroundColor(AppColors.surface)
    .borderRadius(8)
    .border({ width: 1, color: this.colorOf(item.status) })
    .shadow({ radius: 10, color: '#120F5068', offsetX: 0, offsetY: 4 })
  }

  build() {
    Scroll() {
      Column({ space: 18 }) {
        PageTitleBar({ title: '答辩演示模式', subtitle: '一键模拟无感身份认证核心场景，适合现场演示' })

        Column({ space: 10 }) {
          Row() {
            Text(this.resultTitle)
              .fontSize(22)
              .fontWeight(FontWeight.Bold)
              .fontColor('#FFFFFF')
              .layoutWeight(1)
            Text(this.resultTime)
              .fontSize(13)
              .fontColor('#D7EEF7')
          }
          Text(this.resultSummary)
            .fontSize(15)
            .fontColor('#EAF7F0')
            .lineHeight(22)
          Text(this.resultDetail)
            .fontSize(13)
            .fontColor('#D7EEF7')
            .lineHeight(20)
        }
        .width('100%')
        .padding(18)
        .backgroundColor(this.colorOf(this.resultStatus))
        .borderRadius(8)

        if (this.state !== 'ready') {
          StatePanel({ state: this.state, emptyText: '暂无演示动作', errorText: '演示模式加载失败' })
        } else {
          SectionHeader({ title: '一键演示动作', subtitle: '建议从上到下按场景顺序演示' })
          Grid() {
            ForEach(this.scenarios, (item: DefenseDemoScenario) => {
              GridItem() {
                this.ScenarioCard(item)
              }
            }, (item: DefenseDemoScenario): string => item.id)
          }
          .columnsTemplate('1fr 1fr')
          .columnsGap(12)
          .rowsGap(12)
        }

        Column({ space: 12 }) {
          SectionHeader({ title: '演示日志', subtitle: '每次点击都会写入一条 Mock 日志，便于答辩追踪' })
          if (this.logs.length === 0) {
            StatePanel({ state: 'empty', emptyText: '尚未执行演示动作' })
          } else {
            ForEach(this.logs, (item: DefenseDemoLog) => {
              Column({ space: 8 }) {
                Row() {
                  Text(item.scenarioTitle)
                    .fontSize(16)
                    .fontWeight(FontWeight.Bold)
                    .fontColor(AppColors.text)
                    .layoutWeight(1)
                  Text(item.timestamp)
                    .fontSize(12)
                    .fontColor(AppColors.muted)
                }
                Text(item.result)
                  .fontSize(13)
                  .fontColor(this.colorOf(item.status))
                  .lineHeight(19)
                Text(item.message)
                  .fontSize(12)
                  .fontColor(AppColors.muted)
                  .lineHeight(18)
              }
              .width('100%')
              .padding(14)
              .backgroundColor(AppColors.surface)
              .borderRadius(8)
              .border({ width: 1, color: this.colorOf(item.status) })
            }, (item: DefenseDemoLog): string => item.id)
          }
        }
        .width('100%')
      }
      .width('100%')
      .constraintSize({ maxWidth: AppLayout.pageMaxWidth })
      .alignSelf(ItemAlign.Center)
      .padding({ left: AppLayout.pagePadding, right: AppLayout.pagePadding, bottom: 30 })
    }
    .backgroundColor(AppColors.background)
  }
}
