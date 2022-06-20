import { useMemo } from 'react';
import { useQuery } from "@apollo/client";
import { User } from "../typedefs";
import { ME_QUERY } from '../queries/me.query';

export const useMe = (): User | null => {
  const { data, loading, error } = useQuery(ME_QUERY);

  const isReady = !loading && !error;

  const me = useMemo(() => {
    if (isReady && data.me) {
      return data.me;
    }

    return null;
  }, [isReady, data]);

  return me;
};
