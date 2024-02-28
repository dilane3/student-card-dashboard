import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController } from "@/context";
import { RouteType } from "@/routes";
import { useSignal } from "@dilane3/gx";
import { AuthState } from "@/gx/signals/auth.signal";

type SideNavProps = {
  brandImg: string;
  routes: RouteType[];
};

export function Sidenav({ brandImg, routes }: SideNavProps) {
  const [controller, _] = useMaterialTailwindController();
  const { sidenavColor, sidenavType } = controller;

  // Global state
  const { user } = useSignal<AuthState>("auth");

  // Check if the user is authenticated
  if (!user) {
    return null;
  }
  console.log(user.avatar);

  return (
    <aside
      className={`fixed inset-0 z-50 h-full w-max bg-primary transition-transform duration-300 xl:w-72 xl:translate-x-0 overflow-y-auto flex flex-col justify-between`}
    >
      <div>
        <div
          className={`relative border-b hover:bg-blue-gray-50/20 ${
            sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
          }`}
        >
          <Link to="/" className={`flex items-center gap-4 py-6 px-2 xl:px-8`}>
            <img src={brandImg} alt="app logo image" className="w-9 h-9" />
            <Typography
              variant="h6"
              color={sidenavType === "dark" ? "white" : "blue-gray"}
              className="hidden xl:block"
            >
              {"Students Card"}
            </Typography>
          </Link>
        </div>
        <div className="m-2 xl:m-4">
          {routes.map(({ layout, title, pages }, key) => (
            <ul key={key} className="mb-4 flex flex-col gap-1">
              {title && (
                <li className="mt-4 mb-2 hidden xl:mx-3.5 xl:block">
                  <Typography
                    variant="small"
                    color={sidenavType === "dark" ? "white" : "blue-gray"}
                    className="font-black uppercase opacity-75"
                  >
                    {title}
                  </Typography>
                </li>
              )}
              {pages.map(
                ({ icon, name, path, access }) =>
                  access &&
                  access.includes(user.role.label) && (
                    <Tooltip
                      content={name}
                      className="bg-primary block 1140px:hidden 1359px:hidden ml-2 font-nunitoBold capitalize"
                      placement="right-center"
                    >
                      <li key={name}>
                        <NavLink to={`/${layout}${path}`}>
                          {({ isActive }) => (
                            <Button
                              variant={isActive ? "gradient" : "text"}
                              color={isActive ? "white" : "white"}
                              className={`${
                                isActive ? "bg-white text-primary" : "text-white"
                              } flex items-center gap-4 pl-2 pr-0 capitalize xl:px-4`}
                              fullWidth
                            >
                              {icon}
                              <Typography
                                color="inherit"
                                className={`${
                                  isActive ? "text-primary" : "text-white"
                                } hidden font-medium capitalize xl:block`}
                              >
                                {name}
                              </Typography>
                            </Button>
                          )}
                        </NavLink>
                      </li>
                    </Tooltip>
                  ),
              )}
            </ul>
          ))}
        </div>
      </div>
      <div className="flex items-center w-[60%] xl:w-[80%] mb-8 mx-auto">
        <div className="w-8 h-8 xl:w-12 xl:h-12 flex items-center justify-center rounded-full bg-white">
          {user.avatar ? (
            <p className="uppercase text-2xl text-primary font-nunitoBold">
              <span>{user.fullName.split(" ")[0].slice(0)[0]}</span>
              <span className="hidden xl:inline-block">
                {user.fullName.split(" ")[1].slice(0)[0]}
              </span>
            </p>
          ) : (
            <img src={user.avatar} alt="User avatar" />
          )}
        </div>
        <div className="text-white ml-2 hidden xl:block">
          <p className="capitalize font-nunitoBold">{user.fullName}</p>
          <p className="text-sm font-nunitoRegular">{user.email}</p>
        </div>
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Material Tailwind React",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.tsx";

export default Sidenav;
