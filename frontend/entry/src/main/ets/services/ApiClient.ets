import http from '@ohos.net.http';

export class ApiClient {
  static readonly baseUrl: string = 'http://127.0.0.1:8080';

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

  static postJson(url: string, payload: string): Promise<string> {
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
          expectDataType: http.HttpDataType.STRING
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
}
