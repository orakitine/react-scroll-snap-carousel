/**
 * Takes a value of type T for each breakpoint.
 */
export interface BreakPointProp<T> {
    sm: T;
    md: T;
    lg: T;
    xl: T;
  };