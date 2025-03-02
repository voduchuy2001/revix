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
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Textarea } from '@/Components/ui/textarea'
import { formatMoney } from '@/utils/format'
import { useForm } from '@inertiajs/react'
import { PlusIcon } from '@radix-ui/react-icons'
import toast from 'react-hot-toast'

export default function CreateProductDialog({
  branchId,
  type = 'import',
  open,
  onOpenChange,
  showTrigger = true,
  ...props
}) {
  const { reset, data, setData, errors, processing, post } = useForm({
    branch_id: branchId,
    name: '',
    category: '',
    stock: '',
    price: '',
    sale_price: '',
    note: '',
    sku: '',
    type
  })

  const submit = (e) => {
    e.preventDefault()

    post(route('product.store'), {
      onSuccess: () => {
        onOpenChange?.(false)
        toast.success('Thêm mới thành công')
      }
    })
  }

  const handlePriceChange = (value) => {
    const numericValue = Number(value.replace(/,/g, '').replace(/\D/g, ''))
    const key = type === 'import' ? 'price' : type ? 'sale_price' : null

    if (key) {
      setData({ ...data, [key]: numericValue })
    }
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

      <DialogContent className="md:h-auto md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Thêm sản phẩm</DialogTitle>
          <DialogDescription>Điền vào chi tiết phía dưới để thêm sản phẩm mới</DialogDescription>
        </DialogHeader>

        <div className="max-h-[65vh] overflow-auto md:max-h-[75vh]">
          <form id={type} onSubmit={submit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="col-span-1 md:col-span-2 w-full space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name" required={true}>
                    Tên sản phẩm
                  </Label>
                  <NameInput
                    tabIndex={1}
                    id="name"
                    type="text"
                    name="name"
                    className="mt-1 block w-full"
                    onChange={(e) => setData('name', e.target.value)}
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>
              </div>

              <div className={`${type === 'import' ? 'space-y-1' : 'hidden'}`}>
                <Label htmlFor="sku" required={true}>
                  Mã sản phẩm
                </Label>
                <Input
                  tabIndex={2}
                  id="sku"
                  type="text"
                  name="sku"
                  className="mt-1 block w-full"
                  onChange={(e) => setData('sku', e.target.value)}
                />
                <InputError message={errors.sku} className="mt-2" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="category" required={false}>
                  Danh mục
                </Label>
                <NameInput
                  tabIndex={3}
                  id="category"
                  type="text"
                  name="category"
                  className="mt-1 block w-full"
                  onChange={(e) => setData('category', e.target.value)}
                />
                <InputError message={errors.category} className="mt-2" />
              </div>

              <div className={`${type === 'import' ? 'space-y-1' : 'hidden'}`}>
                <Label htmlFor="stock" required={true}>
                  Số lượng
                </Label>
                <Input
                  tabIndex={4}
                  id="stock"
                  type="number"
                  name="stock"
                  value={data.stock}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('stock', e.target.value)}
                />
                <InputError message={errors.stock} className="mt-2" />
              </div>

              <div className={`${type === 'import' ? 'space-y-1' : 'hidden'}`}>
                <Label htmlFor="price" required={true}>
                  Giá
                </Label>
                <Input
                  tabIndex={5}
                  id="price"
                  type="text"
                  name="price"
                  value={formatMoney(data.price)}
                  className="mt-1 block w-full"
                  onChange={(e) => handlePriceChange(e.target.value)}
                />
                <InputError message={errors.price} className="mt-2" />
              </div>

              <div className={`${type === 'export' ? 'space-y-1' : 'hidden'}`}>
                <Label htmlFor="sale_price" required={true}>
                  Giá
                </Label>
                <Input
                  tabIndex={5}
                  id="sale_price"
                  type="text"
                  name="sale_price"
                  value={formatMoney(data.sale_price)}
                  className="mt-1 block w-full"
                  onChange={(e) => handlePriceChange(e.target.value)}
                />
                <InputError message={errors.sale_price} className="mt-2" />
              </div>

              <div className={`${type === 'import' ? 'col-span-1 md:col-span-2 w-full space-y-4' : 'hidden'}`}>
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
                    onChange={(e) => setData('note', e.target.value)}
                  />
                  <InputError message={errors.note} className="mt-2" />
                </div>
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

          <Button form={type} disabled={processing}>
            Thêm mới
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
