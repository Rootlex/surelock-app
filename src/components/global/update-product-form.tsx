import React, { useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductType } from "@/lib/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DEFAULT_URL } from "@/lib/constants";
import { useRouter } from "next/router";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

interface Props {
    product: ProductType;
}

const UpdateProductForm = ({ product }: Props) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const formSchema = z.object({
        name: z.string().min(2).max(50),
        price: z.string().min(1).max(10),
        quantity: z.string(),
        image_url: z.string(),
        is_active: z.enum(["Active", "Inactive"]),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: product.name,
            price: product.price.toString(),
            quantity: product.quantity.toString(),
            image_url: product.image_urls[0],
            is_active: product.is_active ? "Active" : "Inactive",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);

        if (!product) return toast.error("Product not found");

        setLoading(true);
        try {
            const req = await fetch(`${DEFAULT_URL}/${product.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: values.name,
                    price: values.price,
                    quantity: parseInt(values.quantity),
                    image_urls: [values.image_url],
                    is_active: values.is_active === "Active" ? true : false,
                }),
            });

            const res = await req.json();
            console.log("Response:", res);
            if (!req.ok) throw new Error(res.error);
            console.log("Response:", res);
            toast.success("Product updated successfully");
            form.reset();
            router.push(`/products/${res.data.id}`);
        } catch (err: any) {
            console.error("Error:", err.message);
            toast.error(err.message || "Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} method={"POST"}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="my-5">
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter Product Name"
                                    {...field}
                                    disabled={loading}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem className="my-5">
                            <FormLabel>Product Price</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter Product Price"
                                    {...field}
                                    type="number"
                                    disabled={loading}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem className="my-5">
                            <FormLabel>Product Quantity</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter Product Quantity"
                                    {...field}
                                    disabled={loading}
                                    type="number"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                        <FormItem className="my-5">
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter Image URL"
                                    {...field}
                                    disabled={loading}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Status</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={loading}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select the new status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Active">
                                        Active
                                    </SelectItem>
                                    <SelectItem value="Inactive">
                                        Inactive
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button disabled={loading} className="block mx-auto my-4">
                    Update
                </Button>
            </form>
        </Form>
    );
};

export default UpdateProductForm;
