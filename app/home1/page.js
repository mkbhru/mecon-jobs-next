"use client";
import React, { useEffect, useState } from "react";
import { Spin, Card, Button, Typography, Layout, List } from "antd";
import StripSection from "../frontend/StripSection";

const { Content } = Layout;
const { Title, Text } = Typography;

const FrontendPage = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const extractFileInfo = (pdf_url) => {
    const parts = pdf_url.split("/");
    const filenameWithExt = parts.pop();
    const [year, month, day] = parts.slice(-3);

    if (year && month && day && filenameWithExt.endsWith(".pdf")) {
      const filename = filenameWithExt.slice(0, -4);
      return { year, month, day, filename };
    }
    console.log("No match");
    return null;
  };

  const handleViewInNewTab = (pdf_url) => {
    const fileInfo = extractFileInfo(pdf_url);
    if (fileInfo) {
      const { filename } = fileInfo;
      window.open(`/api/download?file=${filename}.pdf`, "_blank");
    } else {
      alert("No file to view");
    }
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
  }, []);

  if (loading) {
    return (
      <Layout
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </Layout>
    );
  }

  return (
    <>
      {sections.length > 0 && <StripSection />}
      <Layout style={{ padding: "12px" }}>
        <Content>
          {sections.length > 0 ? (
            sections.map((section) => (
              <Card
                key={section.id}
                title={
                  <Title level={5} style={{ margin: 0 }}>
                    {section.name}
                  </Title>
                }
                style={{
                  marginBottom: "12px",
                  padding: "8px",
                }}
                styles={{
                  body: {
                    padding: "12px",
                  },
                }}
              >
                <List
                  dataSource={section.items}
                  renderItem={(item) => (
                    <List.Item
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px 0",
                      }}
                      actions={
                        item.pdf_url
                          ? [
                              <Button
                                key="download"
                                size="small"
                                type="primary"
                                onClick={() => handleViewInNewTab(item.pdf_url)}
                              >
                                Download
                              </Button>,
                            ]
                          : []
                      }
                    >
                      <Text style={{ fontSize: "14px" }}>{item.content}</Text>
                    </List.Item>
                  )}
                />
              </Card>
            ))
          ) : (
            <Title level={5} style={{ textAlign: "center", margin: "20px 0" }}>
              No sections found. Please refresh.
            </Title>
          )}
        </Content>
      </Layout>
    </>
  );
};

export default FrontendPage;
