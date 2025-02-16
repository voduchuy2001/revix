import { formatDate, formatMoney, toVietnamese } from "@/utils/format";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export function PrintTicketView({ setting, ticket }) {
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({
        contentRef,
        documentTitle: ticket?.code
            ? `Phiếu ${ticket?.code}`
            : "Phiếu tiếp nhận sửa chữa",
    });

    useEffect(() => {
        reactToPrintFn();
    }, [reactToPrintFn]);

    return (
        <div ref={contentRef} className="mx-auto max-w-3xl bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
                <div className="mb-1 text-sm space-y-1">
                    <h1 className="font-semibold">{setting?.name}</h1>
                    <div>Điện thoại: {setting?.phone_number}</div>
                    <div>Địa chỉ: {setting?.address}</div>
                    <div>
                        Website:{" "}
                        <a href={setting?.website}>{setting?.website}</a>
                    </div>
                </div>

                <QRCodeCanvas
                    value={setting.website}
                    size={70}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"M"}
                />
            </div>

            <h2 className="mb-4 text-center text-xl font-bold uppercase">
                Phiếu tiếp nhận sửa chữa
            </h2>

            <p className="mb-4 text-center">
                Số: {ticket?.code} - Ngày: {formatDate(ticket?.created_at)}
            </p>

            <div className="mb-6 space-y-1">
                <div>Khách hàng: {ticket?.customer?.name}</div>
                <div>
                    Điện thoại:{" "}
                    {ticket?.customer.phone_number || "Không có số điện thoại"}
                </div>
                <div>
                    Địa chỉ: {ticket?.customer.address || "Không có địa chỉ"}
                </div>
            </div>

            <table className="mb-6 w-full">
                <thead>
                    <tr className="border bg-secondary">
                        <th className="border p-2 text-center">Thiết bị</th>
                        <th className="border p-2 text-center">Tình trạng</th>
                        <th className="border p-2 text-center">Giá</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border">
                        <td className="border p-2">
                            <div className="flex flex-col">
                                <div className="font-bold">
                                    {ticket.device.name}
                                </div>
                                <div className="text-xs">
                                    IMEI: {ticket.device.code}
                                </div>
                            </div>
                        </td>
                        <td className="border p-2">{ticket.condition}</td>
                        <td className="border p-2">
                            {formatMoney(ticket.amount)}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="flex justify-between items-start">
                <div className="w-1/2">
                    <span className="font-bold">Ghi chú:</span>{" "}
                    {ticket.note || "Không có ghi chú"}
                </div>

                <div className="w-1/2">
                    <span className="font-bold">Số tiền bằng chữ: </span>
                    {toVietnamese(ticket?.amount)}
                </div>
            </div>

            <div className="my-8 border-t pt-4">
                <div className="grid grid-cols-2 gap-6">
                    <div className="text-justify">
                        <h3 className="font-bold mb-2">Chính sách bảo hành</h3>
                        <div className="space-y-1">
                            {setting.policies.map((policy, index) => (
                                <div key={`policy-${index}`}>- {policy}</div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2">Hệ thống cửa hàng</h3>
                        <div className="space-y-1">
                            {setting.branches.map((branch, index) => (
                                <div key={`branch-${index}`}>- {branch}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
