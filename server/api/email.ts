import { readBody } from "h3"
import { createTransport, SendMailOptions } from "nodemailer"
import marked from "marked"

export default defineEventHandler(async (event) => {
  const { req, res } = event.node

  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_SMTP_USER,
      pass: process.env.GMAIL_SMTP_PASSWORD,
    },
  })

  if (req.method == "POST") {
    const {
      record: { title, description, created_at },
    } = await readBody(event)

    if (title && created_at) {
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
  } else if (req.method == "GET") {
    const mailOptions: SendMailOptions = {
      from: "zernonia@gmail.com",
      to: "zernonia@gmail.com",
      subject: "MadewithSupabase | new submission",
      html: "New submission **ding ding** 🔔",
    }

    const err = await transporter.sendMail(mailOptions)
    return err
  }
})
