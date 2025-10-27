import { httpGet } from '@/services/http';

export type ProductPreview = {
    id: number;
    name: string;
    imageUrl?: string | null;
    categoryName: string;
    price: number;
    quantity: number;
};

export const productService = {
    async getPreviewList(skip = 0, take = 50) {
        const params = new URLSearchParams({ skip: String(skip), take: String(take) });
        return httpGet<ProductPreview[]>(`/api/Products/preview?${params.toString()}`);
    },
};