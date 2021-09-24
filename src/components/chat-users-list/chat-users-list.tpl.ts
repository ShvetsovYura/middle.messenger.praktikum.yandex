export default `<div class={{data.className}}>
    <ul>
    {{#each data.children }}
        <div data-tpl-key='{{@key}}'></div> 
    {{/each}}
    </ul>
</div>
`;
