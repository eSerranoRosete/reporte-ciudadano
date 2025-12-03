import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reportar-encharcamiento/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/reportar-encharcamiento/"!</div>
}
