import { RequestManager, HTTPTransport, Client } from "@open-rpc/client-js";

const transport = new HTTPTransport(process.env.FAUCET_NODE_URL);
const client = new Client(new RequestManager([transport]));


const requestForm = document.getElementById('request-form');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');
const loader = document.getElementsByClassName('loader')[0];
const messageAddress = document.getElementById('message-address');
const messageTxId = document.getElementById('message-txid');
const submitButton = document.getElementById('form-submit');

requestForm.onsubmit = (event) => {
  event.preventDefault();
  successMessage.style.display = 'none';
  errorMessage.style.display = 'none';
  loader.style.display = 'block';
  submitButton.disabled = true;
  const address = document.getElementById('address-field').value
  client.request({method: 'faucet_sendFunds', params: [address]})
    .then((result) => {
      messageAddress.textContent = `Address: ${address}`
      messageTxId.textContent = `Transaction ID: ${result}`
      successMessage.style.display = 'block';
    })
    .catch((err) => {
      errorMessage.style.display = 'block';
      console.error(err)
    })
    .finally(() => {
      loader.style.display = 'none';
      submitButton.disabled = false;
    })
}
