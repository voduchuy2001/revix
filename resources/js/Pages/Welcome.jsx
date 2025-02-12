import { Button } from "@/Components/ui/button";
import { Head, Link } from "@inertiajs/react";

export default function Welcome() {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <Head title="Táo cười" />

            <h1 className="text-4xl font-bold mb-8">
                Chào mừng bạn đến với trang quản lý
            </h1>
            <p className="text-xl mb-8">
                Bắt đầu bằng cách đăng nhập vào tài khoản của bạn.
            </p>
            <Link href={route("login")}>
                <Button>Đi đến trang đăng nhập</Button>
            </Link>
        </div>
    );
}
