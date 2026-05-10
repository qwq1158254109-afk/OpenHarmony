export interface CategoryTabItem {
  id: string;
  title: string;
}

@Component
export struct CategoryTabs {
  items: CategoryTabItem[] = [];
  @Prop selectedId: string = '';
  @State localSelectedId: string = '';
  onSelect: (id: string) => void = () => {};

  private activeId(): string {
    return this.localSelectedId.length > 0 ? this.localSelectedId : this.selectedId;
  }

  build() {
    Scroll() {
      Row({ space: 12 }) {
        ForEach(this.items, (item: CategoryTabItem) => {
          Text(item.title)
            .fontSize(17)
            .fontWeight(this.activeId() === item.id ? FontWeight.Medium : FontWeight.Regular)
            .fontColor(this.activeId() === item.id ? '#3F5FD7' : '#111827')
            .textAlign(TextAlign.Center)
            .padding({ left: 20, right: 20, top: 10, bottom: 10 })
            .backgroundColor(this.activeId() === item.id ? '#F5F8FF' : '#F5F5F5')
            .borderRadius(24)
            .border({
              width: this.activeId() === item.id ? 1.5 : 0,
              color: this.activeId() === item.id ? '#3F5FD7' : Color.Transparent
            })
            .onClick(() => {
              this.localSelectedId = item.id;
              this.onSelect(item.id);
            })
        }, (item: CategoryTabItem): string => item.id)
      }
      .padding({ left: 20, right: 20 })
    }
    .width('100%')
    .scrollable(ScrollDirection.Horizontal)
    .scrollBar(BarState.Off)
  }
}
