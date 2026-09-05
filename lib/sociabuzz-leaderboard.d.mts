export interface LeaderboardDonor {
  name: string
  amount: string
  amountNumber: number
}

export interface SociaBuzzLeaderboard {
  title: string
  tribeId: string
  leaderboard: LeaderboardDonor[]
}

export function parseSociaBuzzResponse(rawText: string): SociaBuzzLeaderboard
export function fetchLeaderboardData(): Promise<SociaBuzzLeaderboard>
