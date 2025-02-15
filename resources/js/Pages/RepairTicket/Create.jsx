import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const Create = () => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Thêm phiếu tiếp nhận sửa chữa
                </h2>
            }
        >
            <Head title="Thêm phiếu tiếp nhận sửa chữa" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg"></div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
