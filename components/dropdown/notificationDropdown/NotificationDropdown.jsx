import { observer } from "mobx-react-lite";
import { useNotificationStore } from "../../../store/notificationStore";

function NotificationDropdown() {
  const { notifications } = useNotificationStore();

  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const { watchlist } = useWatchlistStore();

  const compList = notifications.map((noti) => {
    return (
      <AuctionDropdownItem
        key={noti.id}
        image={product.images[0]}
        start={product.start}
        end={product.end}
        onClick={() => {
          router.push(`/items/${product.id}`);
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>{product.title}</p>
          <p>
            👑 {lastBidder}{" "}
            {`(${
              product.price.current?.toLocaleString("En-us") ||
              product.price.initial?.toLocaleString("En-us")
            }฿)`}
          </p>
        </div>
      </AuctionDropdownItem>
    );
  });

  return (
    <Fragment>
      {loading && (
        <div className="user-dropdown user-dropdown--auction">
          <BLoading
            containerStyle={{ marginBottom: "2rem", marginTop: "2rem" }}
          />
        </div>
      )}

      {compList.length > 0 && (
        <div className="user-dropdown user-dropdown--auction">{compList}</div>
      )}
    </Fragment>
  );
}

export default observer(NotificationDropdown);
