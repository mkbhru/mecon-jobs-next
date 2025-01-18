"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FraudulentNotice = () => {
  const [isVisible, setIsVisible] = useState(true);
//final
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-red-50 rounded-lg shadow-lg p-6 w-full max-w-sm 2xl:max-w-xl relative  "
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 text-red-700 font-extrabold text-xl hover:text-gray-600 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 "
              aria-label="Close"
            >
              ✕
            </button>
            <h2 className="text-2xl 2xl:text-3xl font-bold text-red-600 mb-4 text-center">
              Employment Fraud Notice
            </h2>
            <div className="space-y-3 text-gray-700 text-xs 2xl:text-lg bg-inherit">
              <p>
                It has been noted that there have been fraudulent schemes
                related to career/business opportunities that have been
                initiated by individuals and/or organizations contacting people
                while falsely claiming to represent <strong>MECON Limited</strong>.
              </p>
              <p>
                Potential incidents could occur through websites, social media
                accounts, job posting sites, emails/texts, etc. In these
                incidents, MECON Limited name and company details are used
                without permission to establish false credibility and
                authenticity.
              </p>
              <p>
                Legitimate information regarding career opportunities with MECON
                Limited can always be found on our website at{" "}
                <a
                  href="http://www.meconlimited.co.in/Jobs.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  http://www.meconlimited.co.in/Jobs.aspx
                </a>
              </p>
              <p>
                It is strongly recommended not to engage or respond to any
                suspicious or fraudulent activities. If you believe you are a
                victim of fraud, it is advised to contact local law enforcement
                immediately.
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setIsVisible(false)}
                className="btn btn-sm btn-info  px-6 py-2 rounded-md hover:bg-blue-800"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FraudulentNotice;

