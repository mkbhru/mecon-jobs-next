"use client";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import StripSection from "./StripSection";
import MessageCard from "../components/helper/MessageCard";

const FrontendPage = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  function toSentenceCase(text) {
    return text
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (char) => char.toUpperCase());
  }

  function toTitleCase(text) {
    return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  const extractFileInfo = (pdf_url) => {
    const parts = pdf_url.split("/");
    const filenameWithExt = parts.pop();
    const [year, month, day] = parts.slice(-3);

    if (year && month && day && filenameWithExt.endsWith(".pdf")) {
      const filename = filenameWithExt.slice(0, -4);
      return { year, month, day, filename };
    }

    console.log("No match");
    return null;
  };

  const handleViewInNewTab = (pdf_url) => {
    const fileInfo = extractFileInfo(pdf_url);
    if (fileInfo) {
      const { filename } = fileInfo;
      window.open(`/api/download?file=${filename}.pdf`, "_blank");
    } else {
      alert("No file to view");
    }
  };

  useEffect(() => {
    // Fetch the sections data from the API
    const fetchSections = async () => {
      try {
        const response = await fetch("/api/frontend/sections");
        const data = await response.json();
        setSections(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sections:", error);
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {sections.length > 0 && <StripSection />}
      <div className="container mx-auto mt-8 min-h-screen p-4">
        {sections.length > 0 ? (
          sections.map((section) => (
            <div
              key={section.id}
              className="section mb-6 card p-4 md:p-6 bg-slate-200 rounded-lg"
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-2 text-blue-600">
                {toTitleCase(`${section.name}`)}
              </h2>
              <ul className="list-none space-y-4">
                {section.items.map((item) => (
                  <li
                    key={item.id}
                    className="card shadow-md p-4 bg-gray-300 rounded-xl"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-center w-full space-y-2 md:space-y-0">
                      <h1 className="text-sm md:text-base font-semibold text-gray-800">
                        {toSentenceCase(`${item.content}`)}
                      </h1>
                      <div className="flex">
                         {item.id === 1021 && (
                        <a
                          href={"https://recruitment.meconlimited.co.in/Account/Login"}
                          target="_blank"
                          className="btn btn-sm btn-secondary text-sm ml-2"
                        >
                          Apply Online
                        </a>
                      )}
                      {item.pdf_url && (
                        <button
                          onClick={() => handleViewInNewTab(item.pdf_url)}
                          className="btn btn-sm btn-primary text-sm ml-2"
                        >
                          DOWNLOAD
                        </button>
                      )}
                      </div>
                     
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <MessageCard>
            <h3 className="text-center text-4xl font-medium">
              Please refresh page again...💭
            </h3>
          </MessageCard>
        )}
      </div>
    </>
  );
};

export default FrontendPage;
