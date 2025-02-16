import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export function PrintInvoiceView({ setting, ticket }) {
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({
        contentRef,
        documentTitle: "Phiếu tiếp nhận sửa chữa",
    });

    useEffect(() => {
        reactToPrintFn();
    }, [reactToPrintFn]);

    return <div>PrintInvoiceView</div>;
}
