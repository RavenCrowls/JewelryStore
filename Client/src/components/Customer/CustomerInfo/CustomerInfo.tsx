export type CustomerInfoProps = {
  name: string;
  address: string;
  phone: string;
  email: string;
  birthday: string;
  loyalty: number;
  accumulated: number;
};

type CustomerInfoComponentProps = {
  customer: CustomerInfoProps;
  onDelete?: () => void;
};

export default function CustomerInfo({
  customer,
  onDelete,
}: CustomerInfoComponentProps) {
  const { name, address, phone, email, birthday, loyalty, accumulated } =
    customer;

  return (
    <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
      {/* Cột trái */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-24 text-xs text-slate-500">Name:</span>
          <input
            className="h-8 flex-1 rounded border border-slate-300 px-2 text-xs"
            value={name}
            readOnly
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="w-24 text-xs text-slate-500">Address:</span>
          <input
            className="h-8 flex-1 rounded border border-slate-300 px-2 text-xs"
            value={address}
            readOnly
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="w-24 text-xs text-slate-500">Phone number:</span>
          <input
            className="h-8 flex-1 rounded border border-slate-300 px-2 text-xs"
            value={phone}
            readOnly
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="w-24 text-xs text-slate-500">Email:</span>
          <input
            className="h-8 flex-1 rounded border border-slate-300 px-2 text-xs"
            value={email}
            readOnly
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="w-24 text-xs text-slate-500">Birthday:</span>
          <input
            className="h-8 flex-1 rounded border border-slate-300 px-2 text-xs"
            value={birthday}
            readOnly
          />
        </div>
      </div>

      {/* Cột phải */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-28 text-xs text-slate-500">Loyalty point:</span>
          <input
            className="h-8 flex-1 rounded border border-slate-300 px-2 text-xs"
            value={loyalty}
            readOnly
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="w-28 text-xs text-slate-500">
            Accumulated point:
          </span>
          <input
            className="h-8 flex-1 rounded border border-slate-300 px-2 text-xs"
            value={accumulated}
            readOnly
          />
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onDelete}
            className="rounded-md border border-[#FACDC3] bg-white px-8 py-2 text-sm font-medium text-[#EB2F06] hover:bg-[#FFF4F1]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
