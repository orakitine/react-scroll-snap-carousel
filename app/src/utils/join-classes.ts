/**
 * Takes an arbitrary number of strings and falsey arguments, and builds a
 * string of valid class names.
 * @param ...<string | falsey>
 * @returns string of combined class names
 */
type ClassName = string | undefined | false | null;
export const joinClasses = (...classes: ClassName[]): string => classes.filter(c => Boolean(c)).join(' ');