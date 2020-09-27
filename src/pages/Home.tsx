import React, { useEffect, useState, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithubAlt, FaSpinner, FaSearch } from 'react-icons/fa';
import { filterByValue } from 'app/helpers/array';
import { useMarketplaceContent, RepositoryContent } from 'app/hooks/market-hook';
import { Loading } from 'app/components/Loading';
import { Form, SubmitButton, List, ErrorMessage } from 'app/components/Extensions/Form.styled';
import { ExtensionsOwner } from 'app/components/Extensions';
import Layout, { Icon } from 'app/components/Layout';

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
        {filteredRepositories.map((repository: RepositoryContent) => {
          return (
            <li key={`${repository.name}&${repository.branch}`}>
              <ExtensionsOwner repository={repository} />
            </li>
          );
        })}
      </List>
    </Layout>
  );
};

export default HomePage;
