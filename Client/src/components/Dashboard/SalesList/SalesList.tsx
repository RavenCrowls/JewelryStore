const sales = [
  { name: "Product1", amount: 19, img: "/img/image1.png" },
  { name: "Product2", amount: 15, img: "/img/image1.png" },
  { name: "Product3", amount: 12, img: "/img/image1.png" },
  { name: "Product4", amount: 10, img: "/img/image1.png" },
];

export default function SalesList() {
  return (
    <div className="bg-white rounded-xl p-6 shadow ml-6">
      <h3 className="font-semibold text-lg">Best sales</h3>
      <p className="text-xs text-gray-400 mb-4">From 1–7 Sep, 2024</p>

      {sales.map((item) => (
        <div key={item.name} className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <img src={item.img} className="w-10 h-10 rounded object-cover" />
            <span className="font-medium">{item.name}</span>
          </div>
          <span className="text-gray-600 text-sm">AMNT: {item.amount}</span>
        </div>
      ))}
    </div>
  );
}
