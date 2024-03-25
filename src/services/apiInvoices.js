import { checkForAdmin } from "./apiUsers";
import supabase from "./supabase";

export async function getInvoices(filter = "", input_id = null) {
  try {
    // Get the current user
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const id = input_id ?? user.id;

    let query = supabase.from("invoices").select("*").neq("deleted", true);

    if (
      user.user_metadata.role !== "admin" ||
      (input_id !== user.id && input_id !== null)
    )
      query = query.eq("created_by", id);
    if (filter !== "") query = query.eq("status", filter);
    const { data: invoices, error } = await query;

    if (invoices === null) return [];
    if (error) {
      throw new Error(error);
    }
    return invoices;
  } catch (err) {
    console.error(err);
  }
}

export async function getInvoice(id) {
  try {
    const { isAdmin, user } = await checkForAdmin();
    const user_id = user.id;
    //Initate your query
    let query = supabase.from("invoices").select().eq("id", id);
    //Check if the user is admin or not
    if (!isAdmin) query = query.eq("created_by", user_id);

    let {
      data: [invoice],
      error,
    } = await query;
    // const [invoice] = data;
    if (error) {
      throw new Error(error);
    }
    return invoice;
  } catch (err) {
    console.error(err);
  }
}

export async function getFilteredInvoices(filter = "") {
  try {
    let { error, data } = await supabase.select("*").eq("status", filter);
    if (error) throw new Error("Failed to get the filtered invoices");
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteInvoice(invoiceData) {
  try {
    //update the invoice deleted field to true
    const { data, error } = await supabase
      .from("invoices")
      .update({ deleted: true })
      .eq("id", invoiceData.id)
      .select();

    //Add the movement to the action group
    const { error: creationError } = await supabase
      .from("actions")
      .insert({
        invoice_id: invoiceData.id,
        action: "delete",
        user_id: invoiceData.createdBy,
        price: invoiceData.total,
      })
      .select();

    if (error) throw new Error("Error while updating the invoice");
    if (creationError) throw new Error(creationError.message);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
  //   let { error } = await supabase.from("invoices").delete().eq("id", id);
  //   if (error) {
  //     throw new Error(error);
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
}

export async function createInvoice(dataInput) {
  try {
    const { data, error } = await supabase
      .from("invoices")
      .insert([dataInput])
      .select();
    if (error) throw new Error("Failed to create new Invoice");
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function updateInvoice(updatedData) {
  console.log(updatedData);
  try {
    const { data, error } = await supabase
      .from("invoices")
      .update(updatedData.updated)
      .eq("id", updatedData.id)
      .select();

    const { error: creationError } = await supabase
      .from("actions")
      .insert({
        invoice_id: updatedData.updated.id,
        action: "update",
        user_id: updatedData.updated.created_by,
        price: updatedData.updated.total,
      })
      .select();
    if (error) throw new Error("Error while updating the invoice");
    if (creationError) throw new Error("Error while updating the invoice");
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Error occured while updating the invoice");
  }
}

export async function getReportStats(id) {
  try {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("created_by", id);
    if (error) throw new Error();
    return { data };
  } catch (err) {
    if (err) throw new Error(`Error While fetching the stats ${err.message}`);
  }
}

export async function getMovements() {
  try {
    const { data, error } = await supabase.from("movements").select("*");
    if (error) throw new Error(error);

    return { data };
  } catch (err) {
    throw new Error(`Error while fetching the movemnts ${err.message}`);
  }
}
