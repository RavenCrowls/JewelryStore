import React from "react";

export type Employee = {
  avatarUrl: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  birthday: string;
  position: string;
  account: string;
};

type EmployeeProfileProps = {
  employee: Employee;
  onEdit?: () => void;
  onDelete?: () => void;
  onResetPassword?: () => void;
};

export default function EmployeeProfile({
  employee,
  onEdit,
  onDelete,
  onResetPassword,
}: EmployeeProfileProps) {
  const {
    avatarUrl,
    name,
    address,
    phone,
    email,
    birthday,
    position,
    account,
  } = employee;

  return (
    <div className="w-full flex justify-center mt-2">
      <div className="max-w-5xl w-full flex gap-16">
        {/* Left: form */}
        <div className="flex-1">
          <div className="space-y-3 text-sm">
            {/* Row */}
            <InfoRow label="Name:">
              <input
                className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-sky-500"
                value={name}
                readOnly
              />
            </InfoRow>

            <InfoRow label="Address:">
              <input
                className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-sky-500"
                value={address}
                readOnly
              />
            </InfoRow>

            <InfoRow label="Phone number:">
              <input
                className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-sky-500"
                value={phone}
                readOnly
              />
            </InfoRow>

            <InfoRow label="Email:">
              <input
                className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-sky-500"
                value={email}
                readOnly
              />
            </InfoRow>

            <InfoRow label="Birthday:">
              <input
                className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-sky-500"
                value={birthday}
                readOnly
              />
            </InfoRow>

            <InfoRow label="Position:">
              <input
                className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-sky-500"
                value={position}
                readOnly
              />
            </InfoRow>

            {/* Account + reset password inline */}
            <InfoRow label="Account:">
              <div className="flex gap-3 items-center">
                <input
                  className="flex-1 rounded border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-sky-500"
                  value={account}
                  readOnly
                />
                <button
                  type="button"
                  onClick={onResetPassword}
                  className="whitespace-nowrap rounded border border-sky-500 px-3 py-1 text-xs text-sky-600 hover:bg-sky-50"
                >
                  Reset password
                </button>
              </div>
            </InfoRow>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4 justify-end">
            <button
              type="button"
              onClick={onDelete}
              className="min-w-[120px] rounded border border-red-400 bg-red-50 px-6 py-2 text-sm font-medium text-red-500 hover:bg-red-100"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={onEdit}
              className="min-w-[120px] rounded border border-sky-400 bg-sky-50 px-6 py-2 text-sm font-medium text-sky-600 hover:bg-sky-100"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Right: avatar */}
        <div className="flex items-start justify-center flex-1">
          <div className="h-64 w-64 rounded-full overflow-hidden border border-slate-200">
            <img
              src={avatarUrl}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Row helper component cho phần label + input */
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
