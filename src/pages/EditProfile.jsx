import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PrimaryButton } from "@/components/club/ui";
import { useApp } from "@/lib/AppContext";
import { useToast } from "@/components/ui/use-toast";
import { categories } from "@/data/mockData";

function Field({ label, children, hint }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-muted-foreground">{label}</Label>
      {children}
      {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

const inputCls = "h-12 bg-surface-hover border-border text-title placeholder:text-muted-foreground";

/* Edit profile — adapts fields to the account type. Personal accounts edit
   identity + bio + location + avatar/banner URLs. Business accounts edit
   commercial info (name, logo, description, category, address, hours, contact).
   Changes persist locally via AppContext and show on the profile immediately. */
export default function EditProfile() {
  const navigate = useNavigate();
  const { userType, profile, updateProfile } = useApp();
  const { toast } = useToast();
  const [form, setForm] = useState(profile);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const isBusiness = userType === "business";

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = (e) => {
    e.preventDefault();
    setError("");
    if (isBusiness ? !form.businessName?.trim() : !form.name?.trim()) {
      setError(isBusiness ? "El nombre comercial es obligatorio" : "El nombre es obligatorio");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      updateProfile(form);
      setSaving(false);
      toast({ title: "Perfil actualizado" });
      navigate("/profile");
    }, 500);
  };

  return (
    <div>
      <header className="sticky top-0 z-30 glass border-b border-border px-4 h-14 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><ArrowLeft size={18} /></button>
        <h1 className="font-display font-bold text-title text-lg">Editar perfil</h1>
        <span className="ml-auto text-[11px] text-muted-foreground">{isBusiness ? "Cuenta empresa" : "Cuenta personal"}</span>
      </header>

      <form onSubmit={save} className="px-4 py-5 space-y-5 pb-28">
        {error && <div className="p-3 rounded-xl bg-coral/10 text-coral text-sm">{error}</div>}

        {isBusiness ? (
          <>
            <Field label="Nombre comercial"><Input value={form.businessName} onChange={set("businessName")} className={inputCls} required /></Field>
            <Field label="Logo (URL)"><Input value={form.logo} onChange={set("logo")} placeholder="https://…" className={inputCls} /></Field>
            <Field label="Banner (URL)"><Input value={form.banner} onChange={set("banner")} placeholder="https://…" className={inputCls} /></Field>
            <Field label="Descripción"><textarea value={form.description} onChange={set("description")} rows={3} className="w-full rounded-xl bg-surface-hover border border-border p-3 text-sm text-title resize-none outline-none focus:border-mint" /></Field>
            <Field label="Categoría">
              <select value={form.category} onChange={set("category")} className="w-full h-12 rounded-xl bg-surface-hover border border-border px-3 text-sm text-title outline-none focus:border-mint">
                {categories.filter((c) => c.id !== "destacados").map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </Field>
            <Field label="Dirección comercial"><Input value={form.address} onChange={set("address")} className={inputCls} /></Field>
            <Field label="Horarios"><Input value={form.hours} onChange={set("hours")} placeholder="Ej: 11:00 AM – 11:00 PM" className={inputCls} /></Field>
            <Field label="Teléfono" hint="Solo se usará para la finalidad indicada en la política de privacidad."><Input type="tel" value={form.phone} onChange={set("phone")} className={inputCls} /></Field>
            <Field label="Sitio web"><Input type="url" value={form.website} onChange={set("website")} placeholder="https://…" className={inputCls} /></Field>
            <Field label="Redes sociales"><Input value={form.social} onChange={set("social")} placeholder="@usuario o URL" className={inputCls} /></Field>
          </>
        ) : (
          <>
            <Field label="Nombre"><Input value={form.name} onChange={set("name")} className={inputCls} required /></Field>
            <Field label="Nombre de usuario"><Input value={form.username} onChange={set("username")} className={inputCls} /></Field>
            <Field label="Biografía"><textarea value={form.bio} onChange={set("bio")} rows={3} className="w-full rounded-xl bg-surface-hover border border-border p-3 text-sm text-title resize-none outline-none focus:border-mint" /></Field>
            <Field label="Ubicación"><Input value={form.location} onChange={set("location")} className={inputCls} /></Field>
            <Field label="Foto de perfil (URL)"><Input value={form.avatar} onChange={set("avatar")} className={inputCls} /></Field>
            <Field label="Banner (URL)"><Input value={form.banner} onChange={set("banner")} className={inputCls} /></Field>
          </>
        )}

        <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[480px] z-30 p-4 glass border-t border-border flex gap-3">
          <button type="button" onClick={() => navigate(-1)} className="flex-1 h-12 rounded-full bg-surface-hover border border-border text-title font-medium">Cancelar</button>
          <PrimaryButton type="submit" disabled={saving} className="flex-[1.4]">
            {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Guardando…</> : <><Save size={16} className="mr-2" /> Guardar cambios</>}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}