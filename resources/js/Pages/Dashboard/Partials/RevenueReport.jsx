import { DateRange } from '@/Components/DateRange'
import EmptyState from '@/Components/EmptyState'
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
import { Button } from '@/Components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table'
import { formatDate, formatMoney } from '@/utils/format'
import { router, useForm, usePage } from '@inertiajs/react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { endOfMonth, startOfMonth } from 'date-fns'
import { debounce, pickBy } from 'lodash'
import { ArrowUpDown, Trash } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { usePrevious } from 'react-use'

export default function RevenueReport() {
  const { reports, filters } = usePage().props

  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})

  const now = Date.now()
  const [values, setValues] = useState({
    from: filters?.from || startOfMonth(now),
    to: filters?.to || endOfMonth(now)
  })

  const prevValues = usePrevious(values)

  const updateQuery = useCallback(
    debounce((query) => {
      router.get(route('dashboard'), query, {
        replace: true,
        preserveState: true,
        preserveScroll: true
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

  const columns = [
    {
      accessorKey: 'id',
      header: 'STT',
      cell: ({ row }) => <div className="uppercase">{Number(row.id) + 1}</div>
    },
    {
      accessorKey: 'branch_id',
      header: 'Chi nhánh',
      cell: ({ row }) => <div className="font-medium min-w-20">CN {row.getValue('branch_id')}</div>
    },
    {
      accessorKey: 'date',
      header: 'Ngày bán',
      cell: ({ row }) => <div className="capitalize">{formatDate(row.getValue('date')) || 'Không có'}</div>
    },
    {
      accessorKey: 'content',
      header: 'Nội dung',
      cell: ({ row }) => <div className="min-w-20">{row.getValue('content') || 'Không có'}</div>
    },
    {
      accessorKey: 'amount',
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Số tiền <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        return <div className="text-center font-medium">{formatMoney(row.getValue('amount'))}</div>
      }
    },
    {
      id: 'actions',
      header: 'Hành động',
      enableHiding: false,
      cell: function Cell({ row }) {
        const revenue = row.original
        const { processing, delete: destroy } = useForm()

        const handleDeleteRevenue = (revenueId) => {
          destroy(route('revenue_report.destroy', revenueId), {
            onSuccess: () => toast.success('Xóa thành công'),
            preserveScroll: true
          })
        }

        return (
          <div className="flex space-x-4 items-center justify-center min-w-20">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div title="Xóa doanh thu">
                  <Trash className="h-4 w-4 cursor-pointer text-destructive hover:text-red-600 transition-colors" />
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Bạn có chắc chắn?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Hành động này không thể hoàn tác. Doanh thu sẽ bị xóa vĩnh viễn.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction disabled={processing} onClick={() => handleDeleteRevenue(revenue.id)}>
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
    data: reports,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility
    }
  })

  return (
    <div className="mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-3">
        <h3 className="text-lg font-semibold leading-6 text-gray-900">Danh sách chi tiết doanh thu</h3>

        <DateRange
          defaultValue={{
            from: values?.from,
            to: values?.to
          }}
          onChange={(range) => {
            setValues((prev) => ({
              ...prev,
              from: range?.from || '',
              to: range?.to || ''
            }))
          }}
          className="w-full md:w-auto md:min-w-[200px]"
        />
      </div>

      <Table className="my-2">
        <TableHeader className="sticky top-0 z-10 bg-secondary">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
    </div>
  )
}
