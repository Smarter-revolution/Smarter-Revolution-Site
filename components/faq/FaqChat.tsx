"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function FaqChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm here to answer questions about Smarter Revolution's services. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showFormForMessage, setShowFormForMessage] = useState<number | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Check if message contains call scheduling offer
  const shouldShowForm = (content: string): boolean => {
    const lowerContent = content.toLowerCase();
    return (
      lowerContent.includes("schedule a discovery call") ||
      lowerContent.includes("schedule a call")
    );
  };

  // Check messages for call scheduling offers when they update
  useEffect(() => {
    messages.forEach((message, index) => {
      if (
        message.role === "assistant" &&
        message.content &&
        shouldShowForm(message.content) &&
        showFormForMessage !== index &&
        formSubmitted !== index
      ) {
        setShowFormForMessage(index);
      }
    });
  }, [messages, showFormForMessage, formSubmitted]);

  const handleFormSubmit = async (e: React.FormEvent, messageIndex: number) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          conversationHistory: messages,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setFormSubmitted(messageIndex);
      setShowFormForMessage(null);
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Sorry, there was an error submitting your information. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Add user message immediately
    const newUserMessage: Message = {
      role: "user",
      content: userMessage,
    };
    setMessages((prev) => [...prev, newUserMessage]);

    // Add placeholder assistant message for streaming
    const assistantMessageId = messages.length;
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      // Stream the response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No reader available");
      }

      let accumulatedContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedContent += chunk;

        // Update the assistant message with accumulated content
        setMessages((prev) => {
          const updated = [...prev];
          updated[assistantMessageId + 1] = {
            role: "assistant",
            content: accumulatedContent,
          };
          return updated;
        });
      }
    } catch (error) {
      console.error("Error fetching chat response:", error);
      // Update the assistant message with error
      setMessages((prev) => {
        const updated = [...prev];
        updated[assistantMessageId + 1] = {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting. Please try again or contact us directly.",
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-[600px] mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-[500px]">
        {/* Messages Container */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
        >
          {messages.map((message, index) => (
            <div key={index} className="space-y-2">
              <div
                className={`flex items-start gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-slate-800 text-white"
                      : "bg-slate-100 text-slate-900"
                  }`}
                >
                  {message.content ? (
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                  ) : (
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    </div>
                  )}
                </div>
                {message.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Lead Capture Form */}
              {message.role === "assistant" &&
                showFormForMessage === index &&
                formSubmitted !== index && (
                  <div className="ml-11 mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <form
                      onSubmit={(e) => handleFormSubmit(e, index)}
                      className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm space-y-3"
                    >
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor={`name-${index}`}
                            className="block text-xs font-medium text-slate-700 mb-1"
                          >
                            Name *
                          </label>
                          <input
                            type="text"
                            id={`name-${index}`}
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent"
                            placeholder="Your name"
                            disabled={isSubmitting}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`email-${index}`}
                            className="block text-xs font-medium text-slate-700 mb-1"
                          >
                            Email *
                          </label>
                          <input
                            type="email"
                            id={`email-${index}`}
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent"
                            placeholder="your@email.com"
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor={`phone-${index}`}
                          className="block text-xs font-medium text-slate-700 mb-1"
                        >
                          Phone (optional)
                        </label>
                        <input
                          type="tel"
                          id={`phone-${index}`}
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent"
                          placeholder="(555) 123-4567"
                          disabled={isSubmitting}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting || !formData.name.trim() || !formData.email.trim()}
                        className="w-full px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        {isSubmitting ? "Submitting..." : "Schedule My Call"}
                      </button>
                    </form>
                  </div>
                )}

              {/* Success Message */}
              {message.role === "assistant" && formSubmitted === index && (
                <div className="ml-11 mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800">
                      Thanks! Our team will reach out within 24 hours.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-gray-200 p-4 bg-white"
        >
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              disabled={isLoading}
              rows={1}
              className="flex-1 resize-none rounded-lg border border-gray-300 px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              style={{
                minHeight: "44px",
                maxHeight: "120px",
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </form>
      </div>
    </div>
  );
}

