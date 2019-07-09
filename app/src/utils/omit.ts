/**
 * Builds a type from T that excludes keys from K.
 * @param T any type
 * @param K keys to remove from T
 * @return type that has all keys of T that are not present in K
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;