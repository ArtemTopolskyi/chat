import { useMemo } from 'react';
import { useQuery } from "@apollo/client";
import { CHATS_QUERY } from "../queries/chats.query";
import { Chat } from "../typedefs";

export const useChats = (): Chat[] => {
  const { data, loading, error } = useQuery(CHATS_QUERY);

  const isReady = !loading && !error;

  const chats = useMemo(() => {
    if (isReady && data.chats) {
      return data.chats;
    }

    return [];
  }, [isReady, data]);

  return chats;
};
