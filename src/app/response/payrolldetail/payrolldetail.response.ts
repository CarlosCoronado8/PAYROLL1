export interface PayrollDetail {
    detailId: Number
    payrollId: Number //string
    conceptId: Number
    conceptType: string
    amount: Number
    
}

export interface PayrollDetailApi{
    data: any
    totalRecords: number
}
