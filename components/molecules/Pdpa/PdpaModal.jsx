import { useEffect, useState } from "react";
import styled from "styled-components";
import { COLOR } from "../../../utils/COLOR";
import Backdrop from "../../layout/backdrop";

import cookie from "js-cookie";
import PdpaDetail from "./PdpaDetail";

const Container = styled.div`
  position: absolute;
  bottom: 30px;
  height: 120px;
  border-radius: 10px;
  background-color: ${COLOR.WHITE};
  padding: 20px;
  font-size: 1.5rem;
  min-width: 550px;
`;

const Button = styled.button`
  position: absolute;
  right: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  bottom: 20px;
  height: 40%;
  border-radius: 10px;
  background-color: ${COLOR.YELLOW};
  padding: 20px;
  font-size: 1.5rem;
  color: ${COLOR.WHITE};
  padding: 0 2rem;
  border: none;

  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
    border: none;
  }

  &:active {
    transform: translateY(1px);
    border: none;
  }
`;

const TextButton = styled.div`
  margin-left: 10px;
  color: ${COLOR.DARKGRAY};
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0.5px);
  }
`;

function PdpaModal() {
  const [activeModal, setActiveModal] = useState(false);
  const [activeDetail, setActiveDetail] = useState(false);

  useEffect(() => {
    const isAllow = !!cookie.get("PDPA_ALLOW");

    if (isAllow) return;

    setTimeout(() => {
      setActiveModal(true);
    }, 1000);
  }, []);

  const allowPdpa = () => {
    cookie.set("PDPA_ALLOW", true);
    setActiveModal(false);
  };

  return (
    <>
      <Backdrop show={activeModal} onClose={() => {}}>
        <Container>
          <p
            style={{
              fontSize: "1.5rem",
              display: "flex",
              flexShrink: 1,
            }}
          >
            เราใช้คุกกี้เพื่อพัฒนาประสิทธิภาพ
            และประสบการณ์ที่ดีในการใช้เว็บไซต์ของคุณ
            คุณสามารถศึกษารายละเอียดได้ที่{" "}
            <TextButton onClick={() => setActiveDetail(true)}>
              นโยบายความเป็นส่วนตัว
            </TextButton>
          </p>

          <Button onClick={allowPdpa}>ยอมรับ</Button>
        </Container>
      </Backdrop>

      <PdpaDetail
        activeDetail={activeDetail}
        onClose={() => setActiveDetail(false)}
      />
    </>
  );
}

export default PdpaModal;
