import { createElement } from "../helper/createelement.js"
import { shuffleArray } from "../helper/shufflearray.js";
import { showAlert } from "./showallert.js";

export const createPairs = ( ) => {    
    const pairs = createElement('section',{
    className:'card section-offset',
    });

    const container =createElement('div',{
        className:'concontainer card__container',
    });
        const btnReturn = createElement('button',{
        className:'card__return',
        ariaLabel:'Возврат к категориям',
    });
        const btnCard = createElement('button',{
        className:'card__item',
    });
        const front = createElement('span',{
        className:'card__front',
        textContent:'улыбка',
    });
        const back = createElement('span',{
        className:'card__back',
        textContent:'smile',
        });

        btnCard.append(front,back);
        container.append(btnReturn,btnCard);
        pairs.append(container);

        let dataCards=[];

        const flipCard = () => {            
            btnCard.classList.add('card__item_flipped');
            btnCard.removeEventListener('click',flipCard);
            setTimeout(() =>{
                btnCard.classList.remove('card__item_flipped');
                setTimeout(() => {
                    btnCard.index+=1;
                    if(btnCard.index ===dataCards.length){
                        front.textContent ="Finished Cards";
                        showAlert('let`s begin');
                        setTimeout(() => {
                            btnReturn.click();
                        },2000);
                        return;
                    }
                    front.textContent = dataCards[btnCard.index][0];
                    back.textContent = dataCards[btnCard.index][1];
                    setTimeout(() => {
                        btnCard.addEventListener('click',flipCard);
                    },200);
                },100);
            },1000);
            };       

        const cardControler = data => {
            dataCards = [...data];           
            btnCard.index = 0;
            front.textContent = data[btnCard.index][0];
            back.textContent = data[btnCard.index][1];
            
            btnCard.addEventListener('click',flipCard);
        };      

        const mount = data => {
            app.append(pairs);
            const newData = shuffleArray(data.pairs);
            cardControler(newData);                                           
        };

        const unmount = () => {
            pairs.remove();
            btnCard.removeEventListener('click',flipCard);            
    };

        return {btnReturn,mount,unmount}
};
