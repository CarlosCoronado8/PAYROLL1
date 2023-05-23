export interface Payroll {
    PayrollId: Number
    employeeId: Number //string
    periodStart: Number
    periodEnd: Number
    totalEarned: Number
    totalDeducted: Number 
    totalToPay: Number

}

export interface PayrollApi{
    data: any
    totalRecords: number
}