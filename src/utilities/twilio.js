const fromNumber = "+18339063844";

const verifyNumber = (newNumber, name) => {
  fetch(
    "https://api.twilio.com/2010-04-01/Accounts/AC4335b291975545d0b99f0bc5ff28c250/OutgoingCallerIds.json",
    {
      method: "POST",
      headers: {
        Authorization:
          "Basic QUM0MzM1YjI5MTk3NTU0NWQwYjk5ZjBiYzVmZjI4YzI1MDpjZmE1MmVmOWM3NjlkMGEyY2ZjNDFiOTZjZDgzNzQxYQ==",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `PhoneNumber=${encodeURIComponent(
        newNumber
      )}&FriendlyName=${encodeURIComponent(name)}`,
    }
  )
    .then((response) => {
      console.log(response.status);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const sendSMS = (toNumber, message) => {
  // verifyNumber(toNumber, "vedant");

  fetch(
    "https://api.twilio.com/2010-04-01/Accounts/AC4335b291975545d0b99f0bc5ff28c250/Messages.json",
    {
      method: "POST",
      headers: {
        Authorization:
          "Basic QUM0MzM1YjI5MTk3NTU0NWQwYjk5ZjBiYzVmZjI4YzI1MDpjZmE1MmVmOWM3NjlkMGEyY2ZjNDFiOTZjZDgzNzQxYQ==",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `From=${encodeURIComponent(fromNumber)}&To=${encodeURIComponent(
        "+1" + toNumber
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
