// Storage utilities for Nederland Stemt

const STORAGE_KEY = 'nederland-stemt-votes';
const VOTES_KEY = 'nederland-stemt-vote-counts';
const LAST_VOTE_KEY = 'nederland-stemt-last-vote';

export interface VoteData {
  votedPriorities: string[];
  timestamp: number;
}

export interface VoteCounts {
  [priorityId: string]: number;
}

export const storage = {
  getVotes(): VoteData | null {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  setVotes(priorities: string[]): void {
    if (typeof window === 'undefined') return;
    const data: VoteData = {
      votedPriorities: priorities,
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(LAST_VOTE_KEY, Date.now().toString());
  },

  hasVotedThisWeek(): boolean {
    if (typeof window === 'undefined') return false;
    const lastVote = localStorage.getItem(LAST_VOTE_KEY);
    if (!lastVote) return false;
    
    const lastVoteTime = parseInt(lastVote);
    const weekInMs = 7 * 24 * 60 * 60 * 1000;
    return Date.now() - lastVoteTime < weekInMs;
  },

  getVoteCounts(): VoteCounts {
    if (typeof window === 'undefined') return {};
    const data = localStorage.getItem(VOTES_KEY);
    return data ? JSON.parse(data) : {};
  },

  incrementVotes(priorityIds: string[]): void {
    if (typeof window === 'undefined') return;
    const counts = this.getVoteCounts();
    priorityIds.forEach(id => {
      counts[id] = (counts[id] || 0) + 1;
    });
    localStorage.setItem(VOTES_KEY, JSON.stringify(counts));
  },

  clearVotes(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LAST_VOTE_KEY);
  }
};