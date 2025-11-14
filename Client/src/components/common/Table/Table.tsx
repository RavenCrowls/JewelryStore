import type { ReactNode } from 'react'
import styles from './Table.module.css'

export type Column<T> = {
    key: string
    header: ReactNode
    render?: (row: T) => ReactNode
    className?: string
    align?: 'left' | 'center' | 'right'
    width?: number | string
}

type TableProps<T> = {
    columns: Column<T>[]
    data: T[]
    rowKey: (row: T) => React.Key
    loading?: boolean
    emptyText?: string
    wrapperClassName?: string
    tableClassName?: string
}

export function Table<T>({
    columns,
    data,
    rowKey,
    loading,
    emptyText = 'No data',
    wrapperClassName,
    tableClassName,
}: TableProps<T>) {
    const headAlignClass = (a?: 'left' | 'center' | 'right') =>
        a === 'center' ? styles.center : a === 'right' ? styles.right : ''

    return (
        <div className={`${styles.root} ${wrapperClassName ?? ''}`}>
            <table className={`${styles.table} ${tableClassName ?? ''}`}>
                <thead>
                    <tr>
                        {columns.map((c) => (
                            <th
                                key={c.key}
                                className={`${styles.headCell} ${headAlignClass(c.align)}`}
                                style={c.width ? { width: c.width } : undefined}
                            >
                                {c.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr className={styles.stateRow}>
                            <td className={styles.cell} colSpan={columns.length}>
                                Loading...
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr className={styles.stateRow}>
                            <td className={styles.cell} colSpan={columns.length}>
                                {emptyText}
                            </td>
                        </tr>
                    ) : (
                        data.map((row, idx) => (
                            <tr key={rowKey(row)} className={idx % 2 === 1 ? styles.rowEven : undefined}>
                                {columns.map((c) => (
                                    <td
                                        key={c.key}
                                        className={`${styles.cell} ${c.className ?? ''} ${headAlignClass(c.align)}`}
                                    >
                                        {c.render ? c.render(row) : (row as any)[c.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table