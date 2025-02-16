import { Head, usePage } from "@inertiajs/react";
import { PrintTicketView } from "./Partials/PrintTicketView";

export default function Print() {
    const { ticket, setting } = usePage().props;

    return (
        <>
            <Head title={`Phiếu ${ticket.code}`} />
            <PrintTicketView setting={setting} ticket={ticket} />
        </>
    );
}
