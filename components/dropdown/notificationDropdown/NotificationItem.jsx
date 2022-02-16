import Image from "next/image";
import styled from "styled-components";
function NotificationItem() {
  const Container = styled.div`
    display: flex;
    align-items: center;
    min-height: 50px;
  `;

  const ImageBox = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 10px;
    overflow: hidden;
  `;

  return (
    <Container>
      <ImageBox>
        <Image
          width={50}
          height={50}
          objectFit={"cover"}
          src={
            "https://bid-this-storage.s3.ap-southeast-1.amazonaws.com/images/9437e871-8ea3-47b7-ba0d-f224baa7a090-3ba7502eea16d39f0a388b2eab131d3b.jpg"
          }
        />
      </ImageBox>
    </Container>
  );
}

export default NotificationItem;
