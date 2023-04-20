import { createElement } from "../helper/createelement.js";

export const createHeader =(parent) => {
const headerLogoLink = createElement('a',{
href:'#',
className:'header__logo-link',
})
const conteiner = createElement('div',{
className:'conteiner header__container',})
parent.append(conteiner);

const logo = createElement('img',{
src:'/img/logo.svg',
className:'header__logo',
alt:'Логотип сервиса Brain Cards',
});
headerLogoLink.append(logo);

const headerTitle = createElement('h2',{
    className:'header__subtitle',
    textContent:'Категории',
});

const headerBtn = createElement('button',{
    className:'header__btn',
    textContent:'Добавить категорию',
});
conteiner.append(headerLogoLink,headerTitle,headerBtn);

const updateHeaderTitle = title => {
    headerTitle.textContent = title;
};

return {headerLogoLink,headerBtn,updateHeaderTitle}
};
