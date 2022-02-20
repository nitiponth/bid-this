import { Fragment, useRef, useState } from "react";
import styled from "styled-components";
import { COLOR } from "../../../utils/COLOR";

const Container = styled.div`
  position: relative;
  margin-top: 2rem;
  border-radius: 2rem;
  overflow: hidden;
`;

const SectionTitle = styled.div`
  font-size: 2rem;
  font-weight: 400;
  color: ${COLOR.DARKGRAY};
`;

const ListContainer = styled.div`
  max-height: 70rem;
  padding: 0 2rem;
  padding-bottom: 3rem;
  overflow-y: auto;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 5rem;
  z-index: 99;
  background-color: ${COLOR.WHITE};
  bottom: 0;
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(187, 187, 187, 0.9));
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
`;

const BidderList = ({ children }) => {
  const [isEndOfList, setIsEndOfList] = useState(false);

  const listInnerRef = useRef();

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight + 100 >= scrollHeight) {
        setIsEndOfList(true);
        return;
      }
      setIsEndOfList(false);
    }
  };

  return (
    <Container>
      <SectionTitle>Activity</SectionTitle>
      <ListContainer ref={listInnerRef} onScroll={onScroll}>
        {children}
      </ListContainer>
      {!isEndOfList && listInnerRef?.current?.scrollHeight > 700 && <Overlay />}
    </Container>
  );
};

export default BidderList;
