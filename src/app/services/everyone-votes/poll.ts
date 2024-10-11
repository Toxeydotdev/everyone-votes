export interface PollInsertObject {
  poll_title: string;
  poll_description: string;
  poll_option_labels: string[];
  poll_option_image_urls: string[];
  is_public: boolean;
}

export interface Poll extends PollInsertObject {
  id: string;
  created_at: string;
  poll_option_votes: number[];
  poll_votes_total: number;
}

export interface Vote {
  option_selected: number;
}

export interface PollWithUserVote extends Poll {
  userVote: Vote | null;
}
