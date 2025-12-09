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

export async function fetchProductPreview(
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
            `Failed to fetch product preview: ${response.status} ${response.statusText}${body ? ` - ${body}` : ''
            }`,
        );
    }

    const data = (await response.json()) as ProductPreview[];
    return data;
}

export const ProductService = {
    fetchProductPreview,
};