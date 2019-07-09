import * as React from "react";
import { IconProps } from "./icon.types";

const ChevronLeft = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21.125">
    <path d="M8.525 10.525l7.3-7.3a2 2 0 0 0 0-2.7 2 2 0 0 0-2.7 0l-8.6 8.7a2 2 0 0 0 0 2.7l8.6 8.6a1.936 1.936 0 0 0 1.3.6 1.612 1.612 0 0 0 1.3-.6 2 2 0 0 0 0-2.7z" />
  </svg>
);
const ChevronRight = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21.125">
    <path d="M12.475 10.6l-7.3 7.3a2 2 0 0 0 0 2.7 2 2 0 0 0 2.7 0l8.6-8.7a2 2 0 0 0 0-2.7L7.875.6a1.936 1.936 0 0 0-1.3-.6 1.612 1.612 0 0 0-1.3.6 2 2 0 0 0 0 2.7z" />
  </svg>
);

const X = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792">
    <path
      d="M1528.811 315.924l-52.735-52.735L896 843.266 315.924 263.189l-52.735 52.735L843.266 896l-580.077
    580.076 52.735 52.735L896 948.734l580.076 580.077 52.735-52.735L948.734 896z"
    />
  </svg>
);

export const Icon = ({ name, ...props }: IconProps) => {
  switch (name) {
    case "chevron-right":
      return ChevronRight;
    case "chevron-left":
      return ChevronLeft;
    default:
      return X;
  }
};

Icon.displayName = "Icon";
