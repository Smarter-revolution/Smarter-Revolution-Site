"use client";

import { FormEvent, useState } from "react";
import type { BookingQuestion, MeetingTypeConfig } from "@/lib/calBookingConfig";

type BookingFormProps = {
  eventType: MeetingTypeConfig;
  selectedSlot: string;
  timeZone: string;
  onSuccess: (booking: unknown) => void;
};

type ResponseValue = string | string[];

const inputBase =
  "w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white";

const buildInitialResponses = (questions: BookingQuestion[]) =>
  questions.reduce<Record<string, ResponseValue>>((acc, question) => {
    acc[question.id] = question.type === "multiselect" ? [] : "";
    return acc;
  }, {});

export default function BookingForm({
  eventType,
  selectedSlot,
  timeZone,
  onSuccess,
}: BookingFormProps) {
  const [responses, setResponses] = useState<Record<string, ResponseValue>>(() =>
    buildInitialResponses(eventType.questions)
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateResponse = (id: string, value: ResponseValue) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        eventTypeId: eventType.eventTypeId,
        eventTypeSlug: eventType.calEventTypeSlug,
        start: selectedSlot,
        responses,
        timeZone,
        language: "en",
        username: eventType.hostUsername,
      };

      const response = await fetch("/api/cal/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error ?? "Booking failed");
      }

      onSuccess(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-white">Your details</h3>
        <p className="text-sm text-gray-400">
          We&apos;ll confirm your booking via email.
        </p>
      </div>

      <div className="grid gap-5">
        {eventType.questions.map((question) => {
          const value = responses[question.id];

          if (question.type === "textarea") {
            return (
              <label key={question.id} className="space-y-2 text-sm">
                <span className="text-gray-300">
                  {question.label}
                  {question.required ? " *" : ""}
                </span>
                <textarea
                  required={question.required}
                  value={value as string}
                  onChange={(event) =>
                    updateResponse(question.id, event.target.value)
                  }
                  placeholder={question.placeholder}
                  rows={4}
                  className={`${inputBase} resize-none`}
                />
              </label>
            );
          }

          if (question.type === "select") {
            return (
              <label key={question.id} className="space-y-2 text-sm">
                <span className="text-gray-300">
                  {question.label}
                  {question.required ? " *" : ""}
                </span>
                <select
                  required={question.required}
                  value={value as string}
                  onChange={(event) =>
                    updateResponse(question.id, event.target.value)
                  }
                  className={inputBase}
                >
                  <option value="">Select an option</option>
                  {question.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            );
          }

          if (question.type === "multiselect") {
            return (
              <fieldset key={question.id} className="space-y-2 text-sm">
                <legend className="text-gray-300">
                  {question.label}
                  {question.required ? " *" : ""}
                </legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {question.options?.map((option) => {
                    const values = Array.isArray(value) ? value : [];
                    const checked = values.includes(option);
                    return (
                      <label
                        key={option}
                        className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-gray-300"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(event) => {
                            const next = event.target.checked
                              ? [...values, option]
                              : values.filter((item) => item !== option);
                            updateResponse(question.id, next);
                          }}
                          className="accent-red-500"
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            );
          }

          return (
            <label key={question.id} className="space-y-2 text-sm">
              <span className="text-gray-300">
                {question.label}
                {question.required ? " *" : ""}
              </span>
              <input
                required={question.required}
                type={question.type === "email" ? "email" : "text"}
                value={value as string}
                onChange={(event) =>
                  updateResponse(question.id, event.target.value)
                }
                placeholder={question.placeholder}
                className={inputBase}
              />
            </label>
          );
        })}
      </div>

      {error ? <div className="text-sm text-red-400">{error}</div> : null}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Booking..." : "Confirm booking"}
      </button>
    </form>
  );
}
