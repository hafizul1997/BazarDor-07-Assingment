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
   <div className="w-full min-w-0 rounded-lg bg-white p-3 shadow sm:p-6">
  <h3 className="mb-4 text-base font-semibold sm:text-xl">
    বাজারভিত্তিক বাজারদর নাম
  </h3>

  <div className="w-full overflow-x-auto">
    <table className="w-full min-w-[600px] border-collapse text-xs sm:text-sm md:text-base">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="whitespace-nowrap border p-2 sm:p-3">
            বাজার
          </th>
          <th className="whitespace-nowrap border p-2 sm:p-3">
            বিভাগ
          </th>
          <th className="whitespace-nowrap border p-2 sm:p-3">
            সর্বনিম্ন
          </th>
          <th className="whitespace-nowrap border p-2 sm:p-3">
            সর্বাধিক
          </th>
          <th className="whitespace-nowrap border p-2 sm:p-3">
            গড়
          </th>
        </tr>
      </thead>

      <tbody>
        {markets.map((m, i) => (
          <tr key={i} className="hover:bg-gray-50">
            <td className="whitespace-nowrap border p-2 sm:p-3">
              {m.market_name}
            </td>
            <td className="whitespace-nowrap border p-2 sm:p-3">
              {m.division}
            </td>
            <td className="whitespace-nowrap border p-2 sm:p-3">
              {m.lowest_price} টাকা
            </td>
            <td className="whitespace-nowrap border p-2 sm:p-3">
              {m.highest_price} টাকা
            </td>
            <td className="whitespace-nowrap border p-2 sm:p-3">
              {m.average_price} টাকা
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
}
