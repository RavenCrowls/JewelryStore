import type { MeResponse } from "../services/auth.service";

export function extractDisplayName(me: MeResponse | null | undefined): string {
  if (!me?.authenticated) {
    return "";
  }

  if (me.fullName) {
    return me.fullName;
  }

  const fromFullNameClaim = me.claims?.find(
    (c) => /full\s*name/i.test(c.Type) || /fullname/i.test(c.Type)
  )?.Value;

  const fromNameClaim = me.claims?.find(
    (c) => /(.*\/)?name$/i.test(c.Type) && !/nameidentifier/i.test(c.Type)
  )?.Value;

  return fromFullNameClaim ?? me.name ?? fromNameClaim ?? "";
}
