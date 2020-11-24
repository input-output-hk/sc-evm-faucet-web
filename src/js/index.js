import { RequestManager, HTTPTransport, Client } from "@open-rpc/client-js";

const transport = new HTTPTransport(process.env.FAUCET_NODE_URL);
const client = new Client(new RequestManager([transport]));


const requestForm = document.getElementById('request-form');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

requestForm.onsubmit = (event) => {
  event.preventDefault();
  const address = document.getElementById('address-field').value
  console.log(address)
  client.request({method: 'faucet_sendFunds', params: [address]})
    .then((result) => {
      successMessage.style.display = 'block';
    })
    .catch((err) => {
      errorMessage.style.display = 'block';
      console.error(err)
    })
}
