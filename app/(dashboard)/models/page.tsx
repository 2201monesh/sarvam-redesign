import ModelsHeader from "@/modules/models/ModelsHeader";
import ModelCard from "@/modules/models/ModelCard";
import { MODELS } from "@/modules/models/modelsData";

export default function ModelsPage() {
  return (
    <div className="flex-1 w-full">
      <ModelsHeader />
      <div className="px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-10">
          {MODELS.map((model, i) => (
            <ModelCard key={model.id} model={model} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
