export default `<ul class="current-dialog-users-list">
    {{#each data.children }}
        <div data-tpl-key='{{@key}}'></div> 
    {{/each}}
</ul>
`;
