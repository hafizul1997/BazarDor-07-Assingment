interface MarketItem {
  market_name: string;
  division: string;
  lowest_price: number;
  highest_price: number;
  average_price: number;
}

interface MarketTableProps {
  markets: MarketItem[];
}

export default function MarketTable({ markets }: MarketTableProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">বাজারভিত্তিক বাজারদর নাম</h3>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">বাজার</th>
            <th className="p-3 border">বিভাগ</th>
            <th className="p-3 border">সর্বনিম্ন</th>
            <th className="p-3 border">সর্বাধিক</th>
            <th className="p-3 border">গড়</th>
          </tr>
        </thead>

        <tbody>
          {markets.map((m, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="p-3 border">{m.market_name}</td>
              <td className="p-3 border">{m.division}</td>
              <td className="p-3 border">{m.lowest_price} টাকা</td>
              <td className="p-3 border">{m.highest_price} টাকা</td>
              <td className="p-3 border">{m.average_price} টাকা</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
