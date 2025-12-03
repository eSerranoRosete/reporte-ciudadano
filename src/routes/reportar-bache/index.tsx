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
import { zodResolver } from "@hookform/resolvers/zod";
import { CameraIcon } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useCounter } from "@uidotdev/usehooks";
import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import Webcam from "react-webcam";
import { z } from "zod";
import { AccordionTitle } from "../../components/AccordionTitle";
import { MapComponent } from "../../components/MapComponent";

export const Route = createFileRoute("/reportar-bache/")({
	component: RouteComponent,
});

const formSchema = z.object({
	location: z.object({
		lat: z.number(),
		lng: z.number(),
	}),
	images: z.array(z.string()).min(1),
	comments: z.string().min(3),
});

function RouteComponent() {
	const modalControl = useDisclosure();

	const webcamRef = useRef<Webcam>(null);

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			images: [],
		},
	});

	const capture = useCallback(() => {
		const imageSrc = webcamRef.current?.getScreenshot(); // base64 image
		if (imageSrc) {
			form.setValue("images", [imageSrc]);
			modalControl.onClose();
		}
	}, [webcamRef]);

	const [count, { increment, set }] = useCounter(1, {
		min: 1,
		max: 3,
	});

	const submit = useMutation({
		mutationFn: async (data: z.infer<typeof formSchema>) => {
			console.log(data);
		},
	});

	const images = form.watch("images");
	const comments = form.watch("comments");
	const location = form.watch("location");

	return (
		<div className="flex flex-col gap-2 grow">
			<h1 className="text-2xl font-semibold text-center mb-3">
				Reportar Bache
			</h1>
			<Accordion
				as="form"
				onSubmit={form.handleSubmit((v) => submit.mutate(v))}
				variant="splitted"
				selectedKeys={[String(count)]}
			>
				<AccordionItem
					key={1}
					onPress={() => set(1)}
					aria-label="Ubicacion"
					title={
						<AccordionTitle
							title="1. Agrega la ubicacion"
							isCompleted={!!location}
						/>
					}
				>
					<Alert
						description="Da click en la ubicacion aproximada"
						color="primary"
						className="mb-2"
					/>
					<div className="w-full aspect-video bg-default-200 rounded-xl">
						<MapComponent
							pinCoords={form.getValues("location")}
							setPinCoords={(coords) => {
								coords && form.setValue("location", coords);
							}}
						/>
					</div>
					<Button
						className="w-full mt-2 bg-[#971438] text-white"
						onPress={increment}
						type="button"
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
						{!images.length ? (
							<>
								<Input
									type="file"
									multiple
									onChange={async (e) => {
										if (!e.target.files) return;

										const files = Array.from(e.target.files);

										const base64Files = await Promise.all(
											files.map((file) => {
												return new Promise((resolve, reject) => {
													const reader = new FileReader();
													reader.readAsDataURL(file);
													reader.onload = () => resolve(reader.result);
													reader.onerror = reject;
												});
											}),
										);

										form.setValue("images", base64Files as string[]);
									}}
									label="Seleccionar Imagenes"
									accept="image/*"
								/>

								<span>o</span>

								<Button
									type="button"
									variant="flat"
									onPress={modalControl.onOpen}
									startContent={
										<CameraIcon className="size-5" weight="duotone" />
									}
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
												className="h-full object-cover"
												screenshotFormat="image/jpeg"
												videoConstraints={{
													facingMode: "environment",
												}}
											></Webcam>
										</ModalBody>
										<ModalFooter>
											<Button
												type="button"
												className="w-full mt-2 bg-[#971438] text-white"
												onPress={capture}
											>
												Tomar Foto
											</Button>
										</ModalFooter>
									</ModalContent>
								</Modal>
							</>
						) : (
							<>
								{images.map((image, index) => (
									<img key={index} src={image} />
								))}
							</>
						)}
					</div>
					<Button
						type="button"
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
							isCompleted={!!comments}
						/>
					}
				>
					<Textarea
						placeholder="Ejemplo: El bache esta pegado a la banqueta del lado derecho."
						onBlur={(e) => {
							form.setValue("comments", e.target.value);
						}}
					/>
					<Button className="w-full mt-2 bg-[#971438] text-white">
						Enviar Reporte
					</Button>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
