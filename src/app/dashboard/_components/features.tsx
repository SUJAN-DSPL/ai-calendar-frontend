import { Check } from "lucide-react";
import { ComponentProps, FC } from "react";

interface FeaturesProps extends ComponentProps<"div"> {}

const Features: FC<FeaturesProps> = () => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-6 text-white">
      <h2 className="text-lg font-semibold mb-4">Meeting Features</h2>
      <ul className="space-y-3">
        <li className="flex items-center gap-2 text-sm opacity-90">
          <Check className="w-4 h-4" />
          HD Video Quality
        </li>
        <li className="flex items-center gap-2 text-sm opacity-90">
          <Check className="w-4 h-4" />
          Screen Sharing
        </li>
        <li className="flex items-center gap-2 text-sm opacity-90">
          <Check className="w-4 h-4" />
          Chat Features
        </li>
        <li className="flex items-center gap-2 text-sm opacity-90">
          <Check className="w-4 h-4" />
          Recording Options
        </li>
      </ul>
    </div>
  );
};

export default Features;
