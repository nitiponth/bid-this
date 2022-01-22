import { gql, useMutation } from "@apollo/client";
import { Fragment, useState } from "react";
import BButton from "../../../../../atoms/BButton/bButton";
import BForm from "../../../../../atoms/BForm/bForm";
import BModalCard from "../../../../../atoms/BModalCard/BModalCard";
import SelectionBox from "../../../../../etc/selection/selection";

import SalyImage from "../../../../../../public/images/SILY/Saly-1.png";
import { useRouter } from "next/router";

const UPDATE_STATUS = gql`
  mutation ($reportId: ID!, $type: ReportType!, $newStatus: ReportStatus!) {
    updateReportStatus(reportId: $reportId, type: $type, newStatus: $newStatus)
  }
`;

const statusOptions = ["RECEIVED", "CHECKING", "DONE"];

function RUserActionBox({ reportId, status, userId }) {
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [activeModalCard, setActiveModalCard] = useState(false);

  const [updateReportStatus] = useMutation(UPDATE_STATUS);

  const router = useRouter();

  const changeStatusHandler = async () => {
    const { data, errors } = await updateReportStatus({
      variables: {
        reportId,
        type: "User",
        newStatus: selectedStatus,
      },
    });

    if (data) {
      //   console.log(data);
      setActiveModalCard(true);
    } else if (errors) {
      console.error(errors);
    }
  };

  const banUserHandler = async () => {
    console.log("ban user endpoint (not have yet)");
  };

  const toProfileHandler = () => {
    router.push(`/users/${userId}`);
  };

  const closeModalCardHandler = () => {
    setActiveModalCard(false);
  };

  return (
    <Fragment>
      <BModalCard
        active={activeModalCard}
        onCloseHandler={closeModalCardHandler}
        title={"Done"}
        subtitle={"Update report status successfully."}
        cardImage={SalyImage}
      />
      <div>
        <div className="RUser__action">
          <div
            style={{
              fontSize: "2rem",
              color: "#333",
              marginBottom: "2.5rem",
            }}
          >
            Action Box
          </div>
          <BForm>
            <BButton
              title={"User Profile Page"}
              onClick={toProfileHandler}
              containerStyles={{ marginBottom: "1rem", color: "whitesmoke" }}
            />
            <BButton
              title={"Ban this user"}
              onClick={banUserHandler}
              containerStyles={{
                marginBottom: "1rem",
                backgroundColor: "salmon",
                color: "white",
              }}
            />
          </BForm>
        </div>
        <div
          className="RUser__action"
          style={{ transform: "translateY(-50px)" }}
        >
          <div
            style={{
              fontSize: "2rem",
              color: "#333",
              marginBottom: "1.5rem",
            }}
          >
            Report Status
          </div>
          <SelectionBox
            options={statusOptions}
            selected={selectedStatus}
            setSelected={setSelectedStatus}
          />
          <BForm>
            <BButton
              title={"Confirm"}
              onClick={changeStatusHandler}
              containerStyles={{ width: "10rem", color: "whitesmoke" }}
            />
          </BForm>
        </div>
      </div>
    </Fragment>
  );
}

export default RUserActionBox;
