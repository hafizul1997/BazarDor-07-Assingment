
export interface Product {
  id: number | string;
  slug: string;
  nameBn: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  unit?: string;
  image?: string | null;
  today: number;
  yesterday: number;
  lastWeek?: number;
  lastMonth?: number;

  change?: {
    dir: "up" | "down" | "same";
    pct: number;
  };
}
