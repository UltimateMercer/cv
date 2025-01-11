export type User = {
  id: string;
  name?: string | null;
  username: string;
  avatar?: string | null;
  bio?: string | null;
  invitation_code?: string | null;
  social_links?: {
    github?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
    website?: string | null;
    instagram?: string | null;
  };
  auth_id?: string | null;
  created_at: string;
  updated_at?: string | null;
  deleted_at?: string | null;
};
