import { useEffect, useState } from 'react'
import { Container } from '../../../components/common/Container'
import styles from './ProductTable.module.css'
import { ProductService, type ProductPreview } from '../../../services'
import { Table, type Column } from '../../../components/common/Table'

function formatPriceVND(value: number) {
    try {
        return new Intl.NumberFormat('vi-VN').format(value) + ' VND'
    } catch {
        return String(value) + ' VND'
    }
}

export default function Product() {
    const [rows, setRows] = useState<ProductPreview[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        const controller = new AbortController()
        let didAbort = false
        setLoading(true)
        setError('')
        ProductService.fetchProductPreview(0, 50, { signal: controller.signal })
            .then(setRows)
            .catch((e: unknown) => {
                const name = (e as any)?.name
                if (name === 'AbortError') {
                    didAbort = true
                    return
                }
                setError(e instanceof Error ? e.message : 'Failed to load products')
            })
            .finally(() => {
                if (!didAbort) setLoading(false)
            })
        return () => {
            didAbort = true
            controller.abort()
        }
    }, [])

    return (
        <>
            <Container title="Product" />
            <div style={{ marginTop: 16 }}>
                <Table<ProductPreview>
                    columns={[
                        { key: 'id', header: 'ID', width: 80 },
                        { key: 'name', header: 'Name' },
                        {
                            key: 'imageUrl',
                            header: 'Image',
                            width: 84,
                            render: (r) =>
                                r.imageUrl ? (
                                    <img className={styles.image} src={r.imageUrl} alt={r.name} />
                                ) : (
                                    <span className={styles.image} />
                                ),
                        },
                        { key: 'categoryName', header: 'Category' },
                        {
                            key: 'price',
                            header: 'Price',
                            align: 'right',
                            render: (r) => formatPriceVND(r.price),
                        },
                        { key: 'quantity', header: 'Quantity', align: 'right' },
                        {
                            key: 'actions',
                            header: 'Actions',
                            align: 'center',
                            render: () => (
                                <div className={styles.actions}>
                                    <button className={styles.btn}>View</button>
                                </div>
                            ),
                        },
                    ] as Column<ProductPreview>[]}
                    data={!loading && !error ? rows : []}
                    rowKey={(r) => r.id}
                    loading={loading}
                    emptyText={error || 'No products'}
                />
            </div>
        </>
    )
}