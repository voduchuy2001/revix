import InputError from '@/Components/InputError'
import NameInput from '@/Components/NameInput'
import { PasswordInput } from '@/Components/PasswordInput'
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
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group'
import { Textarea } from '@/Components/ui/textarea'
import { useForm } from '@inertiajs/react'
import { PlusIcon } from '@radix-ui/react-icons'
import toast from 'react-hot-toast'

export function CreateUserDialog({
  open,
  onOpenChange,
  showTrigger = true,
  type = 'customer',
  initialPhoneNumber = '',
  onCustomerCreated,
  ...props
}) {
  const { reset, data, setData, errors, processing, post } = useForm({
    branch_id: '',
    name: '',
    phone_number: initialPhoneNumber,
    address: '',
    email: '',
    password: '',
    password_confirmation: '',
    type
  })

  const submit = (e) => {
    e.preventDefault()

    post(route('user.store'), {
      onSuccess: (data) => {
        toast.success('Thêm mới thành công')
        onCustomerCreated?.(data.props.flash.user)
        onOpenChange?.(false)
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
          <DialogTitle>{type === 'customer' ? 'Thêm khách hàng mới' : 'Thêm người dùng mới'}</DialogTitle>
          <DialogDescription>
            Điền vào chi tiết phía dưới để thêm {type === 'customer' ? 'khách hàng' : 'người dùng'} mới
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[65vh] overflow-auto md:max-h-[75vh]">
          <form id={type} onSubmit={submit} autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="space-y-1">
                <Label htmlFor="name" required={true}>
                  Tên
                </Label>
                <NameInput
                  id="name"
                  type="text"
                  name="name"
                  className="mt-1 block w-full"
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

              <div className={`${type === 'user' ? 'space-y-1' : 'hidden'}`}>
                <Label htmlFor="email" required={true}>
                  Email
                </Label>
                <Input
                  id="email"
                  type="text"
                  name="email"
                  className="mt-1 block w-full"
                  onChange={(e) => setData('email', e.target.value)}
                />
                <InputError message={errors.email} className="mt-2" />
              </div>

              <div className={`${type === 'user' ? 'space-y-1' : 'hidden'}`}>
                <Label htmlFor="password" required={true}>
                  Mật khẩu
                </Label>
                <PasswordInput
                  id="password"
                  type="password"
                  name="password"
                  className="mt-1 block w-full"
                  onChange={(e) => setData('password', e.target.value)}
                />
                <InputError message={errors.password} className="mt-2" />
              </div>

              <div className={`${type === 'user' ? 'space-y-1' : 'hidden'}`}>
                <Label htmlFor="password_confirmation" required={true}>
                  Xác nhận mật khẩu
                </Label>
                <PasswordInput
                  id="password_confirmation"
                  type="password"
                  name="password_confirmation"
                  className="mt-1 block w-full"
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                />
                <InputError message={errors.password_confirmation} className="mt-2" />
              </div>

              <div className={`${type === 'user' ? 'space-y-1' : 'hidden'}`}>
                <Label htmlFor="branch" required={true}>
                  Chi nhánh
                </Label>

                <RadioGroup
                  className="flex flex-col space-y-1"
                  value={data.branch_id}
                  onValueChange={(value) => setData('branch_id', value)}
                >
                  <div className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem value="1" id="branch-1" />
                    <Label htmlFor="branch-1" className="font-normal">
                      Chi nhánh 1
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem value="2" id="branch-2" />
                    <Label htmlFor="branch-2" className="font-normal">
                      Chi nhánh 2
                    </Label>
                  </div>
                </RadioGroup>

                <InputError message={errors.branch_id} className="mt-2" />
              </div>

              <div className="col-span-1 md:col-span-2 w-full space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="address" required={false}>
                    Địa chỉ
                  </Label>
                  <Textarea
                    id="address"
                    type="text"
                    name="address"
                    className="mt-1 block w-full"
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
            Thêm mới
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
