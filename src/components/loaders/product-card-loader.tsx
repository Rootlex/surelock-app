import React from "react";
import { Skeleton } from "../ui/skeleton";

const ProductCardLoader = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3">
            {Array(3)
                .fill(null)
                .map((_, i) => (
                    <div
                        key={i}
                        className="flex flex-col items-center gap-x-4 mb-4"
                    >
                        <Skeleton className="w-40 h-[140px] mb-4" />
                        <div className="flex flex-col gap-y-1">
                            <Skeleton className="w-[200px] h-[20px] rounded-lg" />
                            <Skeleton className="w-[200px] h-[20px] rounded-full" />
                            <Skeleton className="w-[200px] h-[20px] rounded-full" />
                        </div>
                    </div>
                ))}
            ;
        </div>
    );
};

export default ProductCardLoader;
