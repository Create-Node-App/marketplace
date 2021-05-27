import { useRequest } from 'hooks/request-hook';

const MARKETPLACE_CONTENT =
  'https://raw.githubusercontent.com/Create-Node-App/marketplace-content/master/react-webpack.json';

export interface RepositoryContent {
  title: string;
  description?: string;
  name: string;
  branch?: string;
  subdir?: string;
  topic?: string[];
  source?: 'github' | 'gitlab' | 'bitbucket';
  img?: string;
  license?: string;
}

export interface ContentData {
  repositories: RepositoryContent[];
}

export const useMarketplaceContent = () => {
  const { isFetching, data, error, fetch } = useRequest<ContentData>({
    initialValue: { repositories: [] },
    url: MARKETPLACE_CONTENT,
  });

  return {
    repositories: data?.repositories,
    fetchMarketplaceContent: fetch,
    isFetching,
    error,
  };
};
