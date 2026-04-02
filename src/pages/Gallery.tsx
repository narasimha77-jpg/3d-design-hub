import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sun, Moon, Box, Grid3x3, Maximize2 } from "lucide-react";
import { useModels } from "@/hooks/useModels";
import ModelCard from "@/components/ModelCard";
import Scene3D from "@/components/Scene3D";
import type { Model3D } from "@/lib/store";

export default function Gallery() {
  const { models } = useModels();
  const [selected, setSelected] = useState<Model3D | null>(null);
  const [presenting, setPresenting] = useState(false);
  const [lighting, setLighting] = useState<"day" | "night">("night");
  const [material, setMaterial] = useState<"solid" | "wireframe">("solid");

  const handleView = (model: Model3D) => {
    setSelected(model);
    setPresenting(false);
  };

  const handlePresent = (model: Model3D) => {
    setSelected(model);
    setPresenting(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container px-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-display font-bold mb-2">Gallery</h1>
          <p className="text-muted-foreground mb-8">Browse and interact with 3D models</p>
        </motion.div>

        {models.length === 0 ? (
          <div className="glass rounded-xl p-12 text-center">
            <Box className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No models yet. Upload your first one!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                onView={handleView}
                onPresent={handlePresent}
              />
            ))}
          </div>
        )}
      </div>

      {/* Viewer / Presentation Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col"
          >
            {/* Controls */}
            {!presenting && (
              <div className="flex items-center justify-between p-4 glass border-b border-border">
                <div>
                  <h2 className="font-display font-semibold">{selected.title}</h2>
                  <p className="text-xs text-muted-foreground">{selected.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLighting((l) => (l === "day" ? "night" : "day"))}
                    className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                    title="Toggle lighting"
                  >
                    {lighting === "day" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setMaterial((m) => (m === "solid" ? "wireframe" : "solid"))}
                    className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                    title="Toggle material"
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPresenting(true)}
                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    title="Presentation mode"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelected(null)}
                    className="p-2 rounded-lg bg-secondary hover:bg-destructive/20 hover:text-destructive transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* 3D Canvas */}
            <div className="flex-1 relative">
              <Scene3D
                modelId={selected.id}
                materialMode={material}
                lighting={lighting}
                autoRotate={presenting}
                minimal={presenting}
              />

              {/* Presentation exit button */}
              {presenting && (
                <button
                  onClick={() => setPresenting(false)}
                  className="absolute top-4 right-4 p-2 rounded-lg glass text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
