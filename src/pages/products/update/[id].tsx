import ErrorSection from "@/components/global/error-section";
import UpdateProductForm from "@/components/global/update-product-form";
import ProductDetailLoader from "@/components/loaders/product-detail-loader";
import { SERVER_URL } from "@/lib/constants";
import { ProductType } from "@/lib/types";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import toast from "react-hot-toast";

const UpdateProduct = () => {
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = React.useState(true);
    const [product, setProduct] = React.useState<ProductType | null>(null);

    const getProduct = useCallback(() => {
        setLoading(true);
        fetch(`${SERVER_URL}/products?id=${id}`, {
            headers: {
                Authorization:
                    "Beearer " + process.env.NEXT_PUBLIC_API_KEY || "",
            },
        })
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
        <div className="p-4 lg:mx-auto lg:w-1/2 bg-white rounded-lg lg:p-10">
            <div>
                <h1 className="text-header-text font-semibold mb-4">
                    Update Product
                </h1>
                <p className="text-sm text-supporting-text">{product.name}</p>
            </div>
            <UpdateProductForm product={product} />
        </div>
    );
};

export default UpdateProduct;
