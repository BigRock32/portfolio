"use client";

import type {
  ChangeEventHandler,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import styles from "./[id]/page.module.css";

type FieldProps = {
  children: ReactNode;
  error?: string;
  label: string;
};

export function Field({ children, error, label }: FieldProps) {
  return (
    <label className={error ? styles.fieldInvalid : undefined}>
      <span>{label}</span>
      {children}
      {error ? <small className={styles.fieldError}>{error}</small> : null}
    </label>
  );
}

type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "onInput"> & {
  error?: string;
  label: string;
  onValueChange?: (value: string) => void;
};

export function TextInput({ error, label, onValueChange, ...props }: TextInputProps) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onValueChange?.(event.currentTarget.value);
  };

  return (
    <Field error={error} label={label}>
      <input {...props} onChange={handleChange} />
    </Field>
  );
}

type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "onInput"> & {
  error?: string;
  label: string;
  onValueChange?: (value: string) => void;
};

export function TextArea({ error, label, onValueChange, ...props }: TextAreaProps) {
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    onValueChange?.(event.currentTarget.value);
  };

  return (
    <Field error={error} label={label}>
      <textarea {...props} onChange={handleChange} />
    </Field>
  );
}

type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "onInput"> & {
  children: ReactNode;
  error?: string;
  label: string;
  onValueChange?: (value: string) => void;
};

export function SelectField({ children, error, label, onValueChange, ...props }: SelectFieldProps) {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    onValueChange?.(event.currentTarget.value);
  };

  return (
    <Field error={error} label={label}>
      <select {...props} onChange={handleChange}>
        {children}
      </select>
    </Field>
  );
}

type CheckboxFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function CheckboxField({ label, ...props }: CheckboxFieldProps) {
  return (
    <label className={styles.checkbox}>
      <input {...props} type="checkbox" />
      <span>{label}</span>
    </label>
  );
}
