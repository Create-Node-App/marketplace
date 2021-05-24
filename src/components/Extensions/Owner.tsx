import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { FaRegFileAlt } from 'react-icons/fa';
import { RepositoryContent } from 'hooks/market-hook';
import { Owner, OwnerProfile, RepoInfo } from 'components/Repository/Repository.styled';

const repoUrl = (repository: RepositoryContent) => {
  if (repository.branch) {
    return `/${repository.source}/${encodeURIComponent(`${repository.name}@${repository.branch}`)}`;
  }

  return `/${repository.source}/${encodeURIComponent(repository.name)}`;
};

export interface ExtensionsOwnerProps {
  repository: RepositoryContent;
}

export const ExtensionsOwner: FC<ExtensionsOwnerProps> = ({ repository }) => {
  const url = repoUrl(repository);

  return (
    <Owner>
      {repository.img && (
        <OwnerProfile>
          <Link to={url}>
            <img src={repository.img} alt={repository.img} />
          </Link>
        </OwnerProfile>
      )}
      <RepoInfo>
        <h1>
          <Link to={url}>{repository.title}</Link>
        </h1>
        <div>
          {repository.license && (
            <span>
              <FaRegFileAlt /> {repository.license}
            </span>
          )}
        </div>
        <p>{repository.description}</p>
      </RepoInfo>
    </Owner>
  );
};
