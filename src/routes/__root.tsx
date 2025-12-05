import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { apiRequest } from "../lib/api";
import { queryClient } from "../providers";

export const Route = createRootRoute({
	component: RootComponent,
	beforeLoad: async () => {
		await queryClient.fetchQuery({
			queryKey: ["auth"],
			queryFn: async () => {
				const res = await apiRequest(
					"/Auth/logon",
					{
						RFC: "Ecatepec",
						usuario: "Eduardo.serrano",
						password: "demo1234",
					},
					undefined,
					"auth",
				);

				if (!res.ok) throw new Error("Auth Failed");

				return await res.json();
			},
		});
	},
});

function RootComponent() {
	return (
		<div className="w-full max-w-md mx-auto border border-zinc-200 min-h-screen flex flex-col justify-start gap-8">
			<Link to="/" className="bg-zinc-100 p-4">
				<img src="/oapas.png" className="w-5/6 mx-auto" />
			</Link>
			<Outlet />
			<div />
		</div>
	);
}
