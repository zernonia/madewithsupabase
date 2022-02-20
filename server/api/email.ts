import type { IncomingMessage, ServerResponse } from "http"
import { useBody } from "h3"
import { createTransport, SendMailOptions } from "nodemailer"
import marked from "marked"

export default async (req: IncomingMessage, res: ServerResponse) => {
  const {
    record: { title, description, created_at },
  } = await useBody(req)

  if (title && created_at) {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_SMTP_USER,
        pass: process.env.GMAIL_SMTP_PASSWORD,
      },
    })

    const mailOptions: SendMailOptions = {
      from: "zernonia@gmail.com",
      to: "zernonia@gmail.com",
      subject: "MadewithSupabase | new submission",
      html: `<h1>${title}</h1><p>${created_at}</p><br></br>${marked(
        description ?? ""
      )}`,
    }

    const err = await transporter.sendMail(mailOptions)
    return err
  } else {
    res.statusCode = 500
    return "error"
  }
}
