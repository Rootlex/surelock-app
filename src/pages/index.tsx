import PerProductCard from "@/components/global/per-product-card";
import ProductCardLoader from "@/components/loaders/product-card-loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEFAULT_URL } from "@/lib/constants";
import { ProductType } from "@/lib/types";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
    const [products, setProducts] = useState<ProductType[] | null>(null);

    useEffect(() => {
        fetch(DEFAULT_URL)
            .then(res => res.json())
            .then((data: ProductType[]) => {
                if (!data || !data.length) return;
                console.log("Data", data);
                setProducts(data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-4 lg:p-10">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-header-text text-lg font-semibold ">
                        Product List{" "}
                        <span className="text-supporting-text text-sm font-semibold">
                            {" "}
                            {products ? ` (${products.length})` : ""}
                        </span>
                    </h1>
                    <Link href="/products/add">
                        <Button>Add Product</Button>
                    </Link>
                </div>

                <div className="flex flex-col gap-y-2 items-end">
                    <div className="w-full bg-white">
                        <Input placeholder="Search for a Product" />
                    </div>
                    <Button className="flex items-center" variant={"outline"}>
                        <SlidersHorizontal />
                        Filters
                    </Button>
                </div>
            </div>

            <div className="mt-4">
                {!products ? (
                    <ProductCardLoader />
                ) : !products.length ? (
                    <p>No Products</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-3">
                        {products.map(product => (
                            <PerProductCard
                                product={product}
                                key={product.id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
