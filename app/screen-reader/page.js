'use client'
import React from "react";

const ScreenReaderAccess = () => {
  // Handle link click with confirmation
  const handleLinkClick = (e, url) => {
    e.preventDefault(); // Prevent default navigation
    const userConfirmed = confirm(
      "You are going to an external site. Do you want to continue?"
    );
    if (userConfirmed) {
      window.open(url, "_blank");
    }
  };

  const screenReaders = [
    {
      name: "Screen Access For All (SAFA)",
      url: "http://www.nabdelhi.org/NAB_SAFA.htm",
      type: "Free",
    },
    {
      name: "Non Visual Desktop Access (NVDA)",
      url: "http://www.nvda-project.org/",
      type: "Free",
    },
    {
      name: "System Access To Go",
      url: "http://www.satogo.com/",
      type: "Free",
    },
    {
      name: "Thunder",
      url: "http://www.screenreader.net/index.php?pageid=2",
      type: "Free",
    },
    {
      name: "WebAnywhere",
      url: "http://webanywhere.cs.washington.edu/wa.php",
      type: "Free",
    },
    {
      name: "Hal",
      url: "http://www.yourdolphin.co.uk/productdetail.asp?id=5",
      type: "Commercial",
    },
    {
      name: "JAWS",
      url: "http://www.freedomscientific.com/jaws-hq.asp",
      type: "Commercial",
    },
    {
      name: "Supernova",
      url: "http://www.yourdolphin.co.uk/productdetail.asp?id=1",
      type: "Commercial",
    },
    {
      name: "Window-Eyes",
      url: "http://www.gwmicro.com/Window-Eyes/",
      type: "Commercial",
    },
  ];

  return (
    <div className="p-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl font-bold mb-6 text-center">
          Screen Reader Access
        </h1>
        <p className="mb-4">
          The website of MECON Limited for Persons with Disabilities complies
          with World Wide Web Consortium (W3C) Web Content Accessibility
          Guidelines (WCAG) 2.0 level A. This enables people with visual
          impairments to access the website using assistive technologies,
          including screen readers.
        </p>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full border-4 border-gray-200">
            <thead className="bg-blue-100 font-bold font-serif">
              <tr>
                <th>Screen Reader</th>
                <th>Website</th>
                <th>Free/Commercial</th>
              </tr>
            </thead>
            <tbody>
              {screenReaders.map((reader, index) => (
                <tr className="bg-gray-200" key={index}>
                  <td>{reader.name}</td>
                  <td>
                    <a
                      href={reader.url}
                      onClick={(e) => handleLinkClick(e, reader.url)}
                      className="text-blue-500 underline"
                    >
                      {reader.url}
                    </a>
                  </td>
                  <td>{reader.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScreenReaderAccess;
