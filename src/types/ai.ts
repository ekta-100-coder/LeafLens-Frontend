export interface Diagnosis {
  id: string;
  _id?: string;
  plant: string;
  symptoms?: string[];
  problems?: Array<{ name: string; severity?: string; confidence?: number }>;
  causes?: string[];
  treatments?: string[];
  createdAt: string;
}

export interface Identification {
  id: string;
  _id?: string;
  plant: string;
  commonName?: string;
  scientificName?: string;
  confidence?: number;
  description?: string;
  createdAt: string;
}
