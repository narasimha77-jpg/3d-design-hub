import { useSyncExternalStore } from "react";
import { store } from "@/lib/store";

export function useModels() {
  const models = useSyncExternalStore(store.subscribe, store.getModels);
  return { models, addModel: store.addModel, deleteModel: store.deleteModel };
}
