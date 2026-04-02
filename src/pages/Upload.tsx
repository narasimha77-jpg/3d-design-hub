import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload as UploadIcon, File, Check } from "lucide-react";
import { useModels } from "@/hooks/useModels";
import { toast } from "sonner";

const categories = ["Architecture", "Product", "Jewelry", "Furniture", "Art", "Other"];

export default function Upload() {
  const { addModel } = useModels();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files[0];
    if (f && (f.name.endsWith(".glb") || f.name.endsWith(".gltf"))) {
      setFile(f);
    } else {
      toast.error("Please upload a .glb or .gltf file");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    addModel({
      title,
      description,
      category,
      fileUrl: file ? URL.createObjectURL(file) : "",
      fileName: file?.name || "custom-model.glb",
    });

    toast.success("Model added successfully!");
    navigate("/gallery");
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container px-6 max-w-xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-display font-bold mb-2">Upload Model</h1>
          <p className="text-muted-foreground mb-8">Add a new 3D model to your showcase</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* File upload */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`glass rounded-xl p-8 text-center border-2 border-dashed transition-colors cursor-pointer ${
              dragActive ? "border-primary bg-primary/5" : file ? "border-primary/30" : "border-border"
            }`}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept=".glb,.gltf"
              className="hidden"
              onChange={handleFileSelect}
            />
            {file ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ) : (
              <>
                <UploadIcon className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-1">
                  Drag & drop a <span className="text-primary font-mono">.glb</span> or{" "}
                  <span className="text-primary font-mono">.gltf</span> file
                </p>
                <p className="text-xs text-muted-foreground">or click to browse</p>
              </>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My 3D Model"
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your model..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    category === cat
                      ? "bg-primary/15 text-primary border border-primary/30"
                      : "bg-secondary text-muted-foreground border border-border hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm glow-primary hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <File className="w-4 h-4" /> Add to Gallery
          </button>
        </motion.form>
      </div>
    </div>
  );
}
