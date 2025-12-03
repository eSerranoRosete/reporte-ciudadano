import { Accordion, AccordionItem, Button, Textarea } from "@heroui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useCounter } from "@uidotdev/usehooks";
import { AccordionTitle } from "../../components/AccordionTitle";

export const Route = createFileRoute("/reportar-bache/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [count, { increment, set }] = useCounter(1, {
		min: 1,
		max: 3,
	});

	return (
		<div className="flex flex-col gap-2 grow">
			<h1 className="text-2xl font-semibold text-center mb-3">
				Reportar Bache
			</h1>
			<Accordion variant="splitted" selectedKeys={[String(count)]}>
				<AccordionItem
					key={1}
					onPress={() => set(1)}
					aria-label="Ubicacion"
					title={
						<AccordionTitle
							title="1. Agrega la ubicacion"
							isCompleted={count > 1}
						/>
					}
				>
					<div className="w-full aspect-video bg-default-200 rounded-xl"></div>
					<Button
						className="w-full mt-2 bg-[#971438] text-white"
						onPress={increment}
					>
						Siguiente
					</Button>
				</AccordionItem>
				<AccordionItem
					key={2}
					onPress={() => set(2)}
					aria-label="Imagenes"
					title={
						<AccordionTitle
							title="2. Agrega tus imagenes"
							isCompleted={count > 2}
						/>
					}
				>
					<div className="bg-default-100 border border-divider rounded-2xl border-dashed p-4 flex items-center justify-center flex-col gap-2">
						<Button variant="flat">Seleccionar Imagenes</Button>
						<span>o</span>
						<Button variant="flat">Tomar Foto</Button>
					</div>
					<Button
						className="w-full mt-2 bg-[#971438] text-white"
						onPress={increment}
					>
						Siguiente
					</Button>
				</AccordionItem>
				<AccordionItem
					key={3}
					onPress={() => set(3)}
					aria-label="Comentarios"
					title={
						<AccordionTitle
							title="3. Agrega tus comentarios"
							isCompleted={count >= 3}
						/>
					}
				>
					<Textarea placeholder="Ejemplo: El bache esta pegado a la banqueta del lado derecho." />
					<Button className="w-full mt-2 bg-[#971438] text-white">
						Enviar Reporte
					</Button>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
