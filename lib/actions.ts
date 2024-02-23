export async function authenticate(values: any) {
  try {
    console.log(values);
  } catch (err) {
    if (err) {
      console.log("Error: ", err);
    }
  }
}
