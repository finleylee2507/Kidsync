const fromNumber = "+18339063844";
const accountSid = "AC4335b291975545d0b99f0bc5ff28c250";
const authToken = "9a3996afd3837e4c1f7910cad757b41d";

export const sendSMS = (toNumber, message) => {
  fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization:
          "Basic QUM0MzM1YjI5MTk3NTU0NWQwYjk5ZjBiYzVmZjI4YzI1MDo5YTM5OTZhZmQzODM3ZTRjMWY3OTEwY2FkNzU3YjQxZA==",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `From=${encodeURIComponent(fromNumber)}&To=${encodeURIComponent(
        "+" + toNumber
      )}&Body=${encodeURIComponent(message)}`,
    }
  )
    .then((response) => {
      console.log(toNumber + message);
      console.log(response.status);
    })
    .catch((error) => {
      console.log(toNumber + message);
      console.error(error);
    });
};
