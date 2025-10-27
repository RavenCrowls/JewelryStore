import type { ReactNode } from 'react';
import '@/assets/manager/Product.css';

type Props = { children: ReactNode };

export default function ManagerLayout({ children }: Props) {
    return (
        <div className="manager-root">
            <button className="menu-toggle">
                <i className="fa-solid fa-bars" />
            </button>

            <div className="left-Container">
                <div className="logo">
                    <div className="logo-icon" style={{ cursor: 'pointer' }}>
                        <i className="fa-solid fa-gem" style={{ color: '#fff', fontSize: 28 }} />
                        <p>Luxora</p>
                    </div>
                </div>

                <div className="navcontainer">
                    <ul className="nav-options">
                        <li className="option1">
                            <i className="fa-solid fa-gauge" style={{ color: '#fff', marginRight: 16 }} />
                            <p style={{ color: 'white' }}>Dashboard</p>
                        </li>
                        <li className="option2">
                            <i className="fa-solid fa-box" style={{ color: '#fff', marginRight: 16 }} />
                            <p style={{ color: 'white' }}>Product</p>
                        </li>
                        <li className="option3">
                            <i className="fa-solid fa-users" style={{ color: '#fff', marginRight: 16 }} />
                            <p style={{ color: 'white' }}>Employee</p>
                        </li>
                        <li className="option4">
                            <i className="fa-solid fa-user" style={{ color: '#fff', marginRight: 16 }} />
                            <p style={{ color: 'white' }}>Customer</p>
                        </li>
                        <li className="option5">
                            <i className="fa-solid fa-file-import" style={{ color: '#fff', marginRight: 16 }} />
                            <p style={{ color: 'white' }}>Import</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="right-Container">
                <div className="header">
                    <div className="search-container">
                        <input id="productName" type="text" placeholder="Search" />
                        <button id="search" type="button">
                            <i className="fa-solid fa-magnifying-glass" />
                        </button>
                    </div>
                    <div className="avt-notice">
                        <div className="avt-content">
                            <button className="avt">
                                <i className="fa-solid fa-user" style={{ color: '#1279C3', fontSize: 22 }} />
                            </button>
                            <p className="username">admin</p>
                            <i className="fa-solid fa-right-from-bracket" style={{ cursor: 'pointer', color: '#1279C3' }} />
                        </div>
                    </div>
                </div>

                {children}
            </div>
        </div>
    );
}