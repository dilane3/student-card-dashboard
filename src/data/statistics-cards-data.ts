import {
  UserIcon,
  UsersIcon,
  PrinterIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import { SVGProps } from "react";

export type ColorsType =
  | "white"
  | "blue-gray"
  | "gray"
  | "brown"
  | "deep-orange"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "light-green"
  | "green"
  | "teal"
  | "cyan"
  | "light-blue"
  | "blue"
  | "indigo"
  | "deep-purple"
  | "purple"
  | "pink"
  | "red";

export type CardTypes =
  | "total_students"
  | "total_males"
  | "total_females"
  | "total_printed"
  | "total_validated";

export interface StatisticType {
  color: ColorsType;
  icon: (
    props: SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    },
  ) => JSX.Element;
  title: string;
  index: CardTypes;
  value: string;
  footer: {
    color: string;
    value: string;
    label: String;
  };
}

export const statisticsCardsData: Array<StatisticType> = [
  {
    color: "purple",
    icon: UsersIcon,
    title: "Total Students",
    value: "3,462",
    index: "total_students",
    footer: {
      color: "text-green-500",
      value: "3,462",
      label: "Total students registered",
    },
  },
  {
    color: "purple",
    icon: UserIcon,
    title: "Male",
    value: "2",
    index: "total_males",
    footer: {
      color: "text-green-500",
      value: "2",
      label: "men registered",
    },
  },
  {
    color: "purple",
    icon: UserIcon,
    title: "Female",
    value: "3,460",
    index: "total_females",
    footer: {
      color: "text-green-500",
      value: "3,460",
      label: "women registered",
    },
  },
  {
    color: "purple",
    icon: PrinterIcon,
    title: "Cards printed",
    value: "3,462",
    index: "total_printed",
    footer: {
      color: "text-green-500",
      value: "3,462",
      label: "Total cards printed",
    },
  },
  {
    color: "purple",
    icon: CheckBadgeIcon,
    title: "Cards validated",
    value: "3,462",
    index: "total_validated",
    footer: {
      color: "text-green-500",
      value: "3,462",
      label: "Total cards validated",
    },
  },
];

export default statisticsCardsData;
