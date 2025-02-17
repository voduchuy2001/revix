import InputError from '@/Components/InputError'
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
import { useForm } from '@inertiajs/react'
import { PlusIcon } from '@radix-ui/react-icons'
import toast from 'react-hot-toast'

export function UpdateUserDialog({ user, open, onOpenChange, showTrigger = true, type = 'user', ...props }) {
  const { reset, setData, data, errors, processing, put } = useForm({
    name: user.name || '',
    phone_number: user.phone_number || '',
    address: user.address || '',
    type: user.type || type
  })

  const submit = (e) => {
    e.preventDefault()

    put(route('user.update', { id: user.id }), {
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

      <DialogContent className="md:h-auto md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Cập nhật thông tin {type === 'customer' ? 'khách hàng' : 'người dùng'}: {user.name} - {user.phone_number}
          </DialogTitle>
          <DialogDescription>
            Thay đôi thông tin {type === 'customer' ? 'khách hàng' : 'người dùng'} bằng cách thay đổi các thông tin dưới
            đây
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[65vh] overflow-auto md:max-h-[75vh]">
          <form id={type} onSubmit={submit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="space-y-1">
                <Label htmlFor="name" required={true}>
                  Tên khách hàng
                </Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  className="mt-1 block w-full"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="phone_number" required={true}>
                  Số điện thoại
                </Label>
                <Input
                  id="phone_number"
                  type="text"
                  name="phone_number"
                  className="mt-1 block w-full"
                  value={data.phone_number}
                  onChange={(e) => setData('phone_number', e.target.value)}
                />
                <InputError message={errors.phone_number} className="mt-2" />
              </div>

              <div className="col-span-1 md:col-span-2 w-full space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="address" required={true}>
                    Địa chỉ
                  </Label>
                  <Textarea
                    id="address"
                    type="text"
                    name="address"
                    className="mt-1 block w-full"
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                  />
                  <InputError message={errors.address} className="mt-2" />
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
            Cập nhật
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
