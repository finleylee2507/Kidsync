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

export const convertTo12HourFormat = (timeString) => {
  // Split the time string into hours and minutes
  const timeParts = timeString.split(":");
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);

  // Determine if it is AM or PM
  const amOrPm = hours >= 12 ? " PM" : " AM";

  // Convert to 12-hour format
  const twelveHourFormatHours = hours % 12 || 12;

  // Construct the new time string
  const twelveHourFormatTimeString =
    twelveHourFormatHours + ":" + (minutes < 10 ? "0" : "") + minutes + amOrPm;

  return twelveHourFormatTimeString;
};
