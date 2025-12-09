import { useEffect, useState } from "react";
import { AuthService, UserService } from "../services";
import { extractUserId } from "../utils/user.utils";

const DEFAULT_AVATAR = "/img/avt.png";

export function useUserAvatar(): string {
  const [avatarUrl, setAvatarUrl] = useState<string>(DEFAULT_AVATAR);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    (async () => {
      try {
        const me = await AuthService.me({ signal: controller.signal });
        if (cancelled) return;

        const userId = extractUserId(me);
        if (!userId) {
          setAvatarUrl(DEFAULT_AVATAR);
          return;
        }

        const data = await UserService.getUserImage(userId, { signal: controller.signal });
        if (!cancelled && data?.imageUrl) {
          setAvatarUrl(data.imageUrl);
        } else if (!cancelled) {
          setAvatarUrl(DEFAULT_AVATAR);
        }
      } catch {
        if (!cancelled) {
          setAvatarUrl(DEFAULT_AVATAR);
        }
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return avatarUrl;
}

