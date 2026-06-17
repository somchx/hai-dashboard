import { useMemo, useState } from "react";
import { ChevronDown, Download } from "lucide-react";

const EXPORT_FORMATS = ["PDF", "CSV"];

export function DashboardExportButton({ label = "ส่งออก", className = "" }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg bg-[#0D5C8F] px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0a4a73]"
      >
        <Download size={15} />
        {label}
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-2 w-36 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {EXPORT_FORMATS.map((format) => (
            <button
              key={format}
              type="button"
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
              onClick={() => {
                setOpen(false);
                alert("กำลังส่งออกไฟล์...");
              }}
            >
              {format}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function DashboardPageHeader({ icon: Icon, title, subtitle, badge }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="rounded-2xl bg-[#0D5C8F]/10 p-3 text-[#0D5C8F]">
            <Icon size={22} />
          </div>
        )}
        <div>
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 md:justify-end">
        {badge}
        <DashboardExportButton />
      </div>
    </div>
  );
}

export function DashboardFilterBar({ children, actions, label = "กรองข้อมูล" }) {
  return (
    <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex flex-1 flex-wrap items-end gap-3">
        <span className="text-sm font-semibold text-gray-700">{label}:</span>
        {children}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2 xl:justify-end">
          {actions}
        </div>
      )}
    </div>
  );
}

export function DashboardHeroCard({ header, filter }) {
  return (
    <div className="mb-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="space-y-4">
        {header}
        {filter && <div className="border-t border-gray-100 pt-4">{filter}</div>}
      </div>
    </div>
  );
}

export function DashboardTabs({ tabs, activeTab, onChange, getKey, getLabel, getIcon }) {
  const normalizedTabs = useMemo(
    () =>
      tabs.map((tab, index) => ({
        key: getKey ? getKey(tab, index) : tab.id ?? index,
        label: getLabel ? getLabel(tab, index) : tab.label,
        icon: getIcon ? getIcon(tab, index) : tab.icon,
      })),
    [tabs, getKey, getLabel, getIcon]
  );

  return (
    <div className="mb-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex overflow-x-auto">
        {normalizedTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
              className={`flex shrink-0 items-center gap-2 border-b-2 px-5 py-3 text-sm font-medium whitespace-nowrap transition-all ${
                isActive
                  ? "border-transparent bg-[#0D5C8F] text-white"
                  : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              {Icon && <Icon size={15} />}
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
