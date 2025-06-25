import { createClient } from "@/lib/supabase/server"

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <p>{user?.email}</p>
    )
}