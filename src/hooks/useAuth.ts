import { getMe } from "@/api/auth";
import { Role, RoleEnum } from "@/entities/role.entity";
import { User } from "@/entities/user.entity";
import { AuthActions, AuthState } from "@/gx/signals/auth.signal";
import { useActions, useSignal } from "@dilane3/gx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  // Navigate
  const navigate = useNavigate();

  // Global state
  const { loaded, loading } = useSignal<AuthState>("auth");

  // Global actions
  const { setIsLoading, login } = useActions<AuthActions>("auth");

  useEffect(() => {
    (async () => {
      if (!loaded && !loading) {
        await handleGetMe();
      }
    })();
  }, []);

  // Handlers
  const handleGetMe = async () => {
    setIsLoading(true);

    const { data, user: userData } = await getMe();

    if (data) {
      if (userData.admin) {
        const adminData = {
          id: userData.admin.id,
          lastName: userData.admin.lastName,
          firstName: userData.admin.firstName,
          phone: userData.admin.phone,
          avatar: "https://www.gravatar.com/av",
          sexe: "male",
          createdAt: new Date(userData.admin.createdAt),
          role: new Role({
            label: RoleEnum.ADMIN,
            description: "Admin",
          }),
        };

        const user = new User({
          email: userData.email,
          ...adminData,
        });

        login(user);
      } else {
        console.log(userData)
        const agentData = {
          id: userData.agent.id,
          lastName: userData.agent.lastName,
          firstName: userData.agent.firstName,
          phone: userData.agent.phone,
          avatar: "https://www.gravatar.com/av",
          sexe: "male",
          createdAt: new Date(userData.agent.createdAt),
          role: new Role({
            label: RoleEnum.AGENT,
            description: "Agent",
          }),
        };

        const user = new User({
          email: userData.email,
          ...agentData,
        });

        login(user);
      }
    } else {
      setIsLoading(false);

      navigate("/auth/sign-in");
    }
  };
}
