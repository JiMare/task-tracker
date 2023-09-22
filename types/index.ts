import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Task = {
  id: number;
  name: string;
  created: string;
  time: string;
};