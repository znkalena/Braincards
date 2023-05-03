import { createElement } from "../helper/createelement.js"

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

        const mount = data => {
        app.append(pairs);
        };

        const unmount = () => {
        pairs.remove();
    };

        return {btnReturn,mount,unmount}
};
