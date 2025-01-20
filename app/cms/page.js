
'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "../components/Loading";
import FormattedDate from "../components/helper/FormattedDate";
import withAuth from "@/utils/withAuth";

const CmsDashboard = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      const response = await fetch("/api/cms/sections");
      const data = await response.json();
      setSections(data);
      setLoading(false);
    };

    fetchSections();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const visibleSections = sections.filter((section) => section.is_visible);
  const hiddenSections = sections.filter((section) => !section.is_visible);

  return (
    <div className="card min-h-screen bg-base-200 shadow-lg rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">
        Manage Advertisements - Dashboard
      </h2>
      <div className="mt-6 p-4">
        <Link href="/cms/sections/new" className="btn btn-primary">
          Create New Advertisement/Notice
        </Link>
        <Link
          href="/cms/sections/sort-sections"
          className="btn btn-primary ml-4"
        >
          Change Order
        </Link>
      </div>
      {/* Visible Sections */}
      <h3 className="text-xl font-bold mt-6 mb-4">
        Visible Advertisements/Notices
      </h3>
      {visibleSections.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleSections.map((section) => (
            <li
              key={section.id}
              className="card card-bordered bg-green-100 shadow-md"
            >
              <div className="card-body flex flex-col ">
                <h3 className="card-title text-lg">{section.name}</h3>
                <div className="flex flex-col justify-end mt-auto  ">
                  <div className="mt-auto flex justify-end">
                    <Link
                      href={`/cms/sections/${section.id}/edit`}
                      className="btn btn-primary btn-sm mr-2"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/cms/sections/${section.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Manage
                    </Link>
                  </div>
                  <FormattedDate date={section.created_at} label="Created At" />
                  <div className="mt-2 flex justify-end text-sm text-green-500 text-center font-bold">
                    Status: Visible
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No visible advertisements/notices.</p>
      )}
      {/* Hidden Sections */}
      <h3 className="text-xl font-bold mt-6 mb-4">
        Hidden Advertisements/Notices
      </h3>
      {hiddenSections.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hiddenSections.map((section) => (
            <li
              key={section.id}
              className="card card-bordered bg-red-100 shadow-md"
            >
              <div className="card-body flex flex-col">
                <h3 className="card-title text-lg">{section.name}</h3>
                <div className="flex flex-col mt-auto">
                  <div className="mt-auto flex justify-end">
                    <Link
                      href={`/cms/sections/${section.id}/edit`}
                      className="btn btn-primary btn-sm mr-2"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/cms/sections/${section.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Manage
                    </Link>
                  </div>
                  <FormattedDate date={section.created_at} label="Created At" />
                  <div className="mt-2 flex justify-end text-sm text-red-500 text-center font-bold">
                    Status: Hidden
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hidden advertisements/notices.</p>
      )}
    </div>
  );
};

export default withAuth(CmsDashboard);
