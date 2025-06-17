"use client"

import { useState } from "react"
import { generatePdf } from "../lib/pdfGenerator"

export function InvoicePreview({ invoiceData }) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownload = async () => {
    setIsGenerating(true)
    try {
      await generatePdf(invoiceData)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF. Please check the console for details.")
    } finally {
      setIsGenerating(false)
    }
  }

  // Calculate total amount
  const servicesTotal = invoiceData.services.reduce((total, service) => total + service.hours * service.rate, 0)
  const totalAmount = servicesTotal + (invoiceData.bonus || 0)

  const buttonStyle = {
    padding: "12px 24px",
    backgroundColor: "#4DD0E1", // Matching the turquoise color
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: isGenerating ? "not-allowed" : "pointer",
    opacity: isGenerating ? 0.7 : 1,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "background-color 0.2s",
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div
        style={{
          backgroundColor: "#f9fafb",
          padding: "16px",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          height: "500px",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            borderRadius: "6px",
            position: "relative",
          }}
        >
          {/* Invoice Header */}
          <div style={{ textAlign: "right", marginBottom: "10px" }}>
            <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "#4DD0E1", margin: 0 }}>INVOICE</h1>
          </div>
          <div style={{ display: "flex", marginBottom: "30px" }}>
            <div style={{ flex: 1, height: "3px", backgroundColor: "#4DD0E1" }}></div>
            <div style={{ flex: 1, height: "3px", backgroundColor: "#333333" }}></div>
          </div>

          {/* Employee Name and Service Type */}
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#333333", margin: "0 0 5px 0" }}>
            {invoiceData.employeeName}
          </h2>
          <p style={{ fontSize: "16px", color: "#555555", margin: "0 0 40px 0" }}>{invoiceData.serviceType}</p>

          {/* Services Table */}
          <div style={{ marginBottom: "30px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "5fr 2fr 2fr 2fr",
                backgroundColor: "#333333",
                color: "white",
                padding: "10px",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "14px" }}>SERVICE</div>
              <div style={{ fontWeight: "bold", fontSize: "14px", textAlign: "center" }}>HOURS</div>
              <div style={{ fontWeight: "bold", fontSize: "14px", textAlign: "center" }}>PAY</div>
              <div style={{ fontWeight: "bold", fontSize: "14px", textAlign: "right" }}>TOTAL</div>
            </div>

            {invoiceData.services.map((service, index) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "5fr 2fr 2fr 2fr",
                  backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                  padding: "10px",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                <div style={{ fontSize: "14px" }}>{service.description}</div>
                <div style={{ fontSize: "14px", textAlign: "center" }}>{service.hours}</div>
                <div style={{ fontSize: "14px", textAlign: "center" }}>${service.rate}</div>
                <div style={{ fontSize: "14px", textAlign: "right" }}>${service.hours * service.rate}</div>
              </div>
            ))}

            {invoiceData.bonus && invoiceData.bonus > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "5fr 2fr 2fr 2fr",
                  backgroundColor: "#f2f2f2",
                  padding: "10px",
                }}
              >
                <div style={{ fontSize: "14px" }}>February Bonus</div>
                <div style={{ fontSize: "14px", textAlign: "center" }}></div>
                <div style={{ fontSize: "14px", textAlign: "center" }}></div>
                <div style={{ fontSize: "14px", textAlign: "right" }}>${invoiceData.bonus}</div>
              </div>
            )}
          </div>

          {/* Payment Data and Totals */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
            <div style={{ width: "60%" }}>
              <p style={{ fontSize: "14px", fontWeight: "bold", margin: "0 0 10px 0" }}>PAYMENT DATA</p>
              <div style={{ display: "flex", marginBottom: "5px" }}>
                <span style={{ width: "140px", fontSize: "12px" }}>INVOICE NUMBER:</span>
                <span style={{ fontSize: "12px" }}>#{invoiceData.invoiceNumber}</span>
              </div>
              <div style={{ display: "flex", marginBottom: "5px" }}>
                <span style={{ width: "140px", fontSize: "12px" }}>NAME:</span>
                <span style={{ fontSize: "12px" }}>{invoiceData.employeeName}</span>
              </div>
              <div style={{ display: "flex", marginBottom: "5px" }}>
                <span style={{ width: "140px", fontSize: "12px" }}>PAYMENT METHOD:</span>
                <span style={{ fontSize: "12px" }}>{invoiceData.paymentMethod}</span>
              </div>
            </div>
            <div style={{ width: "35%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  paddingTop: "10px",
                  borderTop: "1px solid #e0e0e0",
                }}
              >
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>TOTAL</span>
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>${totalAmount}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  paddingTop: "10px",
                  borderTop: "1px solid #e0e0e0",
                }}
              >
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>RECEIVED</span>
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>${totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Role and Payment Description */}
          <div
            style={{
              marginTop: "20px",
              borderTop: "1px solid #e0e0e0",
              paddingTop: "15px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "14px", fontWeight: "bold", margin: "0 0 15px 0" }}>
              ROLE IN THE COMPANY: {invoiceData.role}
            </p>
            <p style={{ fontSize: "12px", margin: "0 0 30px 0" }}>
              This payment was received on {invoiceData.paymentDate} from {invoiceData.companyName} for the days worked
              from {invoiceData.workPeriod}
            </p>
          </div>

          {/* Contact Information */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
            <div style={{ width: "30%" }}>
              <p style={{ fontSize: "14px", fontWeight: "bold", margin: "0 0 5px 0" }}>Phone.</p>
              <p style={{ fontSize: "12px", margin: "0" }}>{invoiceData.phone}</p>
            </div>
            <div style={{ width: "30%" }}>
              <p style={{ fontSize: "14px", fontWeight: "bold", margin: "0 0 5px 0" }}>Email.</p>
              <p style={{ fontSize: "12px", margin: "0" }}>{invoiceData.email}</p>
            </div>
            <div style={{ width: "30%" }}>
              <p style={{ fontSize: "14px", fontWeight: "bold", margin: "0 0 5px 0" }}>Address.</p>
              <p style={{ fontSize: "12px", margin: "0", whiteSpace: "pre-line" }}>{invoiceData.address}</p>
            </div>
          </div>

          {/* Footer with diagonal design */}
          <div
            style={{
              position: "relative",
              height: "50px",
              marginTop: "50px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "60%",
                height: "50px",
                backgroundColor: "#4DD0E1",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                width: "10%",
                height: "50px",
                backgroundColor: "white",
                transform: "skewX(-20deg)",
                transformOrigin: "bottom left",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "50%",
                height: "50px",
                backgroundColor: "#333333",
              }}
            ></div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          style={buttonStyle}
          onMouseOver={(e) => !isGenerating && (e.target.style.backgroundColor = "#26C6DA")}
          onMouseOut={(e) => !isGenerating && (e.target.style.backgroundColor = "#4DD0E1")}
        >
          <span>📄</span>
          {isGenerating ? "Generating..." : "Download PDF"}
        </button>
      </div>
    </div>
  )
}
