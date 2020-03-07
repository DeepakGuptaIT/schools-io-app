
export const enum PlatformEnum { width, height, url, isLandscape, isPortrait, isDesktop, isMobile, pwa, android }
export class AppConstants {
    public static get baseURL(): string { return "http://localhost:4200/api"; }
    public static get cssLang(): string[] { return ['css']; }
    public static get tsLang(): string[] { return ['typescript']; }
    public static get jsLang(): string[] { return ['javascript']; }
    public static get javaLang(): string[] { return ['java']; }
    // public static get platformEnum(): Color { return Color.android }

}
// AppConstants.baseURL;
console.log(AppConstants.baseURL)


