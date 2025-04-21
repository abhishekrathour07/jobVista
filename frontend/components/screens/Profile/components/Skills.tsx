"use client";

import { Badge } from "@/components/ui/badge"; // If using ShadCN UI
import { motion } from "framer-motion";

type SkillsProps = {
  skills: string[];
  title?: string;
};

export default function Skills({ skills, title = "Skills" }: SkillsProps) {
  return (
    <section className="w-full p-4 rounded-xl bg-white shadow-sm">
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">{title}</h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Badge className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
              {skill}
            </Badge>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
