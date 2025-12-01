import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Messages({ user }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    fetchMessages();
    fetchUnreadCount();

    // Poll for new messages every 3 seconds
    const messageInterval = setInterval(() => {
      fetchMessages();
      fetchUnreadCount();
      if (selectedItem) {
        fetchConversation(selectedItem);
        checkOtherUserTyping();
      }
    }, 3000);

    return () => {
      clearInterval(messageInterval);
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [selectedItem]);

  const fetchMessages = async () => {
    try {
      const [receivedRes, sentRes] = await Promise.all([
        axios.get('/api/messages/received'),
        axios.get('/api/messages/sent')
      ]);
      
      // Combine received and sent messages
      const allMessages = [...receivedRes.data, ...sentRes.data];
      setMessages(allMessages);
      setLoading(false);
    } catch (err) {
      setError('Failed to load messages');
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await axios.get('/api/messages/unread/count');
      setUnreadCount(response.data.count);
    } catch (err) {
      console.error('Failed to fetch unread count');
    }
  };

  const fetchConversation = async (itemId) => {
    try {
      const response = await axios.get(`/api/messages/item/${itemId}`);
      setConversation(response.data);
      setSelectedItem(itemId);
    } catch (err) {
      setError('Failed to load conversation');
    }
  };

  const checkOtherUserTyping = async () => {
    if (!selectedItem || conversation.length === 0) return;
    
    try {
      const otherUser = conversation.find(m => 
        m.senderUsername !== user.username
      )?.senderUsername || conversation.find(m =>
        m.receiverUsername !== user.username
      )?.receiverUsername;
      
      if (otherUser) {
        const response = await axios.get(`/api/messages/typing/${selectedItem}/${otherUser}`);
        setOtherUserTyping(response.data.isTyping);
      }
    } catch (err) {
      // Silently fail - typing status is not critical
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    
    if (!selectedItem) return;
    
    // Send typing status to backend
    axios.post('/api/messages/typing', { itemId: selectedItem })
      .catch(err => console.error('Failed to send typing status'));
    
    // Clear existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    // Stop sending typing status after 2 seconds of no typing
    const timeout = setTimeout(() => {
      // Typing stopped
    }, 2000);
    
    setTypingTimeout(timeout);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedItem) return;

    try {
      const recipientUsername = conversation.find(m => 
        m.senderUsername !== user.username
      )?.senderUsername;

      await axios.post('/api/messages', {
        receiverUsername: recipientUsername,
        itemId: selectedItem,
        content: newMessage
      });

      setNewMessage('');
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      fetchConversation(selectedItem);
    } catch (err) {
      setError('Failed to send message');
    }
  };

  const markAsRead = async (messageId) => {
    try {
      await axios.put(`/api/messages/${messageId}/read`);
      fetchMessages();
      fetchUnreadCount();
    } catch (err) {
      console.error('Failed to mark as read');
    }
  };

  // Group messages by item
  const groupedMessages = messages.reduce((acc, msg) => {
    if (!acc[msg.itemId]) {
      acc[msg.itemId] = [];
    }
    acc[msg.itemId].push(msg);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="container" style={{ marginTop: '30px' }}>
        <p>Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '30px' }}>
      <h1>💬 Messages {unreadCount > 0 && <span style={{ color: '#dc3545' }}>({unreadCount} unread)</span>}</h1>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginTop: '20px' }}>
        {/* Message list */}
        <div>
          <h3>Conversations</h3>
          {Object.keys(groupedMessages).length === 0 ? (
            <p style={{ color: '#666' }}>No messages yet</p>
          ) : (
            Object.entries(groupedMessages).map(([itemId, msgs]) => {
              const latestMsg = msgs[0];
              const otherUser = latestMsg.senderUsername === user.username 
                ? latestMsg.receiverUsername 
                : latestMsg.senderUsername;
              
              return (
                <div
                  key={itemId}
                  onClick={() => fetchConversation(itemId)}
                  style={{
                    padding: '15px',
                    border: selectedItem === parseInt(itemId) ? '2px solid #007bff' : '1px solid #ddd',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    cursor: 'pointer',
                    backgroundColor: latestMsg.isRead ? 'white' : '#f0f8ff'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <strong>Item #{itemId}</strong>
                    {!latestMsg.isRead && latestMsg.receiverUsername === user.username && 
                      <span style={{ color: '#dc3545', fontSize: '12px' }}>● NEW</span>}
                  </div>
                  <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                    Chat with: {otherUser}
                  </p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>
                    {new Date(latestMsg.sentAt).toLocaleString()}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Conversation view */}
        <div>
          {selectedItem ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3>Item #{selectedItem}</h3>
                <button 
                  className="btn-secondary"
                  onClick={() => navigate(`/items/${selectedItem}`)}
                >
                  View Item
                </button>
              </div>

              <div style={{ 
                height: '400px', 
                overflowY: 'auto', 
                border: '1px solid #ddd', 
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px',
                backgroundColor: '#f9f9f9'
              }}>
                {conversation.map(msg => (
                  <div
                    key={msg.id}
                    style={{
                      marginBottom: '15px',
                      padding: '10px',
                      borderRadius: '8px',
                      backgroundColor: msg.senderUsername === user.username ? '#007bff' : 'white',
                      color: msg.senderUsername === user.username ? 'white' : 'black',
                      marginLeft: msg.senderUsername === user.username ? 'auto' : '0',
                      marginRight: msg.senderUsername === user.username ? '0' : 'auto',
                      maxWidth: '70%'
                    }}
                    onClick={() => !msg.isRead && msg.receiverUsername === user.username && markAsRead(msg.id)}
                  >
                    <div style={{ fontSize: '12px', marginBottom: '5px', opacity: 0.8 }}>
                      {msg.senderUsername} • {new Date(msg.sentAt).toLocaleString()}
                    </div>
                    <div>{msg.content}</div>
                  </div>
                ))}
                
                {otherUserTyping && (
                  <div style={{
                    marginBottom: '15px',
                    padding: '10px',
                    borderRadius: '8px',
                    backgroundColor: '#e9ecef',
                    maxWidth: '70px',
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',
                    height: '40px'
                  }}>
                    <span className="typing-dot"></span>
                    <span className="typing-dot" style={{ animationDelay: '0.2s' }}></span>
                    <span className="typing-dot" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                )}
              </div>

              <form onSubmit={sendMessage}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={handleTyping}
                    placeholder="Type your message..."
                    style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                  />
                  <button type="submit" className="btn-primary">
                    Send
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <p>Select a conversation to view messages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;
