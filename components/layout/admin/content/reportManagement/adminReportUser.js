import { gql, useQuery } from "@apollo/client";
import { Fragment, useEffect, useState } from "react";
import { toPhoneNumber } from "../../../../../utils/stringFormat";
import BForm from "../../../../atoms/BForm/bForm";
import BInput from "../../../../atoms/BInput/bInput";
import BTextarea from "../../../../atoms/BTextarea/bTextarea";
import BLoading from "../../../../molecules/BLoading/BLoading";
import RUserActionBox from "./adminReportUserComps/RUserActionBox";
import RUserCard from "./adminReportUserComps/RUserCard";
import RUserInfomation from "./adminReportUserComps/RUserInfomation";
import RUserReportBy from "./adminReportUserComps/RUserReportBy";

const GET_USER_REPORT = gql`
  query ($reportId: ID!) {
    getReportUser(reportId: $reportId) {
      id
      user {
        id
        profile
        name {
          first
          last
        }
        email
        username
        phone
        join
      }
      reportBy {
        id
        username
        status
      }
      body
      reportStatus
      createdAt
    }
  }
`;

function AdminReportUser({ reportId }) {
  const [reportData, setReportData] = useState(null);
  const { data, loading, error } = useQuery(GET_USER_REPORT, {
    fetchPolicy: "network-only",
    variables: {
      reportId,
    },
  });

  useEffect(() => {
    if (!loading && data) {
      setReportData(data.getReportUser);
    } else if (error) {
      console.log(error);
    }
  });

  return (
    <div className="adminContent">
      <div className="admin__content">
        <Fragment>
          {!reportData ? (
            <BLoading />
          ) : (
            <div className="UserReportContainer">
              <RUserCard user={reportData.user} />
              <RUserInfomation
                user={reportData.user}
                reportMsg={reportData.body}
              />
              <div style={{ flexBasis: "100%", height: 0 }} />
              <RUserActionBox
                userId={reportData.user.id}
                reportId={reportData.id}
                status={reportData.reportStatus}
              />
              <RUserReportBy
                reportBy={reportData.reportBy}
                reportedAt={reportData.createdAt}
              />
            </div>
          )}
        </Fragment>
      </div>
    </div>
  );
}

export default AdminReportUser;
