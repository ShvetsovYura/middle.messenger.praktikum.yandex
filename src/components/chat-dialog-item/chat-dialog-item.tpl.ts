export default `
    <div class="chat-item {{#if selected}} chat-item_selected {{/if}}">
      <div class="chat-item__user-avatar">
        <img src="" alt="user-avatar" />
      </div>
      <div class="chat-item__user-caption">
        <p class="chat-item__dialog-title">
          <span class="chat-item__user-title">{{username}}</span>
          <span class="chat-item__dialog-details">
            <span class="chat-item__message-status">+</span>
            <span class="chat-item__message-time">{{lastMessage.time}} </span>
          </span>
        </p>
        <p class="chat-item__dialog-subtitle">
          <span class="chat-item__dialog-last-message">
            <b>Вы:</b>
            <span> {{lastMessage.text}} </span>
          </span>
          <span class="chat-item__unread_badge {{#if (isdefined unreadMessages)}} hide{{/if}}">{{unreadCount}}</span>
        </p>
      </div>
    </div>
`;
