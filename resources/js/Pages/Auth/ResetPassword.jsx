import InputError from '@/Components/InputError'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, useForm } from '@inertiajs/react'

export default function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: ''
  })

  const submit = (e) => {
    e.preventDefault()

    post(route('password.store'), {
      onFinish: () => reset('password', 'password_confirmation')
    })
  }

  return (
    <GuestLayout>
      <Head title="Reset Password" />

      <form onSubmit={submit} autoComplete="off">
        <div>
          <Label htmlFor="email" required={true}>
            Email
          </Label>
          <Input
            readOnly
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            onChange={(e) => setData('email', e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <Label htmlFor="password" required={true}>
            Mật khẩu
          </Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData('password', e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4">
          <Label htmlFor="password_confirmation" required={true}>
            Xác nhận mật khẩu
          </Label>
          <Input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData('password_confirmation', e.target.value)}
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Button className="ms-4" disabled={processing}>
            Đặt lại mật khẩu
          </Button>
        </div>
      </form>
    </GuestLayout>
  )
}
