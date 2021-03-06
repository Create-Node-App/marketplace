import React, { FC, useEffect, useState, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithubAlt, FaSpinner, FaSearch } from 'react-icons/fa';
import { filterByValue } from 'helpers/array';
import { useMarketplaceContent, RepositoryContent } from 'hooks/market-hook';
import { Loading } from 'components/Loading';
import { Form, SubmitButton, List, ErrorMessage } from 'components/Extensions/Form.styled';
import { ExtensionsOwner } from 'components/Extensions';
import Layout, { Icon } from 'components/Layout';

const HomePage: FC = () => {
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
        {filteredRepositories.map((repository: RepositoryContent, i) => {
          return (
            <li key={`repo-${i + 1}`}>
              <ExtensionsOwner repository={repository} />
            </li>
          );
        })}
      </List>
    </Layout>
  );
};

export default HomePage;
