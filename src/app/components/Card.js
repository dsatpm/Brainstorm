import Image from 'next/image';

const Card = ({ card }) => {

  return (
    <>
      <h2>{card.name}</h2>
      {card.imageUrl && Image(card.imageUrl)}
      <p>{card.type}</p>
      <p>{card.manaCost}</p>
    </>
  );
};

export default Card;