$(function(){
  let baseURL='https://deckofcardsapi.com/api/deck';

  $.getJSON(`${baseURL}/new/draw`).then(data =>{
      let { suit,value}=data.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  });



  //getting a single card from a newly shuffled deck and then getting another card from same deck

  let firstCard=null;

  $.getJSON(`${baseURL}/new/draw/`)
  .then(data=>{
      firstCard=data.cards[0];  //we make the first card the old first card data
      let deckId=data.deck_id;  // we get the deck_Id from the data so that we can draw from the same deck.
      return $.getJSON(`${baseURL}/${deckId}/draw/`);
  })
    .then(data=>{    //then we get the data and do something
      let secondCard=data.cards[0]; //this gives our new card its data info
      [firstCard,secondCard].forEach(function(card){  //then we loop through the array of 2 cards and display the value/suit
        console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`  //logs value/suit
        );
      });
    });

    let deckId=null; //we start with a null deckId so that we can give it an id later
    let $btn=$('button');
    let $cardArea=$('#card_area');

    $.getJSON(`${baseURL}/new/shuffle/`).then(data=>{  //this shuffles a new deck
        deckId=data.deck_id;  //we get the deck_id from the data and assign it to a variable
        $btn.show();  
    });

    $btn.on('click',function() {   //setting a click function to the button 
        $.getJSON(`${baseURL}/${deckId}/draw/`).then(data=>{  //this allows us to draw from the current deck that we are on
            let cardSource=data.cards[0].image; //this gets the card image from the data. 
            $cardArea.append( // this adds the cards to our designated div
                $('<img>',{
                    src:cardSource,
                    
                })
            );
            if(data.remaining===0) $btn.remove();  //once theres no cards left to pick, we remove the button
        });
    }); 
});

