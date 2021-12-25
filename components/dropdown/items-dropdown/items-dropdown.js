import { Fragment, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";

import { HiFlag, HiOutlineHeart, HiHeart, HiPencil } from "react-icons/hi";
import { useWatchlistStore } from "../../../store/watchlist-store";
import UserDropdownItem from "../user-dropdown/user-dropdown-item";
import { useRouter } from "next/router";

const ADD_TO_WATHCLIST = gql`
  mutation ($watchedArr: [ID]!) {
    addToWatchlists(watchedArr: $watchedArr) {
      watchlists {
        id
      }
    }
  }
`;

function ItemsDropdown({ productId, isEnd, canEdit }) {
  const router = useRouter();
  const [addToWatchlists] = useMutation(ADD_TO_WATHCLIST);

  const { toggleProductWatched, watchlist } = useWatchlistStore();
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    if (!productId) {
      return;
    }

    const idx = watchlist.slice().indexOf(productId);
    if (idx === -1) {
      setIsWatched(false);
    } else {
      setIsWatched(true);
    }
  }, [watchlist.slice()]);

  const watchClickedHandler = async () => {
    toggleProductWatched(productId);
    const { data, errors } = await addToWatchlists({
      variables: {
        watchedArr: watchlist.slice(),
      },
    });
    if (data) {
      // console.log(data);
    } else {
      console.log(errors);
    }
  };

  const watchlistComp = (
    <>
      {!isWatched && (
        <UserDropdownItem
          leftIcon={<HiOutlineHeart />}
          onClickHandler={watchClickedHandler}
        >
          Add to watchlist
        </UserDropdownItem>
      )}
      {isWatched && (
        <UserDropdownItem
          leftIcon={<HiHeart color="#fa6363" />}
          onClickHandler={watchClickedHandler}
        >
          Remove from watchlist
        </UserDropdownItem>
      )}
    </>
  );

  return (
    <Fragment>
      <div className="user-dropdown user-dropdown--items">
        {!isEnd && watchlistComp}
        {canEdit && (
          <UserDropdownItem
            leftIcon={<HiPencil color="#999" />}
            onClickHandler={() => {
              router.push(`/items/${productId}/edit`);
            }}
          >
            <span>Edit</span>
          </UserDropdownItem>
        )}
        <UserDropdownItem leftIcon={<HiFlag color="#999" />}>
          <span>Report</span>
        </UserDropdownItem>
      </div>
    </Fragment>
  );
}

export default ItemsDropdown;
