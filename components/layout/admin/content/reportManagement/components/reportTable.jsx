import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import ReportList from "./reportList";
import ReportTableHeader from "./reportTableHeader";

const GET_REPORT = gql`
  query {
    getReportedUsers {
      id
      user {
        id
        username
        profile
      }
      reportStatus
      createdAt
    }
    getReportedProducts {
      id
      product {
        id
        title
        images
      }
      reportStatus
      createdAt
    }
  }
`;

function ReportTable(props) {
  const {} = props;

  const [listComponents, setListComponents] = useState(null);

  const { data, error, loading } = useQuery(GET_REPORT, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!loading && data) {
      const { getReportedUsers, getReportedProducts } = data;
      const usersList = getReportedUsers.map((report) => (
        <ReportList
          key={report.id}
          id={report.user.id}
          title={report.user.username}
          image={report.user.profile}
          status={report.reportStatus}
          type={"USER"}
          onCheck={() => {}}
          date={report.createdAt}
        />
      ));
      const productsList = getReportedProducts.map((report) => (
        <ReportList
          key={report.id}
          id={report.product.id}
          title={report.product.title}
          image={report.product.images[0]}
          status={report.reportStatus}
          type={"Product"}
          onCheck={() => {}}
          date={report.createdAt}
        />
      ));
      const reportsList = [...usersList, ...productsList];

      reportsList.sort((a, b) => {
        let fa = new Date(a.props.date);
        let fb = new Date(b.props.date);

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });

      setListComponents(reportsList);
    }
  }, [data, error, loading]);

  return (
    <div className="reportTable">
      <ReportTableHeader />
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.6rem",
            marginBottom: "1rem",
          }}
        >
          Loading...
        </div>
      )}
      {data && !error && <>{listComponents}</>}
    </div>
  );
}

export default ReportTable;
