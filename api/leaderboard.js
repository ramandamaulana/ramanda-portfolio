import { fetchLeaderboardData } from "../lib/sociabuzz-leaderboard.mjs";

export default async function handler(request, response) {
  try {
    const data = await fetchLeaderboardData();

    response.setHeader("Cache-Control", "s-maxage=25, stale-while-revalidate=60");
    response.status(200).json({
      ok: true,
      updatedAt: new Date().toISOString(),
      ...data
    });
  } catch (error) {
    response.status(502).json({
      ok: false,
      error: error.message || "Gagal mengambil data SociaBuzz"
    });
  }
}
