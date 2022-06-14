import { IoCloseSharp } from "react-icons/io5";
import styled from "styled-components";
import { COLOR } from "../../../utils/COLOR";
import Backdrop from "../../layout/backdrop";

const Container = styled.div`
  position: relative;
  border-radius: 10px;
  background-color: ${COLOR.WHITE};
  padding: 100px 50px;
  font-size: 1.5rem;
  width: 60%;
  height: 80%;
  max-height: 1000px;
  min-width: 550px;
  overflow-y: scroll;
`;

const CloseButton = styled.div`
  position: absolute;
  z-index: 100;
  top: 50px;
  right: 50px;

  :hover {
    cursor: pointer;
  }
`;

const PdpaDetail = ({ activeDetail = false, onClose }) => {
  return (
    <Backdrop show={activeDetail} onClose={onClose}>
      <Container>
        <p style={{ marginBottom: 10 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi auctor
          scelerisque magna in ultrices. Vivamus nisi quam, scelerisque eget
          lorem vitae, mollis maximus mi. In tempus ligula et arcu fermentum
          eleifend. In hac habitasse platea dictumst. In tristique congue
          dictum. Pellentesque eu rutrum velit. Nam semper consectetur
          hendrerit. Cras non nisi nibh. Pellentesque et tristique metus. Orci
          varius natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Aliquam vel ante sed ipsum suscipit vulputate vitae vel
          magna. Maecenas et luctus sapien. Curabitur ut mauris fermentum,
          pharetra diam quis, finibus felis. Duis id tristique lectus, quis
          placerat erat. Donec lobortis, mi non tincidunt venenatis, arcu quam
          luctus massa, et placerat odio ante at lectus.
        </p>
        <p style={{ marginBottom: 10 }}>
          Sed a ex dui. Nullam dolor tortor, egestas eu euismod non, molestie
          vel elit. Pellentesque justo leo, ultrices quis rhoncus at, vestibulum
          auctor lorem. Cras sit amet nunc et ipsum pharetra consectetur. Ut
          imperdiet justo erat, nec volutpat justo posuere non. Vivamus
          porttitor eleifend nisi, in suscipit diam ornare nec. Praesent
          tristique nulla eu mauris pellentesque, eu semper lorem varius.
        </p>
        <p style={{ marginBottom: 10 }}>
          Donec nec lectus quam. Sed sem nisl, imperdiet sit amet diam
          ultricies, hendrerit semper libero. Maecenas lobortis et justo sit
          amet tincidunt. Mauris cursus eget nibh molestie egestas. Nam luctus,
          quam nec tincidunt gravida, velit mi ornare magna, dictum molestie
          magna eros sed mauris. Integer quis tempor dui. Fusce risus velit,
          eleifend ac nisi ut, volutpat ultrices eros. Curabitur hendrerit
          feugiat arcu, eu maximus ligula dignissim sed. Cras commodo mollis
          aliquam. Aliquam in massa nec justo vulputate consequat sed et tellus.
          Quisque fermentum pellentesque nulla, et ullamcorper nibh volutpat eu.
          Aenean tincidunt metus eu enim venenatis elementum. Integer quam urna,
          sodales in mattis eu, consequat maximus augue. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Donec scelerisque dolor et urna
          pulvinar mollis. Morbi varius auctor congue.
        </p>
        <p style={{ marginBottom: 10 }}>
          Aenean mauris dui, dictum vitae leo nec, luctus egestas ipsum.
          Pellentesque rutrum, urna vel dapibus rhoncus, libero erat dapibus
          urna, sit amet tempor dui velit at dolor. Orci varius natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          Vivamus vitae consectetur libero, ac malesuada tellus. Nunc in lacus
          urna. Nam ultricies rutrum dolor nec porttitor. Duis dictum neque sed
          aliquam ultrices. Aenean feugiat nisl vel faucibus auctor. Curabitur
          condimentum faucibus ligula vel vulputate. Suspendisse nec porta
          risus. Fusce iaculis eu erat vel hendrerit. Etiam nec mattis dui.
          Aliquam urna massa, aliquam nec lectus eget, tempus finibus risus.
          Vivamus et commodo nisl, nec consectetur purus.
        </p>

        <CloseButton onClick={onClose}>
          <IoCloseSharp color={COLOR.BLACK} size={"20px"} />
        </CloseButton>
      </Container>
    </Backdrop>
  );
};

export default PdpaDetail;
