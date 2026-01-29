import React, { useState, useCallback, useMemo } from "react";
import { useWebSocket } from "../hooks/useWebSocket";
import { useClipboard } from "../hooks/useClipboard";
import Button from "./ui/Button";
import { Copy, Check, Users } from "lucide-react";
import { API_BASE_URL, WEBSOCKET_URL } from "../utils/api";
import throttle from "lodash.throttle";

export default function ClipboardHub() {
  const [content, setContent] = useState("");
  const [inputToken, setInputToken] = useState("");
  const [createdToken, setCreatedToken] = useState("");
  const [roomToken, setRoomToken] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isCopiedToken, setIsCopiedToken] = useState(false);
  const [isCopiedContent, setIsCopiedContent] = useState(false);
  const { copyToClipboard } = useClipboard();

  const onContentUpdate = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  const { connected, collaborators, updateContent } = useWebSocket(
    WEBSOCKET_URL,
    roomToken,
    onContentUpdate
  );

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (isEditing) {
      throttledUpdateContent(newContent);
    }
  };

  const handleCopyToken = async () => {
    if (createdToken) {
      const success = await copyToClipboard(createdToken);
      if (success) {
        setIsCopiedToken(true);
        setTimeout(() => setIsCopiedToken(false), 1000);
      }
    }
  };

  const handleCopyContent = async () => {
    if (content) {
      const success = await copyToClipboard(content);
      if (success) {
        setIsCopiedContent(true);
        setTimeout(() => setIsCopiedContent(false), 1000);
      }
    }
  };

  const createClip = async () => {
    if (!content) return;
    try {
      setIsCreating(true);
      const response = await fetch(`${API_BASE_URL}/snippets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await response.json();
      if (data.token) setCreatedToken(data.token);
    } catch (error) {
      console.error(error);
      alert("Failed to create clip");
    } finally {
      setIsCreating(false);
    }
  };

  const joinClip = async () => {
    if (!inputToken) {
      alert("Please enter a token");
      return;
    }
    try {
      setIsJoining(true);
      const response = await fetch(`${API_BASE_URL}/snippets/${inputToken}`);
      const data = await response.json();
      if (response.ok) {
        setContent(data.content || "");
        setIsEditing(true);
        setRoomToken(inputToken);
      } else {
        alert("Invalid token or snippet not found");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to join clip");
    } finally {
      setIsJoining(false);
    }
  };

  const collaboratorList = useMemo(() => (
    <div className="flex items-center space-x-2">
      <Users className="h-5 w-5 text-teal-600 dark:text-teal-300" />
      <span className="text-sm text-teal-600 dark:text-teal-300">
        <strong>{collaborators.length} connected</strong>
      </span>
    </div>
  ), [collaborators.length]);

  const throttledUpdateContent = useCallback(
    throttle((content: string) => {
      updateContent(content);
    }, 100),
    [updateContent]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
      {/* Main Editor */}
      <div className="md:col-span-3 space-y-4">
        <div className="bg-white dark:bg-gray-800 border rounded-2xl shadow-xl p-6">
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Start typing or join a collaboration..."
            className="w-full min-h-[400px] p-5 text-lg bg-white dark:bg-gray-800 rounded-xl border focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-white resize-none"
          />

          {!isEditing && createdToken && (
            <div className="flex items-center justify-between mt-4 bg-white/20 dark:bg-gray-700 rounded-lg p-3 shadow-inner">
              <span className="font-medium text-teal-600 dark:text-teal-300">
                Token: <strong>{createdToken}</strong>
              </span>
              <Button
                onClick={handleCopyToken}
                variant="secondary"
                className="p-2 rounded-full"
              >
                {isCopiedToken ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-teal-600 dark:text-teal-300" />}
              </Button>
              {isCopiedToken && <span className="text-green-500 text-sm ml-2">Copied!</span>}
            </div>
          )}

          <div className="flex justify-end mt-4">
            <Button
              onClick={createClip}
              variant="primary"
              className="px-8 py-2"
              disabled={isCreating || !content}
            >
              {isCreating ? "Creating..." : "Create Clip"}
            </Button>
          </div>
        </div>

        {isEditing && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-teal-600 dark:text-teal-300">
                Collaborative Editor
              </h2>
              <div className="flex items-center gap-2">
                {collaboratorList}
                <Button onClick={handleCopyContent} variant="secondary" className="p-2 rounded-full">
                  {isCopiedContent ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-teal-600 dark:text-teal-300" />}
                </Button>
                {isCopiedContent && <span className="text-green-500 text-sm ml-1">Copied!</span>}
              </div>
            </div>
            <textarea
              value={content}
              onChange={handleContentChange}
              className="w-full min-h-[400px] p-5 text-lg bg-white dark:bg-gray-800 rounded-xl border focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-white resize-none"
            />
            <div className="flex justify-end">
              <Button
                onClick={() => window.location.reload()}
                variant="primary"
                className="px-6 py-2"
              >
                Create Again
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="md:col-span-1 space-y-4">
        <div className="bg-white dark:bg-gray-800 border rounded-2xl shadow-lg p-4">
          <h3 className="font-medium text-teal-600 dark:text-teal-300 mb-3">Start a shared session</h3>
          <div className="flex flex-col gap-3">
            <input
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              placeholder="Enter token"
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <Button
              onClick={joinClip}
              variant="primary"
              className="w-full py-2"
              disabled={isJoining}
            >
              {isJoining ? "Receiving..." : "Receive Clip"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
