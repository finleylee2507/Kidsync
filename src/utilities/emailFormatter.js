export const fromEmailToDbString = async (email) => {
  if (!email) {
    throw new Error("Email cannot be empty");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(email);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const hex = Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hex;
};

export const fromDbStringToEmail = (dbString) => {
  let originalEmail = dbString.replace(",", ".");
  return originalEmail;
};



