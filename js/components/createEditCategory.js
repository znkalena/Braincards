import { createElement } from "../helper/createelement.js";

const TITLE = 'Введите название категории';

export const createEditCategory = (app) => {

    const editCategory = createElement('section',{
        className:'edit section-offset',
    });

    const editConteiner = createElement('div',{
        className:'container edit__container',
    });       


    const editTitle = createElement('h2',{
        className:'edit__title',
        contentEditable:true,
        title:'Можно редактировать',        
    });

    const editTable = createElement('table',{
        className:'edit__table table',
    });

    const thead = createElement('thead');
    const trThead = createElement('tr');
    const tableHeadCellMain = createElement('th',{
        className:'table__cell',
        textContent:'main',
    });
    const tableHeadCellSecond = createElement('th',{
        className:'table__cell',
        textContent:'second',
    });
    const tableHeadCellEmpty = createElement('th',{
        className:'table__cell',        
    });

    const tbody =createElement('tbody');    

    const editBtnConteiner = createElement('div',{
        className:'edit__btn-wrapper',        
    });  

    const editBtnAddRow =createElement('button',{
        className:'edit__btn edit__add-row',
        textContent:'Добавить пару',
    });
    const editBtnSave =createElement('button',{
        className:'edit__btn edit__save',        
        textContent:'Сохранить категорию',
    });
    const editBtnCancel =createElement('button',{
        className:'edit__btn edit__cancel',
        textContent:'Отмена',
    });    

        editCategory.append(editBtnConteiner);
        editTable.append(thead,tbody); 
        thead.append(trThead);
        trThead.append(tableHeadCellMain,tableHeadCellSecond,tableHeadCellEmpty);
        editBtnConteiner.append(editBtnAddRow,editBtnSave,editBtnCancel);
        editConteiner.append(editTitle,editTable,editBtnConteiner); 
        editCategory.append(editConteiner);
            
        const createTr =(dataArr) => {
            const tr =createElement('tr');
            const tableCellMain =createElement('td',{
                className:'table__cell table__cell_one',
                textContent:dataArr[0] ,
                contentEditable:true,      
            });
            const tableCellSecond =createElement('td',{
                className:'table__cell table__cell_two',
                textContent:dataArr[1] ,
                contentEditable:true,
            });
            const tableCellDel =createElement('td',{
                className:'table__cell',        
            });
            const btnDelRow = createElement('button',{
                className:'table__del',
                textContent:'x'
            });       
        
            btnDelRow.addEventListener('click',() => {
                if(confirm('Вы уверены ,что хотите удалить?')){
                tr.remove();
                }        
            });
    
            tableCellDel.append(btnDelRow);
            tr.append(tableCellMain,tableCellSecond,tableCellDel);
        
            return tr;
            };

        const clearTitle = () => {
            if(editTitle.textContent === TITLE){
                editTitle.textContent ='' ; 
            }
        };    
        const checkTitle = () => {
            if(editTitle.textContent === ''){
                editTitle.textContent =TITLE ; 
            }
        };
        
        editTitle.addEventListener('focus',clearTitle);
        editTitle.addEventListener('blur',checkTitle);

        editBtnAddRow.addEventListener('click',() => {
            const emptyRow = createTr(['','']);
            tbody.append(emptyRow);
        });       

    const mount = (data ={title:TITLE,pairs:[]}) => {
        tbody.textContent ='';
        editTitle.textContent = data.title;
        if(editTitle.textContent ===TITLE){
            editTitle.classList.add('edit__title_change');
        }else{
            editTitle.classList.remove('edit__title_change');
        }

        const rows =data.pairs.map(createTr);        
        const emptyRow = createTr(['','']);
        tbody.append(...rows,emptyRow);        
        app.append(editCategory);
    };

    const unmount = () => {
        editCategory.remove();
    };

    return {unmount,mount};
};