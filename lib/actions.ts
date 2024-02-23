"use server";

export async function authenticate(formData: FormData) {
  try {
    console.log(formData);
  } catch (err) {
    if (err) {
      console.log("Error: ", err);
    }
  }
}
