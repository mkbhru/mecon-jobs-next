"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";

const CmsDashboard = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Function to check authentication
    const checkAuthentication = async () => {
      try {
        const response = await fetch("/api/cms/auth/verify", {
          method: "GET",
          credentials: "include", // Ensures cookies are sent
        });

        if (!response.ok) {
          throw new Error("Not authenticated");
        }

        setLoading(false); // User is authenticated
      } catch (error) {
        // Redirect to login page if not authenticated
        router.push("/cms/login");
      }
    };

    // Fetch sections only if authenticated
    const fetchSections = async () => {
      const response = await fetch("/api/cms/sections");
      const data = await response.json();
      setSections(data);
    };

    checkAuthentication().then(fetchSections);
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-base-300 p-4 rounded-md">
      {/* Header */}

      {/* Main Content */}
      <div className="card bg-base-200 shadow-lg rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">
          {" "}
          Manage Advertisements - Dashboard
        </h2>
        <div className="mt-6 p-4">
          <Link href="/cms/sections/new" className="btn btn-accent">
            Create New Advertisement/Notice
          </Link>
        </div>

        {sections.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <li
                key={section.id}
                className="card card-bordered bg-base-100 shadow-md"
              >
                <div className="card-body flex flex-col">
                  <div>
                    <h3 className="card-title text-lg">{section.name}</h3>
                  </div>
                  <div className="mt-auto flex justify-end">
                    <Link
                      href={`/cms/sections/${section.id}`}
                      className="btn btn-primary btn-sm mt-4"
                    >
                      Manage Advertisement/Notice
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No sections available. Add a new section to get started.</p>
        )}
      </div>
    </div>
  );
};

export default CmsDashboard;
