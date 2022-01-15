function FollowHeader({ selectedTopic, setSelectedTopic }) {
  return (
    <div className="followModal__header">
      <div
        onClick={() => setSelectedTopic("Followers")}
        className={`followModal__header__topic ${
          selectedTopic === "Followers" &&
          "followModal__header__topic--selected"
        } `}
      >
        Followers
      </div>
      <div
        onClick={() => setSelectedTopic("Following")}
        className={`followModal__header__topic ${
          selectedTopic === "Following" &&
          "followModal__header__topic--selected"
        } `}
      >
        Following
      </div>
    </div>
  );
}

export default FollowHeader;
