
"use client";

import { useEffect, useState } from "react";

interface CurrentDateProps {
  className?: string;
}

export default function CurrentDate({
  className = "",
}: CurrentDateProps) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const formatted = new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
      }).format(new Date());

      setFormattedDate(formatted);
    };

    updateDate();
  }, []);

  return (
    <time className={className}>
      {formattedDate || "তারিখ লোড হচ্ছে..."}
    </time>
  );
}
