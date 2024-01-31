import { ProfileResponse } from "../../../api/api";
import { Contact } from "./Contact";

type Props = {
  profile: ProfileResponse;
  isOwner: boolean;
  goToEditMode: () => void;
};

export const ProfileData = ({ profile, isOwner, goToEditMode }: Props) => {
  return (
    <div>
      {isOwner && (
        <div>
          <button onClick={goToEditMode}>edit</button>
        </div>
      )}
      <div>
        <b>Full name</b>: {profile.fullName}
      </div>
      <div>
        <b>Looking for a job</b>:{profile.lookingForAJob ? "yes" : "no"}
      </div>
      <div>
        <b>My professional skills</b>: {profile.lookingForAJobDescription}
      </div>
      <div>
        <b>About me</b>: {profile.aboutMe}
      </div>
      <div>
        <b>Contacts</b>:
        {Object.keys(profile.contacts).map((key) => {
          console.log(profile.contacts[key]);
          return <Contact key={key} contactTitle={key} contactValue={""} />;
        })}
      </div>
    </div>
  );
};
