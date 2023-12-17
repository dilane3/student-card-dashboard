import instance from "..";

/**
 * Function used to login the agent or the admin
 * @param {string} email
 * @param {string} password
 * @returns
 */
export const login = async (email: string, password: string) => {
  try {
    const response = await instance.post(
      "/auth/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
      },
    );

    if (response.status === 200) {
      return { data: true, user: response.data };
    }

    return { data: false };
  } catch (error) {
    console.error(error);

    return { error: error };
  }
};

/**
 * Function used to logout the agent or the admin
 * @returns
 */
export const logout = async () => {
  try {
    const response = await instance.post("/auth/logout", {
      headers: {
        "Access-Control-Allow-Credentials": true,
      },
    });

    if (response.status === 200) {
      return { data: true };
    }

    return { data: false };
  } catch (error) {
    console.error(error);

    return { error: error };
  }
};

/**
 * Function used retrieve information about the current agent or the admin
 * @returns
 */
export const getMe = async () => {
  try {
    const response = await instance.get("users/admins/me", {
      headers: {
        "Access-Control-Allow-Credentials": true,
      },
    });

    console.log(response)

    if (response.status === 200) {
      return { data: true, user: response.data };
    }

    return { data: false };
  } catch (error: any) {
    console.log("holllllllllle")
    try {
      console.log(error)
      if (error && error.response && error.response.status === 401) {
        const response = await instance.get("users/agents/me", {
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        });

        console.log(response);

        if (response.status === 200) {
          return { data: true, user: response.data };
        }
      }

      return { data: false };
    } catch (error: any) {
      console.error(error);

      return { error: error };
    }
  }
};
