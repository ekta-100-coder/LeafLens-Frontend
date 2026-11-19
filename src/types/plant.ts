export interface Plant {
  id: string;
  _id?: string;
  name: string;
  species?: string;
  scientificName?: string;
  description?: string;
  location?: string;
  healthStatus?: string;
  notes?: string;
  imageUrl?: string;
  nickname?: string;
  category?: string;
  acquiredAt?: string | null;
  lightCondition?: string;
  indoorOutdoor?: string;
  wateringFrequency?: number | null;
  fertilizingFrequency?: number | null;
  careNotes?: string;
  healthScore?: number | null;
  isArchived?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PlantInput {
  name: string;
  species?: string;
  scientificName?: string;
  description?: string;
  location?: string;
  notes?: string;
  nickname?: string;
  category?: string;
  acquiredAt?: string | null;
  lightCondition?: string;
  indoorOutdoor?: string;
  wateringFrequency?: number | null;
  fertilizingFrequency?: number | null;
  careNotes?: string;
  healthStatus?: string;
  healthScore?: number | null;
}
