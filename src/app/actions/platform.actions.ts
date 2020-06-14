import { createAction, props } from '@ngrx/store';

/// Breakpoints 
/* $ld - xs: 0px;
$ld - sm: 576px;
$ld - md: 768px;
$ld - lg: 992px;
$ld - xl: 1200px;
$ld - xxl: 1800px; */ // not part of ionic
export enum Viewport {
    XS = "xs",
    SM = "sm",
    MD = "md",
    LG = "lg",
    XL = "xl",
    XXL = "xxl"
}
// this will be used as a state
export interface Platform {
    viewport: Viewport
    width?: number
    height?: number
    url?: string
    isLandscape?: boolean
    isPortrait?: boolean
    isDesktop?: boolean
    isMobile?: boolean
    isPwa?: boolean
    isAndroid?: boolean
    platforms?: string[]
}

export const resize = createAction('[Platform ] Viewport-Update',
    props<{ viewport: Viewport }>()
);
export const updatePlatform = createAction('[Platform]- Udate',
    props<{ platform: Platform }>()
)
