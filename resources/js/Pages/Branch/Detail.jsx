import { Input } from '@/Components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Button } from '@/Components/ui/button'
import { ArrowUpDown, Download, FileDown, FileUp, Pencil, Plus, Trash } from 'lucide-react'
import { useState } from 'react'
import { formatDate, formatMoney } from '@/utils/format'
import CreateProductDialog from '../Product/Partials/CreateProductDialog'
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
import toast from 'react-hot-toast'
import UpdateProductDialog from '../Product/Partials/UpdateProductDialog'
import EmptyState from '@/Components/EmptyState'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import UpdateProductStockDialog from '../Product/Partials/UpdateProductStockDialog'
import { Badge } from '@/Components/ui/badge'
import MovementProductHistoryDialog from '../Product/Partials/MovementProductHistoryDialog'

export default function Detail() {
  const { products: data, branchId } = usePage().props
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const [showCreateImportProductDialog, setShowCreateImportProductDialog] = useState(false)

  const columns = [
    {
      accessorKey: 'id',
      header: 'STT',
      cell: ({ row }) => <div className="uppercase">{Number(row.id) + 1}</div>
    },
    {
      accessorKey: 'sku',
      header: 'Mã sản phẩm',
      cell: ({ row }) => <div className="uppercase">{row.getValue('sku')}</div>
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
      accessorKey: 'price',
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Giá nhập <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        return <div className="text-center font-medium">{formatMoney(row.getValue('price'))}</div>
      }
    },
    {
      accessorKey: 'stock',
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Tồn kho <ArrowUpDown />
        </Button>
      ),
      cell: function Cell({ row }) {
        const [showMovementHistoryDialog, setShowMovementHistoryDialog] = useState(false)
        const product = row.original

        return (
          <>
            <div className="text-center cursor-pointer" onClick={() => setShowMovementHistoryDialog(true)}>
              <Badge variant={Number(row.getValue('stock')) <= 5 ? '' : 'secondary'}> {row.getValue('stock')}</Badge>
            </div>

            {showMovementHistoryDialog && (
              <MovementProductHistoryDialog
                product={product}
                open={showMovementHistoryDialog}
                onOpenChange={setShowMovementHistoryDialog}
                showTrigger={false}
              />
            )}
          </>
        )
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
        const [showUpdateProductStockDialog, setShowUpdateProductStockDialog] = useState(false)
        const [productStockType, setProductStockType] = useState('')
        const [productUpdateStockQuantity, setProductUpdateStockQuantity] = useState(0)
        const handleShowImportProductStockDialog = (product, type = 'import') => {
          setShowUpdateProductStockDialog(true)
          setProductUpdateStockQuantity(product)
          setProductStockType(type)
        }

        const handleShowExportProductStockDialog = (product, type = 'export') => {
          setShowUpdateProductStockDialog(true)
          setProductUpdateStockQuantity(product)
          setProductStockType(type)
        }

        return (
          <div className="flex space-x-4 items-center">
            <div title="Nhập kho" onClick={() => handleShowImportProductStockDialog(product)}>
              <FileDown className="h-4 w-4 cursor-pointer text-blue-400 hover:text-blue-600 transition-colors" />
            </div>
            {showUpdateProductStockDialog && (
              <UpdateProductStockDialog
                product={productUpdateStockQuantity}
                type={productStockType}
                open={showUpdateProductStockDialog}
                onOpenChange={setShowUpdateProductStockDialog}
                showTrigger={false}
              />
            )}

            <div title="Xuất kho" onClick={() => handleShowExportProductStockDialog(product)}>
              <FileUp className="h-4 w-4 cursor-pointer text-slate-500 hover:text-slate-400 transition-colors" />
            </div>

            <div title="Cập nhật sản phẩm" onClick={() => setShowUpdateProductDialog(true)}>
              <Pencil className="h-4 w-4 cursor-pointer text-yellow-500 hover:text-yellow-400 transition-colors" />
            </div>

            {showUpdateProductDialog && (
              <UpdateProductDialog
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
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Kho chi nhánh {branchId}</h2>}
    >
      <Head title={`Kho chi nhánh ${branchId}`} />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-col gap-3 text-xl font-semibold">
                  <span>Kho chi nhánh {branchId}</span>
                  <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 justify-between">
                    <Input
                      type="search"
                      placeholder="Nhập mã, tên sản phẩm, danh mục"
                      value={globalFilter}
                      onChange={(e) => setGlobalFilter(e.target.value)}
                      className="w-full md:max-w-sm"
                    />

                    <div>
                      <Button asChild variant="outline" className="mr-2">
                        <Link href={route('branch.get_reports', { id: branchId })}>
                          <Download className="w-4 h-4" /> Tải báo cáo
                        </Link>
                      </Button>

                      <Button onClick={() => setShowCreateImportProductDialog(true)}>
                        <Plus className="w-4 h-4" /> Thêm sản phẩm
                      </Button>
                    </div>
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

      {showCreateImportProductDialog && (
        <CreateProductDialog
          type="import"
          branchId={branchId}
          open={showCreateImportProductDialog}
          onOpenChange={setShowCreateImportProductDialog}
          showTrigger={false}
        />
      )}
    </AuthenticatedLayout>
  )
}

const globalFilterFunction = (row, filterValue) => {
  if (!filterValue) return true
  return ['name', 'sku', 'category'].some((key) =>
    row.getValue(key)?.toString().toLowerCase().includes(filterValue.toLowerCase())
  )
}
