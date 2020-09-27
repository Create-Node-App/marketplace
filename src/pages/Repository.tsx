import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGithubAlt, FaSpinner } from 'react-icons/fa';

import { useRepository, useIssues, useReadme } from 'app/hooks/git-hook';
import Layout, { Icon } from 'app/components/Layout';
import { Markdown } from 'app/components/Markdown';
import { RepositoryOwner } from 'app/components/Repository';
import Loading from 'app/components/Loading';
import { RepositoryIssues } from 'app/components/Repository/Issues';

const RepositoryPage = () => {
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
  const { readme, fetchReadme, error: readmeError, isFetching: isFetchingReadme } = useReadme(source, repoName, branch);
  const { issues, fetchIssues, error: issuesError, isFetching: isFetchingIssues } = useIssues(source, repoName);

  useEffect(() => {
    fetchRepository && fetchRepository();
    fetchReadme && fetchReadme();
    fetchIssues &&
      fetchIssues({
        params: {
          state: filters.find((filter) => filter.active)?.state,
          per_page: 5,
        },
      });
  }, [fetchRepository, fetchReadme, fetchIssues]);

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

  const handleReadme = () => {
    fetchReadme && fetchReadme();
  };

  const handleFilter = (filterIndex: number) => {
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

      <RepositoryOwner error={repoError} isFetching={isFetchingRepo} repository={repository} />

      <Markdown source={readme} />

      <RepositoryIssues
        issues={issues}
        filters={filters}
        filterIndex={filterIndex}
        onFilterChange={handleFilter}
        onPageChange={handlePage}
        page={page}
        isFetching={isFetchingIssues}
        error={issuesError}
      />
    </Layout>
  );
};

export default RepositoryPage;
