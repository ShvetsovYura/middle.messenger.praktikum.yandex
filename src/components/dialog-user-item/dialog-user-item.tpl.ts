export default `<li class={{className}}>
    <div>
        {{#if display_name}}
            <span>{{display_name}}</span>
        {{else}}
            <span>{{first_name}} {{second_name}}</span>
        {{/if}}
    </div>
</li>
`;
