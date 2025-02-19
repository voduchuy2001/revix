import InputError from '@/Components/InputError'
import { PasswordInput } from '@/Components/PasswordInput'
import { Button } from '@/Components/ui/button'
import { Checkbox } from '@/Components/ui/checkbox'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, Link, useForm } from '@inertiajs/react'

export default function Login({ canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false
  })

  const submit = (e) => {
    e.preventDefault()

    post(route('login'), {
      onFinish: () => reset('password')
    })
  }

  return (
    <GuestLayout>
      <Head title="Đăng nhập" />

      <form onSubmit={submit} autoComplete="off">
        <div>
          <Label htmlFor="email" required={true}>
            Email
          </Label>
          <Input
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
          <PasswordInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={(e) => setData('password', e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4 block">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              name="remember"
              checked={data.remember}
              onCheckedChange={(checked) => setData('remember', checked)}
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Ghi nhớ
            </label>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end">
          {canResetPassword && (
            <Link
              href={route('password.request')}
              className="rounded-md text-sm text-gray-600 underline hover:text-gray-900"
            >
              Quên mật khẩu?
            </Link>
          )}

          <Button className="ms-4" disabled={processing}>
            Đăng nhập
          </Button>
        </div>
      </form>
    </GuestLayout>
  )
}
