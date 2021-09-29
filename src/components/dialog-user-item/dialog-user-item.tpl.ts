export default `<li class={{className}}>
    <div class="dialog-user-item__body">
        <div class="dialog-user-item__avatar">
            <img src={{avatar}} height='50' width='50' >
        </div>
        <div class="dialog-user-item__name">
            {{#if display_name}}
                <span>{{display_name}}</span>
            {{else}}
                <span>{{first_name}} {{second_name}}</span>
            {{/if}}
        </div>
    </div>
    <div class="dialog-user-item__actions">
            <div data-tpl-key="actionButton"></div>
        </div>
    </div>
</li>
`;
