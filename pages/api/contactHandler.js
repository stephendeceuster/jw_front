import axios from "axios";
import { sendMail } from "../../utilities/mailSender";

const contactHandler = async (req, res) => {
  if (req.method !== "POST") {
    // TODO: check right errorcode
    return res.status(404).json({ message: "not the right method" });
  }

  const { fullName, email, message } = req.body.values;
  // TODO : sanitize
  const respDB = await axios.post(
    "https://wdev2.be/stephen21/eindwerk/api/contact_forms.json",
    {
      fullName,
      email,
      message,
    }
  );
  const respSG = await sendMail( fullName, email, message );
  
  console.log('respSG', respSG);
  return res.status(200).json({ message: "email send" });
};

export default contactHandler;