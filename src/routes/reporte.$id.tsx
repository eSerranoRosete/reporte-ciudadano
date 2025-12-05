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
		const found = tiposReporte.data?.find((item: any) => item.id_Objeto === id);
		if (!found) throw new Error("data not found");

		return found;
	}, [tiposReporte.data, id]);

	console.log(reporteData);

	return (
		<div>
			<ReporteForm reporteId={id} title={`Reportar ${reporteData.nombre}`} />
		</div>
	);
}
