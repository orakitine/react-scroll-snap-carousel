export const getElementVerticalCenterInParent = (element: Element, parent: Element) => {
  const elementRect = element.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();
  return elementRect.top - parentRect.top + elementRect.height / 2;
};
