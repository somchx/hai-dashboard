export const policies = [
  { id: 1, title: 'นโยบายพัฒนาระบบสุขภาพปฐมภูมิ', category: 'บริการสุขภาพ', status: 'ดำเนินการ', owner: 'ดร.วิชัย ศรีสมบัติ', targetDate: '30/09/2567', progress: 75, priority: 'สูง' },
  { id: 2, title: 'นโยบายการพัฒนาบุคลากรทางการแพทย์', category: 'บุคลากร', status: 'ดำเนินการ', owner: 'นพ.สมชาย ใจดี', targetDate: '31/12/2567', progress: 60, priority: 'สูง' },
  { id: 3, title: 'นโยบายดิจิทัลสาธารณสุข', category: 'เทคโนโลยี', status: 'ทบทวน', owner: 'นาย ประทีป สุวรรณ', targetDate: '28/02/2568', progress: 40, priority: 'กลาง' },
  { id: 4, title: 'มาตรฐานความปลอดภัยผู้ป่วย', category: 'ความปลอดภัย', status: 'สำเร็จ', owner: 'พญ.มาลี จันทร์เพ็ง', targetDate: '31/03/2567', progress: 100, priority: 'สูง' },
  { id: 5, title: 'นโยบายการบริหารยาและเวชภัณฑ์', category: 'เภสัชกรรม', status: 'ดำเนินการ', owner: 'ภก.ธีรวุฒิ แก้วมณี', targetDate: '30/06/2567', progress: 85, priority: 'กลาง' },
  { id: 6, title: 'แผนพัฒนาโรงพยาบาลชุมชน', category: 'พัฒนาสถานพยาบาล', status: 'ดำเนินการ', owner: 'นพ.สุรชัย วงค์ทอง', targetDate: '31/08/2567', progress: 55, priority: 'กลาง' },
  { id: 7, title: 'นโยบายลดความเหลื่อมล้ำด้านสุขภาพ', category: 'ความเป็นธรรม', status: 'ทบทวน', owner: 'ดร.จิตรา พรหมบุตร', targetDate: '31/10/2567', progress: 35, priority: 'สูง' },
  { id: 8, title: 'การพัฒนาระบบประกันคุณภาพ', category: 'การรับรอง', status: 'สำเร็จ', owner: 'นพ.กิตติพงศ์ มีสุข', targetDate: '28/02/2567', progress: 100, priority: 'สูง' },
  { id: 9, title: 'นโยบายส่งเสริมสุขภาพป้องกันโรค', category: 'ส่งเสริมสุขภาพ', status: 'ดำเนินการ', owner: 'พญ.สุนีย์ รัตนวงศ์', targetDate: '30/11/2567', progress: 48, priority: 'กลาง' },
  { id: 10, title: 'แผนบูรณาการระบบข้อมูลสุขภาพ', category: 'เทคโนโลยี', status: 'ดำเนินการ', owner: 'นาย ชัยชนะ ดำรงค์ศักดิ์', targetDate: '31/01/2568', progress: 30, priority: 'สูง' },
  { id: 11, title: 'นโยบายดูแลผู้สูงอายุและผู้พิการ', category: 'บริการสุขภาพ', status: 'ดำเนินการ', owner: 'นพ.อนันต์ สุขสันต์', targetDate: '30/09/2567', progress: 65, priority: 'กลาง' },
  { id: 12, title: 'มาตรฐานโรงพยาบาลสีเขียว', category: 'สิ่งแวดล้อม', status: 'ทบทวน', owner: 'นาย สิทธิชัย ประทุมทอง', targetDate: '31/03/2568', progress: 20, priority: 'ต่ำ' },
]

export const kpiAchievementData = [
  { goal: 'คุณภาพบริการ', target: 100, achieved: 87 },
  { goal: 'ความปลอดภัย', target: 100, achieved: 92 },
  { goal: 'บุคลากร', target: 100, achieved: 78 },
  { goal: 'เทคโนโลยี', target: 100, achieved: 65 },
  { goal: 'การเงิน', target: 100, achieved: 82 },
  { goal: 'ชุมชน', target: 100, achieved: 71 },
  { goal: 'นวัตกรรม', target: 100, achieved: 58 },
]

export const implementationProgress = [
  { month: 'ม.ค. 2566', completed: 2, inProgress: 5, planned: 10 },
  { month: 'มี.ค. 2566', completed: 3, inProgress: 6, planned: 10 },
  { month: 'พ.ค. 2566', completed: 4, inProgress: 7, planned: 11 },
  { month: 'ก.ค. 2566', completed: 5, inProgress: 7, planned: 12 },
  { month: 'ก.ย. 2566', completed: 6, inProgress: 8, planned: 12 },
  { month: 'พ.ย. 2566', completed: 7, inProgress: 8, planned: 12 },
  { month: 'ม.ค. 2567', completed: 8, inProgress: 9, planned: 12 },
  { month: 'มี.ค. 2567', completed: 9, inProgress: 9, planned: 12 },
  { month: 'พ.ค. 2567', completed: 10, inProgress: 10, planned: 12 },
]

export const policyCategories = [
  { name: 'บริการสุขภาพ', value: 3, color: '#0D5C8F' },
  { name: 'เทคโนโลยี', value: 2, color: '#0EA5E9' },
  { name: 'บุคลากร', value: 2, color: '#22C55E' },
  { name: 'ความปลอดภัย', value: 2, color: '#F59E0B' },
  { name: 'การรับรอง', value: 1, color: '#8B5CF6' },
  { name: 'อื่นๆ', value: 2, color: '#94A3B8' },
]

export const ganttData = [
  { name: 'ระบบสุขภาพปฐมภูมิ', start: 1, duration: 12, category: 'บริการสุขภาพ', progress: 75 },
  { name: 'พัฒนาบุคลากร', start: 3, duration: 10, category: 'บุคลากร', progress: 60 },
  { name: 'ดิจิทัลสาธารณสุข', start: 2, duration: 14, category: 'เทคโนโลยี', progress: 40 },
  { name: 'ความปลอดภัยผู้ป่วย', start: 1, duration: 6, category: 'ความปลอดภัย', progress: 100 },
  { name: 'บริหารยาเวชภัณฑ์', start: 4, duration: 8, category: 'เภสัชกรรม', progress: 85 },
  { name: 'พัฒนาโรงพยาบาลชุมชน', start: 5, duration: 9, category: 'พัฒนาสถานพยาบาล', progress: 55 },
  { name: 'ลดความเหลื่อมล้ำ', start: 2, duration: 12, category: 'ความเป็นธรรม', progress: 35 },
  { name: 'บูรณาการข้อมูลสุขภาพ', start: 6, duration: 10, category: 'เทคโนโลยี', progress: 30 },
]

export const kpiData = {
  activePolicies: 8,
  implemented: 2,
  underReview: 3,
  completionRate: 72.5,
}
