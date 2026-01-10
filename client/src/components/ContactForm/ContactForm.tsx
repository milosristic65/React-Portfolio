import style from "./ContactForm.module.scss";
import React, { useState } from "react";

interface ContactFormProps {
  className?: string | string[];
}

export const ContactForm = ({ className }: ContactFormProps) => {
  const classes = ["contactForm"];
  if (className) {
    if (Array.isArray(className)) {
      classes.push(...className);
    } else {
      classes.push(className);
    }
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const apiUrl = import.meta.env.VITE_API_URL || "";
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: name,
          user_email: email,
          user_message: message,
        }),
      });
      if (response.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
        console.log("Message sent successfully");
      } else {
        setStatus("error");
        console.error("Error sending message:", response.statusText);
      }
    } catch (error) {
      setStatus("error");
      console.error("Error sending message:", error);
    }
  };

  return (
    <form
      className={`${style.contactForm} ${classes.join(" ")}`}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        autoComplete="true"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="true"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        name="message"
        rows={4}
        placeholder="Message"
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send"}
      </button>
      <div className={style.statusMessage}>
        {status === "sent" && (
          <p className={style.success}>Message sent successfully!</p>
        )}
        {status === "error" && (
          <p className={style.error}>
            Error sending message. Please try again.
          </p>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
