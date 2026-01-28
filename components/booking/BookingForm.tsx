"use client";

import { FormEvent, useState } from "react";
import type { BookingQuestion, MeetingTypeConfig } from "@/lib/calBookingConfig";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";

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
        // Include hostUsernames for combined meetings
        ...(eventType.hostUsernames &&
          eventType.hostUsernames.length > 1 && {
            hostUsernames: eventType.hostUsernames,
          }),
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
              <div key={question.id} className="space-y-2 text-sm">
                <label className="text-gray-300">
                  {question.label}
                  {question.required ? " *" : ""}
                </label>
                <Select
                  value={(value as string) || undefined}
                  onValueChange={(newValue) => updateResponse(question.id, newValue)}
                  required={question.required}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {question.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* Hidden input for form validation */}
                {question.required && (
                  <input
                    type="hidden"
                    required
                    value={value as string}
                    onChange={() => {}}
                  />
                )}
              </div>
            );
          }

          if (question.type === "multiselect") {
            const values = Array.isArray(value) ? value : [];
            return (
              <fieldset key={question.id} className="space-y-3 text-sm">
                <legend className="text-gray-300 mb-1">
                  {question.label}
                  {question.required ? " *" : ""}
                </legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {question.options?.map((option) => {
                    const checked = values.includes(option);
                    return (
                      <label
                        key={option}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-gray-300 cursor-pointer transition-all duration-200 hover:border-white/20 hover:bg-black/60 has-[:checked]:border-red-500/30 has-[:checked]:bg-red-500/10"
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(isChecked) => {
                            const next = isChecked
                              ? [...values, option]
                              : values.filter((item) => item !== option);
                            updateResponse(question.id, next);
                          }}
                        />
                        <span className="flex-1">{option}</span>
                      </label>
                    );
                  })}
                </div>
                {/* Hidden input for form validation */}
                {question.required && values.length === 0 && (
                  <input
                    type="hidden"
                    required
                    value=""
                    onChange={() => {}}
                  />
                )}
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
