const API_BASE_URL: string | undefined = (import.meta as any)?.env?.VITE_API_BASE_URL || undefined;

function buildUrl(path: string): string {
    if (API_BASE_URL) {
        return new URL(path, API_BASE_URL).toString();
    }
    return path;
}

export type CreateUserDto = {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    address?: string | null;
    birthday?: string | null; // ISO string
    status?: boolean;
};

export type UserImageResponse = {
    userId: number;
    imageUrl: string;
};

export type UserProfile = {
    id: number;
    fullName: string;
    roleId?: number;
    role?: string;
    roles?: string[];
    email: string;
    phone: string;
    address: string | null;
    birthday: string | null;
    status: boolean;
};

export type UpdateUserDto = {
    fullName: string;
    email: string;
    phone: string;
    address?: string | null;
    birthday?: string | null;
    status: boolean;
};

export async function createUser(dto: CreateUserDto, options?: { signal?: AbortSignal }): Promise<void> {
    const url = buildUrl('/api/Users');
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

export async function getUserImage(userId: number, options?: { signal?: AbortSignal }): Promise<UserImageResponse | null> {
    const url = buildUrl(`/api/users/${userId}/images`);
    const res = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        credentials: 'include',
        signal: options?.signal,
    });

    if (!res.ok) {
        return null;
    }

    const data = (await res.json()) as UserImageResponse;
    if (typeof data?.imageUrl === 'string' && data.imageUrl.trim().length > 0) {
        return data;
    }
    return null;
}

export async function getUserById(id: number, options?: { signal?: AbortSignal }): Promise<UserProfile> {
    const url = buildUrl(`/api/users/${id}`);
    const res = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        credentials: 'include',
        signal: options?.signal,
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch user (${res.status})`);
    }

    const data = (await res.json()) as UserProfile;
    return data;
}

export async function updateUser(id: number, dto: UpdateUserDto, options?: { signal?: AbortSignal }): Promise<void> {
    const url = buildUrl(`/api/users/${id}`);
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(dto),
        signal: options?.signal,
    });

    if (!res.ok) {
        let message = `Failed to update user (${res.status})`;
        try {
            const data = await res.json();
            if (typeof data?.error === 'string' && data.error.trim().length > 0) {
                message = data.error;
            }
        } catch {
            // ignore parse errors
        }
        throw new Error(message);
    }
}

export const UserService = {
    createUser,
    getUserImage,
    getUserById,
    updateUser,
};
