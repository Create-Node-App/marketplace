import { useRequest } from 'app/hooks/request-hook';

const MARKETPLACE_CONTENT =
  'https://raw.githubusercontent.com/Create-Node-App/marketplace-content/master/react-webpack.json';

export interface RepositoryContent {
  name: string;
  url: string;
  branch?: string;
  img?: string;
  license?: string;
  description?: string;
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
