import {
	Accordion,
	AccordionItem,
	Alert,
	Button,
	Input,
	Textarea,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircleIcon } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCounter } from "@uidotdev/usehooks";
import { Controller, useForm } from "react-hook-form";
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
	reporter: z.object({
		name: z.string().min(3),
		email: z.email(),
		phone: z.string(),
	}),
});

function RouteComponent() {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			images: [],
		},
	});

	const [count, { increment, set }] = useCounter(1, {
		min: 1,
		max: 4,
	});

	const submit = useMutation({
		mutationFn: async (data: z.infer<typeof formSchema>) => {
			await new Promise((r) => setTimeout(r, 500));
			console.log(data);
		},
	});

	const images = form.watch("images");
	const comments = form.watch("comments");
	const location = form.watch("location");
	const reporter = form.watch("reporter");

	if (submit.isSuccess) {
		return (
			<div className="w-full h-full grow bg-background flex items-center justify-center">
				<div className="text-center flex flex-col items-center">
					<CheckCircleIcon
						className="text-[#971438] size-32"
						weight="duotone"
					/>
					<h1 className="text-3xl font-medium">¡Gracias!</h1>
					<p>Tu reporte ha sido enviado.</p>
					<Button
						as={Link}
						to="/"
						className="w-full mt-10 bg-[#971438] text-white"
						onPress={() => {
							submit.reset();
						}}
					>
						Volver al inicio
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2 grow">
			<h1 className="text-2xl font-semibold text-center">Reportar Bache</h1>
			<p className="text-default-500 text-sm text-center mb-3">
				Completa el formulario para levantar un reporte.
			</p>
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
								coords &&
									form.setValue("location", coords, { shouldValidate: true });
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

										form.setValue("images", base64Files as string[], {
											shouldValidate: true,
										});
									}}
									label="Seleccionar Imagenes"
									accept="image/*"
								/>
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
					<Controller
						control={form.control}
						name="comments"
						render={({ field }) => (
							<Textarea
								{...field}
								placeholder="Ejemplo: El bache esta pegado a la banqueta del lado derecho."
							/>
						)}
					/>
					<Button
						className="w-full mt-2 bg-[#971438] text-white"
						onPress={increment}
						type="button"
					>
						Siguiente
					</Button>
				</AccordionItem>

				<AccordionItem
					key={4}
					onPress={() => set(4)}
					aria-label="Comentarios"
					title={
						<AccordionTitle
							title="4. Agrega tus datos"
							isCompleted={!!reporter}
						/>
					}
				>
					<div className="flex flex-col gap-2">
						<Controller
							control={form.control}
							name="reporter.name"
							render={({ field }) => (
								<Input
									{...field}
									isInvalid={!!form.formState.errors.reporter?.name}
									errorMessage={form.formState.errors.reporter?.name?.message}
									placeholder="Juan Perez"
									label="Tu Nombre"
								/>
							)}
						/>
						<Controller
							control={form.control}
							name="reporter.email"
							render={({ field }) => (
								<Input
									{...field}
									placeholder="ejemplo@gmail.com"
									type="email"
									isInvalid={!!form.formState.errors.reporter?.email}
									errorMessage={form.formState.errors.reporter?.email?.message}
									label="Correo Electronico"
								/>
							)}
						/>
						<Controller
							control={form.control}
							name="reporter.phone"
							render={({ field }) => (
								<Input
									placeholder="55 5555 5555"
									{...field}
									isInvalid={!!form.formState.errors.reporter?.phone}
									errorMessage={form.formState.errors.reporter?.phone?.message}
									label="Telefono"
								/>
							)}
						/>
					</div>
					<Button
						isLoading={submit.isPending}
						type="submit"
						className="w-full mt-2 bg-[#971438] text-white"
					>
						Enviar Reporte
					</Button>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
