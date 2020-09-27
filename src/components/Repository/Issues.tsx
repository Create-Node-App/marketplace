import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSpinner } from 'react-icons/fa';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { RepositoryIssuesContent } from 'app/hooks/git-hook';
import { IssueList, FilterList, IssueLabel, PageNav } from 'app/components/Repository/Repository.styled';
import Loading from 'app/components/Loading';

export interface RepositoryIssuesProps {
  onFilterChange: (index: number) => void;
  onPageChange: (action: string) => void;
  filters: {
    state: string;
    label: string;
  }[];
  filterIndex: number;
  page: number;
  isFetching: boolean;
  issues: RepositoryIssuesContent[];
}

export const RepositoryIssues: FC<RepositoryIssuesProps> = ({
  onFilterChange,
  onPageChange,
  filters,
  filterIndex,
  page,
  isFetching,
  issues,
}) => {
  const { t } = useTranslation();

  return (
    <IssueList>
      <FilterList>
        {filters.map((filter, index) => (
          <button
            type="button"
            className={filterIndex === index ? 'active' : undefined}
            key={filter.state}
            onClick={() => onFilterChange(index)}
          >
            {t(filter.label)}
          </button>
        ))}
      </FilterList>
      {isFetching && (
        <Loading>
          <FaSpinner />
        </Loading>
      )}
      {!isFetching &&
        issues.map((issue) => (
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
        <button type="button" disabled={page < 2} onClick={() => onPageChange('back')}>
          <GoArrowLeft />
          {t('back')}
        </button>
        <button type="button" onClick={() => onPageChange('next')}>
          {t('next')}
          <GoArrowRight />
        </button>
      </PageNav>
    </IssueList>
  );
};
