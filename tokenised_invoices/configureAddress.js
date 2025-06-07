const xrpl = require("xrpl");
require("dotenv").config();

const issuerSeed = process.env.ISSUER_SECRET;
const buyer1Seed = process.env.BUYER_1_SECRET;
const buyer2Seed = process.env.BUYER_2_SECRET;
const issuer_wallet = xrpl.Wallet.fromSeed(issuerSeed);
const buyer1_wallet = xrpl.Wallet.fromSeed(buyer1Seed);
const buyer2_wallet = xrpl.Wallet.fromSeed(buyer2Seed);

async function getBalances(client) {
  console.log("Getting buyer 1 wallet balances...");
  const buyer_1_balances = await client.request({
    command: "account_lines",
    account: buyer1_wallet.address,
    ledger_index: "validated",
  });
  console.log(buyer_1_balances.result);

  console.log("Getting buyer 2 wallet balances...");
  const buyer_2_balances = await client.request({
    command: "account_lines",
    account: buyer2_wallet.address,
    ledger_index: "validated",
  });
  console.log(buyer_2_balances.result);

  console.log("Getting issuer balances...");
  const issuer_balances = await client.request({
    command: "gateway_balances",
    account: issuer_wallet.address,
    ledger_index: "validated",
    hotwallet: [buyer1_wallet.address, buyer2_wallet.address],
  });
  console.log(JSON.stringify(issuer_balances.result, null, 2));
}

async function sendToken(
  client,
  sender_wallet,
  receiver_wallet,
  currency_code,
  issue_quantity
) {
  const send_token_tx = {
    TransactionType: "Payment",
    Account: sender_wallet.address,
    DeliverMax: {
      currency: currency_code,
      value: issue_quantity,
      issuer: sender_wallet.address,
    },
    Destination: receiver_wallet.address,
  };

  const pay_prepared = await client.autofill(send_token_tx);
  const pay_signed = sender_wallet.sign(pay_prepared);
  console.log(
    `Cold to hot - Sending ${issue_quantity} ${currency_code} to ${receiver_wallet.address}...`
  );
  const pay_result = await client.submitAndWait(pay_signed.tx_blob);
  if (pay_result.result.meta.TransactionResult == "tesSUCCESS") {
    console.log(
      `Transaction succeeded: https://testnet.xrpl.org/transactions/${pay_signed.hash} for ${receiver_wallet.address} with ${issue_quantity} ${currency_code}.`
    );
  } else {
    console.log(pay_result);
    throw `Error sending transaction: ${pay_result.result.meta.TransactionResult}`;
  }
}

async function main() {
  try {
    // Define the network client
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233/");
    await client.connect();

    // To configure the issuer's address, we need to set up an AccountSet transaction
    // const cold_settings_tx = {
    //   "TransactionType": "AccountSet",
    //   "Account": issuer_wallet.address,
    //   "TransferRate": 0,
    //   "TickSize": 5,
    //   "Domain": "6578616D706C652E636F6D", // "example.com"
    //   "SetFlag": xrpl.AccountSetAsfFlags.asfDefaultRipple,
    // }

    // // Prepare the transaction for issuer
    // const cst_prepared = await client.autofill(cold_settings_tx)
    // const cst_signed = issuer_wallet.sign(cst_prepared)
    // console.log("Sending cold address AccountSet transaction...")
    // const cst_result = await client.submitAndWait(cst_signed.tx_blob)
    // if (cst_result.result.meta.TransactionResult == "tesSUCCESS") {
    //   console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${cst_signed.hash}`)
    // } else {
    //   throw `Error sending transaction: ${cst_result}`
    // }

    const hot_wallet = buyer1_wallet;
    const buyer_wallet = "buyer_1";
    // const buyer_wallet = "buyer_2";
    // const hot_wallet = buyer2_wallet;

    // const hot_settings_tx = {
    //   TransactionType: "AccountSet",
    //   Account: hot_wallet.address,
    //   Domain: "6578616D706C652E636F6D", // "example.com"
    //   // enable Require Auth so we can't use trust lines that users
    //   // make to the hot address, even by accident:
    //   SetFlag: xrpl.AccountSetAsfFlags.asfRequireAuth,
    // };

    // const hst_prepared = await client.autofill(hot_settings_tx);
    // const hst_signed = hot_wallet.sign(hst_prepared);
    // console.log("Sending hot address AccountSet transaction...");
    // const hst_result = await client.submitAndWait(hst_signed.tx_blob);
    // if (hst_result.result.meta.TransactionResult == "tesSUCCESS") {
    //   console.log(
    //     `Transaction succeeded: https://testnet.xrpl.org/transactions/${hst_signed.hash} for ${buyer_wallet}`
    //   );
    // } else {
    //   throw `Error sending transaction: ${hst_result.result.meta.TransactionResult}`;
    // }

    // Disconnect when done (If you omit this, Node.js won't end the process)

    // Establishing trust line to the issuer---------------
    // const token_name = "catnip";
    // const buf = Buffer.alloc(20); // 20-byte buffer (all zeroes by default)
    // Buffer.from(token_name).copy(buf); // copy name bytes into it
    // const currency_code = buf.toString("hex").toUpperCase(); // hex representation, upper case
    // console.log(currency_code);
    // const trust_set_tx = {
    //   TransactionType: "TrustSet",
    //   Account: hot_wallet.address,
    //   LimitAmount: {
    //     currency: "USD",
    //     issuer: issuer_wallet.address,
    //     value: "10000000000", // Large limit, arbitrarily chosen
    //   },
    // };

    // const ts_prepared = await client.autofill(trust_set_tx);
    // const ts_signed = hot_wallet.sign(ts_prepared);
    // console.log("Creating trust line from hot address to issuer...");
    // const ts_result = await client.submitAndWait(ts_signed.tx_blob);
    // if (ts_result.result.meta.TransactionResult == "tesSUCCESS") {
    //   console.log(
    //     `Transaction succeeded: https://testnet.xrpl.org/transactions/${ts_signed.hash}. Trust line created for ${buyer_wallet} to issuer ${issuer_wallet.address} with limit for ${token_name}.`
    //   );
    // } else {
    //   throw `Error sending transaction: ${ts_result.result.meta.TransactionResult}`;
    // }

    // Sending a payment to check-------------------------
    console.log("Balances before sending token:");
    await getBalances(client);
    console.log("Sending tokens");
    await sendToken(
      client,
      buyer1_wallet,
      issuer_wallet,
      "USD",
      "200" // 1 million USD
    );

    // await sendToken(
    //   client,
    //   issuer_wallet,
    //   buyer2_wallet,
    //   "USD",
    //   "500" // 1 million USD
    // );
    await getBalances(client);
    await client.disconnect();
  } catch (error) {
    console.error("Error configuring address:", error);
  }
}

main();
