export default `<input 
class="{{className}}"
id="{{id}}"
{{#if name}} name="{{name}}" {{/if}}
type={{type}} 
{{#if disabled}} disabled {{/if}}
placeholder="{{placeholder}}"
{{#if value}} value="{{value}}" {{/if}}
{{#if required}} required {{/if}}
autocomplete="{{autocomplete}}"
/>
`;
