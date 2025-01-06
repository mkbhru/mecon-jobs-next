"use client";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { isMobile } from "react-device-detect";
import StripSection from "./StripSection";

const FrontendPage = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const extractFileInfo = (pdf_url) => {
    const regex = /\/(\d{4})\/(\d{2})\/(\d{2})\/(\d{14}_[^\/]+\.pdf)/;
    const matches = pdf_url.match(regex);
    if (matches) {
      return {
        year: matches[1],
        month: matches[2],
        day: matches[3],
        filename: matches[4],
      };
    }
    return null;
  };

  const handleViewInNewTab = (item_id, pdf_url) => {
    const fileInfo = extractFileInfo(pdf_url);
    if (fileInfo) {
      const { year, month, day, filename } = fileInfo;
      // Open the file in a new tab with the extracted info
      window.open(
        `/api/download?file=${filename}`,
        "_blank"
      );
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
      <StripSection />
      <div className="container mx-auto mt-8">
        {sections.length > 0 ? (
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
                    className="card shadow-md p-4 flex justify-between items-center bg-gray-300"
                  >
                    <div className="flex justify-between w-full items-center">
                      <h3 className="text-xl font-semibold">{item.content}</h3>
                      {!isMobile && item.pdf_url && (
                        <div
                          onClick={() =>
                            handleViewInNewTab(item.id, item.pdf_url)
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline btn-primary ml-4"
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
          <p>No sections available.</p>
        )}
      </div>
    </>
  );
};

export default FrontendPage;
