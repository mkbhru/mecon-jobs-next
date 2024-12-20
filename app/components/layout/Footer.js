"use client";
import React from "react";

const RelatedLinks = [
  { name: "Ex-Employee Portal", url: "#" },
  { name: "Photo Gallery", url: "#" },
  { name: "Video Gallery", url: "#" },
  { name: "@Media", url: "#" },
  { name: "ISPAT Hospital", url: "#" },
  { name: "Brochure", url: "#" },
  { name: "Website Policies", url: "#" },
  { name: "Term & Conditions", url: "#" },
  { name: "Disclaimer", url: "#" },
  { name: "Sitemap", url: "#" },
  { name: "Help", url: "#" },
];
const VendorPortal = [
  { name: "Calls For Inspection", url: "#" },
  { name: "Vendor Registration", url: "#" },
  { name: "Track Your Bill", url: "#" },
  { name: "Vendor Feedback", url: "#" },
  { name: "Pay Online", url: "#" },
  { name: "Banned/Suspended Vendors", url: "#" },
];
const ImportantLinks = [
  { name: "PDMS", url: "#" },
  { name: "PLI Scheme for Speciality Steel in India - Web Portal", url: "#" },
  { name: "Projection of Procurement 2020-25", url: "#" },
  { name: "GST Registration Details", url: "#" },
  { name: "TReDS Registration Details", url: "#" },
];
const ExternalLinks = [
  { name: "Ministry of Steel", url: "https://steel.gov.in/" },
  { name: "GOI Web Directory", url: "https://igod.gov.in/" },
  { name: "National Informatics Centre", url: "https://www.nic.in/" },
];

const handleExternalLink = (url) => {
  const userConfirmed = window.confirm(
    "You are about to leave the site. Do you want to continue?"
  );
  if (userConfirmed) {
    window.open(url, "_blank");
  }
};

export default function Footer() {
  return (
    <footer className="bg-neutral text-white text-center">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h5 className="font-bold uppercase mb-2">Related Links</h5>
            <ul className="list-none space-y-2">
              {RelatedLinks.map((item, index) => (
                <li key={index}>
                  <a href={item.url} className="text-white hover:underline">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-bold uppercase mb-2">Vendor Portal</h5>
            <ul className="list-none space-y-2">
              {VendorPortal.map((item, index) => (
                <li key={index}>
                  <a href={item.url} className="text-white hover:underline">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-bold uppercase mb-2">Important Links</h5>
            <ul className="list-none space-y-2">
              {ImportantLinks.map((item, index) => (
                <li key={index}>
                  <a href={item.url} className="text-white hover:underline">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-bold uppercase mb-2">External Links</h5>
            <ul className="list-none space-y-2">
              {ExternalLinks.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleExternalLink(item.url)}
                    className="text-white hover:underline"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 py-4">
        <p className="text-sm">
          Copyright © 2020 - All Rights Reserved - Official Website of MECON
          Limited, Doranda Main Road, Vivekanand Chowk, Shyamali Colony,
          Doranda, Ranchi, Jharkhand 834002
        </p>
        <p className="text-sm mt-1">Last Updated On:</p>
      </div>
    </footer>
  );
}
