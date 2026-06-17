export const hospitals = [
  { id: 1, name: 'โรงพยาบาลศิริราช', province: 'กรุงเทพมหานคร', region: 'กลาง', type: 'ศูนย์การแพทย์', score: 96.5, status: 'รับรอง', certDate: '15/03/2566', expireDate: '14/03/2569', level: 'HA' },
  { id: 2, name: 'โรงพยาบาลจุฬาลงกรณ์', province: 'กรุงเทพมหานคร', region: 'กลาง', type: 'ศูนย์การแพทย์', score: 95.8, status: 'รับรอง', certDate: '20/05/2566', expireDate: '19/05/2569', level: 'HA' },
  { id: 3, name: 'โรงพยาบาลรามาธิบดี', province: 'กรุงเทพมหานคร', region: 'กลาง', type: 'ศูนย์การแพทย์', score: 94.2, status: 'รับรอง', certDate: '10/07/2565', expireDate: '09/07/2568', level: 'HA' },
  { id: 4, name: 'โรงพยาบาลมหาราชนครเชียงใหม่', province: 'เชียงใหม่', region: 'เหนือ', type: 'โรงพยาบาลทั่วไป', score: 91.3, status: 'รับรอง', certDate: '05/02/2567', expireDate: '04/02/2570', level: 'HA' },
  { id: 5, name: 'โรงพยาบาลมหาราชนครราชสีมา', province: 'นครราชสีมา', region: 'ตะวันออกเฉียงเหนือ', type: 'โรงพยาบาลทั่วไป', score: 89.7, status: 'รับรอง', certDate: '18/09/2565', expireDate: '17/09/2568', level: 'HA' },
  { id: 6, name: 'โรงพยาบาลสงขลานครินทร์', province: 'สงขลา', region: 'ใต้', type: 'ศูนย์การแพทย์', score: 92.1, status: 'รับรอง', certDate: '22/11/2566', expireDate: '21/11/2569', level: 'HA' },
  { id: 7, name: 'โรงพยาบาลขอนแก่น', province: 'ขอนแก่น', region: 'ตะวันออกเฉียงเหนือ', type: 'โรงพยาบาลทั่วไป', score: 87.4, status: 'รับรอง', certDate: '03/04/2566', expireDate: '02/04/2569', level: 'HA' },
  { id: 8, name: 'โรงพยาบาลพระปกเกล้า', province: 'จันทบุรี', region: 'ตะวันออก', type: 'โรงพยาบาลทั่วไป', score: 86.9, status: 'รับรอง', certDate: '14/08/2566', expireDate: '13/08/2569', level: 'HA' },
  { id: 9, name: 'โรงพยาบาลนครปฐม', province: 'นครปฐม', region: 'กลาง', type: 'โรงพยาบาลทั่วไป', score: 85.2, status: 'รับรอง', certDate: '25/01/2567', expireDate: '24/01/2570', level: 'HA' },
  { id: 10, name: 'โรงพยาบาลหาดใหญ่', province: 'สงขลา', region: 'ใต้', type: 'โรงพยาบาลทั่วไป', score: 84.6, status: 'รับรอง', certDate: '30/06/2565', expireDate: '29/06/2568', level: 'HA' },
  { id: 11, name: 'โรงพยาบาลสระบุรี', province: 'สระบุรี', region: 'กลาง', type: 'โรงพยาบาลทั่วไป', score: 78.3, status: 'รอผล', certDate: '-', expireDate: '-', level: 'รอการประเมิน' },
  { id: 12, name: 'โรงพยาบาลชลบุรี', province: 'ชลบุรี', region: 'ตะวันออก', type: 'โรงพยาบาลทั่วไป', score: 82.1, status: 'รับรอง', certDate: '12/10/2565', expireDate: '11/10/2568', level: 'HA' },
  { id: 13, name: 'โรงพยาบาลระยอง', province: 'ระยอง', region: 'ตะวันออก', type: 'โรงพยาบาลทั่วไป', score: 79.8, status: 'รอผล', certDate: '-', expireDate: '-', level: 'รอการประเมิน' },
  { id: 14, name: 'โรงพยาบาลลำปาง', province: 'ลำปาง', region: 'เหนือ', type: 'โรงพยาบาลทั่วไป', score: 83.5, status: 'รับรอง', certDate: '08/03/2566', expireDate: '07/03/2569', level: 'HA' },
  { id: 15, name: 'โรงพยาบาลพิษณุโลก', province: 'พิษณุโลก', region: 'เหนือ', type: 'โรงพยาบาลทั่วไป', score: 81.2, status: 'รับรอง', certDate: '17/05/2566', expireDate: '16/05/2569', level: 'HA' },
  { id: 16, name: 'โรงพยาบาลอุดรธานี', province: 'อุดรธานี', region: 'ตะวันออกเฉียงเหนือ', type: 'โรงพยาบาลทั่วไป', score: 80.9, status: 'รับรอง', certDate: '22/08/2566', expireDate: '21/08/2569', level: 'HA' },
  { id: 17, name: 'โรงพยาบาลสุรินทร์', province: 'สุรินทร์', region: 'ตะวันออกเฉียงเหนือ', type: 'โรงพยาบาลชุมชน', score: 75.4, status: 'รอผล', certDate: '-', expireDate: '-', level: 'รอการประเมิน' },
  { id: 18, name: 'โรงพยาบาลกาฬสินธุ์', province: 'กาฬสินธุ์', region: 'ตะวันออกเฉียงเหนือ', type: 'โรงพยาบาลชุมชน', score: 74.2, status: 'หมดอายุ', certDate: '10/03/2564', expireDate: '09/03/2567', level: 'HA' },
  { id: 19, name: 'โรงพยาบาลเพชรบุรี', province: 'เพชรบุรี', region: 'ตะวันตก', type: 'โรงพยาบาลทั่วไป', score: 77.8, status: 'รับรอง', certDate: '05/11/2565', expireDate: '04/11/2568', level: 'HA' },
  { id: 20, name: 'โรงพยาบาลกาญจนบุรี', province: 'กาญจนบุรี', region: 'ตะวันตก', type: 'โรงพยาบาลทั่วไป', score: 76.5, status: 'รับรอง', certDate: '28/02/2566', expireDate: '27/02/2569', level: 'HA' },
  { id: 21, name: 'โรงพยาบาลตรัง', province: 'ตรัง', region: 'ใต้', type: 'โรงพยาบาลทั่วไป', score: 79.1, status: 'รับรอง', certDate: '15/07/2566', expireDate: '14/07/2569', level: 'HA' },
  { id: 22, name: 'โรงพยาบาลสุราษฎร์ธานี', province: 'สุราษฎร์ธานี', region: 'ใต้', type: 'โรงพยาบาลทั่วไป', score: 80.3, status: 'รับรอง', certDate: '19/04/2566', expireDate: '18/04/2569', level: 'HA' },
  { id: 23, name: 'โรงพยาบาลนราธิวาส', province: 'นราธิวาส', region: 'ใต้', type: 'โรงพยาบาลทั่วไป', score: 68.7, status: 'หมดอายุ', certDate: '12/06/2564', expireDate: '11/06/2567', level: 'HA' },
  { id: 24, name: 'โรงพยาบาลภูเก็ต', province: 'ภูเก็ต', region: 'ใต้', type: 'โรงพยาบาลทั่วไป', score: 85.6, status: 'รับรอง', certDate: '25/09/2565', expireDate: '24/09/2568', level: 'HA' },
  { id: 25, name: 'โรงพยาบาลอุบลราชธานี', province: 'อุบลราชธานี', region: 'ตะวันออกเฉียงเหนือ', type: 'โรงพยาบาลทั่วไป', score: 82.8, status: 'รับรอง', certDate: '07/12/2565', expireDate: '06/12/2568', level: 'HA' },
  { id: 26, name: 'โรงพยาบาลนครสวรรค์', province: 'นครสวรรค์', region: 'เหนือ', type: 'โรงพยาบาลทั่วไป', score: 78.9, status: 'รับรอง', certDate: '14/01/2567', expireDate: '13/01/2570', level: 'HA' },
  { id: 27, name: 'โรงพยาบาลแพร่', province: 'แพร่', region: 'เหนือ', type: 'โรงพยาบาลชุมชน', score: 72.4, status: 'รอผล', certDate: '-', expireDate: '-', level: 'รอการประเมิน' },
  { id: 28, name: 'โรงพยาบาลน่าน', province: 'น่าน', region: 'เหนือ', type: 'โรงพยาบาลชุมชน', score: 71.8, status: 'รอผล', certDate: '-', expireDate: '-', level: 'รอการประเมิน' },
  { id: 29, name: 'โรงพยาบาลมุกดาหาร', province: 'มุกดาหาร', region: 'ตะวันออกเฉียงเหนือ', type: 'โรงพยาบาลชุมชน', score: 69.3, status: 'หมดอายุ', certDate: '01/02/2564', expireDate: '31/01/2567', level: 'HA' },
  { id: 30, name: 'โรงพยาบาลบึงกาฬ', province: 'บึงกาฬ', region: 'ตะวันออกเฉียงเหนือ', type: 'โรงพยาบาลชุมชน', score: 65.2, status: 'หมดอายุ', certDate: '15/05/2563', expireDate: '14/05/2566', level: 'HA' },
  { id: 31, name: 'โรงพยาบาลสมุทรสาคร', province: 'สมุทรสาคร', region: 'กลาง', type: 'โรงพยาบาลทั่วไป', score: 83.7, status: 'รับรอง', certDate: '09/08/2566', expireDate: '08/08/2569', level: 'HA' },
  { id: 32, name: 'โรงพยาบาลอ่างทอง', province: 'อ่างทอง', region: 'กลาง', type: 'โรงพยาบาลทั่วไป', score: 76.1, status: 'รับรอง', certDate: '02/10/2566', expireDate: '01/10/2569', level: 'HA' },
]

export const accreditationTrend = [
  { year: '2562', total: 312, certified: 198, pending: 85, expired: 29 },
  { year: '2563', total: 340, certified: 224, pending: 88, expired: 28 },
  { year: '2564', total: 368, certified: 251, pending: 90, expired: 27 },
  { year: '2565', total: 401, certified: 285, pending: 92, expired: 24 },
  { year: '2566', total: 432, certified: 318, pending: 88, expired: 26 },
  { year: '2567', total: 450, certified: 338, pending: 86, expired: 26 },
]

export const scoresByDimension = [
  { dimension: 'การนำองค์กร', score: 88, fullMark: 100 },
  { dimension: 'กลยุทธ์', score: 82, fullMark: 100 },
  { dimension: 'ลูกค้า', score: 91, fullMark: 100 },
  { dimension: 'การวัดผล', score: 79, fullMark: 100 },
  { dimension: 'บุคลากร', score: 85, fullMark: 100 },
  { dimension: 'กระบวนการ', score: 87, fullMark: 100 },
  { dimension: 'ผลลัพธ์', score: 83, fullMark: 100 },
  { dimension: 'ความปลอดภัย', score: 92, fullMark: 100 },
  { dimension: 'สิ่งแวดล้อม', score: 78, fullMark: 100 },
  { dimension: 'ประสิทธิภาพ', score: 80, fullMark: 100 },
  { dimension: 'นวัตกรรม', score: 75, fullMark: 100 },
  { dimension: 'ธรรมาภิบาล', score: 89, fullMark: 100 },
]

export const scoresByHospitalType = [
  { type: 'ศูนย์การแพทย์', avgScore: 93.2, count: 8 },
  { type: 'โรงพยาบาลทั่วไป', avgScore: 82.5, count: 85 },
  { type: 'โรงพยาบาลชุมชน', avgScore: 74.8, count: 245 },
  { type: 'โรงพยาบาลเอกชน', avgScore: 88.1, count: 112 },
]

export const hospitalTypeDistribution = [
  { name: 'โรงพยาบาลชุมชน', value: 245, color: '#0D5C8F' },
  { name: 'โรงพยาบาลทั่วไป', value: 85, color: '#0EA5E9' },
  { name: 'โรงพยาบาลเอกชน', value: 112, color: '#22C55E' },
  { name: 'ศูนย์การแพทย์', value: 8, color: '#F59E0B' },
]

export const regionData = [
  { region: 'เหนือ', total: 78, certified: 52, pending: 18, expired: 8 },
  { region: 'กลาง', total: 95, certified: 72, pending: 16, expired: 7 },
  { region: 'ตะวันออกเฉียงเหนือ', total: 125, certified: 88, pending: 27, expired: 10 },
  { region: 'ตะวันออก', total: 45, certified: 35, pending: 7, expired: 3 },
  { region: 'ตะวันตก', total: 42, certified: 30, pending: 8, expired: 4 },
  { region: 'ใต้', total: 65, certified: 61, pending: 10, expired: 4 },
]

export const kpiData = {
  totalSurveyed: 450,
  haCertified: 338,
  haPending: 86,
  averageScore: 83.4,
}
