// import type { ReactNode } from 'react'
// import { useMemo, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { NavBar } from '../../components/common/NavBar'
// import type { NavItem } from '../../components/common/NavBar'

// type ManagerLayoutProps = {
//   children: ReactNode
//   title?: string
//   items?: NavItem[]
//   activeKey?: string
//   onSelect?: (key: string) => void
// }

// const defaultManagerItems: NavItem[] = [
//   { key: 'dashboard', label: 'Dashboard', icon: '📊' },
//   { key: 'product', label: 'Product', icon: '🛍️' },
//   { key: 'employee', label: 'Employee', icon: '👤' },
//   { key: 'customer', label: 'Customer', icon: '👥' },
//   { key: 'import', label: 'Import', icon: '📦' },
//   { key: 'liquidation', label: 'Liquidation', icon: '🧾' },
// ]

// export function ManagerLayout({
//   children,
//   title = 'Luxora',
//   items = defaultManagerItems,
//   activeKey,
//   onSelect,
// }: ManagerLayoutProps) {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const path = location.pathname || '/'

//   const [internalActive, setInternalActive] = useState<string>(
//     activeKey ?? items[0]?.key ?? 'dashboard',
//   )

//   const routerActiveFromPath = useMemo(() => {
//     const m = path.match(/^\/manager\/?([^\/]+)?/i)
//     return m?.[1] || 'dashboard'
//   }, [path])

//   const currentKey = activeKey ?? routerActiveFromPath ?? internalActive
//   const setActive =
//     onSelect ??
//     ((key: string) => {
//       setInternalActive(key)
//       navigate(`/manager/${key}`)
//     })
//   // no header label currently used; keep only nav state

//   return (
//     <div
//       style={{
//         display: 'flex',
//         minHeight: '100vh',
//         background: '#f5f7fb',
//       }}
//     >
//       <NavBar
//         title={title}
//         items={items}
//         activeKey={currentKey}
//         onSelect={setActive}
//       />
//       <main style={{ flex: 1, padding: '24px' }}>
//         {children}
//       </main>
//     </div>
//   )
// }

// export default ManagerLayout

import Sidebar from "../../components/common/Sidebar/Sidebar";
import Topbar from "../../components/common/Topbar/Topbar";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50">
        <Topbar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
