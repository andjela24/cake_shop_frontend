import { useAuth } from "./useAuth";
import { userHasPermission } from "./Utils";
export const PermissionControl = ({
    permission,
    fallbackContent = null,
  }) => {
    const {
      me: { data: me },
    } = useAuth();
  
    if (!permission) {
      return "Not enough privilages";
    }

  
    return userHasPermission(me, permission) ? "Greska u user has permission" : fallbackContent;
  };