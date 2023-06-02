// pocketbase record id
export interface Id {
  id: string;
  "@collectionId": string;
  "@collectionName": string;
  created: string;
  updated: string;
  username?: string;
  name?: string;
  verified: boolean;
  emailVisibility: boolean;
  posts?: string[];
}

export interface NewUser {
  email: string;
  token?: string;
}

// user type
export type User = Id & NewUser;

export interface PostId {
  id: string;
  "@collectionId": string;
  "@collectionName": string;
  created: string;
  updated: string;
  author: string;
}

export interface publishStatusType {
  published: boolean;
  publisher: string;
  publishDate: Date | "";
}

export interface NewPost {
  content: string;
  publishStatus: publishStatusType;
}

// user post
export type Post = PostId & NewPost;

// the is structure pocketbase will return
export type PostData = {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: Post[];
};

//holds publication status of a given publisher: hashnode, medium, devto, etc
export interface IsPublishedType {
  isPublished: boolean;
  datePublished?: Date;
}

export type publicationStatus = Record<string, IsPublishedType>;

// Blog post type
export interface PostType {
  content: string;
  publishStatus: publicationStatus;
  userId: string;
}
