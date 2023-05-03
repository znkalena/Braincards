import { createElement } from "../helper/createelement.js";
import { decalofNumber } from "../helper/decalNum.js";

export const createCategory = (app) => {
const category = createElement('section',{
    className :'category section-offset',
});

const conteiner = createElement('div',{
    className:'container',
})
category.append(conteiner);

const categoryList =createElement('ul',{
    className:'category__list', 
});
conteiner.append(categoryList);

const createCategoryCard = (data) =>{
    const item =createElement('li',{
        className:'category__item',        
    });
    item.dataset.id =data.id;

    const itemBtn =createElement('button',{
        className:'category__card',
    });

    const firstSpan = createElement('span',{
        className:'category__title',
        textContent:data.title,
    });

    const secondSpan =createElement('span',{
        className:'category__pairs',
        textContent:decalofNumber(data.length, ['пара','пары','пар']),
    });
    itemBtn.append(firstSpan,secondSpan);    

    const editBtn = createElement('button',{
        className:'category__btn category__edit',  
        ariaLabel:'редактировать',     
    });
        

    const delBtn = createElement('button',{
        className:'category__btn category__del',
        ariaLabel:'удалить',       
    });
    

    item.append(itemBtn,editBtn,delBtn);

    return item;
};

const mount =(data) => {
categoryList.textContent ='';
const cards = data.map(createCategoryCard);
categoryList.append(...cards);
app.append(category);
};

const unmount = (data) => {
category.remove();
};
return {mount,unmount,categoryList};
};