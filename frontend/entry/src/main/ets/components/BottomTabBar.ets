export interface BottomTabItem {
  id: string;
  title: string;
}

@Component
export struct BottomTabBar {
  activeId: string = 'service';
  items: BottomTabItem[] = [
    { id: 'today', title: '今日' },
    { id: 'message', title: '讯息' },
    { id: 'service', title: '服务' },
    { id: 'campus', title: '校园' },
    { id: 'me', title: '我的' }
  ];

  build() {
    Row() {
      ForEach(this.items, (item: BottomTabItem) => {
        Text(item.title)
          .fontSize(20)
          .fontWeight(this.activeId === item.id ? FontWeight.Bold : FontWeight.Regular)
          .fontColor(this.activeId === item.id ? '#111827' : '#A0A0A0')
          .textAlign(TextAlign.Center)
          .layoutWeight(1)
      }, (item: BottomTabItem): string => item.id)
    }
    .width('100%')
    .height(72)
    .padding({ left: 8, right: 8 })
    .backgroundColor('#FFFFFF')
    .border({ width: { top: 1 }, color: '#EEEEEE' })
  }
}
