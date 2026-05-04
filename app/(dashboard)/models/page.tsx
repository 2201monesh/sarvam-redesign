import ModelsHeader from "@/modules/models/ModelsHeader";
import ModelCard from "@/modules/models/ModelCard";
import { MODELS } from "@/modules/models/modelsData";

export default function ModelsPage() {
  return (
    <div className="flex-1 w-full">
      <ModelsHeader />
      <div className="px-6 py-8 max-w-[1400px] mx-auto w-full">
        <div className="grid gap-x-5 gap-y-10 [grid-template-columns:repeat(auto-fill,360px)]">
          {MODELS.map((model, i) => (
            <ModelCard key={model.id} model={model} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
