import {
	Accordion,
	AccordionItem,
	Alert,
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Textarea,
	useDisclosure,
} from "@heroui/react";
import { CameraIcon } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useCounter } from "@uidotdev/usehooks";
import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import { AccordionTitle } from "../../components/AccordionTitle";
import { MapComponent } from "../../components/MapComponent";
import { useReporteBacheStore } from "../../context/useReporteBacheStore";

export const Route = createFileRoute("/reportar-bache/")({
	component: RouteComponent,
});

function RouteComponent() {
	const store = useReporteBacheStore();
	const modalControl = useDisclosure();

	const webcamRef = useRef<Webcam>(null);

	const capture = useCallback(() => {
		const imageSrc = webcamRef.current?.getScreenshot(); // base64 image
		console.log(imageSrc);
	}, [webcamRef]);

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
					<Alert
						variant="faded"
						description="Da click en la ubicacion aproximada"
						color="primary"
						className="mb-2"
					/>
					<div className="w-full aspect-video bg-default-200 rounded-xl">
						<MapComponent
							pinCoords={store.location}
							setPinCoords={store.setLocation}
						/>
					</div>
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
					<div className="border border-divider rounded-2xl border-dashed p-4 flex items-center justify-center flex-col gap-2">
						<Input type="file" multiple label="Seleccionar Imagenes" />
						<span>o</span>

						<Button
							variant="flat"
							onPress={modalControl.onOpen}
							startContent={<CameraIcon className="size-5" weight="duotone" />}
							fullWidth
						>
							Tomar Foto
						</Button>

						<Modal
							size="full"
							isOpen={modalControl.isOpen}
							onOpenChange={modalControl.onOpenChange}
						>
							<ModalContent>
								<ModalHeader />
								<ModalBody>
									<Webcam
										audio={false}
										ref={webcamRef}
										screenshotFormat="image/jpeg"
										videoConstraints={{
											facingMode: "environment",
											aspectRatio: 9 / 16,
										}}
										mirrored
									></Webcam>
								</ModalBody>
								<ModalFooter>
									<Button
										className="w-full mt-2 bg-[#971438] text-white"
										onPress={capture}
									>
										Tomar Foto
									</Button>
								</ModalFooter>
							</ModalContent>
						</Modal>
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
