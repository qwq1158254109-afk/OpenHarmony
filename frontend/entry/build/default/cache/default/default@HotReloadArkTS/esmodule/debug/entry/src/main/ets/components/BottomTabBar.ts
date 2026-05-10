if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface BottomTabBar_Params {
    activeId?: string;
    items?: BottomTabItem[];
}
export interface BottomTabItem {
    id: string;
    title: string;
}
export class BottomTabBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.activeId = 'service';
        this.items = [
            { id: 'today', title: '今日' },
            { id: 'message', title: '讯息' },
            { id: 'service', title: '服务' },
            { id: 'campus', title: '校园' },
            { id: 'me', title: '我的' }
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: BottomTabBar_Params) {
        if (params.activeId !== undefined) {
            this.activeId = params.activeId;
        }
        if (params.items !== undefined) {
            this.items = params.items;
        }
    }
    updateStateVars(params: BottomTabBar_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private activeId: string;
    private items: BottomTabItem[];
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(72);
            Row.padding({ left: 8, right: 8 });
            Row.backgroundColor('#FFFFFF');
            Row.border({ width: { top: 1 }, color: '#EEEEEE' });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.title);
                    Text.fontSize(20);
                    Text.fontWeight(this.activeId === item.id ? FontWeight.Bold : FontWeight.Regular);
                    Text.fontColor(this.activeId === item.id ? '#111827' : '#A0A0A0');
                    Text.textAlign(TextAlign.Center);
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.items, forEachItemGenFunction, (item: BottomTabItem): string => item.id, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
