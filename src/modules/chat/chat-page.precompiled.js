(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['chat-page'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <li class=\"chat-item "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"selected") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":29},"end":{"line":15,"column":72}}})) != null ? stack1 : "")
    + "\">\r\n            <div class=\"chat-item__user-avatar\">\r\n                <img src=\"\" alt=\"user-avatar\" />\r\n            </div>\r\n            <div class=\"chat-item__user-caption\">\r\n                <p class=\"chat-item__dialog-title\">\r\n                    <span class=\"chat-item__user-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":21,"column":56},"end":{"line":21,"column":68}}}) : helper)))
    + "</span>\r\n                    <span class=\"chat-item__dialog-details\">\r\n                        <span class=\"chat-item__message-status\">+</span>\r\n                        <span class=\"chat-item__message-time\">"
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"lastMessage") : depth0)) != null ? lookupProperty(stack1,"time") : stack1), depth0))
    + " </span>\r\n                    </span>\r\n                </p>\r\n                <p class=\"chat-item__dialog-subtitle\">\r\n                    <span class=\"chat-item__dialog-last-message\">\r\n                        <b>Вы:</b>\r\n                        <span>\r\n                            "
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"lastMessage") : depth0)) != null ? lookupProperty(stack1,"text") : stack1), depth0))
    + "\r\n                        </span>\r\n                    </span>\r\n                    <span\r\n                        class=\"chat-item__unread_badge "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isdefined")||(depth0 && lookupProperty(depth0,"isdefined"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"unreadCount") : depth0),{"name":"isdefined","hash":{},"data":data,"loc":{"start":{"line":35,"column":61},"end":{"line":35,"column":84}}}),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":35,"column":55},"end":{"line":35,"column":98}}})) != null ? stack1 : "")
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"unreadCount") || (depth0 != null ? lookupProperty(depth0,"unreadCount") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"unreadCount","hash":{},"data":data,"loc":{"start":{"line":35,"column":100},"end":{"line":35,"column":115}}}) : helper)))
    + "</span>\r\n                </p>\r\n            </div>\r\n        </li>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " chat-item_selected ";
},"4":function(container,depth0,helpers,partials,data) {
    return " hide";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"chat-message "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"own") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":48,"column":33},"end":{"line":48,"column":69}}})) != null ? stack1 : "")
    + "\">\r\n            <div\r\n                class=\"chat-message__body "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"own") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data,"loc":{"start":{"line":50,"column":42},"end":{"line":50,"column":120}}})) != null ? stack1 : "")
    + "\">\r\n                <p class=\"chat-mssage__text\">\r\n                    "
    + alias4(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":52,"column":20},"end":{"line":52,"column":28}}}) : helper)))
    + "\r\n                </p>\r\n                <div class=\"chat-message__info\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"own") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":55,"column":20},"end":{"line":57,"column":27}}})) != null ? stack1 : "")
    + "                    <span class=\"chat-message__time\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"time") || (depth0 != null ? lookupProperty(depth0,"time") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data,"loc":{"start":{"line":58,"column":53},"end":{"line":58,"column":61}}}) : helper)))
    + "</span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return " chat-message_own ";
},"9":function(container,depth0,helpers,partials,data) {
    return " chat-message__body_own ";
},"11":function(container,depth0,helpers,partials,data) {
    return " chat-message__body_partner ";
},"13":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <span class=\"chat-message__status\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"status") || (depth0 != null ? lookupProperty(depth0,"status") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"status","hash":{},"data":data,"loc":{"start":{"line":56,"column":55},"end":{"line":56,"column":65}}}) : helper)))
    + "</span>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<aside class=\"side-panel\">\r\n    <div class=\"header-panel\">\r\n        <div class=\"header-panel__settings\">\r\n            <a href=\"profile.html\">Профиль</a>\r\n            <button>Добавить пользователя</button>\r\n        </div>\r\n\r\n        <div class=\"search-panel\">\r\n            <input class=\"search-panel__search-chat\" placeholder=\"поиск чатов\" />\r\n        </div>\r\n    </div>\r\n\r\n    <ul class=\"chats-list\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"chatList") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":8},"end":{"line":39,"column":18}}})) != null ? stack1 : "")
    + "    </ul>\r\n</aside>\r\n<div class=\"chat-messages-panel\">\r\n    <div class=\"chat-messages-panel__header\">\r\n        header panel\r\n    </div>\r\n    <div class=\"chat-messages-container\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"messages") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":47,"column":8},"end":{"line":62,"column":18}}})) != null ? stack1 : "")
    + "    </div>\r\n\r\n    <form class=\"message-form\">\r\n        <div class=\"message-form__body\">\r\n            <input class=\"message-form__input\" name=\"message\" type=\"text\" placeholder=\"Сообщение\" />\r\n            <button class=\"message-form__submit\" type=\"submit\">Отправить</button>\r\n        </div>\r\n    </form>\r\n</div>";
},"useData":true});
})();