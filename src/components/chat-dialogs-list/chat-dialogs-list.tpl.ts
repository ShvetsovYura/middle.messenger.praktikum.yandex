export default `{{#each dialogsList }}
    <li class="chat-item {{#if selected}} chat-item_selected {{/if}}">
        <div class="chat-item__user-avatar">
            <img class="chat-item__user-avatar-image" src="{{avatarImgPath}}" alt="user-avatar" />
        </div>
        <div class="chat-item__user-caption">
        <p class="chat-item__dialog-title">
            <span class="chat-item__user-title">{{username}}</span>
            <span class="chat-item__dialog-details">
            <span class="chat-item__message-status">+</span>
            <span class="chat-item__message-time">{{dateToTimeString lastMessage.time}} </span>
            </span>
        </p>
        <p class="chat-item__dialog-subtitle">
            <span class="chat-item__dialog-last-message">
            <b>Вы:</b>
            <span> {{lastMessage.text}} </span>
            </span>
            <span class="chat-item__unread_badge {{#if (isdefined unreadMessages)}} hide{{/if}}">{{unreadMessages}}</span>
        </p>
        </div>
    </li>
    {{/each }}
`;
