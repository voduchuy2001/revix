import EmptyState from '@/Components/EmptyState'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/Components/ui/alert-dialog'
import { Button } from '@/Components/ui/Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle
} from '@/Components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table'
import { PrintTicketView } from '@/Pages/RepairTicket/Partials/PrintTicketView'
import { formatDate, formatMoney } from '@/utils/format'
import { router, useForm, usePage } from '@inertiajs/react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Pencil, Printer, Trash } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function RepairHistoryDialog({ customer, open, onOpenChange, showTrigger = true, ...props }) {
  const { repair_tickets: tickets } = customer
  const { setting } = usePage().props

  const { processing, delete: destroy } = useForm()
  const handleDeleteRepairTicket = (id) => {
    destroy(route('repair_ticket.destroy', id), {
      onSuccess: () => {
        toast.success('Xóa thành công')
        onOpenChange?.(false)
      }
    })
  }

  const [ticketToPrint, setTicketToPrint] = useState(null)
  const [print, setPrint] = useState(false)
  const handlePrintTicket = (ticket) => {
    setTicketToPrint(ticket)
    setPrint(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange} {...props}>
        {showTrigger && (
          <DialogTrigger asChild>
            <Button className="mx-2" variant="outline" size="sm">
              <PlusIcon className="mr-2 size-4" aria-hidden="true" />
              Thêm mới
            </Button>
          </DialogTrigger>
        )}

        <DialogContent className="md:h-auto md:max-w-5xl">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="overflow-hidden">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-secondary">
                <TableRow>
                  <TableHead>Số phiếu</TableHead>
                  <TableHead className="min-w-32">Tên khách hàng</TableHead>
                  <TableHead className="min-w-28">Số điện thoại</TableHead>
                  <TableHead>Thiết bị</TableHead>
                  <TableHead>Giá</TableHead>
                  <TableHead>Thợ</TableHead>
                  <TableHead>Ngày lập</TableHead>
                  <TableHead>Cập nhật</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets?.length ? (
                  tickets.map((ticket) => (
                    <TableRow key={ticket.code}>
                      <TableCell className="font-medium">{ticket.code}</TableCell>
                      <TableCell className="font-medium">{ticket.customer.name}</TableCell>
                      <TableCell>{ticket.customer.phone_number || 'Không có'}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold">{ticket.device.name}</span>
                          <span className="text-mute-foreground">{ticket.device.code}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatMoney(ticket.amount)}</TableCell>
                      <TableCell>{ticket.technician}</TableCell>
                      <TableCell>{formatDate(ticket.created_at)}</TableCell>
                      <TableCell>{formatDate(ticket.updated_at)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-4">
                          <div title="In phiếu tiếp nhận">
                            <Printer
                              className="h-4 w-4 cursor-pointer text-primary hover:text-blue-600 transition-colors"
                              onClick={() => handlePrintTicket(ticket)}
                            />
                          </div>

                          <div title="Chỉnh sửa phiếu tiếp nhận">
                            <Pencil
                              className="h-4 w-4 cursor-pointer text-yellow-500 hover:text-yellow-400 transition-colors"
                              onClick={() => {
                                router.visit(
                                  route('repair_ticket.edit', {
                                    id: ticket.id
                                  })
                                )
                              }}
                            />
                          </div>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <div title="Xóa phiếu tiếp nhận">
                                <Trash className="h-4 w-4 cursor-pointer text-destructive hover:text-red-600 transition-colors" />
                              </div>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Bạn có chắc chắn?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Hành động này không thể hoàn tác. Phiếu sẽ bị xóa vĩnh viễn.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction
                                  disabled={processing}
                                  onClick={() => handleDeleteRepairTicket(ticket.id)}
                                >
                                  Xóa
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-6 text-gray-500">
                      <EmptyState />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <DialogFooter className="flex gap-2 sm:space-x-0">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Đóng
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {print && ticketToPrint && (
        <div className="hidden">
          <PrintTicketView setting={setting} ticket={ticketToPrint} />
        </div>
      )}
    </>
  )
}
