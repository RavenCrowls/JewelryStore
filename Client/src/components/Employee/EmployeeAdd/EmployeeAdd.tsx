// src/components/Employee/EmployeeAdd/EmployeeAdd.tsx
import React, { useState } from "react";
import type { Employee } from "../EmployeeProfile/EmployeeProfile";

type AddEmployeeProps = {
  onSave?: (employee: Employee) => void;
  onCancel?: () => void;
};

const emptyEmployee: Employee = {
  avatarUrl: "",
  name: "",
  address: "",
  phone: "",
  email: "",
  birthday: "",
  position: "",
  account: "",
};

export default function EmployeeAdd({ onSave, onCancel }: AddEmployeeProps) {
  const [form, setForm] = useState<Employee>(emptyEmployee);

  const handleFieldChange =
    (field: keyof Employee) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, avatarUrl: url }));
    // thực tế: upload lên server rồi set url thật
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(form);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center mt-4">
      <div className="max-w-5xl w-full flex gap-16">
        {/* LEFT FORM */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-sky-700 mb-6">
            Add new employee
          </h2>

          <div className="space-y-3 text-sm">
            <InfoRow label="Name:">
              <input
                className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-sky-500"
                value={form.name}
                onChange={handleFieldChange("name")}
              />
            </InfoRow>

            <InfoRow label="Address:">
              <input
                className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-sky-500"
                value={form.address}
                onChange={handleFieldChange("address")}
              />
            </InfoRow>

            <InfoRow label="Phone number:">
              <input
                className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-sky-500"
                value={form.phone}
                onChange={handleFieldChange("phone")}
              />
            </InfoRow>

            <InfoRow label="Email:">
              <input
                className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-sky-500"
                value={form.email}
                onChange={handleFieldChange("email")}
              />
            </InfoRow>

            <InfoRow label="Birthday:">
              <input
                type="date"
                className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-sky-500"
                value={form.birthday}
                onChange={handleFieldChange("birthday")}
              />
            </InfoRow>

            <InfoRow label="Position:">
              <select
                className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-sky-500"
                value={form.position}
                onChange={handleFieldChange("position")}
              >
                <option value="">Choose position</option>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
                <option value="Intern">Intern</option>
              </select>
            </InfoRow>

            <InfoRow label="Account:">
              <input
                className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-sky-500"
                value={form.account}
                onChange={handleFieldChange("account")}
              />
            </InfoRow>
          </div>

          {/* BUTTONS */}
          <div className="mt-6 flex gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="min-w-[120px] rounded border border-red-200 bg-red-50 px-6 py-2 text-sm font-medium text-red-500 hover:bg-red-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-w-[120px] rounded border border-emerald-200 bg-emerald-50 px-6 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-100"
            >
              Save
            </button>
          </div>
        </div>

        {/* RIGHT AVATAR */}
        <div className="flex flex-col items-center justify-start flex-1">
          <div className="relative h-64 w-64 rounded-full overflow-hidden border border-slate-200 flex items-center justify-center bg-slate-100">
            {form.avatarUrl ? (
              <img
                src={form.avatarUrl}
                alt={form.name || "New employee"}
                className="h-full w-full object-cover"
              />
            ) : (
              // placeholder icon (giống hình mock)
              <div className="flex flex-col items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-black" />
                <div className="mt-[-14px] h-16 w-32 rounded-t-full bg-black" />
              </div>
            )}

            <label className="absolute bottom-0 left-0 right-0 flex cursor-pointer items-center justify-center bg-black/5 py-2 text-xs text-black gap-1">
              <span>🖼</span>
              <span>Upload</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}

function InfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-32 text-right text-sm text-slate-700 pr-2">
        {label}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
