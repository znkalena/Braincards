import { createCategory } from "./components/createcategory.js";
import { createHeader } from "./components/createheader.js";
import { createElement } from "./helper/createelement.js";
import { fetchCategories } from "./service/service.js";

const initApp = async () => {
const headerParent = document.querySelector('.header');
const app = document.querySelector('#app');

const headerObj = createHeader(headerParent);
const appObj =createCategory(app);

const renderIndex =async (e) =>{
e?.preventDefault();
const categories =await fetchCategories();
if(categories.error){
    app.append(createElement('p',{
        className: 'server-error',
        textContent: 'ошибка сервера ,попробуйте еще раз',
    }))
    return;
}
appObj.mount(categories);
};

renderIndex();

headerObj.headerLogoLink.addEventListener('click',renderIndex);

headerObj.headerBtn.addEventListener('click', () => {
    appObj.unmount();
    headerObj.updateHeaderTitle('новая категория')
});

};

initApp();