import {
  FireTruckIcon,
  PipeWrenchIcon,
  TrafficConeIcon,
  TrafficSignIcon,
  WavesIcon,
} from "@phosphor-icons/react";
import { createFileRoute, Link, type ToOptions } from "@tanstack/react-router";
import type { ElementType } from "react";

interface IFNavItem {
  label: string;
  Icon: ElementType;
  to: ToOptions["to"];
}

const navItems: IFNavItem[] = [
  {
    label: "Reportar un bache",
    Icon: TrafficConeIcon,
    to: "/reportar-bache",
  },
  {
    label: "Reportar fuga de agua",
    Icon: PipeWrenchIcon,
    to: "/reportar-fuga",
  },
  {
    label: "Reportar socabon",
    Icon: TrafficSignIcon,
    to: "/reportar-socabon",
  },
  {
    label: "Reportar encharcamiento",
    Icon: WavesIcon,
    to: "/reportar-encharcamiento",
  },
  {
    label: "Solicitar desazolve",
    Icon: FireTruckIcon,
    to: "/solicitar-desazolve",
  },
];

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 gap-y-10">
        {navItems.map(({ label, Icon, to }) => (
          <Link key={to} to={to} className="flex flex-col items-center gap-2">
            <div className="w-2/3 bg-[#813349] aspect-square rounded-full flex items-center justify-center text-white">
              <Icon className="size-1/2" weight="duotone" />
            </div>
            <span className="text-sm font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
