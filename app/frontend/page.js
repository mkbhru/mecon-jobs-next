"use client";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { isMobile } from "react-device-detect";

const FrontendPage = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="container mx-auto mt-8">
      {sections.length > 0 ? (
        sections.map((section) => (
          <div key={section.id} className="section mb-6 card p-4 bg-slate-200">
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
                      <a
                        href={item.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-primary ml-4"
                      >
                        DOWNLOAD
                      </a>
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
  );
};

export default FrontendPage;
