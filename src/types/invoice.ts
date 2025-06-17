export interface Service {
  description: string
  hours: number
  rate: number
}

export interface InvoiceData {
  invoiceNumber: string
  employeeName: string
  paymentMethod: string
  phone: string
  email: string
  address: string
  serviceType: string
  role: string
  paymentDate: string
  companyName: string
  workPeriod: string
  services: Service[]
  bonus?: number
}
