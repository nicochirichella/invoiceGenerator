"use client"

export function InvoiceForm({ invoiceData, setInvoiceData }) {
  const updateField = (field, value) => {
    setInvoiceData({ ...invoiceData, [field]: value })
  }

  const updateService = (index, field, value) => {
    const updatedServices = [...invoiceData.services]
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: field === "hours" || field === "rate" ? Number(value) : value,
    }
    setInvoiceData({ ...invoiceData, services: updatedServices })
  }

  const addService = () => {
    setInvoiceData({
      ...invoiceData,
      services: [...invoiceData.services, { description: "", hours: 0, rate: 0 }],
    })
  }

  const removeService = (index) => {
    const updatedServices = [...invoiceData.services]
    updatedServices.splice(index, 1)
    setInvoiceData({ ...invoiceData, services: updatedServices })
  }

  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  }

  const labelStyle = {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "4px",
    color: "#374151",
  }

  const buttonStyle = {
    padding: "8px 16px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  }

  const buttonOutlineStyle = {
    ...buttonStyle,
    backgroundColor: "transparent",
    color: "#3b82f6",
    border: "1px solid #3b82f6",
  }

  const deleteButtonStyle = {
    padding: "6px",
    backgroundColor: "transparent",
    color: "#ef4444",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "18px",
  }

  return (
    <form style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
        <div>
          <label style={labelStyle} htmlFor="invoiceNumber">
            Invoice Number
          </label>
          <input
            style={inputStyle}
            id="invoiceNumber"
            value={invoiceData.invoiceNumber}
            onChange={(e) => updateField("invoiceNumber", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="employeeName">
            Employee Name
          </label>
          <input
            style={inputStyle}
            id="employeeName"
            value={invoiceData.employeeName}
            onChange={(e) => updateField("employeeName", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="paymentMethod">
            Payment Method
          </label>
          <input
            style={inputStyle}
            id="paymentMethod"
            value={invoiceData.paymentMethod}
            onChange={(e) => updateField("paymentMethod", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="phone">
            Phone
          </label>
          <input
            style={inputStyle}
            id="phone"
            value={invoiceData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="email">
            Email
          </label>
          <input
            style={inputStyle}
            id="email"
            value={invoiceData.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="serviceType">
            Service Type
          </label>
          <input
            style={inputStyle}
            id="serviceType"
            value={invoiceData.serviceType}
            onChange={(e) => updateField("serviceType", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label style={labelStyle} htmlFor="address">
          Address
        </label>
        <textarea
          style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }}
          id="address"
          value={invoiceData.address}
          onChange={(e) => updateField("address", e.target.value)}
          rows={2}
        />
      </div>

      <div>
        <label style={labelStyle} htmlFor="role">
          Role in the Company
        </label>
        <input
          style={inputStyle}
          id="role"
          value={invoiceData.role}
          onChange={(e) => updateField("role", e.target.value)}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
        <div>
          <label style={labelStyle} htmlFor="paymentDate">
            Payment Date
          </label>
          <input
            style={inputStyle}
            id="paymentDate"
            value={invoiceData.paymentDate}
            onChange={(e) => updateField("paymentDate", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="companyName">
            Company Name
          </label>
          <input
            style={inputStyle}
            id="companyName"
            value={invoiceData.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="workPeriod">
            Work Period
          </label>
          <input
            style={inputStyle}
            id="workPeriod"
            value={invoiceData.workPeriod}
            onChange={(e) => updateField("workPeriod", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="bonus">
            Bonus
          </label>
          <input
            style={inputStyle}
            id="bonus"
            type="number"
            value={invoiceData.bonus}
            onChange={(e) => updateField("bonus", Number(e.target.value))}
          />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "500", margin: 0 }}>Services</h3>
          <button
            type="button"
            style={buttonOutlineStyle}
            onClick={addService}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#eff6ff")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            + Add Service
          </button>
        </div>

        {invoiceData.services.map((service, index) => (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
              gap: "12px",
              alignItems: "end",
              border: "1px solid #e5e7eb",
              padding: "16px",
              borderRadius: "8px",
            }}
          >
            <div>
              <label style={labelStyle} htmlFor={`description-${index}`}>
                Description
              </label>
              <input
                style={inputStyle}
                id={`description-${index}`}
                value={service.description}
                onChange={(e) => updateService(index, "description", e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle} htmlFor={`hours-${index}`}>
                Hours
              </label>
              <input
                style={inputStyle}
                id={`hours-${index}`}
                type="number"
                value={service.hours}
                onChange={(e) => updateService(index, "hours", e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle} htmlFor={`rate-${index}`}>
                Rate ($)
              </label>
              <input
                style={inputStyle}
                id={`rate-${index}`}
                type="number"
                value={service.rate}
                onChange={(e) => updateService(index, "rate", e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Amount</label>
              <div
                style={{
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "500",
                  padding: "8px 12px",
                  backgroundColor: "#f9fafb",
                  borderRadius: "6px",
                }}
              >
                ${service.hours * service.rate}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="button"
                style={{
                  ...deleteButtonStyle,
                  opacity: invoiceData.services.length <= 1 ? 0.5 : 1,
                  cursor: invoiceData.services.length <= 1 ? "not-allowed" : "pointer",
                }}
                onClick={() => removeService(index)}
                disabled={invoiceData.services.length <= 1}
                title="Remove service"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </form>
  )
}
