import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import { useCredentials } from "./useCredentials";

export function useTipoReporte() {
  const credentials = useCredentials();
  return useQuery({
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
      );

      if (!res.ok) throw new Error("Fetch Failed");

      return await res.json();
    },
  });
}
