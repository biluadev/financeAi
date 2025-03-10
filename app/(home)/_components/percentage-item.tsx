import { ReactNode } from "react";

interface PercentageItemProps {
  icon: ReactNode;
  title: string;
  value: number;
}
const PercentageItem = ({ icon, title, value }: PercentageItemProps) => {
  return (
    <div className="flex items-center justify-between">
      {/* Ícone */}
      <div className="flex items-center gap-3">
        <div className="p2 rounded-lg bg-white bg-opacity-[3%]">{icon}</div>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      {/* Percentagem */}
      <p className="text-sm font-bold">{value}%</p>
    </div>
  );
};

export default PercentageItem;
