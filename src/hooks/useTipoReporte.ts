import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";

export function useTipoReporte() {
  return useQuery({
    queryKey: ["tipo-reporte"],
    queryFn: async () => {
      const res = await apiRequest(
        "/App_Agua/Tipo_Reporte_Ciudadano_Devuelve",
        {
          apI_Key: "4682CA29-8F9F-4C44-82CC-D92FA5EB2BB2",
        },
      );

      if (!res.ok) throw new Error("Fetch Failed");

      return await res.json();
    },
  });
}
