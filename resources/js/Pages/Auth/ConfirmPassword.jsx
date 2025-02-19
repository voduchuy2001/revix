import InputError from '@/Components/InputError'
import { PasswordInput } from '@/Components/PasswordInput'
import { Button } from '@/Components/ui/button'
import { Label } from '@/Components/ui/label'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, useForm } from '@inertiajs/react'

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: ''
  })

  const submit = (e) => {
    e.preventDefault()

    post(route('password.confirm'), {
      onFinish: () => reset('password')
    })
  }

  return (
    <GuestLayout>
      <Head title="Xác nhận mật khẩu" />

      <div className="mb-4 text-sm text-gray-600">
        Đây là khu vực an toàn của ứng dụng. Vui lòng xác nhận mật khẩu của bạn trước khi tiếp tục.
      </div>

      <form onSubmit={submit} autoComplete="off">
        <div className="mt-4">
          <Label htmlFor="password" required={true}>
            Mật khẩu
          </Label>
          <PasswordInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            onChange={(e) => setData('password', e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Button className="ms-4" disabled={processing}>
            Xác nhận
          </Button>
        </div>
      </form>
    </GuestLayout>
  )
}
