import supabase from "./supabase";

export async function upload(filePath, userId) {
  console.log(filePath);
  try {
    const { data, error } = await supabase.storage
      .from("profile_pics")
      .upload(`${userId.replaceAll("-", "")}/avatar.jpg`, filePath, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) throw new Error(error);
    console.log("Step 2 : Image uploaded successfully");
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getAccessibleLink(id) {
  try {
    const { data } = supabase.storage
      .from("profile_pics")
      .getPublicUrl(`${id.replaceAll("-", "")}/avatar.jpg`);
    if (data) {
      console.log(data);
      console.log("Step 3 : An accessible link was captured");
    } else {
      console.log("Step 3 : Failure cant create accessible link");
    }
    return { data };
  } catch (err) {
    console.error(err);
  }
}
