
import React from "react";

const Footer = () => {
  return (
    <footer className="container mx-auto px-4">
      <div className="grid grid-cols-1 items-center gap-3 py-6 text-sm text-gray-500 md:grid-cols-2 md:justify-between">
        <p className="text-center md:text-left">
          বাজার দর - প্রয়োজনীয় পণ্যের দাম এক নজরে
        </p>

        <p className="text-center md:text-right">
          সকল দাম সম্ভাব্য; বাজার পরিস্থিতির উপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
