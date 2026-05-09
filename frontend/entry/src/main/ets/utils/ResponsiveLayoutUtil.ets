import { DeviceLayoutMode } from '../models/Device';

export interface ResponsiveLayoutProfile {
  mode: DeviceLayoutMode;
  contentMaxWidth: number;
  mainColumns: string;
  listColumns: string;
  description: string;
}

export class ResponsiveLayoutUtil {
  static phoneProfile(): ResponsiveLayoutProfile {
    return {
      mode: 'phone',
      contentMaxWidth: 520,
      mainColumns: '1fr',
      listColumns: '1fr',
      description: '手机单栏布局，适合认证发起和快速操作'
    };
  }

  static tabletProfile(): ResponsiveLayoutProfile {
    return {
      mode: 'tablet',
      contentMaxWidth: 1040,
      mainColumns: '1fr 1fr',
      listColumns: '1fr 1fr',
      description: '平板双栏布局，适合答辩展示和结果看板'
    };
  }

  static profileOf(mode: DeviceLayoutMode): ResponsiveLayoutProfile {
    if (mode === 'tablet') {
      return ResponsiveLayoutUtil.tabletProfile();
    }
    return ResponsiveLayoutUtil.phoneProfile();
  }
}
