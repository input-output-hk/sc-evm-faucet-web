import { formatDuration, intervalToDuration } from "date-fns";

const requestForm = document.getElementById("request-form");
const successMessage = document.getElementById("success-message");
const errorMessage = document.getElementById("error-message");
const rateLimitedErrorMessage = document.getElementById(
  "rate-limit-error-message"
);
const rateLimitTime = document.getElementById("rate-limit-time");
const loader = document.getElementsByClassName("loader")[0];
const messageAddress = document.getElementById("message-address");
const messageTxId = document.getElementById("message-txid");
const submitButton = document.getElementById("form-submit");

const formatBackoffTime = (seconds) =>
  formatDuration(intervalToDuration({ start: 0, end: seconds * 1000 }));

const resetMessages = () => {
  successMessage.style.display = "none";
  errorMessage.style.display = "none";
  rateLimitedErrorMessage.style.display = "none";
};

requestForm.onsubmit = async (event) => {
  event.preventDefault();
  resetMessages();
  loader.style.display = "block";
  submitButton.disabled = true;
  const address = document.getElementById("address-field").value;
  const requestBody = {
    jsonrpc: "2.0",
    method: "faucet_sendFunds",
    params: [address],
    id: 1,
  };

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  try {
    const response = await fetch(window.location.origin, {
      method: "POST",
      body: JSON.stringify(requestBody),
      mode: "cors",
      headers,
    });
    const { status } = response;

    if (status === 200) {
      const body = await response.json();
      if ("error" in body) {
        // handle json-rpc failure
        errorMessage.style.display = "block";
        console.error(body.err);
      } else {
        // handle json-rpc success
        messageAddress.textContent = `Address: ${address}`;
        messageTxId.textContent = `Transaction ID: ${body.result}`;
        successMessage.style.display = "block";
      }
    } else if (status === 429) {
      // handle rate-limited
      const body = await response.json();
      errorMessage.style.display = "block";
      rateLimitedErrorMessage.style.display = "block";
      rateLimitTime.textContent = formatBackoffTime(body.data.backoff_seconds);
      console.error(body);
    } else {
      // handle other http errors
      errorMessage.style.display = "block";
      console.error(status);
    }
  } catch (error) {
    // handle client error
    errorMessage.style.display = "block";
    console.error(error);
  }

  loader.style.display = "none";
  submitButton.disabled = false;
};