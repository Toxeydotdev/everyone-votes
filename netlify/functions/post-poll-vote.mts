import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env["NG_APP_SUPABASEURL"],
  process.env["NG_APP_SUPABASEKEY"]
);

exports.handler = async (event: { body: string }) => {
  let body = JSON.parse(event.body);

  const { pollId, userId, optionSelected } = body;
  const response = await supabase
    .from("poll_votes")
    .insert([
      {
        poll_id: pollId,
        user_id: userId,
        option_selected: optionSelected,
      },
    ])
    .select(
      `
    poll_id,
    option_selected
  `
    );

  return {
    statusCode: 200,
    body: JSON.stringify({
      response,
    }),
  };
};
