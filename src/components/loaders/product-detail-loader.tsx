import React from "react";
import { Skeleton } from "../ui/skeleton";

const ProductDetailLoader = () => {
    return (
        <div className="p-5 flex flex-col items-center">
            <div className="flex items-center justify-between mb-4">
                <Skeleton className="w-[200px] h-[20px] rounded-lg" />
                <div>
                    <Skeleton className="w-[4px] h-[20px] rounded-lg" />
                </div>
                <div className="hidden">
                    <Skeleton className="w-[100px] h-[50px] rounded-lg" />
                    <Skeleton className="w-[100px] h-[50px] rounded-lg" />
                </div>
            </div>

            <div className="py-4">
                <h1 className="font-semibold text-header-text mb-4">
                    <Skeleton className="w-[200px] h-[20px] rounded-lg" />
                </h1>
                <div className="h-[200px] relative mb-6">
                    <Skeleton className="w-[200px] h-[200px] rounded-lg" />
                </div>

                <h3 className="font-semibold text-supporting-text mb-4 underline">
                    <Skeleton className="w-[200px] h-[20px] rounded-lg" />
                </h3>
                <div className="flex flex-col gap-y-4">
                    <Skeleton className="w-[200px] h-[20px] rounded-lg" />
                    <Skeleton className="w-[200px] h-[20px] rounded-lg" />
                    <Skeleton className="w-[200px] h-[20px] rounded-lg" />
                    <Skeleton className="w-[200px] h-[20px] rounded-lg" />
                    <Skeleton className="w-[200px] h-[20px] rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailLoader;
