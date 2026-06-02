import { fetchLeaderboardData } from "../../lib/sociabuzz-leaderboard.mjs";

export default async function handler() {
  try {
    const data = await fetchLeaderboardData();

    return Response.json(
      {
        ok: true,
        updatedAt: new Date().toISOString(),
        ...data
      },
      {
        headers: {
          "Cache-Control": "s-maxage=25, stale-while-revalidate=60"
        }
      }
    );
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error.message || "Gagal mengambil data SociaBuzz"
      },
      { status: 502 }
    );
  }
}
