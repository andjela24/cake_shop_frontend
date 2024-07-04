export const userHasPermission = (user, permission, mode = "any") => {
    return Array.isArray(permission)
      ? mode === "all"
        ? permission.every((p) => user.authorities.includes(p))
        : permission.some((p) => user.authorities.includes(p))
      : user.authorities.includes(permission);
  };