
export const enum PlatformEnum { width, height, url, isLandscape, isPortrait, isDesktop, isMobile, pwa, android }
export class AppConstants {
    public static get baseURL(): string { return "http://localhost:4200/api"; }
    // public static get platformEnum(): Color { return Color.android }

}
// AppConstants.baseURL;
console.log(AppConstants.baseURL)


