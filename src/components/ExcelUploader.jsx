// src/components/ExcelUploader.jsx

import React from "react"
import * as XLSX from "xlsx"

export function ExcelUploader({ onEmployeesParsed }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (evt) => {
      const bstr = evt.target.result
      const wb = XLSX.read(bstr, { type: "binary" })
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      const data = XLSX.utils.sheet_to_json(ws)

      const defaultInfo = {
        phone: "+972 52 520 2007",
        email: "adi@olyid.com",
        address: "6659 SCHAEFER RD STE 1175\nDEARBORN, MI 48126",
        companyName: "TLNY MEDIA",
      }

      const employees = data.map((row) => {
        // Build services array
        const services = []
        for (let i = 1; i <= 3; i++) {
          const desc = row[`Service ${i} Description`]
          const hours = parseFloat(row[`Service ${i} Hours`] || 0)
          const rate = parseFloat(row[`Service ${i} Rate`] || 0)
          if (desc && hours > 0 && rate > 0) {
            services.push({ description: desc, hours, rate })
          }
        }

        // Build bonuses array
        const bonuses = []
        for (let i = 1; i <= 3; i++) {
          const desc = row[`Bonus ${i} Description`]
          const amount = parseFloat(row[`Bonus ${i} Amount`] || 0)
          if (desc && amount > 0) {
            bonuses.push({ description: desc, amount })
          }
        }

        return {
          employeeName: row["Name"],
          invoiceNumber: String(row["Invoice #"]),
          paymentMethod: row["Payment Method"] || "PAYPAL",
          serviceType: row["Service Type"] || "Texting Campaign",
          role: row["Role"] || "Real estate service - Data Collector - Texting Campaign",
          paymentDate: row["Payment Date"] || "March 3rd, 2025",
          workPeriod: row["Work Period"] || "Sunday 01/02/2025 to Friday 28/02/2025",
          services,
          bonuses,
          ...defaultInfo,
        }
      })

      onEmployeesParsed(employees)
    }

    reader.readAsBinaryString(file)
  }

  return (
    <div>
      <label className="font-semibold text-gray-700 mb-2 block">Upload Employee Excel:</label>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="block" />
    </div>
  )
} 