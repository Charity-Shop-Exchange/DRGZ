import { query as q } from "faunadb";
import { guestClient } from "../../utils/fauna-client";
import { setAuthCookie } from "../../utils/auth-cookies";
import {client, tokenId} from "../../utils/hedera-treasury";
const {
  AccountCreateTransaction,
  AccountId,
  TokenAssociateTransaction,
  PrivateKey
} = require("@hashgraph/sdk");

export default async function signup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("Name, Email and Password not provided");
  }

  try {
    const existingEmail = await guestClient.query(
      // Exists returns boolean, Casefold returns normalize string
      q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(email)))
    );

    if (existingEmail) {
      return res.status(400).send(`Email ${email} already exists`);
    }
    ////Public and Private Area
    // const privateKey = await PrivateKey.generate();
    // const publicKey = privateKey.publicKey;

    // const transaction = new AccountCreateTransaction()
    // .setKey(publicKey)
    // .setInitialBalance(0)

    // const txResponsecreate = await transaction.execute(client);

    // //Request the receipt of the transaction
    // const receiptCreate = await txResponsecreate.getReceipt(client);

    // //Get the account ID
    // const hederaAccountID = receiptCreate.accountId;

    // console.log(hederaAccountID)

    // ///TokenAssociateTransaction

    // console.log("tokenId", tokenId);

    // const tokentransactionAssociate = await new TokenAssociateTransaction()
    // .setAccountId(hederaAccountID)
    // .setTokenIds([tokenId])
    // .freezeWith(client);

    // const signTx = await tokentransactionAssociate.sign(privateKey);
    // //Submit the transaction to a Hedera network 
    // const txResponse = await signTx.execute(client);
    // //Request the receipt of the transaction
    // const receipt = await txResponse.getReceipt(client);
    // //Get the transaction consensus status
    // const transactionStatus = receipt.status;

    // console.log(transactionStatus);

    const user = await guestClient.query(
      q.Create(q.Collection("User"), {
        credentials: { password },
        data: { name, email },
      })
    );

    if (!user.ref) {
      return res.status(404).send("user ref is missing");
    }

    const auth = await guestClient.query(
      q.Login(user.ref, {
        password,
      })
    );

    if (!auth.secret) {
      return res.status(404).send("auth secret is missing");
    }

    setAuthCookie(res, auth.secret);

    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(error.requestResult.statusCode).send(error.message);
  }
}
