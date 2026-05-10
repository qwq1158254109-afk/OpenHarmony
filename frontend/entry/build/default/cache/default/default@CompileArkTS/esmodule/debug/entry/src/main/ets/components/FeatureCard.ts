if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FeatureCard_Params {
    title?: string;
    subtitle?: string;
    marker?: string;
    active?: boolean;
    hover?: boolean;
    selected?: boolean;
    hovered?: boolean;
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
        this.hover = false;
        this.selected = false;
        this.__hovered = new ObservedPropertySimplePU(false, this, "hovered");
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
        if (params.hover !== undefined) {
            this.hover = params.hover;
        }
        if (params.selected !== undefined) {
            this.selected = params.selected;
        }
        if (params.hovered !== undefined) {
            this.hovered = params.hovered;
        }
    }
    updateStateVars(params: FeatureCard_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__hovered.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__hovered.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private title: string;
    private subtitle: string;
    private marker: string;
    private active: boolean;
    private hover: boolean;
    private selected: boolean;
    private __hovered: ObservedPropertySimplePU<boolean>;
    get hovered() {
        return this.__hovered.get();
    }
    set hovered(newValue: boolean) {
        this.__hovered.set(newValue);
    }
    private highlighted(): boolean {
        return this.selected || this.active || this.hover || this.hovered;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            globalThis.Context.animation({ duration: 160, curve: Curve.EaseOut });
            Row.width('100%');
            Row.height(120);
            Row.padding(18);
            Row.backgroundColor(this.highlighted() ? '#EAF8FC' : AppColors.surface);
            Row.borderRadius(16);
            Row.border({ width: this.highlighted() ? 2 : 1, color: this.highlighted() ? AppColors.accent : AppColors.border });
            Row.shadow({
                radius: this.highlighted() ? 14 : 4,
                color: this.highlighted() ? '#22000000' : '#11000000',
                offsetX: 0,
                offsetY: this.highlighted() ? 5 : 2
            });
            Row.scale({ x: this.highlighted() ? 1.02 : 1, y: this.highlighted() ? 1.02 : 1 });
            globalThis.Context.animation(null);
            Row.alignItems(VerticalAlign.Center);
            Row.hoverEffect(HoverEffect.Highlight);
            Row.onHover((isHover: boolean) => {
                this.hovered = isHover;
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.marker);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.highlighted() ? '#FFFFFF' : AppColors.primary);
            Text.textAlign(TextAlign.Center);
            Text.width(48);
            Text.height(48);
            Text.backgroundColor(this.highlighted() ? AppColors.accent : AppColors.cyanSoft);
            Text.borderRadius(12);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
            Column.margin({ left: 14 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.title);
            Text.fontSize(17);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.highlighted() ? '#0F766E' : AppColors.text);
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.subtitle);
            Text.fontSize(13);
            Text.fontColor(AppColors.muted);
            Text.lineHeight(18);
            Text.margin({ top: 6 });
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
