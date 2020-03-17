import { useEffect } from "react";
import { message } from "antd";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { APP_MSGS } from "~/gql/queries";
import { DEL_MSG } from "~/gql/mutations";

function msg(item) {
  switch (item.type) {
    case "error":
      message.error(item.message);
      break;
    case "warning":
      message.warning(item.message);
      break;
    case "success":
      message.success(item.message);
      break;
  }
}

export default function() {
  const { data, client } = useQuery(APP_MSGS);

  useEffect(() => {
    console.log(data, "adf");
    data.appMessages.messages.forEach(item => {
      msg(item);
      client.mutate({
        variables: { type: "error", id: item.id },
        mutation: DEL_MSG
      });
      //console.log(item);
    });
  });

  return null;
}
