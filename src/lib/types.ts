export type ProductType = {
    id: string;
    name: string;
    price: string;
    quantity: number;
    image_urls: string[];
    created_at: string; // Date String
    updated_at: string; // Date String
    is_active: true;
};

export type ProductStatusType = "active" | "inactive";
