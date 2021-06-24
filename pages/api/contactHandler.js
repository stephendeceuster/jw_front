import axios from "axios";
import { sendMail } from "../../utilities/mailSender";

const contactHandler = async (req, res) => {
  if (req.method !== "POST") {
    
    return res.status(405).json({ message: "not the right method" });
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

  return res.status(200).json({ message: "email send" });
};

export default contactHandler;