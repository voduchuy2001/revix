import InputError from '@/Components/InputError'
import NameInput from '@/Components/NameInput'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Transition } from '@headlessui/react'
import { useForm, usePage } from '@inertiajs/react'
import toast from 'react-hot-toast'

export default function UpdateProfileInformation({ className = '' }) {
  const user = usePage().props.auth.user

  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: user.name || '',
    email: user.email || '',
    phone_number: user.phone_number || '',
    address: user.address || ''
  })

  const submit = (e) => {
    e.preventDefault()

    patch(route('profile.update'), {
      onSuccess: () => toast.success('Cập nhật thành công')
    })
  }

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Thông tin hồ sơ</h2>

        <p className="mt-1 text-sm text-gray-600">Cập nhật thông tin hồ sơ tài khoản và địa chỉ email của bạn.</p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6" autoComplete="off">
        <div>
          <Label htmlFor="name" required={true}>
            Tên
          </Label>
          <NameInput
            id="name"
            className="mt-1 block w-full"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
          />

          <InputError className="mt-2" message={errors.name} />
        </div>

        <div>
          <Label htmlFor="email" required={true}>
            Email
          </Label>
          <Input
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
          />

          <InputError className="mt-2" message={errors.email} />
        </div>

        <div>
          <Label htmlFor="phone_number" required={false}>
            Số điện thoại
          </Label>
          <Input
            id="phone_number"
            className="mt-1 block w-full"
            value={data.phone_number}
            onChange={(e) => setData('phone_number', e.target.value)}
          />

          <InputError className="mt-2" message={errors.phone_number} />
        </div>

        <div>
          <Label htmlFor="address">Địa chỉ</Label>
          <Input
            id="address"
            className="mt-1 block w-full"
            value={data.address}
            onChange={(e) => setData('address', e.target.value)}
          />

          <InputError className="mt-2" message={errors.address} />
        </div>

        <div className="flex items-center gap-4">
          <Button disabled={processing}>Cập nhật</Button>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">Cập nhật thành công.</p>
          </Transition>
        </div>
      </form>
    </section>
  )
}
