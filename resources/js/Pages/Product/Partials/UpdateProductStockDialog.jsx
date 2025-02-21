import InputError from '@/Components/InputError'
import NameInput from '@/Components/NameInput'
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
import { Label } from '@/Components/ui/label'
import { Textarea } from '@/Components/ui/textarea'
import { useForm } from '@inertiajs/react'
import { PlusIcon } from '@radix-ui/react-icons'
import toast from 'react-hot-toast'

export default function UpdateProductStockDialog({
  product,
  type = 'import',
  open,
  onOpenChange,
  showTrigger = true,
  ...props
}) {
  const { reset, data, setData, errors, processing, post } = useForm({
    stock: '',
    type,
    note: ''
  })

  const submit = (e) => {
    e.preventDefault()

    post(route('product.update_stock', { id: product.id }), {
      onSuccess: () => {
        onOpenChange?.(false)
        toast.success('Cập nhật thành công')
      }
    })
  }

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

      <DialogContent className="md:h-auto md:max-w-96">
        <DialogHeader>
          <DialogTitle>Cập nhật sản phẩm: {product.name}</DialogTitle>
          <DialogDescription>Điền vào chi tiết phía dưới để cập nhật thông tin sản phẩm</DialogDescription>
        </DialogHeader>

        <div className="max-h-[65vh] overflow-auto md:max-h-[75vh]">
          <form id={`update-product-${type}-${product.id}`} onSubmit={submit} autoComplete="off">
            <div className="grid grid-cols-1 gap-4 w-full">
              <div className="space-y-1">
                <Label htmlFor="stock" required={true}>
                  Số lượng
                </Label>
                <NameInput
                  tabIndex={3}
                  id="stock"
                  type="text"
                  name="stock"
                  className="mt-1 block w-full"
                  onChange={(e) => setData('stock', e.target.value)}
                />
                <InputError message={errors.stock} className="mt-2" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="note" required={false}>
                  Ghi chú
                </Label>
                <Textarea
                  tabIndex={6}
                  id="note"
                  type="text"
                  name="note"
                  className="mt-1 block w-full"
                  value={data.note}
                  onChange={(e) => setData('note', e.target.value)}
                />
                <InputError message={errors.note} className="mt-2" />
              </div>
            </div>
          </form>
        </div>

        <DialogFooter className="flex gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={() => reset()}>
              Hủy
            </Button>
          </DialogClose>

          <Button form={`update-product-${type}-${product.id}`} disabled={processing}>
            Cập nhật
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
