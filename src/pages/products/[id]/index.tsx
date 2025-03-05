import ErrorSection from "@/components/global/error-section";
import Warning from "@/components/global/warning";
import ProductDetailLoader from "@/components/loaders/product-detail-loader";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DEFAULT_URL } from "@/lib/constants";
import { formatCurrency, formatTimeFn } from "@/lib/helpers";
import { ProductType } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import toast from "react-hot-toast";

const TextDetail = ({ label, value }: { label: string; value: string }) => {
    return (
        <div className={"flex gap-x-2 items-center py-2"}>
            <label className="text-sm font-medium text-supporting-text w-[30%]">
                {label}
            </label>
            <h4 className="text-header-text font-medium break-all text-sm">
                {value}
            </h4>
        </div>
    );
};

const ProductPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = React.useState(true);
    const [product, setProduct] = React.useState<ProductType | null>(null);

    const handleDelete = () => {
        fetch(`${DEFAULT_URL}/${id}`, {
            method: "DELETE",
        })
            .then(res => res.text())
            .then(data => {
                console.log("Data", data);
                toast.success("Product deleted successfully");
                router.push("/");
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to delete product");
                router.push("/");
            })
            .finally(() => setLoading(false));
    };

    const getProduct = useCallback(() => {
        setLoading(true);
        fetch(`${DEFAULT_URL}?id=${id}`)
            .then(res => res.json())
            .then((data: ProductType[]) => {
                setLoading(false);
                if (!data || !data.length)
                    return toast.error("Product not found");
                console.log("New Data", data);
                setProduct(data[0]);
            })
            .catch(err => console.error(err));
    }, [id]);
    useEffect(() => {
        if (id) {
            getProduct();
        }
    }, [id, getProduct]);

    if (loading) return <ProductDetailLoader />;

    if (!product) return <ErrorSection text="Product not Found" />;

    return (
        <div className="p-4 lg:p-10 ">
            <div className="flex items-center justify-between mb-4">
                <h1 className="font-semibold text-header-text">Product</h1>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="outline">Actions</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="flex flex-col items-center">
                            <Button
                                variant="ghost"
                                onClick={() =>
                                    router.push(
                                        `/products/update/${product.id}`
                                    )
                                }
                            >
                                Update
                            </Button>
                            <DropdownMenuSeparator />
                            <Warning
                                TriggerComp={() => {
                                    return (
                                        <div className="flex justify-center  w-full flex-1">
                                            {product.is_active ? (
                                                <Button variant="ghost">
                                                    Delete
                                                </Button>
                                            ) : (
                                                <Button variant="ghost">
                                                    Activate
                                                </Button>
                                            )}
                                        </div>
                                    );
                                }}
                                onConfirm={() => {
                                    setLoading(true);
                                    handleDelete();
                                }}
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="hidden">
                    <Button>Update Product</Button>
                    <Button variant={"destructive"}>Delete Product</Button>
                </div>
            </div>

            <div className="py-4 flex flex-col lg:flex-row lg:gap-x-10 lg:w-1/2 mx-auto">
                <div>
                    <h1 className="font-semibold text-header-text mb-4">
                        {product.name}
                    </h1>
                    <div className="h-[200px] relative mb-6">
                        <Image
                            src={product.image_urls[0]}
                            alt="product"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-supporting-text mb-4 underline">
                        Basic Information
                    </h3>
                    <div>
                        <TextDetail
                            label="Price"
                            value={formatCurrency(product.price)}
                        />
                        <TextDetail
                            label="Quantity"
                            value={`${product.quantity} in stock`}
                        />
                        <TextDetail
                            label="Created"
                            value={formatTimeFn(product.created_at)}
                        />
                        <TextDetail
                            label="Last Updated"
                            value={formatTimeFn(product.updated_at)}
                        />
                        <TextDetail
                            label="Status"
                            value={product.is_active ? "Active" : "Inactive"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
