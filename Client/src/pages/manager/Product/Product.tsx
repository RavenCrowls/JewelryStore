import { useEffect, useState } from 'react'
import { Container } from '../../../components/common/Container'
import styles from './ProductTable.module.css'
import { ProductService, type ProductPreview } from '../../../services'

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
            <div className={styles.tableWrap} style={{ marginTop: 16 }}>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan={7}>Loading...</td>
                            </tr>
                        )}
                        {!loading && error && (
                            <tr>
                                <td colSpan={7}>{error}</td>
                            </tr>
                        )}
                        {!loading && !error && rows.map((r) => (
                            <tr key={r.id}>
                                <td>{r.id}</td>
                                <td>{r.name}</td>
                                <td>
                                    {r.imageUrl ? (
                                        <img className={styles.image} src={r.imageUrl} alt={r.name} />
                                    ) : (
                                        <span className={styles.image} />
                                    )}
                                </td>
                                <td>{r.categoryName}</td>
                                <td>{formatPriceVND(r.price)}</td>
                                <td>{r.quantity}</td>
                                <td>
                                    <div className={styles.actions}>
                                        <button className={styles.btn}>View</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}