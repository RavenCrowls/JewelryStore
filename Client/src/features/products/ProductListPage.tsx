import { useEffect, useMemo, useRef, useState } from 'react';
import { productService, type ProductPreview } from '@/services/productService';

function formatVnd(value: number) {
    return new Intl.NumberFormat('vi-VN').format(value) + ' VND';
}

export default function ProductListPage() {
    const [products, setProducts] = useState<ProductPreview[]>([]);
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000000);
    const [showFilter, setShowFilter] = useState(false);
    const minBubbleRef = useRef<HTMLDivElement>(null);
    const maxBubbleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        productService.getPreviewList().then(setProducts).catch(console.error);
    }, []);

    // Bridge header search input to this page's query state
    useEffect(() => {
        const input = document.getElementById('productName') as HTMLInputElement | null;
        if (!input) return;
        const handler = () => setQuery(input.value);
        input.addEventListener('input', handler);
        return () => input.removeEventListener('input', handler);
    }, []);

    const categories = useMemo(() => {
        const names = Array.from(new Set(products.map(p => p.categoryName)));
        return ['All', ...names];
    }, [products]);

    const filtered = useMemo(() => {
        const lower = query.trim().toLowerCase();
        return products.filter(p => {
            const inName = !lower || p.name.toLowerCase().includes(lower);
            const inCat = category === 'All' || p.categoryName === category;
            const inPrice = p.price >= minPrice && p.price <= maxPrice;
            return inName && inCat && inPrice;
        });
    }, [products, query, category, minPrice, maxPrice]);

    function handleMinChange(value: number, el: HTMLInputElement) {
        const clamped = Math.min(value, maxPrice);
        setMinPrice(clamped);
        if (minBubbleRef.current) {
            const percent = (clamped / Number(el.max)) * 100;
            minBubbleRef.current.style.left = `${percent}%`;
        }
    }

    function handleMaxChange(value: number, el: HTMLInputElement) {
        const clamped = Math.max(value, minPrice);
        setMaxPrice(clamped);
        if (maxBubbleRef.current) {
            const percent = (clamped / Number(el.max)) * 100;
            maxBubbleRef.current.style.left = `${percent}%`;
        }
    }

    return (
        <>
            <div className="Dashboard-title">
                <p>Product</p>

                <button className="filter-button" onClick={() => setShowFilter(v => !v)} style={{ border: 'none' }}>
                    <i className="fa-solid fa-filter" />
                </button>
                <div className="popup-container">
                    <div className={`popup ${showFilter ? 'active' : ''}`}>
                        <div className="form-group">
                            <label>Category</label>
                            <div className="select-wrapper">
                                <select value={category} onChange={e => setCategory(e.target.value)}>
                                    {categories.map(c => (
                                        <option key={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Min price</label>
                            <div className="range-wrapper">
                                <div className="price-bubble" ref={minBubbleRef}>{new Intl.NumberFormat('vi-VN').format(minPrice)}</div>
                                <input
                                    type="range"
                                    className="range-input"
                                    min={0}
                                    max={10000000}
                                    value={minPrice}
                                    onChange={e => handleMinChange(Number(e.target.value), e.target)}
                                />
                                <div className="range-labels">
                                    <span>0</span>
                                    <span id="minSpan">10,000,000</span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Max price</label>
                            <div className="range-wrapper">
                                <div className="price-bubble" ref={maxBubbleRef}>{new Intl.NumberFormat('vi-VN').format(maxPrice)}</div>
                                <input
                                    type="range"
                                    className="range-input"
                                    min={0}
                                    max={10000000}
                                    value={maxPrice}
                                    onChange={e => handleMaxChange(Number(e.target.value), e.target)}
                                />
                                <div className="range-labels">
                                    <span>0</span>
                                    <span id="maxSpan">10,000,000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="buttons">
                    <button className="right-btn" onClick={() => window.print()}>
                        <i className="fa-solid fa-file-export" style={{ marginRight: 8 }} />Export
                    </button>
                    <button className="addbtn">
                        <i className="fa-solid fa-plus" style={{ marginRight: 8 }} />
                        <a href="#" style={{ color: '#1279C3', textDecoration: 'none' }}>Add new product</a>
                    </button>
                </div>
            </div>

            <table className="table">
                <thead className="test">
                    <tr>
                        <th id="ID">ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th id="action">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map(p => (
                        <tr key={p.id}>
                            <td id="ID">{p.id}</td>
                            <td id="name">{p.name}</td>
                            <td>{p.imageUrl ? <img src={p.imageUrl} alt="Product" /> : null}</td>
                            <td>{p.categoryName}</td>
                            <td>{formatVnd(p.price)}</td>
                            <td>{p.quantity}</td>
                            <td id="action">
                                <button className="Edit" type="button">View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}