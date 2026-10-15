import { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';

const initialValues = { name: '', email: '', subject: '', message: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) errors.email = 'Please enter your email.';
  else if (!EMAIL_PATTERN.test(values.email)) errors.email = 'Please enter a valid email address.';
  if (values.message.trim().length < 10) errors.message = 'Message should be at least 10 characters.';
  return errors;
}

/**
 * Static-site contact form: validates input, then opens the visitor's email client
 * with the message pre-filled. Swap handleSubmit for an API call (Formspree, EmailJS,
 * or a Spring Boot endpoint) to send messages directly.
 */
export default function ContactForm({ recipient }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const subject = values.subject.trim() || `Portfolio enquiry from ${values.name}`;
    const body = `${values.message}\n\n— ${values.name} (${values.email})`;
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSent(true);
    setValues(initialValues);
  };

  const field = (name, label, props = {}) => {
    const Tag = props.multiline ? 'textarea' : 'input';
    const { multiline, ...rest } = props;
    const errorId = `${name}-error`;
    return (
      <div className="form-field">
        <label htmlFor={name}>{label}</label>
        <Tag
          id={name}
          name={name}
          value={values[name]}
          onChange={handleChange}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? errorId : undefined}
          {...rest}
        />
        {errors[name] && (
          <p id={errorId} className="form-error">
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  return (
    <form className="card contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        {field('name', 'Name', { type: 'text', autoComplete: 'name', placeholder: 'Your name' })}
        {field('email', 'Email', { type: 'email', autoComplete: 'email', placeholder: 'you@company.com' })}
      </div>
      {field('subject', 'Subject (optional)', { type: 'text', placeholder: 'Backend Engineer role' })}
      {field('message', 'Message', {
        multiline: true,
        rows: 5,
        placeholder: 'Tell me about the role or project…',
      })}

      <button type="submit" className="btn btn-primary contact-submit">
        <Send size={16} aria-hidden="true" />
        Send Message
      </button>

      <p className="form-status" role="status" aria-live="polite">
        {sent && (
          <>
            <CheckCircle2 size={16} aria-hidden="true" />
            Your email app should open with the message ready to send.
          </>
        )}
      </p>
    </form>
  );
}
