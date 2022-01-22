import BForm from "../../../../../atoms/BForm/bForm";
import BTextarea from "../../../../../atoms/BTextarea/bTextarea";

function RUserCard({ user }) {
  const { profile, name, username, desc } = user;
  return (
    <div className="RUser__card">
      <img className="RUser__card__image" src={profile} alt="User Image" />
      <div className="RUser__card__name">{`${name.first} ${name.last}`}</div>
      <div className="RUser__card__username">@{username}</div>
      <BForm>
        <BTextarea
          disabled={true}
          inputStyles={{
            width: "230px",
            height: "120px",
            marginBottom: "1rem",
            color: "#aaa",
          }}
          resize={"none"}
          value={desc || "The description for this user could not be found."}
        />
      </BForm>
    </div>
  );
}

export default RUserCard;
