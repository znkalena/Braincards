import { createEditCategory } from "./components/createEditCategory.js";
import { createCategory } from "./components/createcategory.js";
import { createHeader } from "./components/createheader.js";
import { createElement } from "./helper/createelement.js";
import { fetchCards, fetchCategories } from "./service/service.js";
import { createPairs } from "./components/createpairs.js";

const initApp = async () => {
const headerParent = document.querySelector('.header');
const app = document.querySelector('#app');

const headerObj = createHeader(headerParent);
const categoryObj =createCategory(app);
const categoryList = categoryObj.categoryList;
const editCategoryObj = createEditCategory(app);
const pairsObj = createPairs(app);


const allSectionUnmount = () => {
    [categoryObj,editCategoryObj,pairsObj].forEach(obj => obj.unmount());
};

const renderIndex =async (e) =>{
e?.preventDefault();
allSectionUnmount();

const categories =await fetchCategories();
headerObj.updateHeaderTitle('категории');
if(categories.error){
    app.append(createElement('p',{
        className: 'server-error',
        textContent: 'ошибка сервера ,попробуйте еще раз',
    }))
    return;
}
categoryObj.mount(categories);
};

renderIndex();

headerObj.headerLogoLink.addEventListener('click',renderIndex);

headerObj.headerBtn.addEventListener('click', () => {
    allSectionUnmount();
    headerObj.updateHeaderTitle('новая категория');
    editCategoryObj.mount();
});

categoryList.addEventListener('click',async ({target}) =>{    
    const categoryItem = target.closest('.category__item');
    if(!categoryItem){
        return;
    }
    if(target.closest('.category__edit')){
        const dataCards = await fetchCards(categoryItem.dataset.id);        
        allSectionUnmount();
        headerObj.updateHeaderTitle('редактирование');
        editCategoryObj.mount(dataCards);
        return;
    }
    if(target.closest('.category__del')){
        console.log('delete');
        return;
    }
    if(categoryItem){               
        const dataCards = await fetchCards(categoryItem.dataset.id);       
        allSectionUnmount();
        headerObj.updateHeaderTitle(dataCards.title);
        pairsObj.mount(dataCards);
    }
});
        pairsObj.btnReturn.addEventListener('click',renderIndex) 
};



initApp();