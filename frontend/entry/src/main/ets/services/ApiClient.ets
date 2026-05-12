import http from '@ohos.net.http';

export class ApiClient {
  static readonly baseUrl: string = 'http://127.0.0.1:8080';
  static readonly emulatorBaseUrl: string = 'http://10.0.2.2:8080';
  private static readonly baseUrls: string[] = [ApiClient.baseUrl, ApiClient.emulatorBaseUrl];

  static loginPath(): string {
    return `${ApiClient.baseUrl}/api/login`;
  }

  static registerPath(): string {
    return `${ApiClient.baseUrl}/api/auth/register`;
  }

  static authVerifyPath(): string {
    return `${ApiClient.baseUrl}/api/auth/verify`;
  }

  static authRecordsPath(): string {
    return `${ApiClient.baseUrl}/api/auth/records`;
  }

  static deviceBindPath(): string {
    return `${ApiClient.baseUrl}/api/device/bind`;
  }

  static riskScorePath(): string {
    return `${ApiClient.baseUrl}/api/risk/score`;
  }

  static riskLogsPath(): string {
    return `${ApiClient.baseUrl}/api/risk/logs`;
  }

  static async postJson(url: string, payload: string): Promise<string> {
    const requestUrls = ApiClient.buildRequestUrls(url);
    let lastMessage = '';
    for (const requestUrl of requestUrls) {
      try {
        const response = await ApiClient.postJsonOnce(requestUrl, payload);
        return response;
      } catch (error) {
        lastMessage = ApiClient.toMessage(error);
      }
    }
    throw new Error(ApiClient.formatConnectionError(lastMessage));
  }

  private static postJsonOnce(url: string, payload: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const request = http.createHttp();
      request.request(
        url,
        {
          method: http.RequestMethod.POST,
          header: {
            'Content-Type': 'application/json'
          },
          extraData: payload,
          expectDataType: http.HttpDataType.STRING,
          connectTimeout: 3000,
          readTimeout: 5000
        },
        (error, response) => {
          request.destroy();
          if (error) {
            reject(new Error(error.message));
            return;
          }
          resolve(String(response.result));
        }
      );
    });
  }

  private static buildRequestUrls(url: string): string[] {
    const path = ApiClient.extractPath(url);
    const urls: string[] = [];
    ApiClient.baseUrls.forEach((baseUrl: string) => {
      const requestUrl = `${baseUrl}${path}`;
      if (!urls.includes(requestUrl)) {
        urls.push(requestUrl);
      }
    });
    if (!urls.includes(url)) {
      urls.push(url);
    }
    return urls;
  }

  private static extractPath(url: string): string {
    for (const baseUrl of ApiClient.baseUrls) {
      if (url.startsWith(baseUrl)) {
        return url.substring(baseUrl.length);
      }
    }
    const protocolIndex = url.indexOf('://');
    if (protocolIndex < 0) {
      return url.startsWith('/') ? url : `/${url}`;
    }
    const pathIndex = url.indexOf('/', protocolIndex + 3);
    return pathIndex >= 0 ? url.substring(pathIndex) : '/';
  }

  private static toMessage(error: Object): string {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }

  private static formatConnectionError(lastMessage: string): string {
    const reason = lastMessage.length > 0 ? `，底层错误：${lastMessage}` : '';
    return `无法连接后端服务，请确认 Rust 后端已启动，并且设备可访问 ${ApiClient.baseUrl} 或 ${ApiClient.emulatorBaseUrl}${reason}`;
  }
}
