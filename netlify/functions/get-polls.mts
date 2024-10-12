import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env["NG_APP_SUPABASEURL"],
  process.env["NG_APP_SUPABASEKEY"]
);

exports.handler = async () => {
  const response = await supabase
    .from("polls")
    .select()
    .is("deactivated", null);

  return {
    statusCode: 200,
    body: JSON.stringify({
      response,
    }),
  };
};
