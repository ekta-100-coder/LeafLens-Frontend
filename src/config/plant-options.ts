export const demoPlantSpecies = [
  { species: "Monstera Deliciosa", scientificName: "Monstera deliciosa", category: "tropical" },
  { species: "Snake Plant", scientificName: "Dracaena trifasciata", category: "succulent" },
  { species: "Peace Lily", scientificName: "Spathiphyllum wallisii", category: "flowering" },
  { species: "Aloe Vera", scientificName: "Aloe barbadensis miller", category: "succulent" },
  { species: "Spider Plant", scientificName: "Chlorophytum comosum", category: "foliage" },
  { species: "Pothos", scientificName: "Epipremnum aureum", category: "trailing" },
  { species: "Fiddle Leaf Fig", scientificName: "Ficus lyrata", category: "tropical" },
  { species: "ZZ Plant", scientificName: "Zamioculcas zamiifolia", category: "foliage" },
] as const;

export const plantCategories = [
  "tropical",
  "succulent",
  "flowering",
  "foliage",
  "trailing",
  "herb",
  "other",
] as const;

export const lightConditions = [
  { value: "low", label: "Low light" },
  { value: "indirect", label: "Indirect light" },
  { value: "bright-indirect", label: "Bright indirect light" },
  { value: "direct", label: "Direct light" },
  { value: "mixed", label: "Mixed light" },
  { value: "unknown", label: "Not sure yet" },
] as const;

export const indoorOutdoorOptions = [
  { value: "indoor", label: "Indoor" },
  { value: "outdoor", label: "Outdoor" },
  { value: "both", label: "Indoor and outdoor" },
  { value: "unknown", label: "Not sure yet" },
] as const;

export const healthStatuses = [
  { value: "healthy", label: "Healthy" },
  { value: "attention", label: "Needs attention" },
  { value: "critical", label: "Critical" },
  { value: "unknown", label: "Not assessed" },
] as const;

export const careActionTypes = [
  { value: "watering", label: "Watering" },
  { value: "fertilizing", label: "Fertilizing" },
  { value: "pruning", label: "Pruning" },
  { value: "repotting", label: "Repotting" },
  { value: "misting", label: "Misting" },
  { value: "cleaning", label: "Cleaning" },
  { value: "treatment", label: "Treatment" },
  { value: "sunlight", label: "Sunlight adjustment" },
  { value: "pest_control", label: "Pest control" },
  { value: "other", label: "Other" },
] as const;

