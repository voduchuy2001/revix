import EmptyState from '@/Components/EmptyState'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import { Pencil, PlusIcon, Trash } from 'lucide-react'
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
import { CreateUserDialog } from './Partials/CreateUserDialog'
import toast from 'react-hot-toast'

export default function Index() {
  const { users, filters } = usePage().props

  const { processing, delete: destroy } = useForm()
  const [values, setValues] = useState({
    search: filters?.search || ''
  })

  const handleDeleteUser = (id) => {
    destroy(route('user.destroy', id), {
      onSuccess: () => toast.success('Xóa thành công'),
      onError: (error) => toast.error(error[0] || 'Lỗi khi xóa')
    })
  }

  const [showUpdateUserDialog, setShowUpdateUserDialog] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const handleEditUser = (user) => {
    setShowUpdateUserDialog(true)
    setEditingUser(user)
  }

  const prevValues = usePrevious(values)

  const updateQuery = useCallback(
    debounce((query) => {
      router.get(route('user.index'), query, {
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

  const [showCreateUserDialog, setShowCreateUserDialog] = useState(false)

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Danh sách người dùng hệ thống</h2>}
    >
      <Head title="Danh sách người dùng hệ thống" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-col gap-3 text-xl font-semibold">
                  <span>Danh sách người dùng hệ thống</span>
                  <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 justify-between">
                    <Input
                      placeholder="Tên người dùng, số điện thoại"
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

                    <Button onClick={() => setShowCreateUserDialog(true)}>
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
                    {users.length ? (
                      users.map((user, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell className="font-medium">{user.phone_number || 'Không có'}</TableCell>
                          <TableCell className="font-medium">{user.address || 'Không có'}</TableCell>
                          <TableCell>
                            <div className="flex space-x-4">
                              <div title="Cập nhật thông tin người dùng">
                                <Pencil
                                  className="h-4 w-4 cursor-pointer text-yellow-500 hover:text-yellow-400 transition-colors"
                                  onClick={() => handleEditUser(user)}
                                />
                              </div>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <div title="Xóa người dùng">
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
                                    <AlertDialogAction disabled={processing} onClick={() => handleDeleteUser(user.id)}>
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
                        <TableCell colSpan={5} className="text-center py-6 text-gray-500">
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

      {showUpdateUserDialog && (
        <UpdateUserDialog
          user={editingUser}
          open={showUpdateUserDialog}
          onOpenChange={setShowUpdateUserDialog}
          showTrigger={false}
        />
      )}

      {showCreateUserDialog && (
        <CreateUserDialog
          type={'user'}
          open={showCreateUserDialog}
          onOpenChange={setShowCreateUserDialog}
          showTrigger={false}
        />
      )}
    </AuthenticatedLayout>
  )
}
