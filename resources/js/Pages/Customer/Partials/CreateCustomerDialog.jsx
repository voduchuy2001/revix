import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/Button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { useForm } from "@inertiajs/react";
import { PlusIcon } from "@radix-ui/react-icons";

export function CreateCustomerDialog({
    open,
    onOpenChange,
    showTrigger = true,
    ...props
}) {
    const { errors, processing } = useForm();

    return (
        <Dialog open={open} onOpenChange={onOpenChange} {...props}>
            {showTrigger && (
                <DialogTrigger asChild>
                    <Button className="mx-2" variant="outline" size="sm">
                        <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                        Thêm mới
                    </Button>
                </DialogTrigger>
            )}

            <DialogContent className="md:h-auto md:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Thêm khách hàng mới</DialogTitle>
                    <DialogDescription>
                        Điền vào chi tiết phía dưới để thêm khách hàng mới
                    </DialogDescription>
                </DialogHeader>

                <div className="max-h-[65vh] overflow-auto md:max-h-[75vh]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        {/* Tên máy */}
                        <div className="space-y-1">
                            <Label htmlFor="device_name">Tên khách hàng</Label>
                            <Input
                                id="device_name"
                                type="text"
                                name="device_name"
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("device_name", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.device_name}
                                className="mt-2"
                            />
                        </div>

                        {/* IMEI */}
                        <div className="space-y-1">
                            <Label htmlFor="imei">Số điện thoại</Label>
                            <Input
                                id="imei"
                                type="text"
                                name="imei"
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("imei", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.imei}
                                className="mt-2"
                            />
                        </div>

                        {/* Chi phí sửa chữa */}
                        <div className="col-span-1 md:col-span-2 w-full space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="repair_cost">Địa chỉ</Label>
                                <Textarea
                                    id="repair_cost"
                                    type="text"
                                    name="repair_cost"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("repair_cost", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.repair_cost}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex gap-2 sm:space-x-0">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                form.reset();
                            }}
                        >
                            Hủy
                        </Button>
                    </DialogClose>

                    <Button form="create-customer" disabled={processing}>
                        Thêm mới
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
