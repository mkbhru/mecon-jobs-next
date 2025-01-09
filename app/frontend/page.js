"use client";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { isMobile } from "react-device-detect";
import StripSection from "./StripSection";
import MessageCard from "../components/helper/MessageCard";

const FrontendPage = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

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
      const { year, month, day, filename } = fileInfo;
      // Open the file in a new tab with the extracted info
      window.open(`/api/download?file=${filename}.pdf`, "_blank");
    } else {
      alert("No file to view");
      console.log(pdf_url, "pdf_url");
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
      <div className="container mx-auto mt-8 min-h-screen">
        {sections.length > 10 ? 
        (
          sections.map((section) => (
            <div
              key={section.id}
              className="section mb-6 card p-6 bg-slate-200"
            >
              <h2 className="text-2xl font-semibold mb-2 text-blue-600">
                {section.name}
              </h2>
              <ul className="list-none space-y-2">
                {section.items.map((item, index) => (
                  <li
                    key={item.id}
                    className="card  shadow-md p-4 flex justify-between items-center bg-gray-300 rounded-xl min-h-4"
                  >
                    <div className="flex justify-between w-full items-center">
                      <h3 className="text-base p-0 font-semibold">
                        {item.content}
                      </h3>
                      {!isMobile && item.pdf_url && (
                        <div
                          onClick={() => handleViewInNewTab(item.pdf_url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary ml-4 btn-sm"
                        >
                          DOWNLOAD
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end">
                      {isMobile && item.pdf_url && (
                        <a
                          href={item.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline btn-primary ml-4 p-2 mt-4"
                        >
                          DOWNLOAD
                        </a>
                      )}
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
