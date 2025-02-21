import EmptyState from '@/Components/EmptyState'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import { Eye, Pencil, Trash } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/Components/ui/alert-dialog'
import { UpdateUserDialog } from './Partials/UpdateUserDialog'
import { usePrevious } from 'react-use'
import { debounce, pickBy } from 'lodash'
import { Button } from '@/Components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { CreateUserDialog } from './Partials/CreateUserDialog'
import RepairHistoryDialog from './Partials/RepairHistoryDialog'

export default function Customer() {
  const { customers, filters } = usePage().props

  const { processing, delete: destroy } = useForm()
  const [values, setValues] = useState({
    search: filters?.search || ''
  })

  const handleDeleteCustomer = (id) => {
    destroy(route('user.destroy', id), {
      onSuccess: () => toast.success('Xóa thành công')
    })
  }

  const [showUpdateCustomerDialog, setShowUpdateCustomerDialog] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)
  const handleEditCustomer = (customer) => {
    setShowUpdateCustomerDialog(true)
    setEditingCustomer(customer)
  }

  const prevValues = usePrevious(values)

  const updateQuery = useCallback(
    debounce((query) => {
      router.get(route('customer.index'), query, {
        replace: true,
        preserveState: true
      })
    }, 500),
    []
  )

  useEffect(() => {
    if (prevValues) {
      const query = Object.keys(pickBy(values)).length ? pickBy(values) : { remember: 'forget' }
      updateQuery(query)
    }
  }, [values, updateQuery])

  const [showCreateCustomerDialog, setShowCreateCustomerDialog] = useState(false)
  const [showRepairHistory, setShowRepairHistory] = useState(false)
  const [getCustomerRepairHistory, setGetCustomerRepairHistory] = useState(false)
  const handleGetCustomerRepairHistory = (customer) => {
    setGetCustomerRepairHistory(customer)
    setShowRepairHistory(true)
  }

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Danh sách khách hàng</h2>}
    >
      <Head title="Tiếp nhận sửa chữa" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-col gap-3 text-xl font-semibold">
                  <span>Danh sách khách hàng</span>

                  <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 justify-between">
                    <Input
                      placeholder="Tên khách hàng, số điện thoại"
                      value={values?.search}
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          search: e.target.value
                        }))
                      }
                      className="w-full md:max-w-sm"
                      name="search"
                      type="search"
                    />

                    <Button onClick={() => setShowCreateCustomerDialog(true)}>
                      <PlusIcon className="w-4 h-4" />
                      Thêm mới
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader className="bg-secondary rounded-md">
                    <TableRow>
                      <TableHead className="flex-1">STT</TableHead>
                      <TableHead className="flex-1 min-w-32">Tên người dùng</TableHead>
                      <TableHead className="flex-1 min-w-28">Số điện thoại</TableHead>
                      <TableHead className="flex-1 min-w-48">Địa chỉ</TableHead>
                      <TableHead className="flex-1">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.length ? (
                      customers.map((customer, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell className="font-medium">{customer.name}</TableCell>
                          <TableCell className="font-medium">{customer.phone_number || 'Không có'}</TableCell>
                          <TableCell className="font-medium">{customer.address || 'Không có'}</TableCell>
                          <TableCell>
                            <div className="flex space-x-4 items-center">
                              <div title="Xem lịch sử sửa chữa">
                                <Eye
                                  className="h-4 w-4 cursor-pointer transition-colors"
                                  onClick={() => handleGetCustomerRepairHistory(customer)}
                                />
                              </div>

                              <div title="Cập nhật thông tin khách hàng">
                                <Pencil
                                  className="h-4 w-4 cursor-pointer text-yellow-500 hover:text-yellow-400 transition-colors"
                                  onClick={() => handleEditCustomer(customer)}
                                />
                              </div>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <div title="Xóa khách hàng">
                                    <Trash className="h-4 w-4 cursor-pointer text-destructive hover:text-red-600 transition-colors" />
                                  </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Bạn có chắc chắn?</AlertDialogTitle>
                                    <AlertDialogDescription>Hành động này không thể hoàn tác.</AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                                    <AlertDialogAction
                                      disabled={processing}
                                      onClick={() => handleDeleteCustomer(customer.id)}
                                    >
                                      Xóa
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} className="h-24 text-center">
                          <EmptyState />
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {showUpdateCustomerDialog && (
        <UpdateUserDialog
          user={editingCustomer}
          type="customer"
          open={showUpdateCustomerDialog}
          onOpenChange={setShowUpdateCustomerDialog}
          showTrigger={false}
        />
      )}

      {showCreateCustomerDialog && (
        <CreateUserDialog
          open={showCreateCustomerDialog}
          onOpenChange={setShowCreateCustomerDialog}
          showTrigger={false}
        />
      )}

      {showRepairHistory && (
        <RepairHistoryDialog
          customer={getCustomerRepairHistory}
          open={showRepairHistory}
          onOpenChange={setShowRepairHistory}
          showTrigger={false}
        />
      )}
    </AuthenticatedLayout>
  )
}
