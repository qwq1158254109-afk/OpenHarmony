if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FeatureCard_Params {
    title?: string;
    subtitle?: string;
    marker?: string;
    active?: boolean;
}
import { AppColors } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
export class FeatureCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.title = '';
        this.subtitle = '';
        this.marker = '';
        this.active = false;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FeatureCard_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.subtitle !== undefined) {
            this.subtitle = params.subtitle;
        }
        if (params.marker !== undefined) {
            this.marker = params.marker;
        }
        if (params.active !== undefined) {
            this.active = params.active;
        }
    }
    updateStateVars(params: FeatureCard_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private title: string;
    private subtitle: string;
    private marker: string;
    private active: boolean;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(86);
            Row.padding(12);
            Row.backgroundColor(this.active ? '#F2FAFD' : AppColors.surface);
            Row.borderRadius(8);
            Row.border({ width: 1, color: this.active ? AppColors.accent : AppColors.border });
            Row.shadow({ radius: 10, color: '#120F5068', offsetX: 0, offsetY: 4 });
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.marker);
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.active ? '#FFFFFF' : AppColors.primary);
            Text.textAlign(TextAlign.Center);
            Text.width(38);
            Text.height(38);
            Text.backgroundColor(this.active ? AppColors.primary : AppColors.cyanSoft);
            Text.borderRadius(8);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
            Column.margin({ left: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.title);
            Text.fontSize(15);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(AppColors.text);
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.subtitle);
            Text.fontSize(12);
            Text.fontColor(AppColors.muted);
            Text.lineHeight(17);
            Text.margin({ top: 4 });
            Text.maxLines(2);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
