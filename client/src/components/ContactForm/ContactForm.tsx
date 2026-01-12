import style from "./ContactForm.module.scss";
import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

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
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [responseMessage, setResponseMessage] = useState("");

  // Recaptcha
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";
  const completeRecaptchaMessage = "Please complete the reCAPTCHA.";
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const onVerify = (token: string | null) => {
    setRecaptchaToken(token);
    if (responseMessage === completeRecaptchaMessage) {
      setResponseMessage("");
    }
  };
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);

  // Form Submit
  const apiUrl = import.meta.env.VITE_API_URL || "";
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    if (!recaptchaToken) {
      setStatus("error");
      setResponseMessage(completeRecaptchaMessage);
      return;
    }

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
          recaptcha_token: recaptchaToken,
        }),
      });
      if (response.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
        console.log("Message sent successfully");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setResponseMessage(await response.text());
        console.error("Error sending message:", response.statusText);
      }
    } catch (error) {
      setStatus("error");
      setResponseMessage("An unexpected error occurred.");
      console.error("Error sending message:", error);
    }

    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  return (
    <form
      className={`${style.contactForm} ${classes.join(" ")} ${
        isRecaptchaLoaded ? style.loaded : ""
      }`}
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
      <div className={style.submitSection}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={recaptchaSiteKey}
          onChange={onVerify}
          asyncScriptOnLoad={() => {
            setIsRecaptchaLoaded(true);
          }}
        />
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send"}
        </button>
      </div>
      <div className={style.statusMessage}>
        {status === "sent" && (
          <p className={style.success}>Message sent successfully!</p>
        )}
        {status === "error" && <p className={style.error}>{responseMessage}</p>}
      </div>
    </form>
  );
};

export default ContactForm;
