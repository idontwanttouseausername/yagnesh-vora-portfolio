import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SkillCardProps {
  icon: LucideIcon;
  name: string;
  level: number;
  color: string;
}

export default function SkillCard({ icon: Icon, name, level, color }: SkillCardProps) {
  return (
    <div className="glass-morphism p-6 rounded-xl" data-testid={`skill-card-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <Icon className={`${color} text-2xl mb-4`} />
      <h3 className="font-semibold mb-2" data-testid={`skill-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>
        {name}
      </h3>
      <div className="w-full bg-gray-600 rounded-full h-2">
        <motion.div 
          className="bg-gradient-primary h-2 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          data-testid={`skill-progress-${name.toLowerCase().replace(/\s+/g, '-')}`}
        />
      </div>
      <div className="text-right mt-1 text-sm text-gray-400" data-testid={`skill-level-${name.toLowerCase().replace(/\s+/g, '-')}`}>
        {level}%
      </div>
    </div>
  );
}
