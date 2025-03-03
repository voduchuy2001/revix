import InputError from '@/Components/InputError'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group'
import { Textarea } from '@/Components/ui/textarea'
import { formatMoney } from '@/utils/format'
import { useForm, usePage } from '@inertiajs/react'
import { Plus } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CreateRevenueReport() {
  const { auth } = usePage().props
  const { super_user: isSuperUser, branch_id: branchId } = auth.user

  const { processing, post, errors, setData, data, reset } = useForm({
    branch_id: isSuperUser ? '' : branchId.toString(),
    date: new Date().toISOString().split('T')[0],
    amount: '',
    content: ''
  })

  const submit = (e) => {
    e.preventDefault()
    post(route('revenue_report.store'), {
      onSuccess: () => {
        toast.success('Thêm mới thành công')
        reset()
      },
      preserveScroll: true
    })
  }

  const handleAmountChange = (value) => {
    const numericValue = Number(value.replace(/,/g, '').replace(/\D/g, ''))
    setData({ ...data, amount: numericValue })
  }

  return (
    <div className="mx-auto p-6">
      <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3">Thêm doanh thu mới</h3>

      <form onSubmit={submit} autoComplete="off">
        <div className="space-y-4">
          <Input
            tabIndex={1}
            id="date"
            type="date"
            name="date"
            className="mt-1 block w-full"
            value={data.date}
            onChange={(e) => setData('date', e.target.value)}
          />

          <div className="space-y-1">
            <Label htmlFor="amount" required={false}>
              Số tiền
            </Label>
            <Input
              tabIndex={2}
              id="amount"
              type="text"
              name="amount"
              value={formatMoney(data.amount)}
              className="mt-1 block w-full"
              onChange={(e) => handleAmountChange(e.target.value)}
            />
            <InputError message={errors.amount} className="mt-2" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="content" required={false}>
              Nội dung
            </Label>
            <Textarea
              tabIndex={3}
              id="content"
              type="text"
              name="content"
              className="mt-1 block w-full"
              value={data.content}
              onChange={(e) => setData('content', e.target.value)}
            />
            <InputError message={errors.content} className="mt-2" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="branch" required={true}>
              Chi nhánh
            </Label>

            <RadioGroup
              disabled={!isSuperUser}
              className="flex flex-col space-y-1"
              value={data.branch_id}
              onValueChange={(value) => setData('branch_id', value)}
            >
              <div className="flex items-center space-x-3 space-y-0">
                <RadioGroupItem tabIndex={4} value="1" id="branch-1" />
                <Label htmlFor="branch-1" className="font-normal">
                  Chi nhánh 1
                </Label>
              </div>

              <div className="flex items-center space-x-3 space-y-0">
                <RadioGroupItem tabIndex={5} value="2" id="branch-2" />
                <Label htmlFor="branch-2" className="font-normal">
                  Chi nhánh 2
                </Label>
              </div>
            </RadioGroup>

            <InputError message={errors.branch_id} className="mt-2" />
          </div>

          <div className="flex items-center justify-end">
            <Button disabled={processing} className="justify-end" type="submit">
              <Plus className="w-4 h-4" />
              Thêm
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
