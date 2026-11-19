"use client";

import Link from "next/link";
import type { Plant } from "@/types/plant";

interface PlantSelectProps {
  plants: Plant[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
}

function plantId(plant: Plant) {
  return plant._id ?? plant.id;
}

export function PlantSelect({
  plants,
  value,
  onChange,
  label,
  placeholder = "Select a plant",
}: PlantSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-800">
        {label}
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={plants.length === 0}
          className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 disabled:bg-gray-50"
        >
          <option value="">
            {plants.length ? placeholder : "No plants in your collection"}
          </option>
          {plants.map((plant) => (
            <option key={plantId(plant)} value={plantId(plant)}>
              {plant.name}
              {plant.species ? ` · ${plant.species}` : ""}
            </option>
          ))}
        </select>
      </label>
      {plants.length === 0 ? (
        <p className="mt-2 text-sm text-gray-500">
          Add a plant first to use this feature.{" "}
          <Link href="/plants/new" className="font-semibold text-emerald-700 hover:underline">
            Add your first plant
          </Link>
        </p>
      ) : null}
    </div>
  );
}
