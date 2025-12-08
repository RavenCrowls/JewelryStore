const API_BASE_URL: string | undefined = (import.meta as any)?.env?.VITE_API_BASE_URL || undefined;

export type CreateUserDto = {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    address?: string | null;
    birthday?: string | null; // ISO string
    status?: boolean;
};

export async function createUser(dto: CreateUserDto, options?: { signal?: AbortSignal }): Promise<void> {
    let url: string;
    if (API_BASE_URL) {
        url = new URL('/api/Users', API_BASE_URL).toString();
    } else {
        url = '/api/Users';
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            fullName: dto.fullName,
            email: dto.email,
            password: dto.password,
            phone: dto.phone ?? '',
            address: dto.address ?? null,
            birthday: dto.birthday ?? null,
            status: dto.status ?? true,
        }),
        signal: options?.signal,
    });
    if (!response.ok) {
        // Prefer server-provided error message/details if present
        let message = 'Failed to create account';
        try {
            const data = await response.json();
            if (typeof data?.error === 'string' && data.error.trim().length > 0) {
                message = data.error;
            }
            if (Array.isArray(data?.details) && data.details.length > 0) {
                const first = data.details[0];
                if (typeof first?.Description === 'string' && first.Description.trim().length > 0) {
                    message = first.Description;
                } else if (typeof first?.description === 'string' && first.description.trim().length > 0) {
                    message = first.description;
                }
            }
        } catch {
            // ignore parse errors, fall back to status text
        }
        if (response.status === 400 && message === 'Failed to create account') {
            message = 'Please check your information (email may already be in use, or password does not meet requirements).';
        }
        throw new Error(message);
    }
}

export const UserService = {
    createUser,
};
