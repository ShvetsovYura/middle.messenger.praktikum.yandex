const tpl = `<button 
                class="{{ className }}" 
                {{#if disabled}} disabled {{/if}} 
                type={{ type }}>
                {{caption}}
            </button>
`;
export default tpl;
