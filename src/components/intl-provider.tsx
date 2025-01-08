"use client";

import * as React from "react";
import { NextIntlClientProvider } from "next-intl";
import { useAppStore } from "@/store/useAppStore";

export function IntlProvider({ children }: { children: React.ReactNode }) {
  const { locale } = useAppStore();
  const [messages, setMessages] = React.useState<Record<string, string> | null>(
    null
  );

  React.useEffect(() => {
    const loadMessages = async () => {
      try {
        const messages = await import(`../../messages/${locale}.json`);
        // const local = "pt-br";
        // const messages = await import(`../../messages/${local}.json`);
        console.log(messages, locale);
        setMessages(messages.default);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };
    loadMessages();
  }, [locale]);

  // Wait until messages are loaded
  if (!messages) {
    return null; // Or add a loader/spinner here
  }

  return (
    <NextIntlClientProvider locale={"pt-br"} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
