import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGithubAlt, FaSpinner, FaSearch, FaRegFileAlt } from 'react-icons/fa';

import { filterByValue } from 'app/helpers/array';
import { useMarketplaceContent, RepositoryContent } from 'app/hooks/market-hook';

import Layout, { Icon } from 'app/components/Layout';
import { Form, SubmitButton, List, ErrorMessage } from 'app/components/Form';
import { Loading, Owner, OwnerProfile, RepoInfo } from 'app/components/Repository';

const repoUrl = (repo: RepositoryContent) => {
  if (repo.branch) {
    return `/${repo.source}/${encodeURIComponent(`${repo.name}@${repo.branch}`)}`;
  }

  return `/${repo.source}/${encodeURIComponent(repo.name)}`;
};

const HomePage = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>('');

  const { repositories, error, fetchMarketplaceContent, isFetching } = useMarketplaceContent();

  useEffect(() => {
    if (fetchMarketplaceContent) {
      fetchMarketplaceContent();
    }
  }, [fetchMarketplaceContent]);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value);

  const filteredRepositories = filterByValue<RepositoryContent>(repositories || [], filter);

  return (
    <Layout>
      <Icon>
        <FaGithubAlt />
      </Icon>

      <h1>{t('title')}</h1>

      <Form>
        <input type="text" placeholder={t('filter')} value={filter} onChange={handleFilterChange} />
        <SubmitButton>
          {isFetching ? <FaSpinner color="#fff" size={14} /> : <FaSearch color="#fff" size={14} />}
        </SubmitButton>
      </Form>

      {error && <ErrorMessage>{error.message}</ErrorMessage>}

      {isFetching && (
        <Loading>
          <FaSpinner />
        </Loading>
      )}

      <List>
        {filteredRepositories.map((repo: RepositoryContent) => {
          const url = repoUrl(repo);

          return (
            <li key={url}>
              <Owner>
                <OwnerProfile>
                  <Link to={url}>{repo.img && <img src={repo.img} alt={repo.img} />}</Link>
                </OwnerProfile>
                <RepoInfo>
                  <h1>
                    <Link to={url}>{repo.title}</Link>
                  </h1>
                  <div>
                    {repo.license && (
                      <span>
                        <FaRegFileAlt /> {repo.license}
                      </span>
                    )}
                  </div>
                  <p>{repo.description}</p>
                </RepoInfo>
              </Owner>
            </li>
          );
        })}
      </List>
    </Layout>
  );
};

export default HomePage;
