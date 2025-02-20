import InputError from '@/Components/InputError'
import { PasswordInput } from '@/Components/PasswordInput'
import { Button } from '@/Components/ui/button'
import { Label } from '@/Components/ui/label'
import { Transition } from '@headlessui/react'
import { useForm } from '@inertiajs/react'
import { useRef } from 'react'
import toast from 'react-hot-toast'

export default function UpdatePasswordForm({ className = '' }) {
  const passwordInput = useRef()
  const currentPasswordInput = useRef()

  const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
    current_password: '',
    password: '',
    password_confirmation: ''
  })

  const updatePassword = (e) => {
    e.preventDefault()

    put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => {
        reset()
        toast.success('Cập nhật thành công')
      },
      onError: () => {
        reset()
      }
    })
  }

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Cập nhật mật khẩu</h2>

        <p className="mt-1 text-sm text-gray-600">
          Đảm bảo tài khoản của bạn sử dụng mật khẩu dài và ngẫu nhiên để đảm bảo an toàn.
        </p>
      </header>

      <form onSubmit={updatePassword} className="mt-6 space-y-6" autoComplete="off">
        <div>
          <Label htmlFor="current_password" required={true}>
            Mật khẩu hiện tại
          </Label>
          <PasswordInput
            id="current_password"
            ref={currentPasswordInput}
            value={data.current_password}
            onChange={(e) => setData('current_password', e.target.value)}
            type="password"
            className="mt-1 block w-full"
            autoComplete="current-password"
          />

          <InputError message={errors.current_password} className="mt-2" />
        </div>

        <div>
          <Label htmlFor="password" required={true}>
            Mật khẩu mới
          </Label>
          <PasswordInput
            id="password"
            ref={passwordInput}
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            type="password"
            className="mt-1 block w-full"
            autoComplete="new-password"
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div>
          <Label htmlFor="password_confirmation" required={true}>
            Xác nhận mật khẩu mới
          </Label>
          <PasswordInput
            id="password_confirmation"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            type="password"
            className="mt-1 block w-full"
            autoComplete="new-password"
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
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
            <p className="text-sm text-gray-600">Đã cập nhật.</p>
          </Transition>
        </div>
      </form>
    </section>
  )
}
