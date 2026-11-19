export interface CareLog {
  id: string;
  _id?: string;
  plant: string;
  actionType: string;
  actionDate?: string;
  quantity?: number | null;
  quantityUnit?: string;
  notes?: string;
  scheduledFor?: string;
  completedAt?: string;
  createdAt: string;
}
