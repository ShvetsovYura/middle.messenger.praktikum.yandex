export default `
<aside class="side-panel">
  <div class="header-panel">
    <div class="header-panel__settings">
      <a href="profile.html">Профиль</a>
      <button>Добавить пользователя</button>
    </div>
    <div class="search-panel">
      <input class="search-panel__search-chat" placeholder="поиск чатов" />
    </div>
  </div>
  <ul class="chats-list">
    {{#each chatList }}
    <li class="chat-item {{#if selected}} chat-item_selected {{/if}}">
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
          <span class="chat-item__unread_badge {{#if (isdefined unreadCount)}} hide{{/if}}">{{unreadCount}}</span>
        </p>
      </div>
    </li>
    {{/each }}
  </ul>
</aside>
<div class="chat-messages-panel">
  <div class="chat-messages-panel__header">header panel</div>
  <div class="chat-messages-container">
    {{#each messages}}
    <div class="chat-message {{#if own}} chat-message_own {{/if}}">
      <div class="chat-message__body {{#if own}} chat-message__body_own {{else}} chat-message__body_partner {{/if}}">
        <p class="chat-mssage__text">{{text}}</p>
        <div class="chat-message__info">
          {{#if own}}
          <span class="chat-message__status">{{status}}</span>
          {{/if}}
          <span class="chat-message__time">{{time}}</span>
        </div>
      </div>
    </div>
    {{/each }}
  </div>
  <form class="message-form">
    <div class="message-form__body">
      <input class="message-form__input" name="message" type="text" placeholder="Сообщение" />
      <button class="message-form__submit" type="submit">Отправить</button>
    </div>
  </form>
</div>
`;
