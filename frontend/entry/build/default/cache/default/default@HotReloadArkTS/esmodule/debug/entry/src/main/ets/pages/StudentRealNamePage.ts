if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface StudentRealNamePage_Params {
    state?: PageLoadState;
    profile?: RealNameProfile;
}
import { PageTitleBar } from "@bundle:com.example.campusauth/entry/ets/components/PageTitleBar";
import { StatePanel } from "@bundle:com.example.campusauth/entry/ets/components/StatePanel";
import type { PageLoadState, RealNameProfile } from '../models/CampusPortal';
import type { UserProfile } from '../models/User';
import { AuthSessionService } from "@bundle:com.example.campusauth/entry/ets/services/AuthSessionService";
import { PortalMockService } from "@bundle:com.example.campusauth/entry/ets/services/PortalMockService";
import { AppColors, AppLayout, AppRoutes } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
import { PermissionUtil } from "@bundle:com.example.campusauth/entry/ets/utils/PermissionUtil";
class StudentRealNamePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__state = new ObservedPropertySimplePU('loading', this, "state");
        this.__profile = new ObservedPropertyObjectPU(PortalMockService.realNameProfile(), this, "profile");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: StudentRealNamePage_Params) {
        if (params.state !== undefined) {
            this.state = params.state;
        }
        if (params.profile !== undefined) {
            this.profile = params.profile;
        }
    }
    updateStateVars(params: StudentRealNamePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__state.purgeDependencyOnElmtId(rmElmtId);
        this.__profile.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__state.aboutToBeDeleted();
        this.__profile.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __state: ObservedPropertySimplePU<PageLoadState>;
    get state() {
        return this.__state.get();
    }
    set state(newValue: PageLoadState) {
        this.__state.set(newValue);
    }
    private __profile: ObservedPropertyObjectPU<RealNameProfile>;
    get profile() {
        return this.__profile.get();
    }
    set profile(newValue: RealNameProfile) {
        this.__profile.set(newValue);
    }
    aboutToAppear(): void {
        if (!PermissionUtil.ensurePageAccess(AppRoutes.studentRealName)) {
            return;
        }
        const currentUser: UserProfile | undefined = AuthSessionService.currentUser();
        this.profile = PortalMockService.realNameProfile(currentUser);
        this.state = this.profile.studentId.length === 0 ? 'empty' : 'ready';
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.backgroundColor(AppColors.background);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.width('100%');
            Column.constraintSize({ maxWidth: AppLayout.pageMaxWidth });
            Column.alignSelf(ItemAlign.Center);
            Column.padding({ left: AppLayout.pagePadding, right: AppLayout.pagePadding, bottom: 30 });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PageTitleBar(this, { title: '身份认证状态', subtitle: '展示本人实名身份、学院、专业和认证来源' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/StudentRealNamePage.ets", line: 28, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '身份认证状态',
                            subtitle: '展示本人实名身份、学院、专业和认证来源'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "PageTitleBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.state !== 'ready') {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new StatePanel(this, { state: this.state, emptyText: '暂无实名信息', errorText: '实名信息加载失败' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/StudentRealNamePage.ets", line: 30, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        state: this.state,
                                        emptyText: '暂无实名信息',
                                        errorText: '实名信息加载失败'
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "StatePanel" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create({ space: 14 });
                        Column.width('100%');
                        Column.padding(18);
                        Column.backgroundColor(AppColors.surface);
                        Column.borderRadius(8);
                        Column.border({ width: 1, color: AppColors.border });
                        Column.shadow({ radius: 12, color: '#120F5068', offsetX: 0, offsetY: 4 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.profile.name);
                        Text.fontSize(30);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor(AppColors.text);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.profile.status);
                        Text.fontSize(14);
                        Text.fontColor(AppColors.success);
                        Text.padding({ left: 10, right: 10, top: 6, bottom: 6 });
                        Text.backgroundColor(AppColors.successSoft);
                        Text.borderRadius(8);
                    }, Text);
                    Text.pop();
                    this.InfoRow.bind(this)('学号', this.profile.studentId);
                    this.InfoRow.bind(this)('学院', this.profile.college);
                    this.InfoRow.bind(this)('专业班级', this.profile.major);
                    this.InfoRow.bind(this)('认证来源', this.profile.credential);
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
    }
    InfoRow(label: string, value: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ top: 8, bottom: 8 });
            Row.border({ width: { bottom: 1 }, color: AppColors.border });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.fontSize(13);
            Text.fontColor(AppColors.muted);
            Text.width(78);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(value);
            Text.fontSize(15);
            Text.fontColor(AppColors.text);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "StudentRealNamePage";
    }
}
registerNamedRoute(() => new StudentRealNamePage(undefined, {}), "", { bundleName: "com.example.campusauth", moduleName: "entry", pagePath: "pages/StudentRealNamePage", pageFullPath: "entry/src/main/ets/pages/StudentRealNamePage", integratedHsp: "false", moduleType: "followWithHap" });
