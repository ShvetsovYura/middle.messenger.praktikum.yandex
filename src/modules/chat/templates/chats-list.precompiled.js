(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['chats-list'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<li class=\"chat-item "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"selected") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":21},"end":{"line":2,"column":64}}})) != null ? stack1 : "")
    + "\">\r\n    <div class=\"chat-item__user-avatar\">\r\n        <img src=\"\" alt=\"user-avatar\" />\r\n    </div>\r\n    <div class=\"chat-item__user-caption\">\r\n        <p class=\"chat-item__dialog-title\">\r\n            <span class=\"chat-item__user-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":8,"column":48},"end":{"line":8,"column":60}}}) : helper)))
    + "</span>\r\n            <span class=\"chat-item__dialog-details\">\r\n                <span class=\"chat-item__message-status\">+</span>\r\n                <span class=\"chat-item__message-time\">"
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"lastMessage") : depth0)) != null ? lookupProperty(stack1,"time") : stack1), depth0))
    + " </span>\r\n            </span>\r\n        </p>\r\n        <p class=\"chat-item__dialog-subtitle\">\r\n            <span class=\"chat-item__dialog-last-message\">\r\n                <b>Вы:</b>\r\n                <span>\r\n                    "
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"lastMessage") : depth0)) != null ? lookupProperty(stack1,"text") : stack1), depth0))
    + "\r\n                </span>\r\n            </span>\r\n            <span class=\"chat-item__unread_badge "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isdefined")||(depth0 && lookupProperty(depth0,"isdefined"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"unreadCount") : depth0),{"name":"isdefined","hash":{},"data":data,"loc":{"start":{"line":21,"column":55},"end":{"line":21,"column":78}}}),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":49},"end":{"line":21,"column":92}}})) != null ? stack1 : "")
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"unreadCount") || (depth0 != null ? lookupProperty(depth0,"unreadCount") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"unreadCount","hash":{},"data":data,"loc":{"start":{"line":21,"column":94},"end":{"line":21,"column":109}}}) : helper)))
    + "</span>\r\n        </p>\r\n    </div>\r\n</li>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " chat-item_selected ";
},"4":function(container,depth0,helpers,partials,data) {
    return " hide";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"chatList") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":25,"column":10}}})) != null ? stack1 : "");
},"useData":true});
})();