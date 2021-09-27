export default `<li class="chat-message {{#if isCurrentUser}} chat-message_own {{/if}}">
  <div class="chat-message__body {{#if isCurrentUser}} chat-message__body_own {{else}} chat-message__body_partner {{/if}}">
    <div>{{displayUserName}}</div>
    <p class="chat-mssage__text">{{content}}</p>
    <div class="chat-message__info">
      <span class="chat-message__time">{{stringDateToTime time}}</span>
      <span class="chat-message__status">{{is_read}}</span> 
    </div>
  </div>
</li>
`;
