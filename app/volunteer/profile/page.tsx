import { logoutAction } from "@/app/auth/actions";
import { VolunteerStubPage } from "@/components/volunteer/VolunteerStubPage";
import { volunteerUi } from "@/lib/volunteer/ui";

export default function VolunteerProfilePage() {
  return (
    <div>
      <VolunteerStubPage
        title="Profile"
        body="Your account, availability, and serving history coming next."
      />
      <form action={logoutAction} className="mt-8">
        <button type="submit" className={volunteerUi.ghost}>
          Sign out
        </button>
      </form>
    </div>
  );
}
