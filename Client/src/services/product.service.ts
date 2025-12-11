const API_BASE_URL: string | undefined = (import.meta as any)?.env?.VITE_API_BASE_URL || undefined;

export type ProductPreview = {
    id: number;
    name: string;
    material: string;
    imageUrl: string;
    categoryName: string;
    price: number;
    quantity: number;
};

export type ProductGemstone = {
    id: number;
    name: string;
    weight: number;
    size?: string;
    color?: string;
};

export type ProductDetail = {
    id: number;
    categoryId: number;
    categoryName: string;
    name: string;
    material: string;
    description?: string;
    price: number;
    status: boolean;
    quantity: number;
    gemstones: ProductGemstone[];
};

export type ProductImage = {
    productId: number;
    imageOrder: number;
    imageUrl: string;
};

async function fetchProductPreview(
    skip = 0,
    take = 50,
    options?: { signal?: AbortSignal },
): Promise<ProductPreview[]> {
    let url: string;
    if (API_BASE_URL) {
        const u = new URL('/api/Products/preview', API_BASE_URL);
        u.searchParams.set('skip', String(skip));
        u.searchParams.set('take', String(take));
        url = u.toString();
    } else {
        const search = new URLSearchParams({ skip: String(skip), take: String(take) });
        url = `/api/Products/preview?${search.toString()}`;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
        signal: options?.signal,
    });

    if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(
            `Failed to fetch product preview: ${response.status} ${response.statusText}${body ? ` - ${body}` : ''}`,
        );
    }

    const data = (await response.json()) as ProductPreview[];
    return data;
}

async function fetchProductById(productId: number, options?: { signal?: AbortSignal }): Promise<ProductDetail> {
    let url: string;
    if (API_BASE_URL) {
        url = new URL(`/api/Products/${productId}`, API_BASE_URL).toString();
    } else {
        url = `/api/Products/${productId}`;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
        signal: options?.signal,
    });

    if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(
            `Failed to fetch product detail: ${response.status} ${response.statusText}${body ? ` - ${body}` : ''}`,
        );
    }

    return (await response.json()) as ProductDetail;
}

async function fetchProductImages(
    productId: number,
    options?: { signal?: AbortSignal },
): Promise<ProductImage[]> {
    let url: string;
    if (API_BASE_URL) {
        url = new URL(`/api/products/${productId}/images`, API_BASE_URL).toString();
    } else {
        url = `/api/products/${productId}/images`;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
        signal: options?.signal,
    });

    if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(
            `Failed to fetch product images: ${response.status} ${response.statusText}${body ? ` - ${body}` : ''}`,
        );
    }

    return (await response.json()) as ProductImage[];
}

export const ProductService = {
    fetchProductPreview,
    fetchProductById,
    fetchProductImages,
};