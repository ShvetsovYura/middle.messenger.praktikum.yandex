export default `<li id="{{id}}" class="dialog-card-item {{#if selected}} chat-item_selected {{/if}}">
      <div class="dialog-card-item__user-avatar">
        <img src="{{avatar}}" height="50" width="50" alt="user-avatar" />
      </div>
      <div class="chat-item__user-caption">
        <p class="chat-item__dialog-title">
          <span class="chat-item__user-title">{{title}}</span>
          <span class="chat-item__dialog-details">
            <span class="chat-item__message-status">+</span>
            <span class="chat-item__message-time">{{lastMessage.time}} </span>
          </span>
        </p>
        <p class="chat-item__dialog-subtitle">
          <span class="chat-item__dialog-last-message">
            <b>{{last_message.title}}</b>
            <span> {{last_message.content}} </span>
          </span>
          <span class="chat-item__unread_badge {{#if (unreadMessages)}} hide{{/if}}">{{unread_count}}</span>
        </p>
      </div>
    </li>
`;
