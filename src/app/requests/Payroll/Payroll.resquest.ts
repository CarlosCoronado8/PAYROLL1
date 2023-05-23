export interface PayrollRequest{
    PayrollId: Number
    employeeId: Number //string
    periodStart: Number
    periodEnd: Number
    totalEarned: Number
    totalDeducted: Number
    totalToPay: Number 
}
