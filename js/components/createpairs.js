import { createElement } from "../helper/createelement.js"
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

        const cardControler = data => {            
            let index = 0;
            front.textContent = data[index][0];
            back.textContent = data[index][1];
            const flipCard = () => {
            btnCard.classList.add('card__item_flipped');
            btnCard.removeEventListener('click',flipCard);
            setTimeout(() =>{
                btnCard.classList.remove('card__item_flipped');
                setTimeout(() => {
                    index+=1;
                    if(index ===data.length){
                        front.textContent ="Finished Cards";
                        showAlert('let`s begin');
                        setTimeout(() => {
                            btnReturn.click();
                        },2000);
                        return;
                    }
                    front.textContent = data[index][0];
                    back.textContent = data[index][1];
                    setTimeout(() => {
                        btnCard.addEventListener('click',flipCard);
                    },200);
                },100);
            },1000);
            };
            btnCard.addEventListener('click',flipCard);
        }      

        const mount = data => {
            app.append(pairs);
            cardControler(data.pairs)
        };

        const unmount = () => {
            pairs.remove();
    };

        return {btnReturn,mount,unmount}
};
