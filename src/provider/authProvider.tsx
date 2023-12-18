import { RoleEnum } from "@/entities/role.entity";
import { AuthState } from "@/gx/signals/auth.signal";
import { useSignal } from "@dilane3/gx";

type Props = {
  children: React.ReactNode;
  access: RoleEnum[];
};

export default function AuthProvider({ children, access }: Props) {
  // Global state
  const { user } = useSignal<AuthState>("auth");

  // Check if the user is authenticated
  if (!user) {
    return null;
  }

  if (!access.includes(user.role.label)) {
    return <div>This page is not available</div>;
  }

  return <>{children}</>;
}
