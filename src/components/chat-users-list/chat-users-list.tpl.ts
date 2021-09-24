export default `<div class={{className}}>
    <ul>
    {{#each . }}
        <div data-tpl-key='user___{{id}}'></div> 
    {{/each}}
    </ul>
</div>
`;
