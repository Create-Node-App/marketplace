import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGithubAlt, FaSpinner, FaRegFileAlt, FaStar } from 'react-icons/fa';
import { GoRepoForked, GoArrowLeft, GoArrowRight } from 'react-icons/go';

import { useRepository, useIssues } from 'app/hooks/git-hook';
import Layout, { Icon } from 'app/components/Layout';
import {
  Loading,
  Owner,
  OwnerProfile,
  RepoInfo,
  IssueList,
  FilterList,
  IssueLabel,
  PageNav,
} from 'app/components/Repository';

const HomePage = () => {
  const { t } = useTranslation();
  const { source, repo } = useParams<{ source: 'github'; repo: string }>();
  const [filterIndex, setFilterIndex] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const filters = [
    { state: 'all', label: 'issues', active: true },
    { state: 'open', label: 'open', active: false },
    { state: 'closed', label: 'closed', active: false },
  ];

  const [repoName, branch] = decodeURIComponent(repo).split('@');

  const { repository, fetchRepository, error: repoError, isFetching: isFetchingRepo } = useRepository(source, repoName);
  const { issues, fetchIssues, error: issuesError, isFetching: isFetchingIssues } = useIssues(source, repoName);

  useEffect(() => {
    fetchRepository && fetchRepository();
    fetchIssues &&
      fetchIssues({
        params: {
          state: filters.find((filter) => filter.active)?.state,
          per_page: 4,
        },
      });
  }, [fetchRepository, fetchIssues]);

  const loadFilters = useCallback(
    (filterIndex, page) => {
      fetchIssues &&
        fetchIssues({
          params: {
            state: filters[filterIndex].state,
            per_page: 5,
            page,
          },
        });
    },
    [fetchIssues],
  );

  const handleFilters = (filterIndex: number) => {
    setFilterIndex(filterIndex);
    loadFilters(filterIndex, page);
  };

  const handlePage = (action: string) => {
    const nextPage = action === 'back' ? page - 1 : page + 1;
    setPage(nextPage);
    loadFilters(filterIndex, nextPage);
  };

  if (isFetchingRepo) {
    return (
      <Layout>
        <Icon>
          <FaGithubAlt />
        </Icon>
        <Loading>
          <FaSpinner />
        </Loading>
      </Layout>
    );
  }

  return (
    <Layout>
      <Icon>
        <FaGithubAlt />
      </Icon>

      <Owner>
        <div>
          <Link to="/">
            <GoArrowLeft /> {t('back-to-repos')}
          </Link>
        </div>
        <OwnerProfile>
          <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
            <img src={repository.owner?.avatar_url} alt={repository.owner?.login} />
          </a>
          <h2>{repository.owner?.login}</h2>
        </OwnerProfile>
        <RepoInfo>
          <h1>
            <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
              {repository.name}
            </a>
          </h1>
          <div>
            {repository.license && (
              <span>
                <FaRegFileAlt /> {repository.license.name}
              </span>
            )}
            {repository.stargazers_count !== 0 && (
              <span>
                <FaStar />
                {`${repository.stargazers_count} ${repository.stargazers_count === 1 ? 'star' : 'stars'}`}
              </span>
            )}
            {repository.forks !== 0 && (
              <span>
                <GoRepoForked />
                {`${Number(repository.forks_count).toLocaleString()} ${
                  repository.forks_count === 1 ? 'fork' : 'forks'
                }`}
              </span>
            )}
          </div>
          <p>{repository.description}</p>
        </RepoInfo>
      </Owner>

      <IssueList>
        <FilterList>
          {filters.map((filter, index) => (
            <button
              type="button"
              className={filterIndex === index ? 'active' : undefined}
              key={filter.state}
              onClick={() => handleFilters(index)}
            >
              {t(filter.label)}
            </button>
          ))}
        </FilterList>
        {issues.map((issue) => (
          <li key={String(issue.id)}>
            <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
              <img src={issue.user?.avatar_url} alt={issue.user?.login} />
              <div>
                <strong>
                  <span>{issue.title}</span>
                  {issue.labels?.map((label) => (
                    <IssueLabel key={String(label.id)} color={label.color}>
                      {label.name}
                    </IssueLabel>
                  ))}
                </strong>
                <p> {issue.user?.login} </p>
              </div>
            </a>
          </li>
        ))}
        <PageNav>
          <button type="button" disabled={page < 2} onClick={() => handlePage('back')}>
            <GoArrowLeft />
            {t('back')}
          </button>
          <button type="button" onClick={() => handlePage('next')}>
            {t('next')}
            <GoArrowRight />
          </button>
        </PageNav>
      </IssueList>
    </Layout>
  );
};

export default HomePage;
