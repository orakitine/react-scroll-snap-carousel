/**
 * Takes a number and returns an array counting up to that number.
 * @param amount number
 * @returns number[]
 */
export const count = (amount: number) => {
    const rangeArr = [];
    for (let i = 0; i < amount; i++) {
      rangeArr.push(i);
    }
    return rangeArr;
  };