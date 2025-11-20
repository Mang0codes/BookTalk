import React, { useState } from 'react';
import { useEffect } from 'react';


const CommentThread = ({ comment, bookId, refreshComments }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState(comment.replies || []);
  const [replyText, setReplyText] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  useEffect(() => {
  setReplies(comment.replies || []);
}, [comment.replies]);

  const handleReply = async () => {
    if (!replyText.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to reply.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/comment/${bookId}/comments/${comment._id}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content: replyText,
          parentId: comment._id 
        }),
      });

      if (!response.ok) throw new Error('Failed to post reply');

      setReplyText('');
      setShowReplyForm(false);
      setShowReplies(true);

      // refresh comment list from backend
      refreshComments();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border-b border-white/20 pb-4">
      <div className="flex gap-3">
        <div class="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span class="font-medium text-gray-600 dark:text-gray-300">{comment.user.name[0]}</span>
</div>

        <div className="flex-1">
          <div className="flex justify-between items-center">
            <span className="font-semibold">{comment.user.name}</span>
            <span className="text-xs text-gray-400">{comment.date}</span>
          </div>
          <p className="text-sm mt-1">"{comment.content}"</p>

          <div className="flex gap-4 mt-2">
            {replies.length > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-xs text-blue-400 hover:underline"
              >
                {showReplies
                  ? `Hide Replies (${replies.length})`
                  : `Show Replies (${replies.length})`}
              </button>
            )}

            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-xs text-blue-300 hover:underline"
            >
              {showReplyForm ? 'Cancel' : 'Reply'}
            </button>
          </div>

          {showReplyForm && (
            <div className="mt-2 resize-none overflow-hidden">
              <textarea
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                className="w-full text-sm p-2 rounded-md border border-white/20 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/40 scrollbar-white-20"
                rows={2}
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button
                onClick={handleReply}
                className="mt-1 px-3 py-1 text-sm bg-blue-500 rounded hover:bg-blue-600"
              >
                Post Reply
              </button>
            </div>
          )}

          {showReplies && replies.length > 0 && (
            <div className="mt-4 ml-6 border-l border-white/20 pl-4 flex flex-col gap-3">
              {replies.map(reply => (
                <div key={reply._id || reply.id} className="flex gap-2">
                  <img src={reply.user?.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                  <div className='w-full'>
                    <div className="flex justify-between items-center text-sm w-full">
                      <span className="font-semibold truncate">{reply.user?.name}</span>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{reply.date}</span>
                    </div>
                    <p className="text-sm">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentThread