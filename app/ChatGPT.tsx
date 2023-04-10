"use client";
import { useRef, useState, useCallback, Fragment } from "react";
import handler from './api/openAIChat'

interface Conversation {
  role: string;
  content: string;
}

function ChatGPT() {
  const [value, setValue] = useState<string>("");
  const [conversation, setConversation] = useState<Conversation[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);


  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        console.log("pressed enter key")
      //add user.s input to conversation
      const chatHistory = [...conversation, { role: "user", content: value }];
      const response = await fetch("/api/openAIChat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: chatHistory }),
      });

      const data = await response.json();
      setValue("");
      setConversation([
        ...chatHistory,
        { role: "assistant", content: data.result.choices[0].message.content },
      ]);
    }
  };


  const handleRefresh = () => {
    inputRef.current?.focus()
    setValue("")
    setConversation([])
  }

  return (
    <section>
      <p className="mb-6 font-bold">Let´s talk</p>
      <input
        type="text"
        value={value}
        onChange={(e)=> setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="write your question here"
        ref={inputRef}
        className="w-full  max-w-xs input-bordered input-secondary"
      />

<button onClick={handleRefresh} className="mt-6 btn btn-primary btn-xs">Start New Conversation</button>


      <div className="textarea">
        {conversation.map((item, index) => (
          <Fragment key={index}>
            <br />
            {item.role === "assistant" ? (
              <div className="chat chat-end">
                <div className="chat-bubble chat-bubble-secondary">
                  <strong>AVA</strong>
                  <br />
                  {item.content}
                </div>
              </div>
            ) : (
              <div className="chat chat-start">
                <div className="chat-bubble chat-bubble-primary">
                  <strong className="badge badge-secondary">User</strong>
                  <br />
                  {item.content}
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}

export default ChatGPT;
