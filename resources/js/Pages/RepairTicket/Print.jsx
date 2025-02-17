import { Head, usePage } from '@inertiajs/react'
import { PrintTicketView } from './Partials/PrintTicketView'
import { Button } from '@/Components/ui/button'
import { Printer } from 'lucide-react'

export default function Print() {
  const { ticket, setting } = usePage().props

  return (
    <>
      <Head title={`Phiếu ${ticket.code}`} />
      <div className="hidden">
        <PrintTicketView setting={setting} ticket={ticket} />
      </div>

      <div className="w-full min-h-screen flex items-center justify-center">
        <Button
          className="text-sm bg-primary text-secondary flex items-center py-2 px-4 rounded-md border border-input shadow-sm hover:bg-accent hover:text-accent-foreground w-full md:w-auto justify-center"
          onClick={() => location.reload()}
        >
          <Printer className="w-4 h-4 mr-2" /> In phiếu
        </Button>
      </div>
    </>
  )
}
