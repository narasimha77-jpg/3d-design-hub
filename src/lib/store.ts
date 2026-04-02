// Simple in-memory store for 3D models
export interface Model3D {
  id: string;
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  fileName: string;
  createdAt: Date;
}

// Demo models using free sample GLB URLs
const demoModels: Model3D[] = [
  {
    id: "demo-1",
    title: "Architectural Cube",
    description: "A minimalist geometric shape showcasing clean design principles",
    category: "Architecture",
    fileUrl: "",
    fileName: "cube.glb",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "demo-2",
    title: "Product Sphere",
    description: "Smooth spherical design with reflective material properties",
    category: "Product",
    fileUrl: "",
    fileName: "sphere.glb",
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "demo-3",
    title: "Torus Ring",
    description: "Elegant toroidal shape with metallic finish",
    category: "Jewelry",
    fileUrl: "",
    fileName: "torus.glb",
    createdAt: new Date("2024-03-10"),
  },
];

let models: Model3D[] = [...demoModels];
let listeners: (() => void)[] = [];

function notify() {
  listeners.forEach((l) => l());
}

export const store = {
  getModels: () => models,
  addModel: (model: Omit<Model3D, "id" | "createdAt">) => {
    const newModel: Model3D = {
      ...model,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    models = [newModel, ...models];
    notify();
    return newModel;
  },
  deleteModel: (id: string) => {
    models = models.filter((m) => m.id !== id);
    notify();
  },
  subscribe: (listener: () => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};
