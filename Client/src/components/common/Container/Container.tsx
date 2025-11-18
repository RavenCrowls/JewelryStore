import React, { useState } from 'react';

interface NavItem {
  name: string;
  icon: string;
  href: string;
  active: boolean;
}

interface ContainerProps {
  children: React.ReactNode;
  username?: string;
}

export default function Container({ children, username = 'admin' }: ContainerProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: 'Dashboard', icon: '📊', href: 'dashboard.html', active: true },
    { name: 'Product', icon: '📦', href: 'product.html', active: false },
    { name: 'Employee', icon: '👤', href: 'employee.html', active: false },
    { name: 'Customer', icon: '👥', href: 'customer.html', active: false },
    { name: 'Import', icon: '📥', href: 'import.html', active: false },
    { name: 'Liquidation', icon: '💧', href: 'liquidation.html', active: false },
  ];

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Menu Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-5 left-5 z-50 lg:hidden bg-blue-600 text-white p-2 rounded"
      >
        <i className="fa-solid fa-bars text-xl"></i>
      </button>

      {/* Left Sidebar */}
      <div
        className={`fixed lg:relative w-64 bg-blue-600 min-h-screen flex flex-col transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex justify-center items-center py-8 cursor-pointer">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">🏢</span>
            </div>
            <p className="text-white text-xl font-bold">Luxora</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className={`flex items-center p-3 rounded transition-all ${
                    item.active
                      ? 'bg-black bg-opacity-10 opacity-100'
                      : 'opacity-30 hover:bg-black hover:bg-opacity-10 hover:opacity-100'
                  }`}
                >
                  <span className="text-xl mr-3">{item.icon}</span>
                  <span className="text-white">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Right Container */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="flex flex-col lg:flex-row items-center justify-between p-5 border-b">
          <div className="flex items-center w-full lg:w-1/2 mb-4 lg:mb-0 lg:ml-16">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 p-2 bg-blue-50 rounded-l outline-none"
            />
            <button className="p-2 bg-blue-50 rounded-r">
              <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer">
              <span className="text-white">👤</span>
            </div>
            <p className="font-medium">{username}</p>
            <button className="w-6 h-6">🚪</button>
            <button className="w-6 h-6">🔔</button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}