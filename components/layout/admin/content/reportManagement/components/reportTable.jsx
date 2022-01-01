import { gql, useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
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

const sortOptions = {
  id: "ID",
  type: "Type",
  status: "Status",
  date: "Date",
};

function ReportTable({ sortedBy, searchInput }) {
  const [listComponents, setListComponents] = useState(null);

  const { data, error, loading } = useQuery(GET_REPORT, {
    fetchPolicy: "network-only",
  });

  const initialize = useCallback(() => {
    if (!loading && data) {
      const { getReportedUsers, getReportedProducts } = data;

      const usersList = getReportedUsers.map((report) => (
        <ReportList
          key={report.id}
          id={report.user.id}
          title={report.user.username}
          image={report.user.profile}
          status={report.reportStatus}
          type={"User"}
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

      setListComponents(reportsList);
    }
  }, [data, loading, error]);

  const sortList = useCallback(() => {
    if (!listComponents) {
      return;
    }
    const list = [...listComponents];

    list.sort((a, b) => {
      let fa = a.props.id;
      let fb = b.props.id;

      if (sortedBy === sortOptions.type) {
        fa = a.props.type;
        fb = b.props.type;
      } else if (sortedBy === sortOptions.status) {
        fa = a.props.status;
        fb = b.props.status;
      } else if (sortedBy === sortOptions.date) {
        fa = new Date(a.props.date);
        fb = new Date(b.props.date);
      }

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });

    setListComponents(list);
  }, [sortedBy]);

  useEffect(() => {
    initialize();
  }, [data, error, loading]);

  useEffect(() => {
    if (searchInput.trim().length > 0) {
      const list = [...listComponents];

      const filteredList = list.filter((report) =>
        report.props.title.toLowerCase().includes(searchInput.trim())
      );

      setListComponents(filteredList);
    } else {
      initialize();
      sortList();
    }
  }, [searchInput]);

  useEffect(() => {
    sortList();
  }, [sortedBy]);

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
