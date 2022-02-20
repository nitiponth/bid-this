import { gql, useQuery } from "@apollo/client";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PulseLoader } from "react-spinners";
import styled from "styled-components";
import { useNotificationStore } from "../../../store/notificationStore";
import { COLOR } from "../../../utils/COLOR";
import NotificationItem from "./NotificationItem";

const ListContainer = styled.div`
  position: absolute;
  z-index: 500;
  top: 4.5rem;
  min-width: 15rem;
  max-height: 600px;
  background-color: white;
  transform: translateX(-85%);
  border: none;
  width: 380;
  border-radius: 1rem;

  top: 4.8rem;
  transform: translateX(-90%);

  box-shadow: ${COLOR.SHADOW2};
  overflow-y: auto;
`;

const Footer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 5px 0;
`;

const NOTIFITION_QUERY = gql`
  query Query($offset: Int) {
    getNotifications(offset: $offset) {
      metadata {
        count
        current
        limit
        offset
      }
      data {
        _id
        message
        product {
          id
          images
        }
        createdAt
        seen
      }
    }
  }
`;

function NotificationDropdown() {
  const { notifications, updateNotifications, metadata } =
    useNotificationStore();

  const { refetch } = useQuery(NOTIFITION_QUERY, {
    fetchPolicy: "standby",
    variables: {
      offset: notifications.length,
    },
  });

  const compList = notifications.map((noti, index) => {
    const { _id, message, product, createdAt, seen } = noti;
    return (
      <NotificationItem
        key={_id}
        notiId={_id}
        productId={product.id}
        message={message}
        image={product.images[0]}
        createdAt={createdAt}
        seen={seen}
      />
    );
  });

  const onLoadMore = async (e) => {
    if (metadata.current === metadata.count) {
      console.log("ended");
      return;
    }
    const { data } = await refetch({
      offset: metadata.current,
    });
    if (data) {
      const { metadata, data: noti } = data.getNotifications;
      updateNotifications(noti, metadata);
    }
  };

  return (
    <Fragment>
      <ListContainer id="notificationScrollable">
        <InfiniteScroll
          dataLength={metadata.current}
          next={onLoadMore}
          hasMore={metadata.current < metadata.count}
          scrollableTarget={"notificationScrollable"}
          loader={
            <Footer>
              <PulseLoader color={COLOR.PRIMARY_YELLOW} size={10} />
            </Footer>
          }
        >
          {compList}
        </InfiniteScroll>
      </ListContainer>
    </Fragment>
  );
}

export default observer(NotificationDropdown);
