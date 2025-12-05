import { useQueryClient } from "@tanstack/react-query";

export interface Credentials {
  apI_Key: string;
  sessionId: string;
  idUser: string;
  token: string;
}

export function useCredentials() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(["auth"]) as Credentials;
}
