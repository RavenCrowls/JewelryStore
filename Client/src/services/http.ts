export const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:7065';

export async function httpGet<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
        // Avoid setting Content-Type on GET to prevent preflight
        ...init,
        method: 'GET',
        credentials: 'include',
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `GET ${path} failed (${res.status})`);
    }
    return res.json();
}