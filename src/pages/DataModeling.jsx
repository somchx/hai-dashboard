import { useMemo, useState } from 'react';
import {
  Calculator,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Code,
  Database,
  FolderTree,
  GitBranch,
  Layers,
  Link,
  Plus,
  Table2,
  XCircle,
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
      { name: 'hospital_type', type: 'VARCHAR(50)' },
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
  { value: 'year', label: 'year' },
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
  {
    id: 4,
    table1: 'accreditation_records',
    field1: 'record_id',
    relationType: '1:1',
    table2: 'survey_results',
    field2: 'survey_id',
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

const HIERARCHIES = [
  {
    id: 1,
    name: 'Geography Hierarchy',
    path: 'ประเทศ > ภาค > จังหวัด > โรงพยาบาล',
    dimension: 'Location',
  },
  {
    id: 2,
    name: 'Time Hierarchy',
    path: 'ปีงบประมาณ > ไตรมาส > เดือน',
    dimension: 'Time',
  },
  {
    id: 3,
    name: 'Service Hierarchy',
    path: 'กลุ่มบริการ > ประเภทบริการ > รายการ',
    dimension: 'Service',
  },
];

const DIMENSIONS = [
  { name: 'Location Dimension', detail: 'region, province, hospital_name' },
  { name: 'Time Dimension', detail: 'year, quarter, month' },
  { name: 'Performance Dimension', detail: 'score, level, accreditation_type' },
  { name: 'Financial Dimension', detail: 'budget, actual_spend, utilization' },
];

const MODELING_CAPABILITIES = [
  'One-to-One',
  'One-to-Many',
  'Many-to-Many',
  'Hierarchies',
  'Categories',
  'Dimensions',
  'Calculated Fields',
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

function relationshipLabel(value) {
  if (value === '1:N') return 'One-to-Many';
  if (value === '1:1') return 'One-to-One';
  return 'Many-to-Many';
}

export default function DataModeling() {
  const [activeRightTab, setActiveRightTab] = useState('relationships');
  const [showRelationForm, setShowRelationForm] = useState(false);
  const [showCalcFieldForm, setShowCalcFieldForm] = useState(false);
  const [relationships, setRelationships] = useState(INITIAL_RELATIONSHIPS);
  const [calcFields, setCalcFields] = useState(INITIAL_CALC_FIELDS);
  const [formulaValid, setFormulaValid] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [selectedHierarchy, setSelectedHierarchy] = useState(HIERARCHIES[0].id);

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

  const summaryCards = useMemo(() => {
    const manyToManyCount = relationships.filter((item) => item.relationType === 'N:M').length;
    return [
      { label: 'Relationships', value: relationships.length },
      { label: 'Hierarchies', value: HIERARCHIES.length },
      { label: 'Dimensions', value: DIMENSIONS.length },
      { label: 'N:M Models', value: manyToManyCount },
    ];
  }, [relationships]);

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
    setFormulaValid(newCalcField.formula.trim().length > 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Data Modeling</h1>
            <p className="mt-1 text-sm text-gray-500">
              รองรับการกำหนดความสัมพันธ์ของข้อมูล การจัดกลุ่ม สร้างลำดับชั้น และจัดหมวดหมู่หรือมิติข้อมูลเพื่อการวิเคราะห์หลายมิติ
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Data Modeling', 'One-to-One / One-to-Many / Many-to-Many', 'Data Structuring'].map((item) => (
              <span key={item} className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-6 xl:grid-cols-[minmax(0,1fr),360px]">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            {summaryCards.map((card) => (
              <div key={card.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-gray-500">{card.label}</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            ))}
          </div>

          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Table2 className="h-5 w-5 text-gray-600" />
                <h2 className="text-base font-semibold text-gray-700">Data Modeling Canvas</h2>
              </div>
              <button
                onClick={() => alert('เพิ่ม Entity ใหม่')}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                เพิ่ม Entity
              </button>
            </div>

            <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              {MODELING_CAPABILITIES.map((capability) => (
                <div key={capability} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
                  {capability}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {ENTITY_DEFINITIONS.map((entity) => {
                const colors = COLOR_MAP[entity.color];
                const isSelected = selectedEntity === entity.id;

                return (
                  <div
                    key={entity.id}
                    onClick={() => setSelectedEntity(isSelected ? null : entity.id)}
                    className={`cursor-pointer rounded-xl border-2 bg-white shadow-sm transition-all hover:shadow-md ${
                      isSelected ? `${colors.border} shadow-md` : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`${colors.header} flex items-center gap-2 rounded-t-[10px] px-4 py-2.5 text-white`}>
                      <Database className="h-4 w-4" />
                      <span className="font-mono text-sm font-semibold">{entity.name}</span>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {entity.fields.map((field) => (
                        <div key={field.name} className="flex items-center gap-2 px-4 py-2">
                          <div className={`h-2 w-2 flex-shrink-0 rounded-full ${field.pk ? 'bg-yellow-400' : field.fk ? 'bg-blue-400' : 'bg-gray-300'}`} />
                          <span className="flex-1 font-mono text-xs text-gray-800">{field.name}</span>
                          <span className="font-mono text-xs text-gray-400">{field.type}</span>
                          {field.pk ? <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-700">PK</span> : null}
                          {field.fk ? <span className="rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-700">FK</span> : null}
                        </div>
                      ))}
                    </div>

                    {entity.connectedTo.length > 0 ? (
                      <div className="rounded-b-[10px] border-t border-gray-100 bg-gray-50 px-4 py-2.5">
                        <div className="flex flex-wrap gap-2">
                          {entity.connectedTo.map((connection) => (
                            <span key={connection.table} className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${colors.badge}`}>
                              <GitBranch className="h-3 w-3" />
                              {'->'} {connection.table} ({connection.cardinality})
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                Primary Key (PK)
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                Foreign Key (FK)
              </div>
              <div className="flex items-center gap-1.5">
                <GitBranch className="h-3 w-3" />
                Relationship
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <FolderTree className="h-5 w-5 text-emerald-600" />
              <h2 className="text-base font-semibold text-gray-800">Data Structuring</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr),320px]">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {HIERARCHIES.map((hierarchy) => (
                  <button
                    key={hierarchy.id}
                    onClick={() => setSelectedHierarchy(hierarchy.id)}
                    className={`rounded-xl border p-4 text-left transition-all ${
                      selectedHierarchy === hierarchy.id
                        ? 'border-emerald-400 bg-emerald-50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-emerald-300'
                    }`}
                  >
                    <p className="text-sm font-semibold text-gray-900">{hierarchy.name}</p>
                    <p className="mt-1 text-xs text-gray-500">{hierarchy.dimension}</p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{hierarchy.path}</p>
                  </button>
                ))}
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-sm font-semibold text-gray-800">Dimension Library</h3>
                </div>
                <div className="space-y-2">
                  {DIMENSIONS.map((dimension) => (
                    <div key={dimension.name} className="rounded-lg bg-white px-3 py-2">
                      <p className="text-xs font-semibold text-gray-800">{dimension.name}</p>
                      <p className="mt-1 text-[11px] text-gray-500">{dimension.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="flex min-h-0 flex-col rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveRightTab('relationships')}
              className={`flex flex-1 items-center justify-center gap-1.5 border-b-2 px-3 py-3 text-sm font-medium transition-colors ${
                activeRightTab === 'relationships'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Link className="h-4 w-4" />
              ความสัมพันธ์
            </button>
            <button
              onClick={() => setActiveRightTab('structuring')}
              className={`flex flex-1 items-center justify-center gap-1.5 border-b-2 px-3 py-3 text-sm font-medium transition-colors ${
                activeRightTab === 'structuring'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Layers className="h-4 w-4" />
              Structuring
            </button>
            <button
              onClick={() => setActiveRightTab('calcfields')}
              className={`flex flex-1 items-center justify-center gap-1.5 border-b-2 px-3 py-3 text-sm font-medium transition-colors ${
                activeRightTab === 'calcfields'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Calculator className="h-4 w-4" />
              Calc Fields
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {activeRightTab === 'relationships' ? (
              <div className="space-y-3">
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-800">Relationships</h3>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">{relationships.length}</span>
                </div>

                {relationships.map((rel) => (
                  <div key={rel.id} className="rounded-lg border border-gray-200 bg-gray-50 p-3 transition-all hover:border-blue-200 hover:bg-white">
                    <div className="mb-1.5 flex items-center gap-1.5">
                      <span className="font-mono text-xs font-semibold text-gray-800">{rel.table1}</span>
                      <span className="text-xs text-gray-400">{'→'}</span>
                      <span className="font-mono text-xs font-semibold text-gray-800">{rel.table2}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${RELATION_TYPE_BADGE[rel.relationType] || 'bg-gray-100 text-gray-600'}`}>
                        {relationshipLabel(rel.relationType)}
                      </span>
                    </div>
                    <p className="mt-1.5 font-mono text-xs text-gray-400">via {rel.field1} = {rel.field2}</p>
                  </div>
                ))}

                <button
                  onClick={() => setShowRelationForm(!showRelationForm)}
                  className="flex w-full items-center justify-between rounded-lg border border-dashed border-gray-300 px-3 py-2.5 text-sm font-medium text-blue-600 transition-all hover:border-blue-400 hover:bg-blue-50"
                >
                  <span className="flex items-center gap-1.5">
                    <Plus className="h-4 w-4" />
                    เพิ่มความสัมพันธ์
                  </span>
                  {showRelationForm ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>

                {showRelationForm ? (
                  <div className="space-y-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-blue-800">กำหนดความสัมพันธ์ใหม่</h4>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-600">ตารางที่ 1</label>
                      <select
                        value={newRelation.table1}
                        onChange={(e) => setNewRelation({ ...newRelation, table1: e.target.value })}
                        className="w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {TABLE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-600">Field จากตาราง 1</label>
                      <select
                        value={newRelation.field1}
                        onChange={(e) => setNewRelation({ ...newRelation, field1: e.target.value })}
                        className="w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {FIELD_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-600">ประเภทความสัมพันธ์</label>
                      <select
                        value={newRelation.relationType}
                        onChange={(e) => setNewRelation({ ...newRelation, relationType: e.target.value })}
                        className="w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {RELATION_TYPES.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-600">ตารางที่ 2</label>
                      <select
                        value={newRelation.table2}
                        onChange={(e) => setNewRelation({ ...newRelation, table2: e.target.value })}
                        className="w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {TABLE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-600">Field จากตาราง 2</label>
                      <select
                        value={newRelation.field2}
                        onChange={(e) => setNewRelation({ ...newRelation, field2: e.target.value })}
                        className="w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {FIELD_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button onClick={handleSaveRelation} className="flex-1 rounded bg-blue-600 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700">
                        บันทึก
                      </button>
                      <button onClick={() => setShowRelationForm(false)} className="flex-1 rounded border border-gray-300 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100">
                        ยกเลิก
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            {activeRightTab === 'structuring' ? (
              <div className="space-y-3">
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-800">Structuring</h3>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">{HIERARCHIES.length} hierarchies</span>
                </div>

                {HIERARCHIES.map((hierarchy) => (
                  <div key={hierarchy.id} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <div className="flex items-center gap-2">
                      <FolderTree className="h-4 w-4 text-emerald-600" />
                      <p className="text-xs font-semibold text-gray-800">{hierarchy.name}</p>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">{hierarchy.dimension}</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-700">{hierarchy.path}</p>
                  </div>
                ))}

                <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-3">
                  <p className="text-xs font-semibold text-emerald-700">Multi-dimensional Analysis Ready</p>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600">
                    ระบบรองรับการจัดกลุ่มข้อมูล สร้างลำดับชั้น และกำหนดมิติข้อมูลเพื่อการ drill-down และ slice-and-dice ในการวิเคราะห์หลายมิติ
                  </p>
                </div>
              </div>
            ) : null}

            {activeRightTab === 'calcfields' ? (
              <div className="space-y-3">
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-800">Calculated Fields</h3>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">{calcFields.length}</span>
                </div>

                {calcFields.map((field) => (
                  <div key={field.id} className="rounded-lg border border-gray-200 bg-gray-50 p-3 transition-all hover:border-purple-200 hover:bg-white">
                    <div className="mb-1.5 flex items-start justify-between">
                      <span className="text-xs font-semibold text-gray-900">{field.name}</span>
                      <span className={`ml-2 flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                        field.dataType === 'Percentage'
                          ? 'bg-green-100 text-green-700'
                          : field.dataType === 'Number'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-600'
                      }`}>
                        {field.dataType}
                      </span>
                    </div>
                    <code className="mb-1.5 block break-all rounded bg-purple-50 px-2 py-1 text-xs text-purple-700">{field.formula}</code>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span>ผลลัพธ์:</span>
                      <span className="font-semibold text-gray-800">{field.result}</span>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => {
                    setShowCalcFieldForm(!showCalcFieldForm);
                    setFormulaValid(false);
                  }}
                  className="flex w-full items-center justify-between rounded-lg border border-dashed border-gray-300 px-3 py-2.5 text-sm font-medium text-purple-600 transition-all hover:border-purple-400 hover:bg-purple-50"
                >
                  <span className="flex items-center gap-1.5">
                    <Plus className="h-4 w-4" />
                    สร้าง Calculated Field ใหม่
                  </span>
                  {showCalcFieldForm ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>

                {showCalcFieldForm ? (
                  <div className="space-y-3 rounded-lg border border-purple-200 bg-purple-50 p-3">
                    <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-purple-800">
                      <Code className="h-3.5 w-3.5" />
                      สร้าง Calculated Field
                    </h4>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-600">ชื่อ Field</label>
                      <input
                        type="text"
                        value={newCalcField.name}
                        onChange={(e) => setNewCalcField({ ...newCalcField, name: e.target.value })}
                        placeholder="เช่น: Hospital Pass Rate"
                        className="w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-600">สูตร (Formula)</label>
                      <textarea
                        value={newCalcField.formula}
                        onChange={(e) => {
                          setNewCalcField({ ...newCalcField, formula: e.target.value });
                          setFormulaValid(false);
                        }}
                        placeholder="เช่น: (certified / total) * 100"
                        rows={3}
                        className="w-full resize-none rounded border border-gray-300 bg-white px-2 py-1.5 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-600">ประเภทข้อมูล</label>
                      <select
                        value={newCalcField.dataType}
                        onChange={(e) => setNewCalcField({ ...newCalcField, dataType: e.target.value })}
                        className="w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {DATA_TYPE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={handleVerifyFormula}
                      className="flex w-full items-center justify-center gap-1.5 rounded border border-purple-300 bg-white py-2 text-xs font-medium text-purple-700 transition-colors hover:bg-purple-100"
                    >
                      <Code className="h-3.5 w-3.5" />
                      ตรวจสอบสูตร
                    </button>

                    {formulaValid ? (
                      <div className="flex items-center gap-1.5 rounded border border-green-200 bg-green-50 px-2.5 py-2 text-xs text-green-700">
                        <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="font-medium">สูตรถูกต้อง</span>
                      </div>
                    ) : newCalcField.formula.length > 0 ? (
                      <div className="flex items-center gap-1.5 rounded border border-gray-200 bg-gray-50 px-2.5 py-2 text-xs text-gray-500">
                        <XCircle className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                        <span>กดตรวจสอบสูตรก่อนบันทึก</span>
                      </div>
                    ) : null}

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={handleSaveCalcField}
                        disabled={!newCalcField.name || !newCalcField.formula}
                        className="flex-1 rounded bg-purple-600 py-2 text-xs font-medium text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        บันทึก
                      </button>
                      <button
                        onClick={() => {
                          setShowCalcFieldForm(false);
                          setFormulaValid(false);
                          setNewCalcField({ name: '', formula: '', dataType: 'Number' });
                        }}
                        className="flex-1 rounded border border-gray-300 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100"
                      >
                        ยกเลิก
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
