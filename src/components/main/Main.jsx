import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {getRepos} from "../actions/repos";
import Repo from "./repo/Repo";
import {setCurrentPage} from "../../reducers/reposReducer";
import {createPages} from "../../utils/pagesCreator";
import './main.less';

const Main = () => {
  const dispatch = useDispatch();
  const repos = useSelector(state => state.repos.items);
  const isFetching = useSelector(state => state.repos.isFetching);
  const currentPage = useSelector(state => state.repos.currentPage);
  const totalCount = useSelector(state => state.repos.totalCount);
  const perPage = useSelector(state => state.repos.perPage);
  const isFetchError = useSelector(state => state.repos.isFetchError);
  const [searchValue, setSearchValue] = useState('');
  const pagesCount = Math.ceil(totalCount / perPage);

  const pages = [];
  createPages(pages, pagesCount, currentPage);

  useEffect(() => {
    dispatch(getRepos(searchValue, currentPage, perPage))
  }, [currentPage]);

  function handleChangeValue(e) {
    setSearchValue(e.target.value)
  }

  function handleSearch() {
    dispatch(setCurrentPage(1));
    dispatch(getRepos(searchValue))
  }

  return (
    <div>
      {
        isFetchError &&
        <div className="alert alert-danger" role="alert">
          Ooops! ERROR! Please try to reload the page
        </div>
      }
      <div className="search">
        <input
          type="text"
          className="search-input"
          value={searchValue}
          placeholder="Search a repository"
          onChange={handleChangeValue}
        />
        <button
          className="search-btn"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {
        isFetching === false
        ?
        (repos.map(repo =>
        <Repo repo={repo}/>
        ))
          : (
            <div className="fetching">

            </div>
          )
      }

      <div className="pages">
        {pages.map((page, index) =>
          <span
            key={index}
            className={currentPage === page ? "current-page" : "page"}
            onClick={() => dispatch(setCurrentPage(page))}
          >
            {page}
          </span>
        )}
      </div>
    </div>
  );
};

export default Main;
