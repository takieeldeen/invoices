import { getAccessibleLink, upload } from "./apiStorage";
import supabase from "./supabase";
import supabaseAdmin from "./supabaseAdmin";
export async function login(credentials) {
  try {
    let { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) throw new Error("Failed to login");
    console.log(data);
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getCurrentUser() {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return null;
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    // if (error) throw new Error(error);
    // if (error) return {};
    return user;
  } catch (error) {
    throw new Error(error);
  }
}

export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error);
  } catch (error) {
    throw new Error(error);
  }
}

export async function register(userData) {
  try {
    const { data, error } = await supabase.auth.signUp(userData);
    if (error) throw new Error("Error While signing up the user " + error);
    console.log("Step 1 : Registering succeeded");

    return { data };
  } catch (error) {
    if (error) throw new Error(error.message);
  }
}

export async function updateSpecificUser(userData) {
  try {
    console.log(userData);
    //ReOrganize the data structure
    const data = {
      email: userData.email,
      phone: userData.phone,
      user_metadata: {
        first_name: userData.first_name,
        last_name: userData.last_name,
        role: userData.role,
      },
    };
    //Check if there is a new Img
    if (typeof userData.img_url === "object") {
      //1.Upload the image to the bucket
      await upload(userData.img_url[0], userData.id);
      //2.Get accessible link to the new image
      const url = await getAccessibleLink(userData.id);
      console.log(url);
      //3.Inject the new url into the data object
      data.user_metadata.img_url = url.data.publicUrl;
    }
    //Update the user using his id;
    console.log(data);
    const { data: user, error } = await supabaseAdmin.auth.admin.updateUserById(
      userData.id,
      data,
    );
    if (error) throw new Error(error.message);
    console.log(user);
  } catch (err) {
    if (err) throw new Error(err.message);
    console.log(err.message);
  }
}

export async function updateUser(userData) {
  try {
    const { error: errorWhileUpdating } =
      await supabase.auth.updateUser(userData);
    if (errorWhileUpdating)
      throw new Error(
        "Error While Updating the image link " + errorWhileUpdating.message,
      );
    console.log("Step 4 : Completed");
  } catch (error) {
    if (error) throw new Error(error.message);
  }
}

export async function getAllUsers() {
  try {
    const { isAdmin } = await checkForAdmin();

    //Check if the user is an admin
    if (!isAdmin) return [];
    const {
      data: { users },
      error,
    } = await supabaseAdmin.auth.admin.listUsers();

    if (error) throw new Error(error.message);

    return users;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function signUp(userData) {
  const newUser = {
    email: userData.email,
    password: userData.password,
    // role: "authenticated",
    role: "authenticated",
    options: {
      data: {
        first_name: userData.first_name,
        last_name: userData.last_name,
        img_url: userData.img_url,
        suspended: false,
        role: "admin",
      },
    },
  };

  try {
    //1. Signing up the user (DONE)
    const { data } = await register(newUser);
    //2. Uploading his avatar
    const { data: imgData } = await upload(userData.img_url[0], data?.user?.id);
    //3. Get accessible img link
    const { data: imgLink } = await getAccessibleLink(data.user.id);
    //4. Update the user data
    const updates = {
      data: {
        img_url: imgLink.publicUrl,
      },
    };
    //5. update the img_url
    await updateUser(updates);
    console.log(imgLink);
  } catch (error) {
    console.error(error);
  }
}

export async function checkForAdmin() {
  try {
    // Get the current user

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const isAdmin = user.user_metadata.role === "admin";
    return { isAdmin, user };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getSpecificUser(id) {
  try {
    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.admin.getUserById(id);
    if (error) throw new Error(error);
    return { user };
  } catch (err) {
    if (err) throw new Error(err.message);
  }
}
