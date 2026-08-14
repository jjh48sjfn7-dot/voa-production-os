import { volunteerUi } from "@/lib/volunteer/ui";

interface VolunteerStubPageProps {
  title: string;
  body: string;
}

export function VolunteerStubPage({ title, body }: VolunteerStubPageProps) {
  return (
    <div>
      <h1 className="text-[26px] font-semibold tracking-tight text-white">{title}</h1>
      <p className={`mt-3 max-w-md ${volunteerUi.body}`}>{body}</p>
    </div>
  );
}
