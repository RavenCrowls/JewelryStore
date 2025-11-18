const sellers = [
  { name: "Employee1", bill: 22 },
  { name: "Employee2", bill: 19 },
  { name: "Employee3", bill: 17 },
  { name: "Employee4", bill: 13 },
];

export default function SellersList() {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h3 className="font-semibold text-lg">Best sellers</h3>
      <p className="text-xs text-gray-400 mb-4">From 1–7 Sep, 2024</p>

      {sellers.map((item) => (
        <div key={item.name} className="flex justify-between items-center mb-3">
          <span>{item.name}</span>
          <span className="text-gray-600 text-sm">BILL: {item.bill}</span>
        </div>
      ))}
    </div>
  );
}
