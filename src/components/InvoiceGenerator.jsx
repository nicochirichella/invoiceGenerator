// src/components/InvoiceGenerator.jsx

import React, { useState } from "react";
import { ExcelUploader } from "./ExcelUploader";
import { EmployeePreview } from "./EmployeePreview";
import { generatePdf } from "../lib/pdfGenerator" // Asegúrate que la ruta sea correcta


export function InvoiceGenerator() {
  const [employeeList, setEmployeeList] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-10 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Invoice Batch Generator</h1>
          <p className="text-lg text-gray-600">Upload employee work data and preview invoices instantly</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel: File Upload */}
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow border border-gray-200 h-fit">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">📄 Upload Excel File</h2>
            <p className="text-sm text-gray-600 mb-4">
              Make sure your file contains service and bonus columns in the correct format.
            </p>
            <ExcelUploader onEmployeesParsed={setEmployeeList} />
          </div>

          {/* Right Panel: Invoice Preview */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">👀 Invoice Preview</h2>
            <EmployeePreview employeeList={employeeList} />

            {/* // Dentro del JSX (debajo del <EmployeePreview />) */}
            {employeeList.length > 0 && (
              <div className="mt-6 text-right">
                <button
                  onClick={async () => {
                    for (const employee of employeeList) {
                      await generatePdf(employee)
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
                >
                  📥 Descargar todos los PDFs
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
