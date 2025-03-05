import PerProductCard from "@/components/global/per-product-card";
import ProductCardLoader from "@/components/loaders/product-card-loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEFAULT_URL } from "@/lib/constants";
import { ProductType } from "@/lib/types";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<ProductType[] | null>(null);
    const [searchResults, setSearchResults] = useState<ProductType[] | null>(
        null
    );
    const [input, setInput] = useState<string>("");

    const handleSearch = useCallback(() => {
        if (input.length < 3)
            return toast.error("Search query must be at least 3 characters");
        setLoading(true);

        fetch(`${DEFAULT_URL}?name=${input}`)
            .then(res => res.json())
            .then((data: ProductType[]) => {
                setLoading(false);
                if (!data || !data.length)
                    return toast.error(`No results for ${input}`);
                console.log("New Data", data);
                setSearchResults(data);
            })
            .catch(err => console.error(err));
    }, [input]);

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

                <div className="flex flex-col gap-y-2 items-end bg-white">
                    <div className="w-full  flex items-center justify-between p-2 rounded-lg gap-x-4 border-b border-b-border">
                        <Input
                            placeholder="Search for a Product"
                            value={input}
                            onChange={e => {
                                const text = e.target.value;
                                if (text.length < 1) {
                                    setSearchResults(null);
                                }
                                setInput(e.target.value);
                            }}
                            className="flex-1"
                        />
                        <Button onClick={handleSearch}>Search</Button>
                    </div>
                    <div>
                        <Button className="flex items-center" disabled>
                            <SlidersHorizontal />
                            Apply Filters
                        </Button>
                    </div>
                </div>
            </div>
            {input.length && searchResults && searchResults.length ? (
                <div className="my-4 bg-white">
                    <p className="text-sm font-semibold p-2">
                        Search Results for &quot;{input}&quot;
                    </p>
                </div>
            ) : null}

            <div className="mt-4">
                {!products || loading ? (
                    <ProductCardLoader />
                ) : !products.length ? (
                    <p>No Products</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-3">
                        {searchResults?.length
                            ? searchResults.map(product => {
                                  return (
                                      <PerProductCard
                                          product={product}
                                          key={product.id}
                                      />
                                  );
                              })
                            : products.map(product => (
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
