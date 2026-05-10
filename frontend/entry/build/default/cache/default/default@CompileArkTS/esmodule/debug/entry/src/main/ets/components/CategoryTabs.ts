if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CategoryTabs_Params {
    items?: CategoryTabItem[];
    selectedId?: string;
    localSelectedId?: string;
    onSelect?: (id: string) => void;
}
export interface CategoryTabItem {
    id: string;
    title: string;
}
export class CategoryTabs extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.items = [];
        this.__selectedId = new SynchedPropertySimpleOneWayPU(params.selectedId, this, "selectedId");
        this.__localSelectedId = new ObservedPropertySimplePU('', this, "localSelectedId");
        this.onSelect = () => { };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CategoryTabs_Params) {
        if (params.items !== undefined) {
            this.items = params.items;
        }
        if (params.selectedId === undefined) {
            this.__selectedId.set('');
        }
        if (params.localSelectedId !== undefined) {
            this.localSelectedId = params.localSelectedId;
        }
        if (params.onSelect !== undefined) {
            this.onSelect = params.onSelect;
        }
    }
    updateStateVars(params: CategoryTabs_Params) {
        this.__selectedId.reset(params.selectedId);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectedId.purgeDependencyOnElmtId(rmElmtId);
        this.__localSelectedId.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectedId.aboutToBeDeleted();
        this.__localSelectedId.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private items: CategoryTabItem[];
    private __selectedId: SynchedPropertySimpleOneWayPU<string>;
    get selectedId() {
        return this.__selectedId.get();
    }
    set selectedId(newValue: string) {
        this.__selectedId.set(newValue);
    }
    private __localSelectedId: ObservedPropertySimplePU<string>;
    get localSelectedId() {
        return this.__localSelectedId.get();
    }
    set localSelectedId(newValue: string) {
        this.__localSelectedId.set(newValue);
    }
    private onSelect: (id: string) => void;
    private activeId(): string {
        return this.localSelectedId.length > 0 ? this.localSelectedId : this.selectedId;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.scrollable(ScrollDirection.Horizontal);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
            Row.padding({ left: 20, right: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.title);
                    Text.fontSize(17);
                    Text.fontWeight(this.activeId() === item.id ? FontWeight.Medium : FontWeight.Regular);
                    Text.fontColor(this.activeId() === item.id ? '#3F5FD7' : '#111827');
                    Text.textAlign(TextAlign.Center);
                    Text.padding({ left: 20, right: 20, top: 10, bottom: 10 });
                    Text.backgroundColor(this.activeId() === item.id ? '#F5F8FF' : '#F5F5F5');
                    Text.borderRadius(24);
                    Text.border({
                        width: this.activeId() === item.id ? 1.5 : 0,
                        color: this.activeId() === item.id ? '#3F5FD7' : Color.Transparent
                    });
                    Text.onClick(() => {
                        this.localSelectedId = item.id;
                        this.onSelect(item.id);
                    });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.items, forEachItemGenFunction, (item: CategoryTabItem): string => item.id, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
