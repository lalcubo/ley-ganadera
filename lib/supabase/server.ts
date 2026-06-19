import { createClient } from "@supabase/supabase-js";

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Variable de entorno faltante: ${name}. ` +
      "Copia .env.example como .env.local y completa las credenciales."
    );
  }
  return value;
}

const supabaseUrl = getEnvVar("NEXT_PUBLIC_SUPABASE_URL");
const supabaseServiceKey = getEnvVar("SUPABASE_SERVICE_ROLE_KEY");

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
