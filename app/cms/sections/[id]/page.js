"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/app/components/Loading";
import Link from "next/link";

const SectionItemsPage = () => {
  const { id } = useParams(); // Use the `useParams` hook to get the `id`
  const [items, setItems] = useState([]);
  const [section, setSection] = useState({});
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen  p-4">
      {/* Section Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{section.name}</h1>
        <p className="text-gray-500 font-bold">
          Manage items for this section.
        </p>
      </div>
      <div className="mt-6 p-4">
        <Link
          href={`/cms/sections/${id}/items/new`}
          className="btn btn-primary"
        >
          Add New Advertisement
        </Link>
      </div>
      {/* Section Items */}
      {items.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.id} className="card card-bordered shadow-md">
              <div className="card-body flex flex-col justify-between">
                <h3 className="card-title text-lg">{item.content}</h3>
                <div className="flex flex-row justify-end">
                  {item.pdf_url && (
                    <div className="mt-auto mr-3">
                      <a
                        href={item.pdf_url}
                        download
                        className="btn btn-neutral "
                      >
                        PDF
                      </a>
                    </div>
                  )}
                  <div className=" mt-auto ">
                    <Link
                      href={`/cms/sections/${id}/items/${item.id}/edit`}
                      className="btn bg-green-500 "
                    >
                      Edit Advertisement
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No items found for this section.</p>
      )}
    </div>
  );
};

export default SectionItemsPage;
