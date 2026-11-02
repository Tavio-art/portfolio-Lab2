import { useState } from 'react';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rules = {
    name: (v) => (v.trim().length < 2 ? 'Enter your name (at least 2 characters).' : ''),
    email: (v) => (emailPattern.test(v.trim()) ? '' : 'Enter a valid email, like name@example.com.'),
    message: (v) => (v.trim().length < 10 ? 'Write a message of at least 10 characters.' : ''),
};

export default function ContactForm() {
    const [values, setValues] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    function validateField(name, value) {
        const error = rules[name](value);
        setErrors((prev) => ({ ...prev, [name]: error }));
        return error === '';
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            validateField(name, value);
        }
    }

    function handleBlur(e) {
        validateField(e.target.name, e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setStatus('');

        const ok = Object.keys(rules).map((name) => validateField(name, values[name]));
        const firstBad = Object.keys(rules)[ok.indexOf(false)];

        if (firstBad) {
            document.getElementById(firstBad)?.focus();
            return;
        }

        setStatus(
            `Thanks, ${values.name.trim()}. Your message is ready to send, but this demo form does not send anything.`,
        );
        setValues({ name: '', email: '', message: '' });
        setErrors({ name: '', email: '', message: '' });
    }

    return (
        <form id="contact-form" noValidate className="space-y-1" onSubmit={handleSubmit}>
            <label htmlFor="name" className="block font-bold">
                Name
            </label>
            <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="field"
                aria-describedby="name-error"
                aria-invalid={errors.name ? 'true' : undefined}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <p id="name-error" className="err">
                {errors.name}
            </p>

            <label htmlFor="email" className="block font-bold">
                Email
            </label>
            <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="field"
                aria-describedby="email-error"
                aria-invalid={errors.email ? 'true' : undefined}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <p id="email-error" className="err">
                {errors.email}
            </p>

            <label htmlFor="message" className="block font-bold">
                Message
            </label>
            <textarea
                id="message"
                name="message"
                rows="5"
                className="field"
                aria-describedby="message-error"
                aria-invalid={errors.message ? 'true' : undefined}
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <p id="message-error" className="err">
                {errors.message}
            </p>

            <button type="submit" className="btn btn-main">
                Send message
            </button>
            <p id="form-status" className="pt-2 font-bold" role="status">
                {status}
            </p>
        </form>
    );
}
