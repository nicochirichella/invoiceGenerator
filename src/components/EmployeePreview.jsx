// src/components/EmployeePreview.jsx

import React from "react"

export function EmployeePreview({ employeeList }) {
  if (!employeeList || employeeList.length === 0) {
    return <p className="text-gray-500">No employees loaded yet.</p>
  }

  return (
    <div className="space-y-6 max-h-[600px] overflow-auto">
      {employeeList.map((emp, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{emp.employeeName} — Invoice #{emp.invoiceNumber}</h3>

          <p className="text-sm text-gray-600 mb-2">{emp.role}</p>
          <p className="text-sm text-gray-600 mb-4">
            Work Period: {emp.workPeriod} | Payment Date: {emp.paymentDate} | Payment Method: {emp.paymentMethod}
          </p>

          {/* Services Table */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-1">Services</h4>
            <table className="w-full text-sm border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-3 py-1 text-left">Description</th>
                  <th className="px-3 py-1 text-center">Hours</th>
                  <th className="px-3 py-1 text-right">Rate</th>
                </tr>
              </thead>
              <tbody>
                {emp.services.map((s, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-3 py-1">{s.description}</td>
                    <td className="px-3 py-1 text-center">{s.hours}</td>
                    <td className="px-3 py-1 text-right">${s.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bonuses Table */}
          {emp.bonuses.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">Bonuses</h4>
              <table className="w-full text-sm border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-1 text-left">Description</th>
                    <th className="px-3 py-1 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {emp.bonuses.map((b, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-3 py-1">{b.description}</td>
                      <td className="px-3 py-1 text-right">${b.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  )
} 
