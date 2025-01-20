"use client";
import { useState, useEffect } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import withAuth from "@/utils/withAuth";

export default function SortItems() {
  const { id } = useParams();
  const router = useRouter();

  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(`/api/cms/sections/${id}/sortget`); // Replace with your API endpoint
        const data = await response.json();
        // toast.success(`${JSON.stringify(data)}`);
        // Validate the response data
        if (!Array.isArray(data)) {
          console.error("Invalid data format: Expected an array.");
          return;
        }

        // Ensure sort_order exists and sort by it
        const sortedSections = data
          .filter((item) => typeof item.sort_order === "number")
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((section, index) => ({ ...section, originalIndex: index + 1 })); // Add a static index

        setSections(sortedSections);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };
    fetchSections();
  }, [id]);

  const handleSort = (index, direction) => {
    const updatedSections = [...sections];

    if (direction === "up" && index > 0) {
      // Swap the current section with the one above it
      const currentSection = updatedSections[index];
      const aboveSection = updatedSections[index - 1];

      // Swap their sort_order values
      [currentSection.sort_order, aboveSection.sort_order] = [
        aboveSection.sort_order,
        currentSection.sort_order,
      ];

      // Swap their positions in the array
      updatedSections[index] = aboveSection;
      updatedSections[index - 1] = currentSection;
    } else if (direction === "down" && index < sections.length - 1) {
      // Swap the current section with the one below it
      const currentSection = updatedSections[index];
      const belowSection = updatedSections[index + 1];

      // Swap their sort_order values
      [currentSection.sort_order, belowSection.sort_order] = [
        belowSection.sort_order,
        currentSection.sort_order,
      ];

      // Swap their positions in the array
      updatedSections[index] = belowSection;
      updatedSections[index + 1] = currentSection;
    }

    setSections(updatedSections);
  };

  const saveSortOrder = async () => {
    try {
      // Map sections to extract only the necessary fields for the API
      const sectionsArray = sections.map((section) => ({
        id: section.id, // Assuming `id` is needed to identify the section
        sort_order: section.sort_order, // Updated sort order
      }));

      const response = await fetch(`/api/cms/sections/${id}/save-sort`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sectionsArray }),
      });

      if (response.ok) {
        toast.success("New Order saved successfully.");
        router.back(); // Redirect to refresh the page
      } else {
        throw new Error("Failed to save sort order.");
      }
    } catch (error) {
      console.error("Error saving sort order:", error);
      alert("Failed to save sort order.");
    }
  };

  return withAuth(
    <div className="min-h-screen bg-base-200 p-4 rounded-md">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Sort Advertisements</h1>
        <div className="flex flex-row-reverse mb-4">
          <button
            className="btn btn-primary ml-4 mb-2"
            onClick={saveSortOrder}
            disabled={!sections.length}
          >
            Save Sort Order
          </button>
          <button
            className="btn btn-primary ml-4 mb-2"
            onClick={router.back}
            disabled={!sections.length}
          >
            Cancel
          </button>
        </div>

        <div className="flex gap-4 flex-col">
          <AnimatePresence>
            {sections
              .slice()
              .reverse()
              .map((section, reversedIndex) => {
                // Calculate the original index based on the reversedIndex
                const originalIndex = sections.length - 1 - reversedIndex;

                return (
                  <motion.div
                    key={section.id}
                    className={`card shadow-lg p-4 border 
            ${
              section.is_visible
                ? "bg-green-100 border-green-300 "
                : "bg-red-100 border-red-300"
            }`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    layout
                  >
                    <div className="flex justify-between">
                      <div className="flex">
                        <p className="font-bold text-xl">
                          {/* {reversedIndex + 1}.&nbsp;{" "} */}
                          {/* {originalIndex + 1}.&nbsp; */}
                          {sections.length - section.originalIndex + 1}.&nbsp;
                          {section.id} &nbsp;
                          {section.sort_order} &nbsp;
                          {/* Display reverse order */}
                        </p>
                        <h2 className="text-xl font-semibold">
                          {section.content}
                        </h2>
                      </div>

                      <div className="m-4 gap-2 flex">
                        <button
                          className="btn btn-primary btn-sm ml-2"
                          onClick={() => handleSort(originalIndex, "up")} // Use the original index
                          disabled={originalIndex === 0} // Disable based on the original index
                        >
                          <FaArrowDown />
                        </button>
                        <button
                          className="btn btn-secondary btn-sm ml-2"
                          onClick={() => handleSort(originalIndex, "down")} // Use the original index
                          disabled={originalIndex === sections.length - 1} // Disable based on the original index
                        >
                          <FaArrowUp />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
