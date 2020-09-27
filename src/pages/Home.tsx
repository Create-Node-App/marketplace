import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaSpinner, FaSearch, FaRegFileAlt } from 'react-icons/fa';

import { Form, SubmitButton, List, ErrorMessage } from 'app/components/Form';
import { Loading, Owner, OwnerProfile, RepoInfo } from 'app/components/Repository';
import Layout, { Icon } from 'app/components/Layout';
import { useTranslation } from 'react-i18next';
import { useMarketplaceContent, RepositoryContent } from 'app/hooks/github-hook';
import { filterByValue } from 'app/helpers/array';

const HomePage = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>('');

  const { repositories, error, fetchMarketplaceContent, isFetching } = useMarketplaceContent();

  useEffect(() => {
    if (fetchMarketplaceContent) {
      fetchMarketplaceContent();
    }
  }, [fetchMarketplaceContent]);

  const filteredRepositories = filterByValue<RepositoryContent>(repositories || [], filter);

  return (
    <Layout>
      <Icon>
        <FaGithubAlt />
      </Icon>

      <h1>{t('title')}</h1>

      <Form>
        <input type="text" placeholder={t('filter')} value={filter} onChange={(e) => setFilter(e.target.value)} />
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
        {filteredRepositories.map((repo: RepositoryContent) => (
          <li key={repo.name}>
            <Owner>
              <OwnerProfile>
                <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                  {repo.img && <img src={repo.img} alt={repo.img} />}
                </Link>
              </OwnerProfile>
              <RepoInfo>
                <h1>
                  <Link to={`/repository/${encodeURIComponent(repo.name)}`}>{repo.name}</Link>
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
        ))}
      </List>
    </Layout>
  );
};

export default HomePage;
