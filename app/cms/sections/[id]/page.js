"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/app/components/Loading";
import Link from "next/link";
import MessageCard from "@/app/components/helper/MessageCard";
import FormattedDate from "@/app/components/helper/FormattedDate";

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
    <div className="min-h-screen p-4 bg-base-300  rounded-lg">
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
          Create New Item (Notification/Corrigendum/etc)
        </Link>
      </div>

      {/* Visible Items Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Visible Items</h2>
        {visibleItems.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item) => (
              <li key={item.id} className="card card-bordered shadow-md bg-green-100">
                <div className="card-body flex flex-col justify-between">
                  <h3 className="card-title text-lg">{item.content}</h3>
                  <div className="flex flex-row justify-end mt-6">
                    
                    {item.pdf_url && (
                      <div
                        onClick={() =>
                          handleViewInNewTab(item.pdf_url.split("/").pop())
                        }
                        className="btn btn-primary btn-sm mr-4"
                      >
                        PDF
                      </div>
                    )}
                    <div className="mt-auto">
                      <Link
                        href={`/cms/sections/${id}/items/${item.id}/edit`}
                        className="btn btn-primary btn-sm"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                  <FormattedDate date={item.created_at} label="Created At" />
                  <div className=" text-sm text-green-500 text-center font-bold flex justify-end">
                    Status: Visible
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <MessageCard>No visible items</MessageCard>
        )}
      </div>

      {/* Hidden Items Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Hidden Items</h2>
        {hiddenItems.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hiddenItems.map((item) => (
              <li key={item.id} className="card card-bordered shadow-md bg-red-100">
                <div className="card-body flex flex-col justify-between">
                  <h3 className="card-title text-lg">{item.content}</h3>
                  <div className="flex flex-row justify-end mt-6">
                    {/* {item.pdf_url && (
                      <Link
                        href={`/cms/sections/${id}/items/${item.id}/edit`}
                        className="mt-auto mr-3 btn btn-neutral bg-gray-500 rounded-xl"
                      >
                        Hidden
                      </Link>
                    )} */}
                    {item.pdf_url && (
                      <div
                        onClick={() =>
                          handleViewInNewTab(item.pdf_url.split("/").pop())
                        }
                        className="btn btn-primary btn-sm mr-4"
                      >
                        PDF
                      </div>
                    )}
                    <div className="mt-auto">
                      <Link
                        href={`/cms/sections/${id}/items/${item.id}/edit`}
                        className="btn btn-primary btn-sm"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                  <FormattedDate date={item.created_at} label="Created At" />
                  <div className=" text-sm text-red-500 text-center font-bold flex justify-end">
                    Status: Hidden
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <MessageCard>No hidden items</MessageCard>
        )}
      </div>
    </div>
  );
};

export default SectionItemsPage;
