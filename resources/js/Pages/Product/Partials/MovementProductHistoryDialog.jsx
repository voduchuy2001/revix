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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion'
import { formatDate } from '@/utils/format'

export default function MovementProductHistoryDialog({ product, open, onOpenChange, showTrigger = true, ...props }) {
  const stockMovement = product.stock_movement

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      {showTrigger && (
        <DialogTrigger asChild>
          <Button className="mx-2" variant="outline" size="sm">
            <PlusIcon className="mr-2 size-4" aria-hidden="true" />
            Thêm mới
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="md:h-auto md:max-w-xl">
        <DialogHeader>
          <DialogTitle>Lịch sử xuất nhập kho sản phẩm: {product.name}</DialogTitle>
          <DialogDescription>Dưới đây là chi tiết xuất nhập kho sản phẩm</DialogDescription>
        </DialogHeader>

        <div className="max-h-[65vh] overflow-y-auto md:max-h-[75vh]">
          <Accordion type="single" collapsible>
            {stockMovement.map((item) => (
              <AccordionItem key={item.id} value={`item-${item.id}`}>
                <AccordionTrigger>
                  {item.type === 'import' ? 'Nhập kho' : 'Xuất kho'} #{item.id} - Số lượng: {item.quantity}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm text-gray-700">
                    <p>
                      <b>Người tạo:</b> {item.created_by.name}
                    </p>
                    <p>
                      <b>Thời gian:</b> {formatDate(item.created_at)}
                    </p>
                    <p>
                      <b>Ghi chú:</b> {item.note || 'Không có'}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
  )
}
