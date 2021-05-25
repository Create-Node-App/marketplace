import { useRequest } from 'hooks/request-hook';

const GITHUB_API = 'https://api.github.com';

const API_BASE_URL = {
  github: GITHUB_API,
};

const BASE_URL = {
  github: 'https://raw.githubusercontent.com',
};

export interface RepositoryContent {
  name?: string;
  description?: string;
  branch?: string;
  html_url?: string;
  owner?: {
    avatar_url?: string;
    login: string;
  };
  license?: {
    name: string;
  };
  stargazers_count?: number;
  forks_count?: number;
  forks?: number;
}

export interface RepositoryIssuesContent {
  id?: string;
  html_url?: string;
  user?: {
    avatar_url: string;
    login: string;
  };
  title?: string;
  labels?: {
    name: string;
    id: string;
    color: string;
  }[];
}

export const useRepository = (source: 'github', name: string) => {
  const { isFetching, data, error, fetch } = useRequest<RepositoryContent>({
    initialValue: {},
    baseURL: API_BASE_URL[source],
    url: `repos/${name}`,
  });

  return {
    repository: data || {},
    fetchRepository: fetch,
    isFetching,
    error,
  };
};

export const useReadme = (source: 'github', name: string, branch = 'main', subdir = '') => {
  const { isFetching, data, error, fetch } = useRequest<string>({
    initialValue: '',
    baseURL: BASE_URL[source],
    url: subdir === '' ? `${name}/${branch}/README.md` : `${name}/${branch}/${subdir}/README.md`,
  });

  return {
    readme: data || '',
    fetchReadme: fetch,
    isFetching,
    error,
  };
};

export const useIssues = (source: 'github', name: string) => {
  const { isFetching, data, error, fetch } = useRequest<RepositoryIssuesContent[]>({
    initialValue: [],
    baseURL: API_BASE_URL[source],
    url: `repos/${name}/issues`,
  });

  return {
    issues: data || [],
    fetchIssues: fetch,
    isFetching,
    error,
  };
};
