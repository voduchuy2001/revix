import { formatDate, formatMoney, toVietnamese } from '@/utils/format'
import { QRCodeCanvas } from 'qrcode.react'
import { useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

export function PrintTicketView({ setting, ticket, redirectAfterPrint = true }) {
  const contentRef = useRef(null)
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: ticket?.code ? `Phiếu ${ticket?.code}` : 'Phiếu tiếp nhận sửa chữa',
    onAfterPrint: () => {
      redirectAfterPrint ? (window.location.href = route('repair_ticket.create')) : window.location.reload()
    }
  })

  useEffect(() => {
    reactToPrintFn()
  }, [])

  return (
    <div ref={contentRef} className="print:font-roboto mx-auto bg-white p-4 text-xs">
      <div className="break-inside-avoid break-after-page">
        <div className="text-center py-5 space-y-1">
          <h1 className="font-bold">{setting?.type}</h1>
          <h2 className="font-bold text-lg">{setting?.name}</h2>
          <h3 className="font-bold">{setting?.short_description}</h3>

          <p>Điện thoại: {setting?.phone_number}</p>
          <p>
            Website: <a href={setting?.website}>{setting?.website}</a>
          </p>
          <p>Địa chỉ: {setting?.address}</p>
        </div>

        <div className="flex justify-center mb-5">
          <QRCodeCanvas value={setting.website} size={60} />
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

        <div className="mt-2 border-t border-black border-dashed pt-2">
          <p>
            <b>Thiết bị:</b> {ticket.device.name}
          </p>
          <p>
            <b>IMEI:</b> {ticket.device.code || 'Không có'}
          </p>
          <p>
            <b>Tình trạng:</b> {ticket.condition}
          </p>
          <p>
            <b>Ghi chú:</b> {ticket.note || 'Không có'}
          </p>
          <p>
            <b>Giá:</b> {ticket.amount ? formatMoney(ticket.amount) : 'Không có'}
          </p>
          <p>
            <b>Số tiền bằng chữ:</b> {ticket?.amount ? toVietnamese(ticket?.amount) : 'Không có'}
          </p>
        </div>

        <div className="mt-2 border-t border-black border-dashed pt-2">
          <h3 className="font-bold text-center uppercase">Chính sách bảo hành</h3>
          <div className="text-justify">
            {setting?.policies?.map((policy, index) => (
              <p key={`policy-${index}`}>- {policy}</p>
            ))}
          </div>
        </div>

        <div className="mt-2">
          <b>Kỹ thuật: </b> {setting?.support_phone_number}
        </div>

        <div className="mt-2 border-t border-black border-dashed pt-2">
          <h3 className="font-bold text-center uppercase">Hệ thống cửa hàng</h3>
          <div className="text-justify">
            {setting?.branches?.map((branch, index) => (
              <p key={`branch-${index}`}>- {branch}</p>
            ))}
          </div>
        </div>

        <div className="mt-2">
          <b className="text-center">Cảm ơn Quý khách hàng đã tin tưởng!</b>
        </div>
      </div>

      <div className="break-inside-avoid">
        <div className="text-start">
          <div className="pt-8">
            <p>
              <b>Số phiếu:</b> {ticket.code}
            </p>
            <p>
              <b>KH:</b> {ticket.customer.name || 'Không có'} - {ticket.customer.phone_number || 'Không có'}
            </p>
            <p>
              <b>Ngày nhận:</b> {formatDate(ticket.created_at)}
            </p>
            <p>
              <b>Máy:</b> {ticket.device.name || 'Không có'}
            </p>
            <p>
              <b>IMEI:</b> {ticket.device.code || 'Không có'}
            </p>
            <p>
              <b>Tình trạng:</b> {ticket.condition}
            </p>
            <p>
              <b>Chi phí sửa chữa:</b> {ticket.amount ? formatMoney(ticket.amount) : 'Không có'}
            </p>
            <p>
              <b>Ghi chú:</b> {ticket.note || 'Không có'}
            </p>
            <p>
              <b>Thợ:</b> {ticket.technician || 'Không có'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
