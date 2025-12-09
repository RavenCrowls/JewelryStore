import { useEffect, useState } from "react";
import type { ProfileData } from "./useProfile";
import { useProfile } from "./useProfile";

type FormState = {
  fullName: string;
  role: string;
  address: string;
  phone: string;
  birthday: string;
  email: string;
};

const toFormState = (profile: ProfileData | null): FormState => ({
  fullName: profile?.fullName ?? "",
  role: profile?.role ?? "",
  address: profile?.address ?? "",
  phone: profile?.phone ?? "",
  birthday: profile?.birthday ?? "",
  email: profile?.email ?? "",
});

export function useProfileForm() {
  const { loading, profile, error } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<FormState>(toFormState(null));

  useEffect(() => {
    setForm(toFormState(profile));
    setIsEditing(false);
  }, [profile]);

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value as FormState[keyof FormState] }));
    };

  const startEdit = () => setIsEditing(true);

  const cancelEdit = () => {
    setForm(toFormState(profile));
    setIsEditing(false);
  };

  const saveEdit = () => {
      // TODO: Wire to backend update endpoint when available
      setIsEditing(false);
  };

  return {
    loading,
    profile,
    error,
    form,
    isEditing,
    handleChange,
    startEdit,
    cancelEdit,
    saveEdit,
  };
}
