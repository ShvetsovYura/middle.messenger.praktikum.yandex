export default `<ul>
    {{#each . }}
    <div data-tpl-key='{{title}}___{{id}}'>{{title}}</div> 
    {{/each}}
    </ul>
`;
