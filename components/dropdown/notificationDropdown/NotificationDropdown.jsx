import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import styled from "styled-components";
import { useNotificationStore } from "../../../store/notificationStore";
import { COLOR } from "../../../utils/COLOR";
import NotificationItem from "./NotificationItem";

const ListContainer = styled.div`
  position: absolute;
  z-index: 500;
  top: 4.5rem;
  min-width: 15rem;
  background-color: white;
  transform: translateX(-85%);
  border: none;
  width: 380;
  border-radius: 1rem;

  top: 4.8rem;
  transform: translateX(-90%);

  box-shadow: ${COLOR.SHADOW2};
  overflow: hidden;
`;

function NotificationDropdown() {
  const { notifications } = useNotificationStore();
  const compList = notifications.map((noti, index) => {
    const { id, message, product, createdAt, seen } = noti;
    return (
      <NotificationItem
        key={id}
        message={message}
        image={product.images[0]}
        createdAt={createdAt}
        seen={seen}
      />
    );
  });

  return (
    <Fragment>
      <ListContainer>{compList}</ListContainer>
    </Fragment>
  );
}

export default observer(NotificationDropdown);
