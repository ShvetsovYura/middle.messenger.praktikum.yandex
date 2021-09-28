export default `<ul>
    {{#each children}}
        <div data-tpl-key='{{@key}}'>{{title}}</div> 
    {{/each}}
    </ul>
`;
