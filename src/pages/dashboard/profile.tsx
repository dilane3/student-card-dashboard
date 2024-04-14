import { Card, CardBody, Avatar, Typography } from "@material-tailwind/react";

import userImage from "../../assets/img/user.png";
import { AuthState } from "@/gx/signals/auth.signal";
import { useSignal } from "@dilane3/gx";

export function Profile() {
  // Global state
  const { user } = useSignal<AuthState>("auth");

  // Render
  if (!user) return null;

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-primary bg-opacity-80" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src={userImage ?? user.avatar}
                alt="bruce-mars"
                size="xl"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mb-1 capitalize"
                >
                  {user.fullName}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {user.email}
                </Typography>
              </div>
            </div>
            <div className="bg-primary rounded-lg px-8 py-2">
              <Typography
                variant="h6"
                color="white"
                className="capitalize font-nunitoRegular"
              >
                {user.role.label}
              </Typography>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Profile Information
              </Typography>
              <div className="flex flex-col gap-12">
                <ul className="flex flex-col gap-4 p-0">
                  <li className="flex">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                    >
                      FirstName:
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal ml-1 capitalize text-blue-gray-500"
                    >
                      {user.firstName}
                    </Typography>
                  </li>
                  <li className="flex">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                    >
                      LastName:
                    </Typography>

                    <Typography
                      variant="small"
                      className="font-normal ml-1 capitalize text-blue-gray-500"
                    >
                      {user.lastName}
                    </Typography>
                  </li>
                  <li className="flex">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                    >
                      Sexe:
                    </Typography>

                    <Typography
                      variant="small"
                      className="font-normal ml-1 capitalize text-blue-gray-500"
                    >
                      {user.sexe}
                    </Typography>
                  </li>

                  <li className="flex">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                    >
                      Phone:
                    </Typography>

                    <Typography
                      variant="small"
                      className="font-normal ml-1 text-blue-gray-500"
                    >
                      {user.phone}
                    </Typography>
                  </li>
                  <li className="flex">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                    >
                      Email:
                    </Typography>

                    <Typography
                      variant="small"
                      className="font-normal ml-1 text-blue-gray-500"
                    >
                      {user.email}
                    </Typography>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <div className="px-4 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Projects
            </Typography>
            <Typography variant="small" className="font-normal text-blue-gray-500">
              Architects design houses
            </Typography>
            <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              {projectsData.map(
                ({ img, title, description, tag, route, members }) => (
                  <Card key={title} color="transparent" shadow={false}>
                    <CardHeader
                      floated={false}
                      color="gray"
                      className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                    >
                      <img
                        src={img}
                        alt={title}
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody className="py-0 px-1">
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {tag}
                      </Typography>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mt-1 mb-2"
                      >
                        {title}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {description}
                      </Typography>
                    </CardBody>
                    <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                      <Link to={route}>
                        <Button variant="outlined" size="sm">
                          view project
                        </Button>
                      </Link>
                      <div>
                        {members.map(({ img, name }, key) => (
                          <Tooltip key={name} content={name}>
                            <Avatar
                              src={img}
                              alt={name}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white ${
                                key === 0 ? "" : "-ml-2.5"
                              }`}
                            />
                          </Tooltip>
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                ),
              )}
            </div>
          </div> */}
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
