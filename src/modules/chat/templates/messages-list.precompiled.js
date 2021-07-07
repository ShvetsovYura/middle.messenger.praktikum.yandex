(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['messages-list'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"chat-message "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"own") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":25},"end":{"line":2,"column":61}}})) != null ? stack1 : "")
    + "\">\r\n    <div class=\"chat-message__body "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"own") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":3,"column":35},"end":{"line":3,"column":113}}})) != null ? stack1 : "")
    + "\">\r\n        <p class=\"chat-mssage__text\">\r\n            "
    + alias4(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":5,"column":12},"end":{"line":5,"column":20}}}) : helper)))
    + "\r\n        </p>\r\n        <div class=\"chat-message__info\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"own") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":12},"end":{"line":10,"column":19}}})) != null ? stack1 : "")
    + "            <span class=\"chat-message__time\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"time") || (depth0 != null ? lookupProperty(depth0,"time") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data,"loc":{"start":{"line":11,"column":45},"end":{"line":11,"column":53}}}) : helper)))
    + "</span>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " chat-message_own ";
},"4":function(container,depth0,helpers,partials,data) {
    return " chat-message__body_own ";
},"6":function(container,depth0,helpers,partials,data) {
    return " chat-message__body_partner ";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <span class=\"chat-message__status\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"status") || (depth0 != null ? lookupProperty(depth0,"status") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"status","hash":{},"data":data,"loc":{"start":{"line":9,"column":47},"end":{"line":9,"column":57}}}) : helper)))
    + "</span>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"messages") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":15,"column":10}}})) != null ? stack1 : "");
},"useData":true});
})();