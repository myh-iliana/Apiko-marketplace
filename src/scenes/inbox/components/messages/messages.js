import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

import { useStore } from '../../../../stores/create-store';
import Loader from '../../../../components/loader/loader';

const Messages = () => {
  const { chatId } = useParams();
  const [message, setMessage] = useState('');
  const chat = useStore((store) => store.chats.getById(chatId));

  useEffect(() => {
    if (chat) {
      chat.messages.fetch.run();
    }
  });

  if (!chat) {
    return <Loader />;
  }

  const handleChange = (e) => setMessage(e.target.value);
  const handleSend = () => chat.sendMessage.run(message);

  return (
    <div>
      <ul>
        {chat.messages.asList.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>

      <textarea onChange={handleChange}>{message}</textarea>
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default observer(Messages);
