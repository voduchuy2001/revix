import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ tickets }) {
    console.log("check tickets data: ", tickets);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tiếp nhận sửa chữa
                </h2>
            }
        >
            <Head title="Tiếp nhận sửa chữa" />
        </AuthenticatedLayout>
    );
}
