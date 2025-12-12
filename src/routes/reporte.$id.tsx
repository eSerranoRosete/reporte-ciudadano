import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { ReporteForm } from "../components/ReporteForm";
import { useTipoReporte } from "../hooks/useTipoReporte";

export const Route = createFileRoute("/reporte/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();

	const tiposReporte = useTipoReporte();

	const reporteData = useMemo(() => {
		const found = tiposReporte.data?.find(
			(item: any) => item.id_Tipo_Reporte_Ciudadano_Agua === id,
		);

		if (!found) return;

		return found;
	}, [tiposReporte.data, id]);

	if (tiposReporte.isLoading) return "Loading...";

	return (
		<div>
			<ReporteForm reporteId={id} title={`Reportar ${reporteData.nombre}`} />
		</div>
	);
}
