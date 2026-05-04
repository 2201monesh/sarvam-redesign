export interface ApiKey {
  id: string;
  name: string;
  value: string;
  createdAt: Date;
  status: "active" | "inactive";
}
