import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reportar-fuga/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/reportar-fuga/"!</div>
}
