export type Poll = {
  id: string;
  created_at: string;
  poll_id: string;
  poll_title: string;
  poll_description: string;
  poll_option_labels: string[];
  poll_option_votes: number[];
  poll_option_image_urls: string[];
  poll_votes_total: number;
  is_public: boolean;
};

export type Vote = {
  created_at: string;
  id: number;
  user_id: string;
  poll_id: string;
  option_selected: number;
};

export type PollWithUserVote = Poll & { userVote: Vote | undefined };
