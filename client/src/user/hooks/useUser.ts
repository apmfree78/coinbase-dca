import { AxiosResponse } from "axios";
import { axiosInstance } from "axiosInstance";
import { useQuery, useQueryClient } from "react-query";
import { queryKeys } from "react-query/constants";
import type { User } from "shared/types";
import { clearStoredUser, getStoredUser, setStoredUser } from "user-storage";

async function getUser(user: User | null): Promise<User | null> {
  if (!user) return null;
  const { data }: AxiosResponse<User> = await axiosInstance.get(
    `/collections/users/records/${user.id}`
  );
  return data;
}

interface UseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

export function useUser(): UseUser {
  const queryClient = useQueryClient();
  const { data: user } = useQuery<any, unknown, User | null, string>(
    queryKeys.user,
    () => getUser(user || null),
    {
      initialData: getStoredUser(),
      onSuccess: (received: User | null) => {
        if (!received) {
          clearStoredUser();
        } else {
          setStoredUser(received);
        }
      },
    }
  );

  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    queryClient.setQueryData(queryKeys.user, newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    queryClient.setQueryData(queryKeys.user, null);
    queryClient.removeQueries([queryKeys.posts, queryKeys.user]);
  }

  if (user === undefined) return { user: null, updateUser, clearUser };
  else return { user, updateUser, clearUser };
}
