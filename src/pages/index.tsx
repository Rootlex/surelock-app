import PerProductCard from "@/components/global/per-product-card";
import ProductCardLoader from "@/components/loaders/product-card-loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductStatusType, ProductType } from "@/lib/types";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SERVER_URL } from "../lib/constants";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<ProductType[] | null>(null);
    const [searchResults, setSearchResults] = useState<ProductType[] | null>(
        null
    );
    const [input, setInput] = useState<string>("");
    const [status, setStatus] = useState<ProductStatusType>("all");
    const [minPrice, setMinPrice] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<string>("");
    const [filtersSet, setFiltersSet] = useState<boolean>(false);
    const handleFilters = useCallback(() => {
        setLoading(true);
        const floatMinPrice = minPrice.length ? parseFloat(minPrice) : 0;
        const floatMaxPrice = maxPrice.length ? parseFloat(maxPrice) : 0;
        const maxPriceValue =
            floatMaxPrice < floatMinPrice ? undefined : floatMaxPrice;
        const filteredPrice =
            floatMinPrice < 1
                ? undefined
                : `${floatMinPrice}${maxPriceValue ? "," + maxPriceValue : ""}`;

        const filteredStatus =
            status === "all" ? undefined : status === "active" ? true : false;

        fetch(
            `${SERVER_URL}?${
                typeof filteredStatus !== "undefined"
                    ? `is_active=` + filteredStatus
                    : ""
            }
            &${filteredPrice ? `price=` + filteredPrice : ""}`,
            {
                headers: {
                    Authorization:
                        "Beearer " + process.env.NEXT_PUBLIC_API_KEY || "",
                },
            }
        )
            .then(res => res.json())
            .then((data: ProductType[]) => {
                setLoading(false);
                if (!data || !data.length)
                    return toast.error(`No results found`);
                setFiltersSet(true);
                console.log("New Data", data);
                setSearchResults(data);
            })
            .catch(err => console.error(err));
    }, [status, minPrice, maxPrice]);

    const handleSearch = useCallback(() => {
        if (input.length < 3)
            return toast.error("Search query must be at least 3 characters");
        setLoading(true);

        fetch(`${SERVER_URL}?name=${input}`, {
            headers: {
                Authorization:
                    "Beearer " + process.env.NEXT_PUBLIC_API_KEY || "",
            },
        })
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
        fetch(`${SERVER_URL}`, {
            headers: {
                Authorization:
                    "Beearer " + process.env.NEXT_PUBLIC_API_KEY || "",
            },
        })
            .then(res => res.json())
            .then((data: ProductType[]) => {
                setProducts(data);
            })
            .catch(err => console.error(err));
    }, []);

    console.log("min price", minPrice);

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
                    <div className="py-2 flex justify-between w-full flex-1 flex-col md:flex-row gap-y-2">
                        <div className="flex-1 px-2 flex gap-x-4 items-center">
                            <div className="flex gap-x-4">
                                <div>
                                    <span className="text-supporting-text text-xs">
                                        Min Price
                                    </span>
                                    <Input
                                        value={minPrice}
                                        onChange={e =>
                                            setMinPrice(e.target.value)
                                        }
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <span className="text-supporting-text text-xs">
                                        Max Price
                                    </span>
                                    <Input
                                        value={maxPrice}
                                        onChange={e =>
                                            setMaxPrice(e.target.value)
                                        }
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div>
                                <span className="text-supporting-text text-xs">
                                    Status
                                </span>
                                <Select
                                    onValueChange={v => {
                                        if (v === "all") {
                                            setStatus("all");
                                            return setSearchResults(null);
                                        }
                                        setStatus(v as ProductStatusType);
                                    }}
                                    defaultValue={status}
                                    disabled={loading}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select the new status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="active">
                                            Active
                                        </SelectItem>
                                        <SelectItem value="inactive">
                                            Inactive
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Button
                                className="flex items-center"
                                disabled={
                                    status === "all" && minPrice.length < 1
                                }
                                onClick={handleFilters}
                            >
                                <SlidersHorizontal />
                                Apply Filters
                            </Button>
                            {filtersSet ? (
                                <Button
                                    className="flex items-center"
                                    variant={"outline"}
                                    onClick={() => {
                                        setFiltersSet(false);
                                        setMinPrice("");
                                        setMaxPrice("");
                                        setStatus("all");
                                        setInput("");
                                        setSearchResults(null);
                                    }}
                                >
                                    Clear Filters
                                </Button>
                            ) : null}
                        </div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-3">
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
