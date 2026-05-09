import { PageTitleBar } from '../components/PageTitleBar';
import { StatePanel } from '../components/StatePanel';
import { StatusBadge } from '../components/StatusBadge';
import { PageLoadState, PassageRecordItem } from '../models/CampusPortal';
import { PortalMockService } from '../services/PortalMockService';
import { AppColors, AppLayout } from '../utils/Constants';
import { FormatUtil } from '../utils/FormatUtil';

@Entry
@Component
struct PassageRecordsPage {
  @State state: PageLoadState = 'loading';
  @State records: PassageRecordItem[] = [];

  aboutToAppear(): void {
    this.records = PortalMockService.passageRecords();
    this.state = this.records.length === 0 ? 'empty' : 'ready';
  }

  build() {
    Scroll() {
      Column({ space: 16 }) {
        PageTitleBar({ title: '通行记录', subtitle: '展示学号、设备 ID、认证结果和时间' })
        if (this.state !== 'ready') {
          StatePanel({ state: this.state, emptyText: '暂无通行记录', errorText: '通行记录加载失败' })
        } else {
          ForEach(this.records, (item: PassageRecordItem) => {
            Column({ space: 10 }) {
              Row() {
                Text(item.place)
                  .fontSize(17)
                  .fontWeight(FontWeight.Bold)
                  .fontColor(AppColors.text)
                  .layoutWeight(1)
                StatusBadge({ text: item.result, status: item.riskLevel === 'high' ? 'failed' : 'success' })
              }
              Row({ space: 10 }) {
                Text(`学号：${item.studentId}`)
                  .fontSize(12)
                  .fontColor(AppColors.muted)
                  .layoutWeight(1)
                Text(`设备 ID：${item.deviceId}`)
                  .fontSize(12)
                  .fontColor(AppColors.muted)
                  .layoutWeight(1)
              }
              Row() {
                Text(item.time)
                  .fontSize(12)
                  .fontColor(AppColors.muted)
                  .layoutWeight(1)
                StatusBadge({ text: FormatUtil.riskLabel(item.riskLevel), status: item.riskLevel })
              }
            }
            .width('100%')
            .padding(14)
            .backgroundColor(AppColors.surface)
            .borderRadius(8)
            .border({ width: 1, color: item.riskLevel === 'high' ? AppColors.danger : AppColors.border })
          }, (item: PassageRecordItem): string => item.id)
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
