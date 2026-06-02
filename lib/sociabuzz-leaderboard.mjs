const TRIBE_ID = "7694363973";
const SOCIABUZZ_URL = `https://sociabuzz.com/pro/tribe/tribe_profile/get_detail_leaderboard_int_v4/${TRIBE_ID}`;

function compactText(value = "") {
  return decodeHtml(value.replace(/<[^>]*>/g, ""))
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtml(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function parseDatasHtml(datasHtml, tribeId = TRIBE_ID) {
  const titleMatch = datasHtml.match(/<h4\b[^>]*>[\s\S]*?<strong\b[^>]*>([\s\S]*?)<\/strong>[\s\S]*?<\/h4>/i);
  const title = compactText(titleMatch?.[1] || "Sponsor Kehidupan");

  const rowMatches = datasHtml.match(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi) || [];
  const leaderboard = rowMatches
    .map((row) => {
      const strongMatches = [...row.matchAll(/<strong\b[^>]*>([\s\S]*?)<\/strong>/gi)];
      const name = compactText(strongMatches[0]?.[1] || "");
      const amount = compactText(strongMatches[1]?.[1] || "");
      const amountNumber = Number(amount.replace(/[^\d]/g, "") || 0);

      return { name, amount, amountNumber };
    })
    .filter((item) => item.name && item.amount);

  return { title, tribeId, leaderboard };
}

export function parseSociaBuzzResponse(rawText) {
  const trimmed = rawText.trim();

  try {
    const json = JSON.parse(trimmed);
    if (json.datas) {
      return parseDatasHtml(json.datas, json.tribe_random_id || TRIBE_ID);
    }
  } catch {}

  if (trimmed.includes("<table") || trimmed.includes("show_donate")) {
    return parseDatasHtml(trimmed);
  }

  throw new Error("Respons SociaBuzz tidak berisi data leaderboard.");
}

export async function fetchLeaderboardData() {
  const url = new URL(SOCIABUZZ_URL);
  url.searchParams.set("_", Date.now().toString());

  const response = await fetch(url, {
    headers: {
      "accept": "text/html,application/json",
      "user-agent": "ramanda-portfolio-donate-overlay/1.0"
    }
  });

  if (!response.ok) {
    throw new Error(`SociaBuzz HTTP ${response.status}`);
  }

  const rawText = await response.text();
  return parseSociaBuzzResponse(rawText);
}
