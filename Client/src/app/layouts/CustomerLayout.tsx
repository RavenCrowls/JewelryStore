import type { ReactNode } from 'react';

export default function CustomerLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <header style={{ padding: 16, borderBottom: '1px solid #eee' }}>
                <strong>Customer</strong>
            </header>
            <main style={{ padding: 24 }}>{children}</main>
        </div>
    );
}