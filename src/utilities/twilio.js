const fromNumber = "+18339063844";
const accountSid = "AC4335b291975545d0b99f0bc5ff28c250";
const authToken = "03e6ea55eb65888b345407e1c52d85c5";

export const sendSMS = (toNumber, message) => {
  // verifyNumber(toNumber, "vedant");

  fetch(
    "https://api.twilio.com/2010-04-01/Accounts/AC4335b291975545d0b99f0bc5ff28c250/Messages.json",
    {
      method: "POST",
      headers: {
        Authorization: "Basic" + btoa(`${accountSid}:${authToken}`),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `From=${encodeURIComponent(fromNumber)}&To=${encodeURIComponent(
        "+" + toNumber
      )}&Body=${encodeURIComponent(message)}`,
    }
  )
    .then((response) => {
      console.log(response.status);
    })
    .catch((error) => {
      console.error(error);
    });
};
