import { createEditCategory } from "./components/createEditCategory.js";
import { createCategory } from "./components/createcategory.js";
import { createHeader } from "./components/createheader.js";
import { createElement } from "./helper/createelement.js";
import { fetchCards, fetchCategories,fetchCreateCategory,fetchDeleteCategory,fetchEditCategory } from "./service/service.js";
import { createPairs } from "./components/createpairs.js";
import { showAlert } from "./components/showallert.js";

const initApp = async () => {
const headerParent = document.querySelector('.header');
const app = document.querySelector('#app');

const headerObj = createHeader(headerParent);
const categoryObj =createCategory(app);
const editCategoryObj = createEditCategory(app);
const pairsObj = createPairs(app);


const allSectionUnmount = () => {
    [categoryObj,editCategoryObj,pairsObj].forEach(obj => obj.unmount());
};

const postHandler = async() => {
    const data =editCategoryObj.parseData();
    const dataCategories =await fetchCreateCategory(data);

    if(dataCategories.error){
        showAlert(dataCategories.error?.message);
        return;
    }
    showAlert(`category ${data.title} has already added`);
    allSectionUnmount();
    headerObj.updateHeaderTitle('Categorys');
    categoryObj.mount(dataCategories);
};
const patchHandler = async() => {
    const data =editCategoryObj.parseData();
    const dataCategory =await fetchEditCategory(editCategoryObj.editBtnSave.dataset.id,data);
    if(dataCategory.error){
        showAlert(dataCategory.error?.message);
        return;
    }
    showAlert(`category ${data.title} has already corrected`);
    allSectionUnmount();
    headerObj.updateHeaderTitle('Categorys');
    categoryObj.mount(dataCategory);
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
    editCategoryObj.editBtnSave.addEventListener('click',postHandler);
    editCategoryObj.editBtnSave.removeEventListener('click',patchHandler);
    editCategoryObj.editBtnCancel.addEventListener('click',() => {
        if(confirm('do you realy want to stop edition?')){
            renderIndex();
        }
    else{
        setTimeout(() => {
        alert('continue please');
        },500);
    } 
});
});

categoryObj.categoryList.addEventListener('click',async ({target}) =>{    
    const categoryItem = target.closest('.category__item');
    
    if(target.closest('.category__edit')){
        const dataCards = await fetchCards(categoryItem.dataset.id);        
        allSectionUnmount();
        headerObj.updateHeaderTitle('редактирование');
        editCategoryObj.mount(dataCards);
        editCategoryObj.editBtnSave.addEventListener('click',patchHandler);
        editCategoryObj.editBtnSave.removeEventListener('click',postHandler);
        return;
    }
    if(target.closest('.category__del')){
        if(confirm('do you want to delete?are you shuare?')){
        const result = fetchDeleteCategory(categoryItem.dataset.id);
        if(result.error){
            showAlert(result.error.message);
            return;
        }
        showAlert('Category delete!');
        categoryItem.remove();        
        }        
        return;
    }
    if(categoryItem){               
        const dataCards = await fetchCards(categoryItem.dataset.id);       
        allSectionUnmount();
        headerObj.updateHeaderTitle(dataCards.title);
        pairsObj.mount(dataCards);
    }
});
        pairsObj.btnReturn.addEventListener('click',renderIndex);

        

};
initApp();