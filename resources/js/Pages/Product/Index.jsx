import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, usePage } from '@inertiajs/react'
import { ArrowUpDown, Pencil, Plus, Trash } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useState } from 'react'
import EmptyState from '@/Components/EmptyState'
import UpdateProductDialog from './Partials/UpdateProductDialog'
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
import { formatDate, formatMoney } from '@/utils/format'
import CreateProductDialog from './Partials/CreateProductDialog'

export default function Index() {
  const { products: data } = usePage().props

  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [showCreateExportProductDialog, setShowCreateExportProductDialog] = useState(false)

  const columns = [
    {
      accessorKey: 'id',
      header: 'STT',
      cell: ({ row }) => <div className="uppercase">{Number(row.id) + 1}</div>
    },
    {
      accessorKey: 'name',
      header: 'Tên sản phẩm',
      cell: ({ row }) => <div className="font-medium min-w-32">{row.getValue('name')}</div>
    },
    {
      accessorKey: 'category',
      header: 'Danh mục',
      cell: ({ row }) => <div className="capitalize">{row.getValue('category') || 'Không có'}</div>
    },
    {
      accessorKey: 'sale_price',
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Giá bán <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        return <div className="text-center font-medium">{formatMoney(row.getValue('sale_price'))}</div>
      }
    },
    {
      accessorKey: 'created_at',
      header: 'Ngày nhập',
      cell: ({ row }) => <div className="font-medium">{formatDate(row.getValue('created_at'))}</div>
    },
    {
      id: 'actions',
      header: 'Hành động',
      enableHiding: false,
      cell: function Cell({ row }) {
        const product = row.original
        const { processing, delete: destroy } = useForm()

        const handleDeleteProduct = (productId) => {
          destroy(route('product.destroy', productId), {
            onSuccess: () => toast.success('Xóa thành công'),
            onError: (error) => toast.error(error[0])
          })
        }

        const [showUpdateProductDialog, setShowUpdateProductDialog] = useState(false)

        return (
          <div className="flex space-x-4 items-center">
            <div title="Cập nhật sản phẩm" onClick={() => setShowUpdateProductDialog(true)}>
              <Pencil className="h-4 w-4 cursor-pointer text-yellow-500 hover:text-yellow-400 transition-colors" />
            </div>

            {showUpdateProductDialog && (
              <UpdateProductDialog
                type="sales"
                product={product}
                open={showUpdateProductDialog}
                onOpenChange={setShowUpdateProductDialog}
                showTrigger={false}
              />
            )}

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div title="Xóa sản phẩm">
                  <Trash className="h-4 w-4 cursor-pointer text-destructive hover:text-red-600 transition-colors" />
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Bạn có chắc chắn?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Hành động này không thể hoàn tác. Phiếu sẽ bị xóa vĩnh viễn.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction disabled={processing} onClick={() => handleDeleteProduct(product.id)}>
                    Xóa
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )
      }
    }
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    filterFns: {
      globalFilter: globalFilterFunction
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter
    }
  })

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Danh sách sản phẩm bán ra</h2>}
    >
      <Head title="Danh sách sản phẩm bán ra" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-col gap-3 text-xl font-semibold">
                  <span>Danh sách sản phẩm bán ra</span>
                  <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 justify-between">
                    <Input
                      type="search"
                      placeholder="Nhập tên sản phẩm, danh mục"
                      value={globalFilter}
                      onChange={(e) => setGlobalFilter(e.target.value)}
                      className="w-full md:max-w-sm"
                    />

                    <Button onClick={() => setShowCreateExportProductDialog(true)}>
                      <Plus className="w-4 h-4" /> Thêm sản phẩm
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader className="sticky top-0 z-10 bg-secondary">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
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

      {showCreateExportProductDialog && (
        <CreateProductDialog
          type="export"
          open={showCreateExportProductDialog}
          onOpenChange={setShowCreateExportProductDialog}
          showTrigger={false}
        />
      )}
    </AuthenticatedLayout>
  )
}

const globalFilterFunction = (row, filterValue) => {
  if (!filterValue) return true
  return ['name', 'category'].some((key) =>
    row.getValue(key)?.toString().toLowerCase().includes(filterValue.toLowerCase())
  )
}
