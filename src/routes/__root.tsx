import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<div className="w-full max-w-md mx-auto border border-zinc-200 min-h-screen flex flex-col justify-start gap-8">
			<Link to="/" className="bg-zinc-100">
				<img src="/oapas.png" className="w-5/6 mx-auto" />
			</Link>
			<Outlet />
			<div />
		</div>
	);
}
