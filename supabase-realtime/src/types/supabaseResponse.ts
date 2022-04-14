import { ApiError, Session, User } from "@supabase/supabase-js";

export type SignUpResponse = {
  user: User | null;
  session: Session | null
  error: ApiError | null
}