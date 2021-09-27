export default `<div class="{{data.className}} {{#if data.isOpen}} {{data.className}}--show {{/if}}">
    <ul>
    {{#each data.children }}
        <div data-tpl-key='{{@key}}'></div> 
    {{/each}}
    </ul>
</div>
`;
