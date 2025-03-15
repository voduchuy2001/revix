import InputError from '@/Components/InputError'
import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Textarea } from '@/Components/ui/textarea'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, usePage } from '@inertiajs/react'
import { UpdateIcon } from '@radix-ui/react-icons'
import { Plus, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Index() {
  const { branches = [], setting = {} } = usePage().props

  const { errors, data, setData, put, processing } = useForm({
    setting: {
      type: setting.type || '',
      name: setting.name || '',
      short_description: setting.short_description || '',
      website: setting.website || '',
      policies: setting.policies || [],
      branches: setting.branches || [],
      support_phone_number: setting.support_phone_number || ''
    },
    branchesData: branches.map((branch) => ({
      id: branch?.id,
      phone_number: branch?.phone_number || '',
      address: branch?.address || ''
    }))
  })

  const submit = (e) => {
    e.preventDefault()

    put(route('repair_ticket_setting.update'), {
      onSuccess: () => toast.success('Cập nhật thành công'),
      onError: () => toast.error('Lỗi khi cập nhật'),
      preserveScroll: true
    })
  }

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Cài đặt phiếu tiếp nhận sửa chữa</h2>}
    >
      <Head title="Cài đặt phiếu tiếp nhận sửa chữa" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-col gap-3 text-xl font-semibold">
                  <span>Cài đặt chung</span>
                </CardTitle>
              </CardHeader>
              <form onSubmit={submit} autoComplete="off">
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                      <Label htmlFor="type" required={true}>
                        Loại hình kinh doanh
                      </Label>
                      <Input
                        id="type"
                        type="text"
                        name="type"
                        value={data.setting.type}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('setting', { ...data.setting, type: e.target.value })}
                      />

                      <InputError message={errors['setting.type']} className="mt-2" />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="name" required={true}>
                        Tên cửa hàng
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        name="type"
                        value={data.setting.name}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('setting', { ...data.setting, name: e.target.value })}
                      />

                      <InputError message={errors['setting.name']} className="mt-2" />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="short_description" required={true}>
                        Mô tả ngắn
                      </Label>
                      <Input
                        id="short_description"
                        type="text"
                        name="short_description"
                        value={data.setting.short_description}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('setting', { ...data.setting, short_description: e.target.value })}
                      />

                      <InputError message={errors['setting.short_description']} className="mt-2" />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="website" required={true}>
                        Website(Mã QR)
                      </Label>
                      <Input
                        id="website"
                        type="text"
                        name="website"
                        value={data.setting.website}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('setting', { ...data.setting, website: e.target.value })}
                      />

                      <InputError message={errors['setting.website']} className="mt-2" />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="support_phone_number" required={true}>
                        SĐT Kỹ thuật
                      </Label>
                      <Input
                        id="support_phone_number"
                        type="text"
                        name="support_phone_number"
                        value={data.setting.support_phone_number}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('setting', { ...data.setting, support_phone_number: e.target.value })}
                      />

                      <InputError message={errors['setting.support_phone_number']} className="mt-2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label required={true}>Chính sách bảo hành</Label>
                      {data.setting.policies.map((policy, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <Textarea
                            rows={3}
                            type="text"
                            value={policy}
                            className="w-full"
                            onChange={(e) => {
                              const updatedPolicies = [...data.setting.policies]
                              updatedPolicies[index] = e.target.value
                              setData('setting', { ...data.setting, policies: updatedPolicies })
                            }}
                          />
                          <X
                            className="w-4 h-4 text-destructive cursor-pointer"
                            onClick={() => {
                              setData('setting', {
                                ...data.setting,
                                policies: data.setting.policies.filter((_, i) => i !== index)
                              })
                            }}
                          />
                        </div>
                      ))}

                      <div
                        className="flex text-primary cursor-pointer items-center"
                        onClick={() => {
                          setData('setting', {
                            ...data.setting,
                            policies: [...data.setting.policies, '']
                          })
                        }}
                      >
                        <Plus className="w-4 h-4" /> Thêm mới
                      </div>

                      <InputError message={errors['setting.policies']} className="mt-2" />
                    </div>

                    <div className="space-y-1">
                      <Label required={true}>Chi nhánh</Label>
                      {data.setting.branches.map((policy, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <Input
                            type="text"
                            value={policy}
                            className="w-full"
                            onChange={(e) => {
                              const updatedPolicies = [...data.setting.branches]
                              updatedPolicies[index] = e.target.value
                              setData('setting', { ...data.setting, branches: updatedPolicies })
                            }}
                          />
                          <X
                            className="w-4 h-4 text-destructive cursor-pointer"
                            onClick={() => {
                              setData('setting', {
                                ...data.setting,
                                branches: data.setting.branches.filter((_, i) => i !== index)
                              })
                            }}
                          />
                        </div>
                      ))}

                      <div
                        className="flex text-primary cursor-pointer items-center"
                        onClick={() => {
                          setData('setting', {
                            ...data.setting,
                            branches: [...data.setting.branches, '']
                          })
                        }}
                      >
                        <Plus className="w-4 h-4" /> Thêm mới
                      </div>

                      <InputError message={errors['setting.branches']} className="mt-2" />
                    </div>
                  </div>
                </CardContent>

                <CardHeader>
                  <CardTitle className="flex flex-col gap-3 text-xl font-semibold">
                    <span>Cài đặt riêng từng chi nhánh</span>
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {data.branchesData.map((branch, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label htmlFor={`phone_${index}`} required={true}>
                            SĐT CN {index + 1}
                          </Label>
                          <Input
                            id={`phone_${index}`}
                            type="text"
                            name={`phone_number_${index}`}
                            value={branch.phone_number}
                            className="mt-1 block w-full"
                            onChange={(e) => {
                              const updatedBranches = [...data.branchesData]
                              updatedBranches[index].phone_number = e.target.value
                              setData('branchesData', updatedBranches)
                            }}
                          />

                          <InputError message={errors[`branchesData.${index}.phone_number`]} className="mt-2" />
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor={`address_${index}`} required={true}>
                            Địa chỉ CN {index + 1}
                          </Label>
                          <Input
                            id={`address_${index}`}
                            type="text"
                            name={`address_${index}`}
                            value={branch.address}
                            className="mt-1 block w-full"
                            onChange={(e) => {
                              const updatedBranches = [...data.branchesData]
                              updatedBranches[index].address = e.target.value
                              setData('branchesData', updatedBranches)
                            }}
                          />

                          <InputError message={errors[`branchesData.${index}.address`]} className="mt-2" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-end gap-4">
                    <Button disabled={processing}>
                      <UpdateIcon className="w-4 h-4" /> Cập nhật
                    </Button>
                  </div>
                </CardContent>
              </form>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.branchesData?.map((branch, index) => (
                    <div
                      key={`preview-print-${index}`}
                      className="print:font-roboto mx-auto bg-white p-4 text-xs w-[302px]"
                    >
                      <div className="text-center py-5 space-y-1">
                        <h1 className="font-bold text-lg">{data.setting?.name}</h1>
                        <h3 className="font-bold">{data.setting?.short_description}</h3>

                        <p>
                          Điện thoại: <b>{branch?.phone_number}</b>
                        </p>

                        <p>Địa chỉ: {branch?.address}</p>
                      </div>

                      <h2 className="text-center text-sm font-bold uppercase mb-2">Phiếu tiếp nhận sửa chữa</h2>
                      <p className="text-center">Số: ######## - Ngày: ########</p>

                      <div className="mt-2">
                        <p>
                          <b>Khách hàng:</b> ########
                        </p>
                        <p>
                          <b>Điện thoại:</b> ########
                        </p>
                        <p>
                          <b>Địa chỉ:</b> ########
                        </p>
                      </div>

                      <div className="mt-2 border-t border-black border-dashed pt-2">
                        <p>
                          <b>Thiết bị:</b> ########
                        </p>
                        <p>
                          <b>IMEI:</b> ########
                        </p>
                        <p>
                          <b>Tình trạng:</b> ########
                        </p>
                        <p>
                          <b>Ghi chú:</b> ########
                        </p>
                        <p>
                          <b>Giá:</b> ########
                        </p>
                        <p>
                          <b>Số tiền bằng chữ:</b> ########
                        </p>
                      </div>

                      <div className="mt-2 border-t border-black border-dashed pt-2">
                        <h3 className="font-bold text-center uppercase">Chính sách bảo hành</h3>
                        <div className="text-justify">
                          {data.setting?.policies?.map((policy, index) => (
                            <p key={`policy-${index}`}>- {policy}</p>
                          ))}
                        </div>
                      </div>

                      <div className="mt-2">
                        <b>Kỹ thuật: </b> {data.setting.support_phone_number} tư vấn sửa chữa góp ý
                      </div>

                      <div className="mt-2 border-t border-black border-dashed pt-2">
                        <h3 className="font-bold text-center uppercase">Hệ thống cửa hàng</h3>
                        <div className="text-justify">
                          {data.setting?.branches?.map((branch, index) => (
                            <p key={`branch-${index}`}>- {branch}</p>
                          ))}
                        </div>
                      </div>

                      <div className="mt-2">
                        <b className="text-center">Cảm ơn Quý khách hàng đã tin tưởng!</b>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
