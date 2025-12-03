import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/solicitar-desazolve/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/solicitar-desazolve/"!</div>
}
