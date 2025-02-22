import { useEffect } from 'react'
import { usePage } from '@inertiajs/react'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { formatDate, formatMoney } from '@/utils/format'

export default function MovementReport() {
  const { reports } = usePage().props
  const { products } = reports

  useEffect(() => {
    const exportAndGoBack = async () => {
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Báo cáo kho')

      worksheet.columns = [
        { header: 'STT', key: 'index', width: 8 },
        { header: 'Tên sản phẩm', key: 'name', width: 20 },
        { header: 'Mã sản phẩm', key: 'sku', width: 15 },
        { header: 'Danh mục', key: 'category', width: 15 },
        { header: 'Giá', key: 'price', width: 15, alignment: 'center' },
        { header: 'Số lượng', key: 'stock', width: 10, alignment: 'center' },
        { header: 'Ghi chú', key: 'note', width: 10 },
        { header: 'Ngày tạo', key: 'created_at', width: 20 }
      ]

      let index = 1
      products.forEach(({ name, sku, category, price, stock, note, created_at }) => {
        worksheet.addRow({
          index: index++,
          name: name,
          sku: sku,
          category: category,
          price: formatMoney(price),
          stock: stock,
          note: note,
          created_at: formatDate(created_at)
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

      const now = new Date()
      const fileName = `BC-${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}.xlsx`
      saveAs(blob, fileName)

      window.history.back()
    }

    exportAndGoBack()
  }, [])

  return null
}
