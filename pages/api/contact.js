import axios from "axios";

const contactHandler = async (req, res) => {
//   if (req.method !== "POST") {
//     // TODO: check right errorcode
//     return res.status(404).json({ message: "not the right method" });
//   }

  const { fullName, email, message } = req.body.values;
  const resp = await axios.post(
    "https://wdev2.be/stephen21/eindwerk/api/contact_forms.json",
    {
      fullName,
      email,
      message,
    }
  );
  return res.status(200).json({ message: "Jodela" });
};

export default contactHandler;