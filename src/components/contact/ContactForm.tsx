import { useState, type FormEvent } from "react";

type FieldKey = "name" | "contact" | "website" | "message";

type FieldConfig = {
  label: string;
  placeholder: string;
  required: boolean;
  help?: string;
  error?: string;
};

type FormLabels = {
  fields: Record<FieldKey, FieldConfig>;
  submit: { idle: string; sending: string; retry: string };
  success: { title: string; body: string; again: string };
  error: { title: string; body: string };
};

type Props = {
  endpoint: string;
  labels: FormLabels;
};

type Status = "idle" | "sending" | "success" | "error";

const emptyValues: Record<FieldKey, string> = {
  name: "",
  contact: "",
  website: "",
  message: "",
};

const inputBase =
  "w-full min-h-12 rounded-xs border border-ColorBlack/15 bg-white px-4 py-3 text-base text-ColorBlack placeholder:text-ColorBlack/40 transition focus:border-ColorBlack focus:outline-none focus:ring-2 focus:ring-ColorLime";
const inputError = "border-red-500 focus:border-red-500 focus:ring-red-200";

export default function ContactForm({ endpoint, labels }: Props) {
  const [values, setValues] = useState(emptyValues);
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, string>>>({});

  const update = (key: FieldKey) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (fieldErrors[key]) {
      setFieldErrors((errs) => {
        const next = { ...errs };
        delete next[key];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const errs: Partial<Record<FieldKey, string>> = {};
    (Object.keys(labels.fields) as FieldKey[]).forEach((key) => {
      const cfg = labels.fields[key];
      if (cfg.required && !values[key].trim()) {
        errs[key] = cfg.error ?? "Required";
      }
    });
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!validate()) return;

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          contact: values.contact.trim(),
          website: values.website.trim(),
          message: values.message.trim(),
        }),
      });
      if (res.ok) {
        setStatus("success");
        setValues(emptyValues);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setValues(emptyValues);
    setFieldErrors({});
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-md border border-ColorLime bg-ColorLime/15 p-6 sm:p-8"
      >
        <h3 className="font-PublicSans text-2xl font-bold text-ColorBlack">
          {labels.success.title}
        </h3>
        <p className="mt-2 text-ColorBlack/80">{labels.success.body}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xs border border-ColorBlack bg-transparent px-6 py-3 font-semibold text-ColorBlack transition hover:bg-ColorBlack hover:text-white"
        >
          {labels.success.again}
        </button>
      </div>
    );
  }

  const isSending = status === "sending";

  const renderLabel = (key: FieldKey) => {
    const cfg = labels.fields[key];
    return (
      <label htmlFor={`contact-${key}`} className="mb-2 block text-sm font-semibold text-ColorBlack">
        {cfg.label}
        {cfg.required && <span aria-hidden="true" className="ml-1 text-red-500">*</span>}
      </label>
    );
  };

  const renderHelpOrError = (key: FieldKey) => {
    const err = fieldErrors[key];
    if (err) {
      return (
        <p id={`contact-${key}-error`} className="mt-1.5 text-sm text-red-600">
          {err}
        </p>
      );
    }
    const help = labels.fields[key].help;
    return help ? <p className="mt-1.5 text-sm text-ColorBlack/60">{help}</p> : null;
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {status === "error" && (
        <div
          role="alert"
          className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-700"
        >
          <p className="font-semibold">{labels.error.title}</p>
          <p className="mt-1">{labels.error.body}</p>
        </div>
      )}

      <div>
        {renderLabel("name")}
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={update("name")}
          placeholder={labels.fields.name.placeholder}
          aria-invalid={fieldErrors.name ? "true" : undefined}
          aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          className={`${inputBase} ${fieldErrors.name ? inputError : ""}`}
        />
        {renderHelpOrError("name")}
      </div>

      <div>
        {renderLabel("contact")}
        <input
          id="contact-contact"
          name="contact"
          type="text"
          inputMode="email"
          autoComplete="email"
          value={values.contact}
          onChange={update("contact")}
          placeholder={labels.fields.contact.placeholder}
          aria-invalid={fieldErrors.contact ? "true" : undefined}
          aria-describedby={fieldErrors.contact ? "contact-contact-error" : undefined}
          className={`${inputBase} ${fieldErrors.contact ? inputError : ""}`}
        />
        {renderHelpOrError("contact")}
      </div>

      <div>
        {renderLabel("website")}
        <input
          id="contact-website"
          name="website"
          type="url"
          inputMode="url"
          autoComplete="url"
          value={values.website}
          onChange={update("website")}
          placeholder={labels.fields.website.placeholder}
          className={inputBase}
        />
        {renderHelpOrError("website")}
      </div>

      <div>
        {renderLabel("message")}
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={update("message")}
          placeholder={labels.fields.message.placeholder}
          aria-invalid={fieldErrors.message ? "true" : undefined}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          className={`${inputBase} resize-y ${fieldErrors.message ? inputError : ""}`}
        />
        {renderHelpOrError("message")}
      </div>

      <button
        type="submit"
        disabled={isSending}
        className="inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-xs border border-ColorLime bg-ColorLime px-6 py-3 font-semibold text-ColorBlack transition duration-300 hover:border-ColorDark hover:bg-white disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {isSending && (
          <span
            aria-hidden="true"
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-ColorBlack/30 border-t-ColorBlack"
          />
        )}
        {isSending
          ? labels.submit.sending
          : status === "error"
            ? labels.submit.retry
            : labels.submit.idle}
      </button>
    </form>
  );
}
