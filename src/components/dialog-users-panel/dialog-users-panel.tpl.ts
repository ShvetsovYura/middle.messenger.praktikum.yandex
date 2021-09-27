export default `<div class="{{className}} {{#if isOpen}} {{className}}--show {{/if}}">
    <div class="current-dialog-users-container"> 
        <div>
            <div data-tpl-key="findUsersInput"></div>
            <div data-tpl-key="findUsersButton"></div>
        </div>
        <div data-tpl-key="currentDialogUsers"></div>
    </div>
</div>
`;
