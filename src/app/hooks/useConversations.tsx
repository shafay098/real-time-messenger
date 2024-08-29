import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  console.log("in converstation");
  const params = useParams();
  const conversationId = useMemo(() => {
    console.log("🚀 ~ in memo", "sss");
    if (!params?.conversationsId) {
      return null;
    }
    return params.conversationsId;
  }, [params?.conversationsId]);

  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return useMemo(
    () => ({
      isOpen,
      conversationId,
    }),
    [isOpen, conversationId]
  );
};

export default useConversation;
