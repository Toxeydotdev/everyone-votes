import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env["NG_APP_SUPABASEURL"],
  process.env["NG_APP_SUPABASEKEY"]
);

exports.handler = async (event: { body: string }) => {
  let body = JSON.parse(event.body);

  const id = body.id;
  const response = await supabase.from("poll_votes").select().eq("user_id", id);

  return {
    statusCode: 200,
    body: JSON.stringify({
      response,
    }),
  };
};
