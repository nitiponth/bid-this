import { gql, useMutation } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useNotificationStore } from "../../../store/notificationStore";
import { COLOR } from "../../../utils/COLOR";
import { difTime } from "../../../utils/funtion";

const Container = styled.div`
  display: flex;
  align-items: center;
  min-height: 50px;
  padding: 1rem 1.5rem;

  transition: all 0.2s;

  &:hover {
    background-color: ${COLOR.LIGHTYELLOW2};
  }

  &:not(:last-child) {
    margin-bottom: 3px;
  }
`;

const ImageBox = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  overflow: hidden;
`;

const Body = styled.p`
  align-self: flex-start;
  width: 260px;
  margin-left: 10px;

  font-size: 1.2rem;

  overflow: hidden;
  text-overflow: ellipsis;

  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const PastTime = styled.div`
  width: 260px;
  margin-left: 10px;

  font-size: 1.1rem;
  color: ${COLOR.GRAY};
`;

const UnseenDot = styled.div`
  justify-self: center;
  align-self: center;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${COLOR.PRIMARY_YELLOW};
  margin-left: 10px;
  margin-right: 10px;
`;

const SEEN_NOTI = gql`
  mutation ($notiId: ID!) {
    seenNotification(notiId: $notiId)
  }
`;

function NotificationItem({
  notiId,
  productId,
  message,
  image,
  createdAt,
  seen,
}) {
  const router = useRouter();
  const { refetchNotifications } = useNotificationStore();
  const [seenNotification] = useMutation(SEEN_NOTI);

  const natigateToProductPage = async () => {
    router.push(`/items/${productId}`);
    if (!notiId || seen) {
      return;
    }

    try {
      const { data } = await seenNotification({
        variables: {
          notiId,
        },
      });

      if (data) {
        refetchNotifications();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container onClick={natigateToProductPage}>
      <ImageBox>
        <Image width={60} height={60} objectFit={"cover"} src={image} />
      </ImageBox>
      <div>
        <Body>{message}</Body>
        <PastTime>{difTime(createdAt, true)}</PastTime>
      </div>
      {!seen && <UnseenDot />}
    </Container>
  );
}

export default NotificationItem;
