"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/app/components/Loading";
import Link from "next/link";
import MessageCard from "@/app/components/helper/MessageCard";

const SectionItemsPage = () => {
  const { id } = useParams(); // Use the `useParams` hook to get the `id`
  const [items, setItems] = useState([]);
  const [section, setSection] = useState({});
  const [loading, setLoading] = useState(true);

  const handleViewInNewTab = (file) => {
    if (file) {
      // Open the file in a new tab with the extracted info
      window.open(`/api/download?file=${file}`, "_blank");
    } else {
      alert("No file to view");
    }
  };

  useEffect(() => {
    if (!id) return;

    // Fetch section details and items
    const fetchSectionData = async () => {
      try {
        // Fetch section details
        const sectionResponse = await fetch(`/api/cms/sections/${id}`);
        if (!sectionResponse.ok) {
          throw new Error("Failed to fetch section details");
        }
        const sectionData = await sectionResponse.json();

        // Fetch items for the section
        const itemsResponse = await fetch(`/api/cms/sections/${id}/items`);
        if (!itemsResponse.ok) {
          throw new Error("Failed to fetch section items");
        }
        const itemsData = await itemsResponse.json();

        setSection(sectionData);
        setItems(itemsData);
      } catch (error) {
        console.error("Error loading section data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSectionData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  // Filter visible and hidden items
  const visibleItems = items.filter((item) => item.is_visible);
  const hiddenItems = items.filter((item) => !item.is_visible);

  return (
    <div className="min-h-screen p-4 bg-base-300 rounded-lg">
      {/* Section Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{section.name}</h1>
        <p className="text-gray-500 font-bold">
          Manage items for this Advertisement
        </p>
      </div>
      <div className="mt-6 p-4">
        <Link
          href={`/cms/sections/${id}/items/new`}
          className="btn btn-primary font-bold"
        >
          Create New Notification/Corrigendum/etc
        </Link>
      </div>

      {/* Visible Items Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Visible Items</h2>
        {visibleItems.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item) => (
              <li key={item.id} className="card card-bordered shadow-md">
                <div className="card-body flex flex-col justify-between">
                  <h3 className="card-title text-lg">{item.content}</h3>
                  <div className="flex flex-row justify-end">
                    {item.pdf_url && (
                      <Link
                        href={`/cms/sections/${id}/items/${item.id}/edit`}
                        className="mt-auto mr-3 btn btn-neutral bg-black rounded-xl"
                      >
                        Visible
                      </Link>
                    )}
                    {item.pdf_url && (
                      <div
                        onClick={() =>
                          handleViewInNewTab(item.pdf_url.split("/").pop())
                        }
                        className="mt-auto mr-3 btn btn-secondary bg-blue-700 rounded-xl"
                      >
                        PDF
                      </div>
                    )}
                    <div className="mt-auto">
                      <Link
                        href={`/cms/sections/${id}/items/${item.id}/edit`}
                        className="btn bg-green-500 rounded-xl text-white"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <h1 className="font-bold">Created At: </h1>
                    {new Date(item.created_at)
                      .toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })
                      .replace(",", "")
                      .replace(" ", "-")
                      .replace(" ", "-")
                      .replace("at", " ")}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <MessageCard>No visible items found.</MessageCard>
        )}
      </div>

      {/* Hidden Items Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Hidden Items</h2>
        {hiddenItems.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hiddenItems.map((item) => (
              <li key={item.id} className="card card-bordered shadow-md">
                <div className="card-body flex flex-col justify-between">
                  <h3 className="card-title text-lg">{item.content}</h3>
                  <div className="flex flex-row justify-end">
                    {item.pdf_url && (
                      <Link
                        href={`/cms/sections/${id}/items/${item.id}/edit`}
                        className="mt-auto mr-3 btn btn-neutral bg-gray-500 rounded-xl"
                      >
                        Hidden
                      </Link>
                    )}
                    {item.pdf_url && (
                      <div
                        onClick={() =>
                          handleViewInNewTab(item.pdf_url.split("/").pop())
                        }
                        className="mt-auto mr-3 btn btn-secondary bg-blue-700 rounded-xl"
                      >
                        PDF
                      </div>
                    )}
                    <div className="mt-auto">
                      <Link
                        href={`/cms/sections/${id}/items/${item.id}/edit`}
                        className="btn bg-green-500 rounded-xl text-white"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <h1 className="font-bold">Created At: </h1>
                    {new Date(item.created_at)
                      .toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })
                      .replace(",", "")
                      .replace(" ", "-")
                      .replace(" ", "-")
                      .replace("at", " ")}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <MessageCard>No hidden items found.</MessageCard>
        )}
      </div>
    </div>
  );
};

export default SectionItemsPage;
