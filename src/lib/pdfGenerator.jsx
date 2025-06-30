import { pdf, Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer"

// Register fonts for better typography
Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf" },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf",
      fontStyle: "italic",
    },
  ],
})

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Roboto",
    backgroundColor: "white",
  },
  // Header styles
  invoiceTitle: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#4DD0E1", // Turquoise color
    marginBottom: 10,
    textAlign: "right",
  },
  dividerContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  dividerTeal: {
    height: 3,
    flex: 1,
    backgroundColor: "#4DD0E1",
    marginRight: 0,
  },
  dividerBlack: {
    height: 3,
    flex: 1,
    backgroundColor: "#333333",
    marginLeft: 0,
  },
  // Employee info styles
  employeeNameLarge: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 5,
  },
  serviceTypeLarge: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 40,
  },
  // Table styles
  table: {
    marginTop: 30,
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#333333",
    padding: 10,
  },
  tableHeaderText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tableRowAlt: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tableCol1: {
    flex: 5,
  },
  tableCol2: {
    flex: 2,
    textAlign: "center",
  },
  tableCol3: {
    flex: 2,
    textAlign: "center",
  },
  tableCol4: {
    flex: 2,
    textAlign: "right",
  },
  tableCell: {
    fontSize: 11,
  },
  // Payment data styles
  paymentDataContainer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentDataLeft: {
    width: "60%",
  },
  paymentDataRight: {
    width: "35%",
  },
  paymentDataTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paymentDataRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  paymentDataLabel: {
    fontSize: 10,
    width: 140,
  },
  paymentDataValue: {
    fontSize: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  // Role and payment description
  roleContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 15,
  },
  roleText: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  paymentDescription: {
    fontSize: 11,
    textAlign: "center",
    marginBottom: 30,
  },
  // Contact info styles
  contactContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  contactColumn: {
    width: "30%",
  },
  contactTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contactText: {
    fontSize: 10,
    marginBottom: 3,
  },
  // Footer styles
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
  },
  footerLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "60%",
    height: 50,
    backgroundColor: "#4DD0E1",
  },
  footerRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "50%",
    height: 50,
    backgroundColor: "#333333",
  },
  footerDiagonal: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    width: "10%",
    height: 50,
    backgroundColor: "white",
    transform: "skewX(-20deg)",
    transformOrigin: "bottom left",
  },
})

// Create Document Component
const InvoicePDF = ({ data }) => {
  // Calculate totals
  const servicesTotal = data.services.reduce((total, service) => total + service.hours * service.rate, 0);
  const bonusTotal = data.bonuses ? data.bonuses.reduce((total, bonus) => total + bonus.amount, 0) : 0;
  const totalAmount = servicesTotal + bonusTotal;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.invoiceTitle}>INVOICE</Text>
        <View style={styles.dividerContainer}>
          <View style={styles.dividerTeal} />
          <View style={styles.dividerBlack} />
        </View>

        {/* Employee Name and Service Type */}
        <Text style={styles.employeeNameLarge}>{data.employeeName}</Text>
        <Text style={styles.serviceTypeLarge}>{data.serviceType}</Text>

        {/* Services Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.tableCol1]}>SERVICE</Text>
            <Text style={[styles.tableHeaderText, styles.tableCol2]}>HOURS</Text>
            <Text style={[styles.tableHeaderText, styles.tableCol3]}>PAY</Text>
            <Text style={[styles.tableHeaderText, styles.tableCol4]}>TOTAL</Text>
          </View>

          {/* Table Rows */}
          {data.services.map((service, index) => (
            <View key={index} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
              <Text style={[styles.tableCell, styles.tableCol1]}>{service.description}</Text>
              <Text style={[styles.tableCell, styles.tableCol2]}>{service.hours}</Text>
              <Text style={[styles.tableCell, styles.tableCol3]}>${service.rate}</Text>
              <Text style={[styles.tableCell, styles.tableCol4]}>${service.hours * service.rate}</Text>
            </View>
          ))}


          {/* Bonuses Rows */}
          {data.bonuses && data.bonuses.length > 0 && data.bonuses.map((bonus, index) => (
            <View key={`bonus-${index}`} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.tableCol1]}>{bonus.description}</Text>
              <Text style={[styles.tableCell, styles.tableCol2]}></Text>
              <Text style={[styles.tableCell, styles.tableCol3]}></Text>
              <Text style={[styles.tableCell, styles.tableCol4]}>${bonus.amount.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Payment Data and Totals */}
        <View style={styles.paymentDataContainer}>
          <View style={styles.paymentDataLeft}>
            <Text style={styles.paymentDataTitle}>PAYMENT DATA</Text>
            <View style={styles.paymentDataRow}>
              <Text style={styles.paymentDataLabel}>INVOICE NUMBER:</Text>
              <Text style={styles.paymentDataValue}>#{data.invoiceNumber}</Text>
            </View>
            <View style={styles.paymentDataRow}>
              <Text style={styles.paymentDataLabel}>NAME:</Text>
              <Text style={styles.paymentDataValue}>{data.employeeName}</Text>
            </View>
            <View style={styles.paymentDataRow}>
              <Text style={styles.paymentDataLabel}>PAYMENT METHOD:</Text>
              <Text style={styles.paymentDataValue}>{data.paymentMethod}</Text>
            </View>
          </View>
          <View style={styles.paymentDataRight}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TOTAL</Text>
              <Text style={styles.totalValue}>${totalAmount}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>RECEIVED</Text>
              <Text style={styles.totalValue}>${totalAmount}</Text>
            </View>
          </View>
        </View>

        {/* Role and Payment Description */}
        <View style={styles.roleContainer}>
          <Text style={styles.roleText}>ROLE IN THE COMPANY: {data.role}</Text>
          <Text style={styles.paymentDescription}>
            This payment was received on {data.paymentDate} from {data.companyName} for the days worked from{" "}
            {data.workPeriod}
          </Text>
        </View>

        {/* Contact Information */}
        <View style={styles.contactContainer}>
          <View style={styles.contactColumn}>
            <Text style={styles.contactTitle}>Phone.</Text>
            <Text style={styles.contactText}>{data.phone}</Text>
          </View>
          <View style={styles.contactColumn}>
            <Text style={styles.contactTitle}>Email.</Text>
            <Text style={styles.contactText}>{data.email}</Text>
          </View>
          <View style={styles.contactColumn}>
            <Text style={styles.contactTitle}>Address.</Text>
            <Text style={styles.contactText}>{data.address}</Text>
          </View>
        </View>

        {/* Footer with diagonal design */}
        <View style={styles.footer}>
          <View style={styles.footerLeft} />
          <View style={styles.footerDiagonal} />
          <View style={styles.footerRight} />
        </View>
      </Page>
    </Document>
  )
}

export async function generatePdf(invoiceData) {
  try {
    const blob = await pdf(<InvoicePDF data={invoiceData} />).toBlob()

    // Create download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `invoice_${invoiceData.employeeName}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw error
  }
}
