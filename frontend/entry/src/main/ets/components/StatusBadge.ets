import { AuthStatus } from '../models/Auth';
import { RiskLevel } from '../models/Risk';
import { AppColors } from '../utils/Constants';

@Component
export struct StatusBadge {
  text: string = '';
  status: AuthStatus | RiskLevel = 'unauthenticated';

  private color(): string {
    if (this.status === 'success' || this.status === 'low') {
      return AppColors.success;
    }
    if (this.status === 'failed' || this.status === 'high') {
      return AppColors.danger;
    }
    if (this.status === 'authenticating' || this.status === 'medium') {
      return AppColors.warning;
    }
    return AppColors.muted;
  }

  private fillColor(): string {
    if (this.status === 'success' || this.status === 'low') {
      return AppColors.successSoft;
    }
    if (this.status === 'failed' || this.status === 'high') {
      return AppColors.dangerSoft;
    }
    if (this.status === 'authenticating' || this.status === 'medium') {
      return AppColors.warningSoft;
    }
    return AppColors.surfaceSoft;
  }

  build() {
    Row({ space: 6 }) {
      Blank()
        .width(6)
        .height(6)
        .backgroundColor(this.color())
        .borderRadius(3)
      Text(this.text)
        .fontSize(12)
        .fontWeight(FontWeight.Medium)
        .fontColor(this.color())
    }
      .padding({ left: 9, right: 9, top: 5, bottom: 5 })
      .backgroundColor(this.fillColor())
      .borderRadius(8)
      .border({ width: 1, color: this.color() })
  }
}
