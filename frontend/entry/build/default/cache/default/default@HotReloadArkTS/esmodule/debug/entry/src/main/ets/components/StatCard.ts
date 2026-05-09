if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface StatCard_Params {
    title?: string;
    value?: string;
    hint?: string;
    color?: string;
}
import { AppColors } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
export class StatCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.title = '';
        this.value = '';
        this.hint = '';
        this.color = AppColors.primary;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: StatCard_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.value !== undefined) {
            this.value = params.value;
        }
        if (params.hint !== undefined) {
            this.hint = params.hint;
        }
        if (params.color !== undefined) {
            this.color = params.color;
        }
    }
    updateStateVars(params: StatCard_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private title: string;
    private value: string;
    private hint: string;
    private color: string;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height(126);
            Column.padding(16);
            Column.alignItems(HorizontalAlign.Start);
            Column.backgroundColor(AppColors.surface);
            Column.borderRadius(8);
            Column.border({ width: 1, color: AppColors.border });
            Column.shadow({ radius: 10, color: '#100F5068', offsetX: 0, offsetY: 4 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.title);
            Text.fontSize(13);
            Text.fontColor(AppColors.muted);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.width(8);
            Blank.height(26);
            Blank.backgroundColor(this.color);
            Blank.borderRadius(4);
        }, Blank);
        Blank.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.value);
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.color);
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.hint);
            Text.fontSize(12);
            Text.fontColor(AppColors.muted);
            Text.lineHeight(18);
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
