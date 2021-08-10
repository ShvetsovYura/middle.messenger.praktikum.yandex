export default `<input 
id="{{id}}"
{{#if name}} name="{{name}}" {{/if}}
type={{type}} 
{{#if disabled}} disabled {{/if}}
placeholder="{{placeholder}}"
{{#if initValue}} value="{{initValue}}" {{/if}}
class="{{className}}"
/>
`;
