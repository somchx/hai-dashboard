import { useState } from 'react';
import {
  Database,
  Plus,
  Link,
  Calculator,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  GitBranch,
  Table2,
  Code,
} from 'lucide-react';

const ENTITY_DEFINITIONS = [
  {
    id: 'hospitals',
    name: 'hospitals',
    color: 'blue',
    fields: [
      { name: 'hospital_id', type: 'INT', pk: true },
      { name: 'hospital_name', type: 'VARCHAR(255)' },
      { name: 'region', type: 'VARCHAR(100)' },
      { name: 'type', type: 'VARCHAR(50)' },
      { name: 'province', type: 'VARCHAR(100)' },
    ],
    connectedTo: [
      { table: 'accreditation_records', cardinality: '1:N' },
      { table: 'financial_data', cardinality: '1:N' },
      { table: 'survey_results', cardinality: '1:N' },
    ],
  },
  {
    id: 'accreditation_records',
    name: 'accreditation_records',
    color: 'purple',
    fields: [
      { name: 'record_id', type: 'INT', pk: true },
      { name: 'hospital_id', type: 'INT', fk: true },
      { name: 'score', type: 'DECIMAL(5,2)' },
      { name: 'level', type: 'VARCHAR(20)' },
      { name: 'date_certified', type: 'DATE' },
    ],
    connectedTo: [],
  },
  {
    id: 'financial_data',
    name: 'financial_data',
    color: 'green',
    fields: [
      { name: 'finance_id', type: 'INT', pk: true },
      { name: 'hospital_id', type: 'INT', fk: true },
      { name: 'year', type: 'INT' },
      { name: 'budget', type: 'DECIMAL(15,2)' },
      { name: 'actual_spend', type: 'DECIMAL(15,2)' },
    ],
    connectedTo: [],
  },
  {
    id: 'survey_results',
    name: 'survey_results',
    color: 'orange',
    fields: [
      { name: 'survey_id', type: 'INT', pk: true },
      { name: 'hospital_id', type: 'INT', fk: true },
      { name: 'surveyor', type: 'VARCHAR(255)' },
      { name: 'date', type: 'DATE' },
      { name: 'score', type: 'DECIMAL(5,2)' },
    ],
    connectedTo: [],
  },
];

const TABLE_OPTIONS = [
  { value: 'hospitals', label: 'hospitals' },
  { value: 'accreditation_records', label: 'accreditation_records' },
  { value: 'financial_data', label: 'financial_data' },
  { value: 'survey_results', label: 'survey_results' },
];

const FIELD_OPTIONS = [
  { value: 'hospital_id', label: 'hospital_id' },
  { value: 'record_id', label: 'record_id' },
  { value: 'finance_id', label: 'finance_id' },
  { value: 'survey_id', label: 'survey_id' },
  { value: 'score', label: 'score' },
];

const RELATION_TYPES = [
  { value: '1:1', label: 'One-to-One (1:1)' },
  { value: '1:N', label: 'One-to-Many (1:N)' },
  { value: 'N:M', label: 'Many-to-Many (N:M)' },
];

const DATA_TYPE_OPTIONS = [
  { value: 'Number', label: 'Number' },
  { value: 'Percentage', label: 'Percentage' },
  { value: 'Text', label: 'Text' },
];

const INITIAL_RELATIONSHIPS = [
  {
    id: 1,
    table1: 'hospitals',
    field1: 'hospital_id',
    relationType: '1:N',
    table2: 'accreditation_records',
    field2: 'hospital_id',
  },
  {
    id: 2,
    table1: 'hospitals',
    field1: 'hospital_id',
    relationType: '1:N',
    table2: 'financial_data',
    field2: 'hospital_id',
  },
  {
    id: 3,
    table1: 'hospitals',
    field1: 'hospital_id',
    relationType: '1:N',
    table2: 'survey_results',
    field2: 'hospital_id',
  },
];

const INITIAL_CALC_FIELDS = [
  {
    id: 1,
    name: 'Hospital Pass Rate',
    formula: '(certified / total) * 100',
    result: '75.1%',
    dataType: 'Percentage',
  },
  {
    id: 2,
    name: 'Accreditation Score Index',
    formula: 'weighted_avg(12 dimensions)',
    result: '83.5',
    dataType: 'Number',
  },
  {
    id: 3,
    name: 'Risk Score',
    formula: '100 - quality_index',
    result: 'various',
    dataType: 'Number',
  },
];

const COLOR_MAP = {
  blue: {
    header: 'bg-blue-600',
    border: 'border-blue-300',
    badge: 'bg-blue-100 text-blue-700',
  },
  purple: {
    header: 'bg-purple-600',
    border: 'border-purple-300',
    badge: 'bg-purple-100 text-purple-700',
  },
  green: {
    header: 'bg-green-600',
    border: 'border-green-300',
    badge: 'bg-green-100 text-green-700',
  },
  orange: {
    header: 'bg-orange-500',
    border: 'border-orange-300',
    badge: 'bg-orange-100 text-orange-700',
  },
};

const RELATION_TYPE_BADGE = {
  '1:N': 'bg-blue-100 text-blue-700',
  '1:1': 'bg-purple-100 text-purple-700',
  'N:M': 'bg-orange-100 text-orange-700',
};

export default function DataModeling() {
  const [activeRightTab, setActiveRightTab] = useState('relationships');
  const [showRelationForm, setShowRelationForm] = useState(false);
  const [showCalcFieldForm, setShowCalcFieldForm] = useState(false);
  const [relationships, setRelationships] = useState(INITIAL_RELATIONSHIPS);
  const [calcFields, setCalcFields] = useState(INITIAL_CALC_FIELDS);
  const [formulaValid, setFormulaValid] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);

  const [newRelation, setNewRelation] = useState({
    table1: 'hospitals',
    field1: 'hospital_id',
    relationType: '1:N',
    table2: 'accreditation_records',
    field2: 'hospital_id',
  });

  const [newCalcField, setNewCalcField] = useState({
    name: '',
    formula: '',
    dataType: 'Number',
  });

  const handleSaveRelation = () => {
    if (!newRelation.table1 || !newRelation.table2) return;
    setRelationships([...relationships, { id: Date.now(), ...newRelation }]);
    setShowRelationForm(false);
    setNewRelation({
      table1: 'hospitals',
      field1: 'hospital_id',
      relationType: '1:N',
      table2: 'accreditation_records',
      field2: 'hospital_id',
    });
  };

  const handleSaveCalcField = () => {
    if (!newCalcField.name || !newCalcField.formula) return;
    setCalcFields([
      ...calcFields,
      {
        id: Date.now(),
        name: newCalcField.name,
        formula: newCalcField.formula,
        result: '—',
        dataType: newCalcField.dataType,
      },
    ]);
    setShowCalcFieldForm(false);
    setFormulaValid(false);
    setNewCalcField({ name: '', formula: '', dataType: 'Number' });
  };

  const handleVerifyFormula = () => {
    if (newCalcField.formula.trim().length > 0) {
      setFormulaValid(true);
    } else {
      setFormulaValid(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Data Modeling</h1>
            <p className="text-gray-500 text-sm mt-0.5">
              ออกแบบโครงสร้างข้อมูล ความสัมพันธ์ และ Calculated Fields
            </p>
          </div>
          <button
            onClick={() => alert('เพิ่ม Entity ใหม่')}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            เพิ่ม Entity
          </button>
        </div>
      </div>

      {/* Main Content: Canvas + Right Panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Canvas Area */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="flex items-center gap-2 mb-5">
            <Table2 className="w-5 h-5 text-gray-600" />
            <h2 className="text-base font-semibold text-gray-700">Data Modeling Canvas</h2>
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              {ENTITY_DEFINITIONS.length} entities
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ENTITY_DEFINITIONS.map((entity) => {
              const colors = COLOR_MAP[entity.color];
              const isSelected = selectedEntity === entity.id;
              return (
                <div
                  key={entity.id}
                  onClick={() => setSelectedEntity(isSelected ? null : entity.id)}
                  className={`bg-white rounded-xl border-2 shadow-sm cursor-pointer transition-all hover:shadow-md ${
                    isSelected
                      ? `${colors.border} shadow-md`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Entity Header */}
                  <div
                    className={`${colors.header} text-white px-4 py-2.5 rounded-t-[10px] flex items-center gap-2`}
                  >
                    <Database className="w-4 h-4" />
                    <span className="font-semibold text-sm font-mono">{entity.name}</span>
                  </div>

                  {/* Fields */}
                  <div className="divide-y divide-gray-100">
                    {entity.fields.map((field) => (
                      <div key={field.name} className="flex items-center gap-2 px-4 py-2">
                        <div
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            field.pk
                              ? 'bg-yellow-400'
                              : field.fk
                              ? 'bg-blue-400'
                              : 'bg-gray-300'
                          }`}
                        />
                        <span className="font-mono text-xs text-gray-800 flex-1">{field.name}</span>
                        <span className="text-xs text-gray-400 font-mono">{field.type}</span>
                        {field.pk && (
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded font-medium">
                            PK
                          </span>
                        )}
                        {field.fk && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                            FK
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Connections */}
                  {entity.connectedTo.length > 0 && (
                    <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50 rounded-b-[10px]">
                      <div className="flex flex-wrap gap-2">
                        {entity.connectedTo.map((conn) => (
                          <span
                            key={conn.table}
                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.badge} flex items-center gap-1`}
                          >
                            <GitBranch className="w-3 h-3" />
                            {'->'} {conn.table} ({conn.cardinality})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-5 flex items-center gap-5 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              Primary Key (PK)
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              Foreign Key (FK)
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              Field
            </div>
            <div className="flex items-center gap-1.5">
              <GitBranch className="w-3 h-3" />
              Relationship
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-80 flex-shrink-0 bg-white border-l border-gray-200 flex flex-col">
          {/* Right Panel Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveRightTab('relationships')}
              className={`flex-1 px-3 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                activeRightTab === 'relationships'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Link className="w-4 h-4" />
              ความสัมพันธ์
            </button>
            <button
              onClick={() => setActiveRightTab('calcfields')}
              className={`flex-1 px-3 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                activeRightTab === 'calcfields'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Calculator className="w-4 h-4" />
              Calc Fields
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {/* Relationships Tab */}
            {activeRightTab === 'relationships' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-gray-800">
                    ความสัมพันธ์ (Relationships)
                  </h3>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                    {relationships.length}
                  </span>
                </div>

                {/* Relationship List */}
                {relationships.map((rel) => (
                  <div
                    key={rel.id}
                    className="border border-gray-200 rounded-lg p-3 bg-gray-50 hover:bg-white hover:border-blue-200 transition-all"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="font-mono text-xs font-semibold text-gray-800">
                        {rel.table1}
                      </span>
                      <span className="text-gray-400 text-xs">{'→'}</span>
                      <span className="font-mono text-xs font-semibold text-gray-800">
                        {rel.table2}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          RELATION_TYPE_BADGE[rel.relationType] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {rel.relationType === '1:N'
                          ? 'One-to-Many'
                          : rel.relationType === '1:1'
                          ? 'One-to-One'
                          : 'Many-to-Many'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5 font-mono">
                      via {rel.field1} = {rel.field2}
                    </p>
                  </div>
                ))}

                {/* Add Relationship Button */}
                <button
                  onClick={() => setShowRelationForm(!showRelationForm)}
                  className="w-full flex items-center justify-between border border-dashed border-gray-300 rounded-lg px-3 py-2.5 text-sm text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all font-medium"
                >
                  <span className="flex items-center gap-1.5">
                    <Plus className="w-4 h-4" />
                    เพิ่มความสัมพันธ์
                  </span>
                  {showRelationForm ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {/* Relation Form */}
                {showRelationForm && (
                  <div className="border border-blue-200 rounded-lg p-3 bg-blue-50 space-y-3">
                    <h4 className="text-xs font-semibold text-blue-800 uppercase tracking-wide">
                      กำหนดความสัมพันธ์ใหม่
                    </h4>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        ตารางที่ 1
                      </label>
                      <select
                        value={newRelation.table1}
                        onChange={(e) =>
                          setNewRelation({ ...newRelation, table1: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        {TABLE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Field จากตาราง 1
                      </label>
                      <select
                        value={newRelation.field1}
                        onChange={(e) =>
                          setNewRelation({ ...newRelation, field1: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        {FIELD_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        ประเภทความสัมพันธ์
                      </label>
                      <select
                        value={newRelation.relationType}
                        onChange={(e) =>
                          setNewRelation({ ...newRelation, relationType: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        {RELATION_TYPES.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        ตารางที่ 2
                      </label>
                      <select
                        value={newRelation.table2}
                        onChange={(e) =>
                          setNewRelation({ ...newRelation, table2: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        {TABLE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Field จากตาราง 2
                      </label>
                      <select
                        value={newRelation.field2}
                        onChange={(e) =>
                          setNewRelation({ ...newRelation, field2: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        {FIELD_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={handleSaveRelation}
                        className="flex-1 bg-blue-600 text-white text-xs font-medium py-2 rounded hover:bg-blue-700 transition-colors"
                      >
                        บันทึก
                      </button>
                      <button
                        onClick={() => setShowRelationForm(false)}
                        className="flex-1 border border-gray-300 text-gray-600 text-xs font-medium py-2 rounded hover:bg-gray-100 transition-colors"
                      >
                        ยกเลิก
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Calculated Fields Tab */}
            {activeRightTab === 'calcfields' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-gray-800">Calculated Fields</h3>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                    {calcFields.length}
                  </span>
                </div>

                {/* Calc Field List */}
                {calcFields.map((field) => (
                  <div
                    key={field.id}
                    className="border border-gray-200 rounded-lg p-3 bg-gray-50 hover:bg-white hover:border-purple-200 transition-all"
                  >
                    <div className="flex items-start justify-between mb-1.5">
                      <span className="text-xs font-semibold text-gray-900">{field.name}</span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${
                          field.dataType === 'Percentage'
                            ? 'bg-green-100 text-green-700'
                            : field.dataType === 'Number'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {field.dataType}
                      </span>
                    </div>
                    <code className="text-xs text-purple-700 bg-purple-50 px-2 py-1 rounded block mb-1.5 font-mono break-all">
                      {field.formula}
                    </code>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span>ผลลัพธ์:</span>
                      <span className="font-semibold text-gray-800">{field.result}</span>
                    </div>
                  </div>
                ))}

                {/* Add Calc Field Button */}
                <button
                  onClick={() => {
                    setShowCalcFieldForm(!showCalcFieldForm);
                    setFormulaValid(false);
                  }}
                  className="w-full flex items-center justify-between border border-dashed border-gray-300 rounded-lg px-3 py-2.5 text-sm text-purple-600 hover:bg-purple-50 hover:border-purple-400 transition-all font-medium"
                >
                  <span className="flex items-center gap-1.5">
                    <Plus className="w-4 h-4" />
                    สร้าง Calculated Field ใหม่
                  </span>
                  {showCalcFieldForm ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {/* Calc Field Form */}
                {showCalcFieldForm && (
                  <div className="border border-purple-200 rounded-lg p-3 bg-purple-50 space-y-3">
                    <h4 className="text-xs font-semibold text-purple-800 uppercase tracking-wide flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5" />
                      สร้าง Calculated Field
                    </h4>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        ชื่อ Field
                      </label>
                      <input
                        type="text"
                        value={newCalcField.name}
                        onChange={(e) =>
                          setNewCalcField({ ...newCalcField, name: e.target.value })
                        }
                        placeholder="เช่น: Hospital Pass Rate"
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        สูตร (Formula)
                      </label>
                      <textarea
                        value={newCalcField.formula}
                        onChange={(e) => {
                          setNewCalcField({ ...newCalcField, formula: e.target.value });
                          setFormulaValid(false);
                        }}
                        placeholder="เช่น: (certified / total) * 100"
                        rows={3}
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white font-mono resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        ประเภทข้อมูล
                      </label>
                      <select
                        value={newCalcField.dataType}
                        onChange={(e) =>
                          setNewCalcField({ ...newCalcField, dataType: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                      >
                        {DATA_TYPE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Verify Formula Button */}
                    <button
                      onClick={handleVerifyFormula}
                      className="w-full flex items-center justify-center gap-1.5 border border-purple-300 text-purple-700 bg-white text-xs font-medium py-2 rounded hover:bg-purple-100 transition-colors"
                    >
                      <Code className="w-3.5 h-3.5" />
                      ตรวจสอบสูตร
                    </button>

                    {/* Formula validation feedback */}
                    {formulaValid && (
                      <div className="flex items-center gap-1.5 text-green-700 text-xs bg-green-50 border border-green-200 rounded px-2.5 py-2">
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="font-medium">สูตรถูกต้อง</span>
                      </div>
                    )}
                    {!formulaValid && newCalcField.formula.length > 0 && (
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs bg-gray-50 border border-gray-200 rounded px-2.5 py-2">
                        <XCircle className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                        <span>กดตรวจสอบสูตรก่อนบันทึก</span>
                      </div>
                    )}

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={handleSaveCalcField}
                        disabled={!newCalcField.name || !newCalcField.formula}
                        className="flex-1 bg-purple-600 text-white text-xs font-medium py-2 rounded hover:bg-purple-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        บันทึก
                      </button>
                      <button
                        onClick={() => {
                          setShowCalcFieldForm(false);
                          setFormulaValid(false);
                          setNewCalcField({ name: '', formula: '', dataType: 'Number' });
                        }}
                        className="flex-1 border border-gray-300 text-gray-600 text-xs font-medium py-2 rounded hover:bg-gray-100 transition-colors"
                      >
                        ยกเลิก
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
