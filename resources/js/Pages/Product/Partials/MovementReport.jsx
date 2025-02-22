import { useEffect } from 'react'
import { usePage } from '@inertiajs/react'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { formatDate, formatMoney } from '@/utils/format'

export default function MovementReport() {
  const { reports } = usePage().props
  const { products, setting } = reports

  useEffect(() => {
    const exportAndGoBack = async () => {
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Stock Report')

      worksheet.columns = [
        { header: 'Tên sản phẩm', key: 'name', width: 20 },
        { header: 'Mã sản phẩm', key: 'sku', width: 15 },
        { header: 'Danh mục', key: 'category', width: 15 },
        { header: 'Giá', key: 'price', width: 15, alignment: 'center' },
        { header: 'Số lượng', key: 'stock', width: 10, alignment: 'center' },
        { header: 'Ghi chú', key: 'note', width: 10 },
        { header: 'Ngày tạo', key: 'created_at', width: 20 }
      ]

      products.forEach((product) => {
        product.stock_movement.forEach((movement) => {
          worksheet.addRow({
            name: product.name,
            sku: product.sku,
            category: product.category,
            price: formatMoney(product.price),
            stock: product.stock,
            note: movement.note,
            created_at: formatDate(movement.created_at)
          })
        })
      })

      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true }
        cell.alignment = { horizontal: 'center' }
      })

      const buffer = await workbook.xlsx.writeBuffer()
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })

      saveAs(blob, 'Stock_Report.xlsx')

      window.history.back()
    }

    exportAndGoBack()
  }, [])

  return null
}
