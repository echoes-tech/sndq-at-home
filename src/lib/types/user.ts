export interface User {
  id: string;
  name: string;
  info: string;
  avatar: string; // URL string, empty string if no avatar
  council: boolean;
  activation: string;
  lastLogin: string;
  status: "Active" | "Disabled" | "Inactive";
}
