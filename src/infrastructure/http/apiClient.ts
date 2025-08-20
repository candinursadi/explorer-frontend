const API_BASE = import.meta.env.VITE_API_BASE || '/api/v1';

interface ApiEnvelope<T> {
    status: string;
    data: T;
    meta?: any;
}
export async function apiGet<T>(url: string): Promise<ApiEnvelope<T>> {
    const res = await fetch(`${API_BASE}${url}`, {
        headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json() as Promise<ApiEnvelope<T>>;
}