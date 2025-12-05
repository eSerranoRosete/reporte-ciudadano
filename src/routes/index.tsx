import {
  FireTruckIcon,
  PipeIcon,
  PipeWrenchIcon,
  WavesIcon,
} from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import type { ElementType } from "react";
import type { Credentials } from "../hooks/useCredentials";
import { useTipoReporte } from "../hooks/useTipoReporte";
import { apiRequest } from "../lib/api";
import { queryClient } from "../providers";

interface IFContent {
  Icon: ElementType;
}

const icons: { [id: string]: IFContent } = {
  "eadcafa0-cd2a-463a-9552-9bac604d3b66": {
    Icon: FireTruckIcon,
  },
  "ca855b02-f03d-4357-a369-aa61e8700424": {
    Icon: PipeWrenchIcon,
  },
  "008c0918-58c7-4d7a-a795-226a67e02860": {
    Icon: WavesIcon,
  },
  "81ea2542-23e9-4492-9070-83f4d7964b25": {
    Icon: PipeIcon,
  },
};

export const Route = createFileRoute("/")({
  component: RouteComponent,
  beforeLoad: async () => {
    const credentials = (await queryClient.getQueryData([
      "auth",
    ])) as Credentials;

    await queryClient.fetchQuery({
      queryKey: ["tipo-reporte"],
      queryFn: async () => {
        const res = await apiRequest(
          "/Agua/Tipo_Reporte_Ciudadano_Agua_Devuelve",
          {
            apI_Key: credentials.apI_Key,
            idUser: credentials.idUser,
            sessionId: credentials.sessionId,
          },
          credentials.token,
          "auth",
        );

        if (!res.ok) throw new Error("Auth Failed");

        return await res.json();
      },
    });
  },
});

function RouteComponent() {
  const tipoReporteQuery = useTipoReporte();

  return (
    <>
      <div className="grid grid-cols-2 gap-4 gap-y-10">
        {tipoReporteQuery.data?.map((item: any) => {
          const data = icons[item.id_Objeto];
          const Icon = data.Icon;

          return (
            <Link
              key={item.id_Objeto}
              to="/reporte/$id"
              params={{ id: item.id_Objeto }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-2/3 bg-[#813349] aspect-square rounded-full flex items-center justify-center text-white">
                <Icon className="size-1/2" weight="duotone" />
              </div>
              <span className="text-sm font-medium">{item.nombre}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
