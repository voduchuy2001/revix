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
import toast from "react-hot-toast";

export function CreateUserDialog({
    open,
    onOpenChange,
    showTrigger = true,
    type = "customer",
    ...props
}) {
    const { reset, setData, errors, processing, post } = useForm({
        name: "",
        phone_number: "",
        address: "",
        type,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("user.store"), {
            onSuccess: () => {
                onOpenChange?.(false);
                toast.success("Thêm mới thành công");
            },
        });
    };

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
                    <form id={type} onSubmit={submit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            <div className="space-y-1">
                                <Label htmlFor="name">Tên khách hàng</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="phone_number">
                                    Số điện thoại
                                </Label>
                                <Input
                                    id="phone_number"
                                    type="text"
                                    name="phone_number"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("phone_number", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.phone_number}
                                    className="mt-2"
                                />
                            </div>

                            <div className="col-span-1 md:col-span-2 w-full space-y-4">
                                <div className="space-y-1">
                                    <Label htmlFor="address">Địa chỉ</Label>
                                    <Textarea
                                        id="address"
                                        type="text"
                                        name="address"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.address}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <DialogFooter className="flex gap-2 sm:space-x-0">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => reset()}
                        >
                            Hủy
                        </Button>
                    </DialogClose>

                    <Button form={type} disabled={processing}>
                        Thêm mới
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
