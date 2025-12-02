// src/pages/manager/Profile/Profile.tsx
import { Image as ImageIcon } from "lucide-react";

export default function Profile() {
  // dữ liệu tạm để show UI
  const profile = {
    name: "Employee1",
    address: "26/8 Trương Định, Bến Thành, Quận 1, TP. Hồ Chí Minh",
    phone: "0123456789",
    birthday: "21/04/1999",
    email: "em1@gmail.com",
    position: "Manager",
    username: "admin123",
    avatarUrl: "/img/avt.png",
  };

  return (
    <div className="mt-4 space-y-6">
      {/* Title */}
      <h2 className="text-xl font-semibold text-[#1279C3]">Profile</h2>

      {/* Card */}
      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-12 md:flex-row md:items-start">
          {/* Left: form info */}
          <div className="flex-1 space-y-5">
            {/* Name */}
            <div>
              <label className="mb-1 block text-xs text-slate-500">
                Name
              </label>
              <input
                className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm text-slate-700 outline-none focus:border-[#1279C3]"
                defaultValue={profile.name}
                readOnly
              />
            </div>

            {/* Address */}
            <div>
              <label className="mb-1 block text-xs text-slate-500">
                Address
              </label>
              <input
                className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm text-slate-700 outline-none focus:border-[#1279C3]"
                defaultValue={profile.address}
                readOnly
              />
            </div>

            {/* Phone + Birthday */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-slate-500">
                  Phone
                </label>
                <input
                  className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm text-slate-700 outline-none focus:border-[#1279C3]"
                  defaultValue={profile.phone}
                  readOnly
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-500">
                  Birthday
                </label>
                <input
                  className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm text-slate-700 outline-none focus:border-[#1279C3]"
                  defaultValue={profile.birthday}
                  readOnly
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block text-xs text-slate-500">
                Email
              </label>
              <input
                className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm text-slate-700 outline-none focus:border-[#1279C3]"
                defaultValue={profile.email}
                readOnly
              />
            </div>

            {/* Position */}
            <div>
              <label className="mb-1 block text-xs text-slate-500">
                Position
              </label>
              <input
                className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm text-slate-700 outline-none focus:border-[#1279C3]"
                defaultValue={profile.position}
                readOnly
              />
            </div>

            {/* Username */}
            <div>
              <label className="mb-1 block text-xs text-slate-500">
                Username
              </label>
              <input
                className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm text-slate-700 outline-none focus:border-[#1279C3]"
                defaultValue={profile.username}
                readOnly
              />
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-4 md:justify-start">
              <button className="rounded-xl border border-[#1279C3] bg-[#F3F7FC] px-5 py-2 text-xs font-medium text-[#1279C3] hover:bg-[#e5f0ff]">
                Change password
              </button>
              <button className="rounded-xl border border-[#DDE4F0] bg-white px-8 py-2 text-xs font-medium text-[#1279C3] hover:bg-[#F3F7FC]">
                Edit
              </button>
            </div>
          </div>

          {/* Right: avatar */}
          <div className="flex w-full justify-center md:w-auto">
            <div className="relative h-56 w-56 overflow-hidden rounded-full border border-slate-200">
              <img
                src={profile.avatarUrl}
                alt="Avatar"
                className="h-full w-full object-cover"
              />

              {/* Overlay edit avatar */}
              <button
                className="absolute bottom-0 left-0 flex w-full items-center justify-center gap-2 bg-black/30 py-2 text-xs font-medium text-white backdrop-blur"
                type="button"
              >
                <ImageIcon className="h-4 w-4" />
                Edit avatar
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
