import InputError from '@/Components/InputError'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, useForm } from '@inertiajs/react'

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: ''
  })

  const submit = (e) => {
    e.preventDefault()

    post(route('password.email'))
  }

  return (
    <GuestLayout>
      <Head title="Quên mật khẩu" />

      <div className="mb-4 text-sm text-gray-600">
        Quên mật khẩu? Không vấn đề gì. Chỉ cần cho chúng tôi biết địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn
        liên kết đặt lại mật khẩu cho phép bạn chọn mật khẩu mới.
      </div>

      {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

      <form onSubmit={submit}>
        <div className="mt-4">
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

        <div className="mt-4 flex items-center justify-end">
          <Button className="ms-4" disabled={processing}>
            Liên kết đặt lại mật khẩu Email
          </Button>
        </div>
      </form>
    </GuestLayout>
  )
}
