import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DEFAULT_URL } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const AddProduct = () => {
    const router = useRouter();
    const formSchema = z.object({
        name: z.string().min(2).max(50),
        price: z.string().min(1).max(10),
        quantity: z.string(),
        image_url: z.string(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);

        try {
            const req = await fetch(DEFAULT_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: values.name,
                    price: values.price,
                    quantity: parseInt(values.quantity),
                    image_urls: [values.image_url],
                }),
            });

            const res = await req.json();
            console.log("Response:", res);
            if (!req.ok) throw new Error(res.error);
            console.log("Response:", res);
            toast.success("Product created successfully");
            form.reset();
            router.push(`/products/${res.data.id}`);
        } catch (err: any) {
            console.error("Error:", err.message);
            toast.error(err.message || "Failed to create product");
        }
    };

    return (
        <div className="p-4 lg:mx-auto lg:w-1/2 bg-white rounded-lg lg:p-10">
            <h1 className="text-header-text font-semibold mb-4">
                Add a Product
            </h1>
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
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button>Add</Button>
                </form>
            </Form>
        </div>
    );
};

export default AddProduct;
