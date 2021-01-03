import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {getContributors, getCurrentRepo} from "../actions/repos";
import './card.less'

const Card = (props) => {
  const {username, reponame} = useParams();
  const [repo, setRepo] = useState({owner: {}});
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    getCurrentRepo(username, reponame, setRepo);
    getContributors(username, reponame, setContributors);
  }, []);

  function handleClickBack() {
    props.history.goBack()
  }

  return (
    <div>
      <button
        className="back-btn"
        onClick={handleClickBack}
      >
        Back
      </button>
      <div className="card">
        <img src={repo.owner.avatar_url} alt=""/>
        <div className="name">
          {repo.name}
        </div>
        <div className="stars">
          {repo.stargazers_count}
        </div>
      </div>
      {contributors.map((contributors, index) =>
        <div>{index + 1}. {contributors.login}</div>
      )}
    </div>
  );
};

export default Card;
