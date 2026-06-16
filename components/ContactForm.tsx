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

interface Props {
  variant?: 'light' | 'dark';
}

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

export default function ContactForm({ variant = 'light' }: Props) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const isDark = variant === 'dark';

  const LABEL = isDark
    ? 'font-body text-sm font-semibold text-cream'
    : 'font-body text-sm font-semibold text-blue-deep';

  const INPUT = isDark
    ? 'w-full rounded-xl border border-cream/20 bg-cream/5 px-4 py-3 font-body text-sm text-cream placeholder:text-cream/50 focus:border-blue-accent focus:outline-none focus:ring-2 focus:ring-blue-accent/20'
    : 'w-full rounded-xl border border-blue-deep/30 bg-blue-deep/5 px-4 py-3 font-body text-sm text-blue-deep placeholder:text-blue-deep/50 focus:border-blue-accent focus:outline-none focus:ring-2 focus:ring-blue-accent/20';

  const ERROR = isDark
    ? 'font-body text-xs font-medium text-brown-light'
    : 'font-body text-xs font-medium text-red-600';

  const OPTIONAL = isDark ? 'font-normal text-cream/60' : 'font-normal text-blue-deep/60';

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
      className="grid grid-cols-1 gap-5 md:grid-cols-2"
      aria-label="Formulário de contato"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className={LABEL}>Nome</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={handleChange('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={INPUT}
          placeholder="Seu nome completo"
        />
        {errors.name && <p id="name-error" className={ERROR}>{errors.name}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className={LABEL}>E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={INPUT}
          placeholder="seuemail@exemplo.com"
        />
        {errors.email && <p id="email-error" className={ERROR}>{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-1.5 md:col-span-2">
        <label htmlFor="date" className={LABEL}>
          Data prevista do casamento <span className={OPTIONAL}>(opcional)</span>
        </label>
        <input
          id="date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange('date')}
          className={INPUT}
        />
      </div>

      <div className="flex flex-col gap-1.5 md:col-span-2">
        <label htmlFor="message" className={LABEL}>Mensagem</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${INPUT} resize-none`}
          placeholder="Conte um pouco sobre o seu casamento e o que você procura..."
        />
        {errors.message && <p id="message-error" className={ERROR}>{errors.message}</p>}
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
          <p role="status" className={`mt-4 font-body text-sm font-medium ${isDark ? 'text-brown-light' : 'text-blue-deep'}`}>
            Obrigado! Abrimos o WhatsApp para você concluir o envio da sua mensagem.
          </p>
        )}
      </div>
    </motion.form>
  );
}
