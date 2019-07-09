import { Omit } from './';

/**
 * Asserts the type of a variable by checking if the given property exists on the given variable
 * @param varToBeChecked Variable to assert type of
 * @param propertyToCheckFor Function checks for the existence of this property
 * @return boolean, but also asserts type for the TS compiler
 */
export const isOfType = <P, T extends P>(
  varToBeChecked: P,
  propertyToCheckFor: keyof Omit<T, keyof P>
): varToBeChecked is T => {
  return (varToBeChecked as T)[propertyToCheckFor] !== undefined;
};