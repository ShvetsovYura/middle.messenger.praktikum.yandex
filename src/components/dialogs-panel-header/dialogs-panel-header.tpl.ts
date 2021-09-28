export default `<div class="header-panel">
    <div class="header-panel__settings">
        <div class="current-user-info-card">
            <div class="current-user-info-card__avatar">
                <img src="{{avatar}}" height="50" width="50" alt="user-avatar" />
            </div>
            <div class="current-user-info-card__body">
                <div>{{display_name}}</div>
                <div>{{first_name}} {{second_name}}</div>
            </div>
        </div>
        <div>
            <div class="header-popup-menu">
                <button class="header-popup-menu__button">Настройки</button>
                <div class="header-popup-menu__content">
                    <div data-tpl-key="profileButton"></div>
                    <div data-tpl-key="exitButton"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="add-dialog-panel">
        <div data-tpl-key="dialogNameInput"></div>
        <div data-tpl-key="dialogAddActionButton"><div>
       
    </div>
</div>
`;
