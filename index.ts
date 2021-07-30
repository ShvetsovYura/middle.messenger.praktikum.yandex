import ChatMessage from "./src/components/chat-message/chat-message";
import render from "./src/utils/render";

const page = new ChatMessage({
  message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem perspiciatis temporibus fugit perferendis placeat incidunt facere laborum, suscipit soluta quis dolorum at? Magni illo eum, consequuntur voluptatem repellat exercitationem at.",
  own: true,
  status: "pending",
  time: "11:33",
});
render("#app", page);
