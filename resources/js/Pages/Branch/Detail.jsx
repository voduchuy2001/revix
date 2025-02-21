import { Input } from '@/Components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, usePage } from '@inertiajs/react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Button } from '@/Components/ui/button'
import { ArrowUpDown, FileDown, FileUp, Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { formatMoney } from '@/utils/format'
import CreateProductDialog from '../Product/Partials/CreateProductDialog'

export default function Detail() {
  const { products: data, branchId } = usePage().props

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
      cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>
    },
    {
      accessorKey: 'category',
      header: 'Danh mục',
      cell: ({ row }) => <div className="capitalize">{row.getValue('category')}</div>
    },
    {
      accessorKey: 'sale_price',
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Giá nhập <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        return <div className="text-center font-medium">{formatMoney(row.getValue('sale_price'))}</div>
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

        return <div className="text-center cursor-pointer">{row.getValue('stock')}</div>
      }
    },
    {
      id: 'actions',
      header: 'Hành động',
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original

        return (
          <div className="flex space-x-4 items-center">
            <div title="Nhập kho">
              <FileDown className="h-4 w-4 cursor-pointer text-primary hover:text-blue-600 transition-colors" />
            </div>

            <div title="Xuất kho">
              <FileUp className="h-4 w-4 cursor-pointer text-yellow-500 hover:text-yellow-400 transition-colors" />
            </div>

            <div title="Cập nhật sản phẩm">
              <Pencil className="h-4 w-4 cursor-pointer text-yellow-500 hover:text-yellow-400 transition-colors" />
            </div>

            <div title="Cập nhật sản phẩm">
              <Trash2 className="h-4 w-4 cursor-pointer text-yellow-500 hover:text-yellow-400 transition-colors" />
            </div>
          </div>
        )
      }
    }
  ]

  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

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

  const [showCreateImportProductDialog, setShowCreateImportProductDialog] = useState(false)

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Kho chi nhánh 1</h2>}
    >
      <Head title="Kho chi nhánh 1" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
          <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <div className="w-full">
              <div className="flex items-center py-4">
                <Input
                  placeholder="Nhập mã, tên sản phẩm, danh mục"
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="max-w-sm"
                />

                <Button variant="outline" className="ml-auto" onClick={() => setShowCreateImportProductDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" /> Thêm sản phẩm
                </Button>
              </div>
              <div className="rounded-md border">
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
                          Không có kết quả tìm kiếm
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
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

export const globalFilterFunction = (row, filterValue) => {
  if (!filterValue) return true
  return ['name', 'sku', 'category'].some((key) =>
    row.getValue(key)?.toString().toLowerCase().includes(filterValue.toLowerCase())
  )
}
