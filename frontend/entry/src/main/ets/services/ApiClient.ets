export class ApiClient {
  static readonly baseUrl: string = 'http://127.0.0.1:8080';

  static loginPath(): string {
    return `${ApiClient.baseUrl}/api/login`;
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
}
