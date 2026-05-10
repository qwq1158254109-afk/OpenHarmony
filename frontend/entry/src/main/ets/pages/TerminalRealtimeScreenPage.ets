import { PageTitleBar } from '../components/PageTitleBar';
import { StatePanel } from '../components/StatePanel';
import { StatusBadge } from '../components/StatusBadge';
import { PageLoadState, RealtimeAuthEvent } from '../models/CampusPortal';
import { PortalMockService } from '../services/PortalMockService';
import { AppColors, AppLayout, AppRoutes } from '../utils/Constants';
import { FormatUtil } from '../utils/FormatUtil';
import { PermissionUtil } from '../utils/PermissionUtil';

@Entry
@Component
struct TerminalRealtimeScreenPage {
  @State state: PageLoadState = 'loading';
  @State events: RealtimeAuthEvent[] = [];

  aboutToAppear(): void {
    if (!PermissionUtil.ensurePageAccess(AppRoutes.terminalRealtimeScreen)) {
      return;
    }
    this.events = PortalMockService.realtimeEvents();
    this.state = this.events.length === 0 ? 'empty' : 'ready';
  }

  build() {
    Scroll() {
      Column({ space: 16 }) {
        PageTitleBar({ title: '终端实时认证大屏', subtitle: '实时展示终端认证结果、延迟和风险等级' })
        if (this.state !== 'ready') {
          StatePanel({ state: this.state, emptyText: '暂无实时认证事件', errorText: '实时大屏加载失败' })
        } else {
          Row({ space: 12 }) {
            Text('实时认证流')
              .fontSize(24)
              .fontWeight(FontWeight.Bold)
              .fontColor('#FFFFFF')
              .layoutWeight(1)
            Text(`${this.events.length} 条`)
              .fontSize(18)
              .fontWeight(FontWeight.Bold)
              .fontColor('#DFF6FF')
          }
          .width('100%')
          .padding(18)
          .backgroundColor(AppColors.hero)
          .borderRadius(8)
          ForEach(this.events, (item: RealtimeAuthEvent) => {
            Row() {
              Text(item.time)
                .fontSize(16)
                .fontWeight(FontWeight.Bold)
                .fontColor(AppColors.primary)
                .width(82)
              Column() {
                Text(`${item.terminal} · ${item.studentId}`)
                  .fontSize(16)
                  .fontWeight(FontWeight.Bold)
                  .fontColor(AppColors.text)
                Text(`结果 ${item.result} · 延迟 ${item.latency}`)
                  .fontSize(12)
                  .fontColor(AppColors.muted)
                  .margin({ top: 4 })
              }
              .alignItems(HorizontalAlign.Start)
              .layoutWeight(1)
              StatusBadge({ text: FormatUtil.riskLabel(item.riskLevel), status: item.riskLevel })
            }
            .width('100%')
            .padding(14)
            .backgroundColor(AppColors.surface)
            .borderRadius(8)
            .border({ width: 1, color: item.riskLevel === 'high' ? AppColors.danger : AppColors.border })
          }, (item: RealtimeAuthEvent): string => item.id)
        }
      }
      .width('100%')
      .constraintSize({ maxWidth: AppLayout.pageMaxWidth })
      .alignSelf(ItemAlign.Center)
      .padding({ left: AppLayout.pagePadding, right: AppLayout.pagePadding, bottom: 30 })
    }
    .backgroundColor(AppColors.background)
  }
}
