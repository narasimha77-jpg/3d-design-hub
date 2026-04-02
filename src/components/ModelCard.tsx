import { motion } from "framer-motion";
import { Eye, Maximize } from "lucide-react";
import type { Model3D } from "@/lib/store";
import Scene3D from "./Scene3D";

interface ModelCardProps {
  model: Model3D;
  onView: (model: Model3D) => void;
  onPresent: (model: Model3D) => void;
}

export default function ModelCard({ model, onView, onPresent }: ModelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="glass rounded-xl overflow-hidden group cursor-pointer"
    >
      {/* 3D Preview */}
      <div className="h-48 relative bg-muted/30">
        <Scene3D modelId={model.id} autoRotate minimal />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center gap-3 pb-4">
          <button
            onClick={() => onView(model)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-xs font-medium backdrop-blur-sm hover:bg-primary/30 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> View
          </button>
          <button
            onClick={() => onPresent(model)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/20 text-accent text-xs font-medium backdrop-blur-sm hover:bg-accent/30 transition-colors"
          >
            <Maximize className="w-3.5 h-3.5" /> Present
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-display font-semibold text-foreground text-sm">{model.title}</h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary">
            {model.category}
          </span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">{model.description}</p>
      </div>
    </motion.div>
  );
}
