import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useAdminStore } from "../../../../../../store/admin-Content-Store";
import BLoading from "../../../../../molecules/BLoading/BLoading";
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

const sortFunction = (sortedBy, arr) => {
  if (!arr) {
    return;
  }
  const compArr = [...arr];

  return compArr.sort((a, b) => {
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
};

function ReportTable({ sortedBy, searchInput }) {
  const { changeState, defineReportId } = useAdminStore();
  const router = useRouter();

  const [listComponents, setListComponents] = useState(null);
  const [filteredComponents, setFilteredComponents] = useState(null);

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
          onCheck={() => {
            changeState("USER_REPORT_DETAIL");
            defineReportId(report.id);

            router.push("/admin");
          }}
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
          onCheck={() => {
            changeState("PRODUCT_REPORT_DETAIL");
            defineReportId(report.id);

            router.push("/admin");
          }}
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

    if (filteredComponents) {
      const filteredArr = sortFunction(sortedBy, filteredComponents);
      setFilteredComponents(filteredArr);
    }

    const listArr = sortFunction(sortedBy, listComponents);
    setListComponents(listArr);
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

      setFilteredComponents(filteredList);
    } else {
      setFilteredComponents(null);
    }
  }, [searchInput]);

  useEffect(() => {
    sortList();
  }, [sortedBy]);

  return (
    <div className="reportTable">
      <ReportTableHeader />
      {loading && <BLoading />}
      {data && !error && !filteredComponents && <>{listComponents}</>}
      {filteredComponents && <>{filteredComponents}</>}
    </div>
  );
}

export default ReportTable;
