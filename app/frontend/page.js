"use client";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import MessageCard from "../components/helper/MessageCard";
import Image from "next/image";
import StripSection from "./StripSection";
import { toast } from "react-toastify";

const FrontendPage = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  const toSentenceCase = (text) => {
    return text
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (char) => char.toUpperCase());
  };

  const isGifVisible = (start_date, end_date) => {
    const end = new Date(end_date);
    return currentDate <= end;
  };

  useEffect(() => {
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
    setCurrentDate(new Date());
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <StripSection />
      <div className="container mx-auto mt-8 p-4 min-h-screen bg-gray-100">
        {sections.length > 0 ? (
          sections.map((section) => (
            <div
              key={section.id}
              className="border-2 border-blue-700 rounded-md mb-5 p-3 bg-white shadow-lg"
            >
              <h2 className="text-lg font-bold text-blue-800 mb-1">
                {toSentenceCase(section.name)}
              </h2>
              <ul className="space-y-0">
                {section.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-row justify-between items-center space-y-0 p-1 border-b last:border-b-0"
                  >
                    <div className="flex space-x-2">
                      <div className=" text-sm font-semibold text-gray-700">
                        {toSentenceCase(item.content)}

                        {isGifVisible(item.start_date, item.end_date) && (
                          <Image
                            src="/new.gif"
                            alt="New"
                            width={24}
                            height={24}
                            className="inline-block ml-2"
                          />
                        )}
                      </div>
                    </div>
                    <div className="ml-2">
                      {isGifVisible(item.start_date, item.end_date) &&
                        item.apply_online && (
                          <button
                          disabled={!isGifVisible(item.start_date, item.end_date)}
                            onClick={() => window.open(item.apply_online, "_blank")}
                            className="text-xs btn btn-primary bg-pink-500 border-pink-500 text-white btn-xs hover:bg-white hover:text-pink-500 transition duration-200 ease-in-out transform hover:scale-105 hover:border-pink-500 "
                          >
                            Apply Online
                          </button>
                        )}
                      {item.pdf_url && (
                        <button
                          onClick={() => window.open(item.pdf_url, "_blank")}
                          className="text-xs btn btn-primary bg-blue-700 text-white btn-xs hover:bg-white hover:text-blue-700 transition duration-200 ease-in-out transform hover:scale-105"
                        >
                          Download
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <MessageCard>
            <h3 className="text-center text-xl font-medium text-gray-700">
              No sections available. Please refresh the page...💭
            </h3>
          </MessageCard>
        )}
      </div>
    </div>
  );
};

export default FrontendPage;
