import { formatCurrency } from "@/lib/helpers";
import { ProductType } from "@/lib/types";
import Image from "next/image";
import React from "react";
import Tag from "./tag";
import { useRouter } from "next/navigation";

interface Props {
    product: ProductType;
}

const PerProductCard = ({ product }: Props) => {
    const { id, image_urls, is_active, name, price, quantity } = product;
    const router = useRouter();

    const isActive = is_active === true ? "Active" : "Inactive";

    return (
        <div
            onClick={() => router.push(`/products/${id}`)}
            className="flex bg-white items-center gap-x-2 rounded-md overflow-hidden shadow-md p-2 py-4 mb-4 flex-col cursor-pointer hover:bg-gray-50 transition-all"
        >
            <div className="relative w-40 h-[140px]">
                <Image
                    src={image_urls[0]}
                    alt={name}
                    fill
                    className="object-contain"
                />
            </div>
            <div className=" my-2 px-2">
                <p className="text-header-text text-sm font-semibold mb-4">
                    {name}
                </p>
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-supporting-text">
                        {formatCurrency(price)}
                    </p>
                    <p className="text-sm text-supporting-text">
                        {quantity} in stock
                    </p>
                </div>
                <div className="flex items-center gap-x-2">
                    {isActive === "Inactive" ? (
                        <Tag variant={"neutral"} text="Archived" />
                    ) : (
                        <Tag variant={"good"} text="Active" />
                    )}
                    {quantity < 1 ? (
                        <Tag variant={"neutral"} text={"Out of Stock"} />
                    ) : quantity < 10 ? (
                        <Tag variant={"bad"} text={"Low Stock"} />
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default PerProductCard;
