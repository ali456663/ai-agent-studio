export interface DemoSlot {
  time: string;
  status: "free" | "busy" | "deal";
  service: string;
  price: string;
}

export interface LeadPayload {
  name: string;
  email: string;
  company: string;
  industry: string;
  message: string;
  gdprConsent: boolean;
  consentVersion: string;
  consentAt: string;
}

export interface LeadResponse {
  id: number;
  company: string;
  status: string;
  createdAt: string;
}

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "";

export async function fetchDemoSlots(industry: string, day: string): Promise<DemoSlot[]> {
  const res = await fetch(
    `${API_BASE}/api/demo/slots?industry=${encodeURIComponent(industry)}&day=${encodeURIComponent(day)}`
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as DemoSlot[];
}

export async function simulateDemoBooking(
  industry: string,
  day: string,
  time: string
): Promise<{ status: string; message: string }> {
  const res = await fetch(`${API_BASE}/api/demo/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ industry, day, time })
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as { status: string; message: string };
}

export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  const res = await fetch(`${API_BASE}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return (await res.json()) as LeadResponse;
}
