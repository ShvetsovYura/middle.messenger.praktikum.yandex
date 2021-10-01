export default `<div class={{data.props.className}}>
    {{#if data.dialogIsSelected}}
        <ul class="dialog-messages-list">
            {{#each data.props.children }}
            <li data-tpl-key='{{@key}}'>{{content}}</li> 
            {{/each}}
        </ul>
        {{else}}
        <div class="not-select-dialog">Выберете диалог</div>
    {{/if}}
</div>
`;
