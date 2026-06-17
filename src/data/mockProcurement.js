export const procurementByCategory = [
  { category: 'ครุภัณฑ์การแพทย์', value: 125000000, count: 234 },
  { category: 'วัสดุสิ้นเปลือง', value: 87000000, count: 1205 },
  { category: 'บริการ', value: 62000000, count: 456 },
  { category: 'เทคโนโลยีสารสนเทศ', value: 48000000, count: 178 },
  { category: 'ยานพาหนะ', value: 35000000, count: 42 },
  { category: 'สิ่งก่อสร้าง', value: 78000000, count: 89 },
]

export const monthlyProcurementTrend = [
  { month: 'ม.ค.', value: 32000000, count: 180 },
  { month: 'ก.พ.', value: 28000000, count: 155 },
  { month: 'มี.ค.', value: 35000000, count: 201 },
  { month: 'เม.ย.', value: 41000000, count: 225 },
  { month: 'พ.ค.', value: 38000000, count: 210 },
  { month: 'มิ.ย.', value: 45000000, count: 248 },
  { month: 'ก.ค.', value: 42000000, count: 235 },
  { month: 'ส.ค.', value: 50000000, count: 272 },
  { month: 'ก.ย.', value: 55000000, count: 299 },
  { month: 'ต.ค.', value: 48000000, count: 261 },
  { month: 'พ.ย.', value: 52000000, count: 285 },
  { month: 'ธ.ค.', value: 69000000, count: 374 },
]

export const vendorDistribution = [
  { name: 'บริษัทไทย SME', value: 35, color: '#0D5C8F' },
  { name: 'บริษัทไทยขนาดใหญ่', value: 28, color: '#0EA5E9' },
  { name: 'บริษัทต่างชาติ', value: 20, color: '#22C55E' },
  { name: 'วิสาหกิจชุมชน', value: 10, color: '#F59E0B' },
  { name: 'รัฐวิสาหกิจ', value: 7, color: '#8B5CF6' },
]

export const procurementByDepartment = [
  { dept: 'แผนกการแพทย์', approved: 45, pending: 12, rejected: 3, completed: 38 },
  { dept: 'แผนกพยาบาล', approved: 38, pending: 8, rejected: 2, completed: 32 },
  { dept: 'แผนก IT', approved: 28, pending: 6, rejected: 1, completed: 24 },
  { dept: 'แผนกการเงิน', approved: 22, pending: 5, rejected: 2, completed: 18 },
  { dept: 'แผนกบริหาร', approved: 35, pending: 10, rejected: 4, completed: 29 },
  { dept: 'แผนกวิชาการ', approved: 18, pending: 4, rejected: 1, completed: 15 },
]

export const recentProcurements = [
  { id: 'PR-2567-0892', title: 'ครุภัณฑ์การแพทย์ MRI 3T', category: 'ครุภัณฑ์การแพทย์', department: 'แผนกรังสีวิทยา', value: 45000000, status: 'อนุมัติ', date: '12/06/2567', vendor: 'Siemens Healthcare' },
  { id: 'PR-2567-0891', title: 'วัสดุสิ้นเปลืองทางการแพทย์ชุดที่ 3', category: 'วัสดุสิ้นเปลือง', department: 'แผนกพยาบาล', value: 1250000, status: 'รออนุมัติ', date: '11/06/2567', vendor: 'Medical Supply Co.' },
  { id: 'PR-2567-0890', title: 'ระบบซอฟต์แวร์ HIS อัพเกรด', category: 'เทคโนโลยีสารสนเทศ', department: 'แผนก IT', value: 8500000, status: 'รออนุมัติ', date: '10/06/2567', vendor: 'HIS Solutions' },
  { id: 'PR-2567-0889', title: 'รถพยาบาลฉุกเฉิน 2 คัน', category: 'ยานพาหนะ', department: 'แผนกฉุกเฉิน', value: 3600000, status: 'อนุมัติ', date: '09/06/2567', vendor: 'Toyota Ambulance' },
  { id: 'PR-2567-0888', title: 'บริการทำความสะอาดรายปี', category: 'บริการ', department: 'แผนกบริหาร', value: 2400000, status: 'เสร็จสิ้น', date: '08/06/2567', vendor: 'Clean Pro Services' },
  { id: 'PR-2567-0887', title: 'ครุภัณฑ์ห้องปฏิบัติการ PCR', category: 'ครุภัณฑ์การแพทย์', department: 'แผนกพยาธิวิทยา', value: 12000000, status: 'ปฏิเสธ', date: '07/06/2567', vendor: 'Bio-Rad Thailand' },
  { id: 'PR-2567-0886', title: 'วัสดุสำนักงานและเครื่องเขียน', category: 'วัสดุสิ้นเปลือง', department: 'แผนกการเงิน', value: 125000, status: 'เสร็จสิ้น', date: '06/06/2567', vendor: 'Office Depot' },
  { id: 'PR-2567-0885', title: 'ระบบกล้องวงจรปิด CCTV', category: 'เทคโนโลยีสารสนเทศ', department: 'แผนกรักษาความปลอดภัย', value: 980000, status: 'อนุมัติ', date: '05/06/2567', vendor: 'Hikvision Thailand' },
]

export const kpiData = {
  totalRequests: 2745,
  pendingApproval: 145,
  completed: 2312,
  totalValue: 535000000,
}
