'use client';

import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';

type FormState = {
  name: string;
  email: string;
  date: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_STATE: FormState = { name: '', email: '', date: '', message: '' };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildWhatsAppUrl(state: FormState) {
  const text =
    `Olá Ivan! Meu nome é ${state.name}.\n` +
    `E-mail: ${state.email}\n` +
    (state.date ? `Data prevista do casamento: ${state.date}\n` : '') +
    `Mensagem: ${state.message}`;

  return `https://wa.me/5511953025177?text=${encodeURIComponent(text)}`;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Informe seu nome.';
    if (!form.email.trim()) nextErrors.email = 'Informe seu e-mail.';
    else if (!EMAIL_REGEX.test(form.email)) nextErrors.email = 'Informe um e-mail válido.';
    if (!form.message.trim()) nextErrors.message = 'Conte um pouco sobre o seu casamento.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
    window.open(buildWhatsAppUrl(form), '_blank', 'noopener,noreferrer');
  };

  const handleChange = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      noValidate
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
      aria-label="Formulário de contato"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-body text-sm font-medium text-cream/80">
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={handleChange('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className="rounded-xl border border-cream/20 bg-cream/5 px-4 py-3 font-body text-cream placeholder:text-cream/40 focus-visible-ring"
          placeholder="Seu nome completo"
        />
        {errors.name && (
          <p id="name-error" className="font-body text-xs text-brown-light">
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-body text-sm font-medium text-cream/80">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className="rounded-xl border border-cream/20 bg-cream/5 px-4 py-3 font-body text-cream placeholder:text-cream/40 focus-visible-ring"
          placeholder="seuemail@exemplo.com"
        />
        {errors.email && (
          <p id="email-error" className="font-body text-xs text-brown-light">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <label htmlFor="date" className="font-body text-sm font-medium text-cream/80">
          Data prevista do casamento (opcional)
        </label>
        <input
          id="date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange('date')}
          className="rounded-xl border border-cream/20 bg-cream/5 px-4 py-3 font-body text-cream placeholder:text-cream/40 focus-visible-ring"
        />
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <label htmlFor="message" className="font-body text-sm font-medium text-cream/80">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className="resize-none rounded-xl border border-cream/20 bg-cream/5 px-4 py-3 font-body text-cream placeholder:text-cream/40 focus-visible-ring"
          placeholder="Conte um pouco sobre o seu casamento e o que você procura..."
        />
        {errors.message && (
          <p id="message-error" className="font-body text-xs text-brown-light">
            {errors.message}
          </p>
        )}
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          data-cursor-hover
          className="w-full rounded-full bg-blue-accent px-8 py-4 font-body text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:scale-[1.02] focus-visible-ring md:w-auto"
        >
          Enviar pelo WhatsApp
        </button>
        {submitted && (
          <p role="status" className="mt-4 font-body text-sm text-brown-light">
            Obrigado! Abrimos o WhatsApp para você concluir o envio da sua mensagem.
          </p>
        )}
      </div>
    </motion.form>
  );
}
