import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { FaRegFileAlt, FaStar } from 'react-icons/fa';
import { RepositoryContent } from 'app/hooks/git-hook';
import { Owner, OwnerProfile, RepoInfo } from 'app/components/Repository/Repository.styled';
import { GoArrowLeft, GoRepoForked } from 'react-icons/go';
import { useTranslation } from 'react-i18next';

export interface RepositoryOwnerProps {
  repository: RepositoryContent;
}

export const RepositoryOwner: FC<RepositoryOwnerProps> = ({ repository }) => {
  const { t } = useTranslation();

  return (
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
              {`${Number(repository.forks_count).toLocaleString()} ${repository.forks_count === 1 ? 'fork' : 'forks'}`}
            </span>
          )}
        </div>
        <p>{repository.description}</p>
      </RepoInfo>
    </Owner>
  );
};
