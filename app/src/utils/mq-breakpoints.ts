
export const BP_SMALL = 'sm';
export const BP_MEDIUM = 'md';
export const BP_LARGE = 'lg';
export const BP_X_LARGE = 'xl';

const MQ_SCREEN_MEDIUM_LOWER_BOUND = 600;
const MQ_SCREEN_LARGE_LOWER_BOUND = 960;
const MQ_SCREEN_EXTRA_LARGE_LOWER_BOUND = 1201;

export type BreakpointKey = typeof BP_SMALL | typeof BP_MEDIUM | typeof BP_LARGE | typeof BP_X_LARGE;

export const getCurrentMediaQueryBreakpoint = (): BreakpointKey => {
  if (typeof window === 'undefined' && typeof document === 'undefined') {
    return BP_SMALL;
  }

  const width: number = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  if (width < MQ_SCREEN_MEDIUM_LOWER_BOUND) {
    return BP_SMALL;
  } else if (width < MQ_SCREEN_LARGE_LOWER_BOUND) {
    return BP_MEDIUM;
  } else if (width < MQ_SCREEN_EXTRA_LARGE_LOWER_BOUND) {
    return BP_LARGE;
  }
  return BP_X_LARGE;
};