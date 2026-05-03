"use client";

import { useState } from "react";
import UsageFilters, { UsageFiltersState } from "@/modules/usage/UsageFilters";
import UsageBarCard from "@/modules/usage/UsageBarCard";
import UsageModelsTable from "@/modules/usage/UsageModelsTable";
import { serviceData, dailyDataByPeriod, periodLabels, ALL_MODEL_ROWS } from "@/modules/usage/usageMockData";

const DEFAULT_FILTERS: UsageFiltersState = {
  period: "30d", model: "", apiKey: "", status: "", env: "",
};

export default function UsageContent() {
  const [filters, setFilters] = useState<UsageFiltersState>(DEFAULT_FILTERS);

  function handleChange(patch: Partial<UsageFiltersState>) {
    setFilters((prev) => ({ ...prev, ...patch }));
  }

  function handleClear() {
    setFilters((prev) => ({ ...prev, model: "", apiKey: "", status: "", env: "" }));
  }

  const filteredRows = filters.model
    ? ALL_MODEL_ROWS.filter((r) => r.id === filters.model)
    : ALL_MODEL_ROWS;

  // Keep only the service bar(s) that match the selected model
  const filteredServiceData = filters.model
    ? serviceData.filter((d) => {
        const row = ALL_MODEL_ROWS.find((r) => r.id === filters.model);
        return row && d.service === row.model.split(" ")[0];
      })
    : serviceData;

  const dailyData   = dailyDataByPeriod[filters.period];
  const dailyStat   = dailyData.reduce((s, d) => s + d.requests, 0).toLocaleString();
  const serviceStat = filteredRows.reduce((s, r) => s + r.requests, 0).toLocaleString();

  return (
    <div className="px-6 py-6 flex flex-col gap-6">
      <UsageFilters filters={filters} onChange={handleChange} onClear={handleClear} />

      <div className="grid grid-cols-2 gap-6">
        <UsageBarCard
          title="Requests by service"
          description="total across all services"
          stat={serviceStat}
          data={filteredServiceData}
          xKey="service"
          barKey="requests"
          unit="requests"
        />
        <UsageBarCard
          title="Requests over time"
          description={periodLabels[filters.period]}
          stat={dailyStat}
          data={dailyData}
          xKey="day"
          barKey="requests"
          unit="requests"
        />
      </div>

      <UsageModelsTable rows={filteredRows} />
    </div>
  );
}
