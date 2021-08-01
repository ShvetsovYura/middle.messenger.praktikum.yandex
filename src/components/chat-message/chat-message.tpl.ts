export default `
<div class="chat-message {{#if own}} chat-message_own {{/if}}">
  <div class="chat-message__body {{#if own}} chat-message__body_own {{else}} chat-message__body_partner {{/if}}">
    <p class="chat-mssage__text">{{message}}</p>
    <div class="chat-message__info">
      {{#if own}}
      <span class="chat-message__status">{{status}}</span>
      {{/if}}
      <span class="chat-message__time">{{time}}</span>
    </div>
  </div>
</div>
`;