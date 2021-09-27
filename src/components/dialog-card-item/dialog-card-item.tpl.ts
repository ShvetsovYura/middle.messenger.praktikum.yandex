export default `<li id="{{id}}" class="dialog-card-item {{#if selected}} chat-item_selected {{/if}}">
      <div class="dialog-card-item__user-avatar">
        <img src="{{avatar}}" height="50" width="50" alt="user-avatar" />
      </div>
      <div class="chat-item__user-caption">
        <p class="chat-item__dialog-title">
          <span class="chat-item__user-title">{{title}}</span>
          <span class="chat-item__dialog-details">
            {{#if last_message}}
              <span class="chat-item__message-time">{{stringDateToTime last_message.time}} </span>
            {{/if}}
            </span>
        </p>
        <p class="chat-item__dialog-subtitle">
          <span class="chat-item__dialog-last-message">
            <b>{{last_message.title}}</b>
            {{#if last_message.user}}
              {{#if last_message.user.display_name}}
                <span> <b>{{last_message.user.display_name}}</b>:</span>
              {{else}}
                <span> <b>{{last_message.user.first_name}} {{last_message.user.second_name}}</b>:</span>
              {{/if}}
              <span> {{last_message.content}} </span>
            {{/if}}
          </span>
          {{#if unread_count}}
            <span class="chat-item__unread_badge">{{unread_count}}</span>
          {{/if}}
          </p>
      </div>
    </li>
`;
