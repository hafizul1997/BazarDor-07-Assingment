interface PriceCardProps {
  title: string;
  value: string;
}

export default function PriceCard({ title, value }: PriceCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-5 text-center">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}
