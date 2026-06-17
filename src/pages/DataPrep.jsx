import { useState } from 'react';
import {
  Database,
  DollarSign,
  Package,
  Activity,
  Plus,
  ArrowRight,
  Settings,
  Eye,
  Download,
  Save,
  ChevronRight,
  CheckCircle,
  Pencil,
  Trash2,
  GitMerge,
  X,
} from 'lucide-react';

const PIPELINE_STEPS = ['Source', 'Filter', 'Join', 'Aggregate', 'Output'];

const DATA_SOURCES = [
  {
    id: 1,
    name: 'HA+ Data Hub',
    icon: Database,
    status: 'เชื่อมต่อแล้ว',
    lastSync: '17 มิ.ย. 2567 08:00',
    rows: '45,230',
  },
  {
    id: 2,
    name: 'ระบบการเงิน',
    icon: DollarSign,
    status: 'เชื่อมต่อแล้ว',
    lastSync: '17 มิ.ย. 2567 07:30',
    rows: '12,840',
  },
  {
    id: 3,
    name: 'ระบบพัสดุ',
    icon: Package,
    status: 'เชื่อมต่อแล้ว',
    lastSync: '17 มิ.ย. 2567 07:45',
    rows: '8,920',
  },
  {
    id: 4,
    name: 'NHSO',
    icon: Activity,
    status: 'เชื่อมต่อแล้ว',
    lastSync: '17 มิ.ย. 2567 06:00',
    rows: '128,500',
  },
];

const ACCESS_MODE_OPTIONS = ['Live / Direct Query', 'Import / Cached', 'Hybrid'];
const LOAD_TYPE_OPTIONS = ['Incremental', 'Full Refresh', 'Append Only'];
const REFRESH_CYCLE_OPTIONS = ['ทุก 15 นาที', 'ทุก 30 นาที', 'ทุก 1 ชั่วโมง', 'ทุก 6 ชั่วโมง', 'ทุกวัน'];

const DEFAULT_SOURCE_CONFIGS = Object.fromEntries(
  DATA_SOURCES.map((s) => [
    s.id,
    { accessMode: 'Live / Direct Query', loadType: 'Incremental', refreshCycle: 'ทุก 15 นาที' },
  ])
);

const INITIAL_PIPELINES = [
  {
    id: 1,
    name: 'Hospital Accreditation Summary',
    source: 'HA+ Data Hub',
    steps: ['Source', 'Filter', 'Aggregate', 'Output'],
    output: '12,450 แถว',
    updatedAt: '17 มิ.ย. 2567 08:15',
    status: 'สำเร็จ',
  },
  {
    id: 2,
    name: 'Financial + Accreditation Join',
    source: 'HA+ Data Hub, ระบบการเงิน',
    steps: ['Source', 'Join', 'Filter', 'Output'],
    output: '8,230 แถว',
    updatedAt: '16 มิ.ย. 2567 22:00',
    status: 'สำเร็จ',
  },
  {
    id: 3,
    name: 'NHSO Regional Report',
    source: 'NHSO',
    steps: ['Source', 'Filter', 'Aggregate', 'Output'],
    output: '3,120 แถว',
    updatedAt: '16 มิ.ย. 2567 18:30',
    status: 'สำเร็จ',
  },
  {
    id: 4,
    name: 'Procurement vs Budget',
    source: 'ระบบพัสดุ, ระบบการเงิน',
    steps: ['Source', 'Join', 'Output'],
    output: '5,680 แถว',
    updatedAt: '15 มิ.ย. 2567 14:00',
    status: 'สำเร็จ',
  },
];

const TABLE_OPTIONS = [
  { value: 'ha_data_hub', label: 'HA+ Data Hub' },
  { value: 'financial', label: 'ระบบการเงิน' },
  { value: 'procurement', label: 'ระบบพัสดุ' },
  { value: 'nhso', label: 'NHSO' },
];

const FIELD_OPTIONS = [
  { value: 'hospital_id', label: 'hospital_id' },
  { value: 'hospital_name', label: 'hospital_name' },
  { value: 'region', label: 'region' },
  { value: 'accreditation_score', label: 'accreditation_score' },
  { value: 'financial_year', label: 'financial_year' },
  { value: 'budget_used', label: 'budget_used' },
];

const OPERATOR_OPTIONS = [
  { value: '=', label: '=' },
  { value: '!=', label: '!=' },
  { value: '>', label: '>' },
  { value: '<', label: '<' },
  { value: '>=', label: '>=' },
  { value: '<=', label: '<=' },
];

const AGG_FUNCTIONS = ['SUM', 'AVG', 'COUNT', 'MAX', 'MIN'];

const PREVIEW_ROWS = [
  { hospital_id: 'H001', hospital_name: 'รพ.ศิริราช', region: 'กลาง', accreditation_score: 92, financial_year: 2566 },
  { hospital_id: 'H002', hospital_name: 'รพ.จุฬา', region: 'กลาง', accreditation_score: 88, financial_year: 2566 },
  { hospital_id: 'H003', hospital_name: 'รพ.เชียงใหม่', region: 'เหนือ', accreditation_score: 85, financial_year: 2566 },
  { hospital_id: 'H004', hospital_name: 'รพ.ขอนแก่น', region: 'ตะวันออกเฉียงเหนือ', accreditation_score: 79, financial_year: 2566 },
  { hospital_id: 'H005', hospital_name: 'รพ.สงขลา', region: 'ใต้', accreditation_score: 83, financial_year: 2566 },
];

const OUTPUT_ROWS = [
  { hospital_id: 'H001', hospital_name: 'รพ.ศิริราช', region: 'กลาง', accreditation_score: 92, financial_year: 2566, budget_used: '98.2%' },
  { hospital_id: 'H002', hospital_name: 'รพ.จุฬา', region: 'กลาง', accreditation_score: 88, financial_year: 2566, budget_used: '95.7%' },
  { hospital_id: 'H003', hospital_name: 'รพ.เชียงใหม่', region: 'เหนือ', accreditation_score: 85, financial_year: 2566, budget_used: '91.3%' },
  { hospital_id: 'H004', hospital_name: 'รพ.ขอนแก่น', region: 'ตะวันออกเฉียงเหนือ', accreditation_score: 79, financial_year: 2566, budget_used: '87.6%' },
  { hospital_id: 'H005', hospital_name: 'รพ.สงขลา', region: 'ใต้', accreditation_score: 83, financial_year: 2566, budget_used: '89.4%' },
  { hospital_id: 'H006', hospital_name: 'รพ.นครราชสีมา', region: 'ตะวันออกเฉียงเหนือ', accreditation_score: 76, financial_year: 2566, budget_used: '84.1%' },
  { hospital_id: 'H007', hospital_name: 'รพ.หาดใหญ่', region: 'ใต้', accreditation_score: 81, financial_year: 2566, budget_used: '92.0%' },
  { hospital_id: 'H008', hospital_name: 'รพ.พิษณุโลก', region: 'เหนือ', accreditation_score: 78, financial_year: 2566, budget_used: '86.5%' },
  { hospital_id: 'H009', hospital_name: 'รพ.อุดรธานี', region: 'ตะวันออกเฉียงเหนือ', accreditation_score: 74, financial_year: 2566, budget_used: '82.3%' },
  { hospital_id: 'H010', hospital_name: 'รพ.ชลบุรี', region: 'ตะวันออก', accreditation_score: 86, financial_year: 2566, budget_used: '94.8%' },
];

const DEFAULT_FILTER_ROWS = [
  { field: 'region', operator: '=', value: 'กลาง' },
  { field: 'accreditation_score', operator: '>=', value: '75' },
  { field: 'financial_year', operator: '=', value: '2566' },
];

const DEFAULT_AGG_METRICS = [
  { field: 'accreditation_score', func: 'AVG' },
  { field: 'budget_used', func: 'SUM' },
  { field: 'hospital_id', func: 'COUNT' },
];

export default function DataPrep() {
  const [activeStep, setActiveStep] = useState('Source');
  const [activeTransformTab, setActiveTransformTab] = useState('join');
  const [sourceConfigs, setSourceConfigs] = useState(DEFAULT_SOURCE_CONFIGS);
  const [pipelines, setPipelines] = useState(INITIAL_PIPELINES);
  const [editingPipeline, setEditingPipeline] = useState(null);
  const [modalStep, setModalStep] = useState('Source');
  const [modalTransformTab, setModalTransformTab] = useState('join');
  const [modalShowPreview, setModalShowPreview] = useState(false);

  const updateSourceConfig = (id, key, value) => {
    setSourceConfigs((prev) => ({ ...prev, [id]: { ...prev[id], [key]: value } }));
  };

  const openEditModal = (pipeline) => {
    setEditingPipeline(pipeline);
    setModalStep('Source');
    setModalTransformTab('join');
    setModalShowPreview(false);
  };

  const closeEditModal = () => setEditingPipeline(null);

  const modalStepTabMap = { Source: 'join', Filter: 'filter', Join: 'join', Aggregate: 'aggregate', Output: 'join' };

  const handleModalStepClick = (step) => {
    setModalStep(step);
    setModalTransformTab(modalStepTabMap[step] || 'join');
  };

  const deletePipeline = (id) => {
    setPipelines((prev) => prev.filter((p) => p.id !== id));
  };
  const [filterRows, setFilterRows] = useState(DEFAULT_FILTER_ROWS);
  const [showPreview, setShowPreview] = useState(false);
  const [joinConfig, setJoinConfig] = useState({
    leftTable: 'ha_data_hub',
    rightTable: 'financial',
    joinType: 'inner',
    joinKey: 'hospital_id',
  });
  const [aggConfig, setAggConfig] = useState({
    groupBy: 'region',
    metrics: DEFAULT_AGG_METRICS,
  });

  const addFilterRow = () => {
    if (filterRows.length < 5) {
      setFilterRows([...filterRows, { field: 'hospital_id', operator: '=', value: '' }]);
    }
  };

  const updateFilterRow = (index, key, value) => {
    const updated = filterRows.map((row, i) => (i === index ? { ...row, [key]: value } : row));
    setFilterRows(updated);
  };

  const removeFilterRow = (index) => {
    setFilterRows(filterRows.filter((_, i) => i !== index));
  };

  const updateAggMetric = (index, key, value) => {
    const updated = aggConfig.metrics.map((m, i) => (i === index ? { ...m, [key]: value } : m));
    setAggConfig({ ...aggConfig, metrics: updated });
  };

  const stepTabMap = {
    Source: 'join',
    Filter: 'filter',
    Join: 'join',
    Aggregate: 'aggregate',
    Output: 'join',
  };

  const handleStepClick = (step) => {
    setActiveStep(step);
    setActiveTransformTab(stepTabMap[step] || 'join');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Data Preparation</h1>
            <p className="text-gray-500 mt-1">จัดเตรียม ทำความสะอาด และแปลงข้อมูลก่อนนำไปวิเคราะห์</p>
          </div>
        </div>
      </div>

      {/* Section 1: Data Sources */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">แหล่งข้อมูล</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DATA_SOURCES.map((source) => {
            const Icon = source.icon;
            return (
              <div
                key={source.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    {source.status}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-2">{source.name}</h3>
                <div className="space-y-1 mb-3">
                  <p className="text-xs text-gray-500">
                    อัปเดตล่าสุด: <span className="text-gray-700">{source.lastSync}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    จำนวนแถว:{' '}
                    <span className="text-blue-600 font-medium">{source.rows}</span>
                  </p>
                </div>
                <div className="border-t border-gray-100 pt-2 space-y-1.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs text-gray-400 shrink-0">Access Mode</span>
                    <select
                      value={sourceConfigs[source.id].accessMode}
                      onChange={(e) => updateSourceConfig(source.id, 'accessMode', e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-blue-700 bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer max-w-[130px]"
                    >
                      {ACCESS_MODE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs text-gray-400 shrink-0">Load Type</span>
                    <select
                      value={sourceConfigs[source.id].loadType}
                      onChange={(e) => updateSourceConfig(source.id, 'loadType', e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-purple-700 bg-purple-50 border border-purple-200 rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-purple-400 cursor-pointer max-w-[130px]"
                    >
                      {LOAD_TYPE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs text-gray-400 shrink-0">Refresh Cycle</span>
                    <select
                      value={sourceConfigs[source.id].refreshCycle}
                      onChange={(e) => updateSourceConfig(source.id, 'refreshCycle', e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-green-700 bg-green-50 border border-green-200 rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-green-400 cursor-pointer max-w-[130px]"
                    >
                      {REFRESH_CYCLE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* Section 2: Pipelines Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GitMerge className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Pipeline ทั้งหมด</h2>
            <span className="bg-indigo-100 text-indigo-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {pipelines.length} รายการ
            </span>
          </div>
          <button
            onClick={() => alert('สร้าง Pipeline ใหม่')}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            สร้างใหม่
          </button>
        </div>

        {pipelines.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">ยังไม่มี Pipeline — กดสร้างใหม่เพื่อเริ่มต้น</p>
        ) : (
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">ชื่อ Pipeline</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">แหล่งข้อมูล</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">ขั้นตอน</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">ผลลัพธ์</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">อัปเดตล่าสุด</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">สถานะ</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pipelines.map((pipeline) => (
                  <tr key={pipeline.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 max-w-[200px]">
                      {pipeline.name}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{pipeline.source}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 flex-wrap">
                        {pipeline.steps.map((step, i) => (
                          <span key={i} className="flex items-center gap-0.5">
                            <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{step}</span>
                            {i < pipeline.steps.length - 1 && (
                              <ArrowRight className="w-3 h-3 text-gray-300" />
                            )}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{pipeline.output}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{pipeline.updatedAt}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                        {pipeline.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditModal(pipeline)}
                          title="แก้ไข"
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => alert(`กำลังส่งออก "${pipeline.name}"...`)}
                          title="ส่งออก CSV"
                          className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`ลบ Pipeline "${pipeline.name}" ?`)) deletePipeline(pipeline.id);
                          }}
                          title="ลบ"
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Pipeline Modal */}
      {editingPipeline && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-900">แก้ไข Pipeline</h2>
                <span className="text-sm text-gray-400 font-normal">— {editingPipeline.name}</span>
              </div>
              <button
                onClick={closeEditModal}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {/* Pipeline Steps */}
              <div className="flex items-center gap-1 mb-5 overflow-x-auto pb-1">
                {PIPELINE_STEPS.map((step, index) => (
                  <div key={step} className="flex items-center flex-shrink-0">
                    <button
                      onClick={() => handleModalStepClick(step)}
                      className={`px-4 py-2.5 rounded-lg border-2 font-medium text-sm transition-all ${
                        modalStep === step
                          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600'
                      }`}
                    >
                      {step}
                    </button>
                    {index < PIPELINE_STEPS.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-gray-400 mx-1" />
                    )}
                  </div>
                ))}
              </div>

              {/* Output Table inside modal */}
              {modalStep === 'Output' && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-gray-800">ผลลัพธ์</span>
                      <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">12,450 แถว</span>
                    </div>
                    <button
                      onClick={() => alert('กำลังส่งออกไฟล์...')}
                      className="flex items-center gap-1.5 border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium"
                    >
                      <Download className="w-3.5 h-3.5" />
                      ส่งออก CSV
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          {['hospital_id', 'hospital_name', 'region', 'accreditation_score', 'financial_year', 'budget_used'].map((col) => (
                            <th key={col} className="text-left px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wide">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {OUTPUT_ROWS.map((row, i) => (
                          <tr key={i} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-2.5 font-mono text-xs text-gray-500">{row.hospital_id}</td>
                            <td className="px-4 py-2.5 text-gray-900 font-medium">{row.hospital_name}</td>
                            <td className="px-4 py-2.5 text-gray-600">{row.region}</td>
                            <td className="px-4 py-2.5">
                              <span className={`font-semibold ${row.accreditation_score >= 85 ? 'text-green-600' : row.accreditation_score >= 75 ? 'text-yellow-600' : 'text-red-500'}`}>
                                {row.accreditation_score}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-gray-600">{row.financial_year}</td>
                            <td className="px-4 py-2.5 text-gray-900">{row.budget_used}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Transform Tabs inside modal */}
              {modalStep !== 'Output' && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex border-b border-gray-200 bg-gray-50">
                    {[
                      { id: 'join', label: 'รวมข้อมูล (Join/Merge)' },
                      { id: 'filter', label: 'กรองข้อมูล (Filter)' },
                      { id: 'aggregate', label: 'สรุปข้อมูล (Aggregate)' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setModalTransformTab(tab.id)}
                        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                          modalTransformTab === tab.id
                            ? 'border-blue-500 text-blue-600 bg-white'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  <div className="p-5">
                    {/* Join */}
                    {modalTransformTab === 'join' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">ตารางซ้าย (Left Table)</label>
                            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                              {TABLE_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">ตารางขวา (Right Table)</label>
                            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                              {TABLE_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">ประเภทการรวม (Join Type)</label>
                          <div className="flex gap-4">
                            {['inner', 'left', 'right'].map((type) => (
                              <label key={type} className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="modalJoinType" value={type} defaultChecked={type === 'inner'} className="accent-blue-600" />
                                <span className="text-sm text-gray-700 capitalize">{type.charAt(0).toUpperCase() + type.slice(1)} Join</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Join Key</label>
                          <select className="w-full max-w-xs border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            {FIELD_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                          </select>
                        </div>
                      </div>
                    )}
                    {/* Filter */}
                    {modalTransformTab === 'filter' && (
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">กำหนดเงื่อนไขการกรองข้อมูล (สูงสุด 5 เงื่อนไข)</p>
                        {DEFAULT_FILTER_ROWS.map((row, index) => (
                          <div key={index} className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm text-gray-500 w-6 text-right">{index + 1}.</span>
                            <select defaultValue={row.field} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                              {FIELD_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                            <select defaultValue={row.operator} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-20">
                              {OPERATOR_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                            <input type="text" defaultValue={row.value} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-36" />
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Aggregate */}
                    {modalTransformTab === 'aggregate' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">จัดกลุ่มตาม (Group By)</label>
                          <select className="w-full max-w-xs border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            {FIELD_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">ค่าที่ต้องการ (Metrics)</label>
                          <div className="space-y-2">
                            {DEFAULT_AGG_METRICS.map((metric, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <span className="text-sm text-gray-500 w-6">{index + 1}.</span>
                                <select defaultValue={metric.field} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                  {FIELD_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                                <select defaultValue={metric.func} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-28">
                                  {AGG_FUNCTIONS.map((fn) => <option key={fn} value={fn}>{fn}</option>)}
                                </select>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Preview */}
              {modalStep !== 'Output' && (
                <div className="mt-4">
                  <button
                    onClick={() => setModalShowPreview(!modalShowPreview)}
                    className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    {modalShowPreview ? 'ซ่อน Preview' : 'Preview ข้อมูล'}
                  </button>
                  {modalShowPreview && (
                    <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                        <span className="text-sm font-medium text-gray-700">ตัวอย่างข้อมูล (5 แถวแรก)</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              {['hospital_id', 'hospital_name', 'region', 'accreditation_score', 'financial_year'].map((col) => (
                                <th key={col} className="text-left px-4 py-2 text-gray-600 font-medium text-xs">{col}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {PREVIEW_ROWS.map((row, i) => (
                              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-4 py-2 text-gray-600 font-mono text-xs">{row.hospital_id}</td>
                                <td className="px-4 py-2 text-gray-900">{row.hospital_name}</td>
                                <td className="px-4 py-2 text-gray-600">{row.region}</td>
                                <td className="px-4 py-2 text-gray-900 font-medium">{row.accreditation_score}</td>
                                <td className="px-4 py-2 text-gray-600">{row.financial_year}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => { alert('บันทึกการแก้ไขแล้ว'); closeEditModal(); }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                บันทึก Pipeline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
