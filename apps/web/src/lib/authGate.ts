import { emitAuthRequired, isGuestMode } from "./guestMode";
import { isAuthenticated } from "./api";

export function requireAuthForAction(actionId: string): boolean {
  if (isAuthenticated()) return true;
  if (isGuestMode()) {
    emitAuthRequired(actionId);
    return false;
  }
  emitAuthRequired(actionId);
  return false;
}

