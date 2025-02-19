import { formatDate, formatMoney, toVietnamese } from '@/utils/format'
import { QRCodeCanvas } from 'qrcode.react'
import { useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

export function PrintTicketView({ setting, ticket }) {
  const contentRef = useRef(null)
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: ticket?.code ? `Phiếu ${ticket?.code}` : 'Phiếu tiếp nhận sửa chữa'
  })

  useEffect(() => {
    reactToPrintFn()
  }, [reactToPrintFn])

  return (
    <div ref={contentRef} className="mx-auto w-64 bg-white p-4 text-xs">
      <div className="text-center mb-4">
        <h1 className="font-bold">{setting?.name}</h1>
        <p>Điện thoại: {setting?.phone_number}</p>
        <p>Địa chỉ: {setting?.address}</p>
        <p>
          Website: <a href={setting?.website}>{setting?.website}</a>
        </p>
        <div className="flex justify-center mt-2">
          <QRCodeCanvas value={setting.website} size={50} />
        </div>
      </div>

      <h2 className="text-center text-sm font-bold uppercase mb-2">Phiếu tiếp nhận sửa chữa</h2>
      <p className="text-center">
        Số: {ticket?.code} - Ngày: {formatDate(ticket?.created_at)}
      </p>

      <div className="mt-2">
        <p>
          <b>Khách hàng:</b> {ticket?.customer?.name}
        </p>
        <p>
          <b>Điện thoại:</b> {ticket?.customer.phone_number || 'Không có'}
        </p>
        <p>
          <b>Địa chỉ:</b> {ticket?.customer.address || 'Không có'}
        </p>
      </div>

      <div className="mt-2 border-t pt-2">
        <p>
          <b>Thiết bị:</b> {ticket.device.name}
        </p>
        <p>
          <b>IMEI:</b> {ticket.device.code}
        </p>
        <p>
          <b>Tình trạng:</b> {ticket.condition}
        </p>
        <p>
          <b>Giá:</b> {formatMoney(ticket.amount)}
        </p>
      </div>

      <div className="mt-2 border-t pt-2">
        <p>
          <b>Ghi chú:</b> {ticket.note || 'Không có'}
        </p>
        <p>
          <b>Số tiền bằng chữ:</b> {toVietnamese(ticket?.amount)}
        </p>
      </div>

      <div className="mt-2 border-t pt-2">
        <h3 className="font-bold text-center">Chính sách bảo hành</h3>
        <div className="text-justify">
          {setting?.policies?.map((policy, index) => (
            <p key={`policy-${index}`}>- {policy}</p>
          ))}
        </div>
      </div>

      <div className="mt-2 border-t pt-2">
        <h3 className="font-bold text-center">Hệ thống cửa hàng</h3>
        <div className="text-justify">
          {setting?.branches?.map((branch, index) => (
            <p key={`branch-${index}`}>- {branch}</p>
          ))}
        </div>
      </div>

      <p className="text-center mt-4">Cảm ơn quý khách đã sử dụng dịch vụ!</p>
    </div>
  )
}
