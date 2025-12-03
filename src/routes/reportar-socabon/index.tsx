import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reportar-socabon/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/reportar-socabon/"!</div>
}
